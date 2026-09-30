'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { budget, type DeviceInfo } from '@/lib/device'
import { rng } from '@/lib/format'
import { HERO_IDS } from '@/lib/heroNodes'
import { pointerState, scrollState } from '@/lib/scrollState'
import { CanvasBoundary } from './CanvasBoundary'
import { PortraitCard } from './PortraitCard'
import { measureAnchor, type Anchor } from './anchor'
import { ACCENT, MUTED, getDotTexture } from './sprite'

/* The hero's engineering environment: project nodes drifting in depth around the
   portrait, thin connecting lines, technical rings and a particle field. The
   camera flies forward as the hero scrolls away and the nodes spread outward.
   Everything is procedural — no models, no textures to download. */

const EDGES: [number, number][] = [
  ...HERO_IDS.map((_, i) => [i, (i + 1) % HERO_IDS.length] as [number, number]),
  [0, 4],
  [2, 6],
  [1, 7],
  [3, 8],
]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Nodes sit on an ellipse just outside the portrait, kept inside the viewport
    with room for their label on the right. */
function layout(w: number, h: number, anchor: Anchor) {
  const { cx, cy, halfW, halfH } = anchor
  // On tall screens the portrait sits below the text: keep the ring to its own height so
  // nodes and labels never climb into the heading and buttons above.
  const tall = w / h < 0.9
  const rx = halfW + (tall ? 0.55 : 0.9)
  const ry = tall ? halfH * 0.95 : halfH + 0.55
  const r = rng(11)
  const points = HERO_IDS.map((_, i) => {
    const a = (i / HERO_IDS.length) * Math.PI * 2 + 0.45
    const jitter = 0.9 + r() * 0.3
    return new THREE.Vector3(
      clamp(cx + Math.cos(a) * rx * jitter, -w / 2 + 0.5, w / 2 - 1.7),
      clamp(cy + Math.sin(a) * ry * jitter, -h / 2 + 0.5, h / 2 - 0.7),
      (r() - 0.5) * 3.6,
    )
  })
  return { points, cx, cy, halfW, halfH, ringR: Math.max(halfW, halfH) * 1.05 }
}

function CameraRig({ reduced }: { reduced: boolean }) {
  useFrame(({ camera }) => {
    const p = scrollState.hero
    const tx = reduced ? 0 : pointerState.x * 0.5
    const ty = reduced ? 0 : -pointerState.y * 0.3
    camera.position.x += (tx - camera.position.x) * 0.05
    camera.position.y += (ty + p * 0.6 - camera.position.y) * 0.05
    camera.position.z += (10 - p * 6.5 - camera.position.z) * 0.08
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Nodes({
  labelEls,
  reduced,
  detail,
}: {
  labelEls: MutableRefObject<(HTMLElement | null)[]> | null
  reduced: boolean
  detail: number
}) {
  const viewport = useThree((s) => s.viewport)
  const size = useThree((s) => s.size)
  const { points, cx, cy, halfW, halfH, ringR } = useMemo(
    () => layout(viewport.width, viewport.height, measureAnchor(size, viewport)),
    [viewport, size],
  )
  const phases = useMemo(() => {
    const r = rng(5)
    return HERO_IDS.map(() => r() * Math.PI * 2)
  }, [])

  const nodeRefs = useRef<(THREE.Group | null)[]>([])
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const current = useMemo(() => points.map((p) => p.clone()), [points])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(new Float32Array(EDGES.length * 6), 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    g.setAttribute('position', attr)
    return g
  }, [])

  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock, camera, size }) => {
    const t = reduced ? 0 : clock.elapsedTime
    const spread = 1 + scrollState.hero * 1.4
    for (let i = 0; i < points.length; i++) {
      const b = points[i]
      const c = current[i]
      c.set(
        b.x * spread + Math.sin(t * 0.45 + phases[i]) * 0.14,
        b.y * spread + Math.cos(t * 0.38 + phases[i]) * 0.16,
        b.z + Math.sin(t * 0.3 + phases[i] * 2) * 0.2,
      )
      nodeRefs.current[i]?.position.copy(c)
    }
    const arr = lineGeo.attributes.position.array as Float32Array
    EDGES.forEach(([a, b], i) => {
      arr[i * 6] = current[a].x
      arr[i * 6 + 1] = current[a].y
      arr[i * 6 + 2] = current[a].z
      arr[i * 6 + 3] = current[b].x
      arr[i * 6 + 4] = current[b].y
      arr[i * 6 + 5] = current[b].z
    })
    lineGeo.attributes.position.needsUpdate = true

    if (ringA.current) ringA.current.rotation.z = t * 0.08
    if (ringB.current) ringB.current.rotation.z = -t * 0.05

    // Labels are plain DOM, placed by projecting each node — no extra React roots.
    const els = labelEls?.current
    if (els) {
      const fade = Math.max(0, 1 - scrollState.hero * 2.2) * 0.85
      for (let i = 0; i < current.length; i++) {
        const el = els[i]
        if (!el) continue
        tmp.copy(current[i]).project(camera)
        const x = (tmp.x * 0.5 + 0.5) * size.width
        const y = (-tmp.y * 0.5 + 0.5) * size.height
        el.style.transform = `translate3d(${x + 16}px, ${y}px, 0) translateY(-50%)`
        // A node behind the portrait is hidden by it; its label must not float over the photo.
        const c = current[i]
        const behindPortrait = c.z < 0.3 && Math.abs(c.x - cx) < halfW * 0.98 && Math.abs(c.y - cy) < halfH * 0.98
        el.style.opacity = tmp.z < 1 && !behindPortrait ? String(fade) : '0'
      }
    }
  })

  return (
    <>
      {/* Technical rings behind the portrait */}
      <group position={[cx, cy, -1.5]} rotation={[1.05, 0.25, 0]}>
        <mesh ref={ringA}>
          <ringGeometry args={[ringR, ringR + 0.014, 160]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={ringB} scale={1.22}>
          <ringGeometry args={[ringR, ringR + 0.01, 160]} />
          <meshBasicMaterial color={MUTED} transparent opacity={0.16} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <lineSegments geometry={lineGeo} frustumCulled={false}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.2} />
      </lineSegments>

      {points.map((_, i) => (
        <group
          key={HERO_IDS[i]}
          ref={(g) => {
            nodeRefs.current[i] = g
          }}
        >
          <mesh>
            <sphereGeometry args={[i % 3 === 0 ? 0.085 : 0.06, detail, detail]} />
            <meshBasicMaterial color={i % 3 === 0 ? ACCENT : '#dfe6f2'} toneMapped={false} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.15, 0.165, 40]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const r = rng(7)
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (r() - 0.5) * 32
      pos[i * 3 + 1] = (r() - 0.5) * 20
      pos[i * 3 + 2] = (r() - 0.5) * 26 - 4
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])
  const map = useMemo(() => getDotTexture(), [])

  useFrame((_, dt) => {
    const pts = ref.current
    if (!pts || reduced) return
    pts.rotation.y += dt * 0.012
    pts.position.x += (-pointerState.x * 0.5 - pts.position.x) * 0.03
    pts.position.y += (pointerState.y * 0.3 - pts.position.y) * 0.03
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={map}
        size={0.075}
        sizeAttenuation
        color={MUTED}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}

export interface HeroPortrait {
  cutout: string
  depth: string | null
}

export default function HeroScene({
  device,
  active,
  onReady,
  labelEls,
  portrait,
  onPortraitReady,
}: {
  device: DeviceInfo
  active: boolean
  onReady?: () => void
  labelEls: MutableRefObject<(HTMLElement | null)[]> | null
  portrait: HeroPortrait | null
  onPortraitReady: () => void
}) {
  const b = budget[device.tier]
  const reduced = device.reducedMotion

  return (
    <Canvas
      onCreated={() => onReady?.()}
      dpr={[1, device.maxDpr]}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 80 }}
      gl={{ antialias: device.tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <CameraRig reduced={reduced} />
      <Particles count={b.heroParticles} reduced={reduced} />
      <Nodes labelEls={b.labels ? labelEls : null} reduced={reduced} detail={Math.max(8, b.sphereDetail)} />
      {portrait && (
        // If the image fails to load the rest of the scene carries on without it.
        <CanvasBoundary fallback={null}>
          <Suspense fallback={null}>
            <PortraitCard
              colorUrl={portrait.cutout}
              depthUrl={device.tier === 'low' ? null : portrait.depth}
              reduced={reduced}
              onReady={onPortraitReady}
            />
          </Suspense>
        </CanvasBoundary>
      )}
    </Canvas>
  )
}

'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { budget, type DeviceInfo } from '@/lib/device'
import { rng } from '@/lib/format'
import { pointerState } from '@/lib/scrollState'
import { universeNodes } from '@/lib/universe'
import { ACCENT, MUTED, getDotTexture } from './sprite'

/* The engineering universe: MANIKANDAN R at the centre, twelve nodes on a sphere
   around it. Choosing a node turns the sphere to bring it to the front, lights the
   nodes it connects to and dims the rest. Motion is slow and only ever a response
   to a choice or to the pointer. */

const N = universeNodes.length
const RADIUS = 3.1
const INDEX = new Map(universeNodes.map((n, i) => [n.id, i]))

function spherePoints(): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return universeNodes.map((_, i) => {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    return new THREE.Vector3(Math.cos(theta) * r, y * 0.82, Math.sin(theta) * r).multiplyScalar(RADIUS)
  })
}

const lerpAngle = (a: number, b: number, k: number) => {
  const d = Math.atan2(Math.sin(b - a), Math.cos(b - a))
  return a + d * k
}

export interface UniverseLabels {
  nodes: MutableRefObject<(HTMLElement | null)[]>
  center: MutableRefObject<HTMLElement | null>
}

interface ConstellationProps {
  active: string | null
  reduced: boolean
  labels: UniverseLabels
  onSelect: (id: string) => void
  onHoverChange: (hovering: boolean) => void
}

function Constellation({ active, reduced, labels, onSelect, onHoverChange }: ConstellationProps) {
  const base = useMemo(spherePoints, [])
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const invalidate = useThree((s) => s.invalidate)

  // Per-node eased amounts: chosen, connected, dimmed.
  const amount = useRef({
    chosen: new Float32Array(N),
    linked: new Float32Array(N),
    dim: new Float32Array(N),
  })
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    invalidate() // reduced motion renders on demand
  }, [active, invalidate])

  const materials = useMemo(
    () =>
      universeNodes.map(() => new THREE.MeshBasicMaterial({ color: '#dfe6f2', transparent: true, toneMapped: false })),
    [],
  )
  const tmpColor = useMemo(() => new THREE.Color(), [])
  const white = useMemo(() => new THREE.Color('#dfe6f2'), [])
  const accent = useMemo(() => new THREE.Color(ACCENT), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])
  const current = useMemo(() => base.map((p) => p.clone()), [base])

  const spokes = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const a = new THREE.BufferAttribute(new Float32Array(N * 6), 3)
    a.setUsage(THREE.DynamicDrawUsage)
    g.setAttribute('position', a)
    return g
  }, [])
  // Up to eight highlighted links from the chosen node.
  const links = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const a = new THREE.BufferAttribute(new Float32Array(8 * 6), 3)
    a.setUsage(THREE.DynamicDrawUsage)
    g.setAttribute('position', a)
    g.setDrawRange(0, 0)
    return g
  }, [])

  useFrame(({ camera, size }, dt) => {
    const g = group.current
    if (!g) return
    const k = reduced ? 1 : 0.11
    const activeIdx = activeRef.current ? (INDEX.get(activeRef.current) ?? -1) : -1
    const linkedIdx = activeIdx >= 0 ? universeNodes[activeIdx].links.map((id) => INDEX.get(id) ?? -1) : []

    // Rotation: drift slowly when idle; turn the chosen node to the front otherwise.
    if (activeIdx >= 0) {
      const p = base[activeIdx]
      g.rotation.y = lerpAngle(g.rotation.y, Math.atan2(-p.x, p.z), k)
      // Tilt so the node also comes to the vertical centre (Y is applied first, then X).
      const tilt = Math.atan2(p.y, Math.hypot(p.x, p.z)) * 0.92
      g.rotation.x += (tilt - g.rotation.x) * k
    } else {
      if (!reduced) g.rotation.y += dt * 0.09
      const px = reduced ? 0 : pointerState.y * 0.18
      g.rotation.x += (px - g.rotation.x) * 0.05
    }

    const { chosen, linked, dim } = amount.current
    for (let i = 0; i < N; i++) {
      const isChosen = i === activeIdx ? 1 : 0
      const isLinked = linkedIdx.includes(i) ? 1 : 0
      const isDim = activeIdx >= 0 && !isChosen && !isLinked ? 1 : 0
      chosen[i] += (isChosen - chosen[i]) * k
      linked[i] += (isLinked - linked[i]) * k
      dim[i] += (isDim - dim[i]) * k

      const lift = 1 + chosen[i] * 0.18
      current[i].copy(base[i]).multiplyScalar(lift)
      const mesh = meshes.current[i]
      if (mesh) {
        mesh.position.copy(current[i])
        mesh.scale.setScalar(1 + chosen[i] * 1.1 + linked[i] * 0.35)
      }
      const m = materials[i]
      m.opacity = 1 - dim[i] * 0.78
      m.color.copy(white).lerp(accent, Math.max(chosen[i], linked[i] * 0.8, 0))
    }

    // Spokes from the centre, faint; brighter for the chosen and its links.
    const sp = spokes.attributes.position.array as Float32Array
    for (let i = 0; i < N; i++) {
      sp[i * 6] = 0
      sp[i * 6 + 1] = 0
      sp[i * 6 + 2] = 0
      sp[i * 6 + 3] = current[i].x
      sp[i * 6 + 4] = current[i].y
      sp[i * 6 + 5] = current[i].z
    }
    spokes.attributes.position.needsUpdate = true

    // Highlighted links between the chosen node and what it connects to.
    const lp = links.attributes.position.array as Float32Array
    let n = 0
    if (activeIdx >= 0) {
      for (const j of linkedIdx) {
        if (j < 0 || n >= 8) continue
        lp[n * 6] = current[activeIdx].x
        lp[n * 6 + 1] = current[activeIdx].y
        lp[n * 6 + 2] = current[activeIdx].z
        lp[n * 6 + 3] = current[j].x
        lp[n * 6 + 4] = current[j].y
        lp[n * 6 + 5] = current[j].z
        n++
      }
    }
    links.setDrawRange(0, n * 2)
    links.attributes.position.needsUpdate = true

    // DOM labels, placed by projecting each node through the turned sphere.
    g.updateWorldMatrix(true, false)
    const els = labels.nodes.current
    for (let i = 0; i < N; i++) {
      const el = els[i]
      if (!el) continue
      tmp.copy(current[i]).applyMatrix4(g.matrixWorld)
      const depth = tmp.z
      tmp.project(camera)
      const x = (tmp.x * 0.5 + 0.5) * size.width
      const y = (-tmp.y * 0.5 + 0.5) * size.height
      el.style.transform = `translate3d(${x}px, ${y + 16 + chosen[i] * 6}px, 0) translateX(-50%)`
      // Nodes at the back fade so the front reads first.
      const facing = THREE.MathUtils.clamp((depth + RADIUS) / (RADIUS * 2), 0, 1)
      el.style.opacity = String((0.35 + facing * 0.65) * (1 - dim[i] * 0.75))
      el.style.color = chosen[i] > 0.5 || linked[i] > 0.5 ? ACCENT : ''
    }
    const c = labels.center.current
    if (c) {
      tmp.set(0, 0, 0).project(camera)
      c.style.transform = `translate3d(${(tmp.x * 0.5 + 0.5) * size.width}px, ${(-tmp.y * 0.5 + 0.5) * size.height + 26}px, 0) translateX(-50%)`
    }
  })

  return (
    <>
      {/* Centre */}
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.435, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      <group ref={group}>
        <lineSegments geometry={spokes} frustumCulled={false}>
          <lineBasicMaterial color={MUTED} transparent opacity={0.16} />
        </lineSegments>
        <lineSegments geometry={links} frustumCulled={false}>
          <lineBasicMaterial color={ACCENT} transparent opacity={0.85} />
        </lineSegments>

        {universeNodes.map((node, i) => (
          <mesh
            key={node.id}
            ref={(m) => {
              meshes.current[i] = m
            }}
            material={materials[i]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHoverChange(true)
              onSelect(node.id)
            }}
            onPointerOut={() => onHoverChange(false)}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(node.id)
            }}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            {/* Generous invisible hit area so nodes are easy to hit, including by touch. */}
            <mesh>
              <sphereGeometry args={[0.45, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </mesh>
        ))}
      </group>
    </>
  )
}

function Dust({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const r = rng(23)
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = r() * 2 - 1
      const t = r() * Math.PI * 2
      const s = Math.sqrt(1 - u * u)
      const d = 5 + r() * 6
      pos[i * 3] = Math.cos(t) * s * d
      pos[i * 3 + 1] = u * d * 0.7
      pos[i * 3 + 2] = Math.sin(t) * s * d
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])
  const map = useMemo(() => getDotTexture(), [])
  useFrame((_, dt) => {
    if (ref.current && !reduced) ref.current.rotation.y += dt * 0.01
  })
  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial map={map} size={0.07} sizeAttenuation color={MUTED} transparent opacity={0.5} depthWrite={false} />
    </points>
  )
}

interface UniverseSceneProps {
  device: DeviceInfo
  active: string | null
  running: boolean
  labels: UniverseLabels
  onSelect: (id: string) => void
}

export default function UniverseScene({ device, active, running, labels, onSelect }: UniverseSceneProps) {
  const reduced = device.reducedMotion
  const b = budget[device.tier]
  const canvasEl = useRef<HTMLCanvasElement | null>(null)

  return (
    <Canvas
      dpr={[1, device.maxDpr]}
      frameloop={reduced ? 'demand' : running ? 'always' : 'never'}
      camera={{ position: [0, 0, 9.5], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: device.tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
      onCreated={({ gl }) => {
        canvasEl.current = gl.domElement
      }}
    >
      <Dust count={b.universeParticles} reduced={reduced} />
      <Constellation
        active={active}
        reduced={reduced}
        labels={labels}
        onSelect={onSelect}
        onHoverChange={(hovering) => {
          const el = canvasEl.current
          if (!el) return
          if (hovering) el.setAttribute('data-cursor', 'open')
          else el.removeAttribute('data-cursor')
        }}
      />
    </Canvas>
  )
}

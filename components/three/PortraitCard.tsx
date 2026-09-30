'use client'

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { pointerState, scrollState } from '@/lib/scrollState'
import { measureAnchor } from './anchor'
import { ACCENT, getDotTexture } from './sprite'

/* The supplied portrait as a 3D card.

   The photograph is drawn exactly as it is — same pixels, same proportions. What
   moves is the card: it turns toward the pointer like a head following someone
   across a room, sits slightly rounded (a soft silhouette-derived depth map decides
   how far each part is from the viewer, so the face itself is never warped), and a
   faint accent light follows the cursor across it. With no pointer (touch, or an
   idle desktop) it sways gently on its own; with reduced motion it stays still. */

const vertexShader = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uDisp;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vec3 p = position + vec3(0.0, 0.0, d * uDisp);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uOpacity;
  uniform vec3 uAccent;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    vec4 t = texture2D(uTex, uv);
    float a = t.a;

    // The photo is cropped at the chest and shoulders; dissolve those edges into the page.
    // The shoulders run to the photo's left and right edges, so the side fade widens toward the bottom.
    a *= smoothstep(0.0, 0.2, uv.y);
    float sideW = mix(0.03, 0.2, smoothstep(0.55, 0.0, uv.y));
    a *= smoothstep(0.0, sideW, uv.x) * smoothstep(1.0, 1.0 - sideW, uv.x);

    if (a < 0.01) discard;

    // Light that follows the cursor, tinted with the accent. Additive and faint.
    vec2 d = (uv - uMouse) * vec2(0.8, 1.0);
    float sheen = exp(-dot(d, d) * 14.0) * uHover;
    vec3 col = t.rgb + uAccent * sheen * 0.14;

    gl_FragColor = vec4(col, a * uOpacity);
    #include <colorspace_fragment>
  }
`

interface PortraitCardProps {
  colorUrl: string
  depthUrl: string | null
  reduced: boolean
  onReady: () => void
}

export function PortraitCard({ colorUrl, depthUrl, reduced, onReady }: PortraitCardProps) {
  const gl = useThree((s) => s.gl)
  const viewport = useThree((s) => s.viewport)
  const size = useThree((s) => s.size)
  const anchor = useMemo(() => measureAnchor(size, viewport), [size, viewport])

  const urls = depthUrl ? [colorUrl, depthUrl] : [colorUrl]
  const [color, depth] = useLoader(THREE.TextureLoader, urls)

  const flat = useMemo(() => {
    const t = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1)
    t.needsUpdate = true
    return t
  }, [])

  const material = useMemo(() => {
    color.colorSpace = THREE.SRGBColorSpace
    color.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    color.needsUpdate = true
    return new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: color },
        uDepth: { value: depth ?? flat },
        uDisp: { value: depth ? 0.42 : 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uOpacity: { value: 1 },
        uAccent: { value: new THREE.Color(ACCENT) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: true,
    })
  }, [color, depth, flat, gl])

  const group = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Mesh>(null)
  const haloMap = useMemo(() => getDotTexture(), [])
  const steer = useRef({ x: 0, y: 0, hover: 0 })

  useEffect(() => {
    onReady()
  }, [onReady])

  useFrame(({ clock }, dt) => {
    const g = group.current
    if (!g) return
    const u = material.uniforms
    const s = steer.current
    const t = clock.elapsedTime
    const p = scrollState.hero

    const steered = !reduced && performance.now() - pointerState.t < 2600
    let tx = 0
    let ty = 0
    if (!reduced) {
      tx = steered ? pointerState.x : Math.sin(t * 0.5) * 0.4
      ty = steered ? pointerState.y : Math.sin(t * 0.37 + 1) * 0.12
    }
    const k = 1 - Math.exp(-dt * 4.5)
    s.x += (tx - s.x) * k
    s.y += (ty - s.y) * k
    s.hover += ((steered ? 1 : 0) - s.hover) * k

    // Turn toward the pointer; drift a little with it.
    g.rotation.y = s.x * 0.3
    g.rotation.x = s.y * 0.14
    g.position.set(anchor.cx + s.x * 0.1, anchor.cy - s.y * 0.06 + p * 0.5, 0)
    const sc = 1 - p * 0.1
    g.scale.set(anchor.halfW * 2 * sc, anchor.halfH * 2 * sc, 1)

    // Cursor position on the card, in its own uv space.
    const wx = pointerState.x * (viewport.width / 2)
    const wy = -pointerState.y * (viewport.height / 2)
    u.uMouse.value.set((wx - anchor.cx) / (anchor.halfW * 2) + 0.5, (wy - anchor.cy) / (anchor.halfH * 2) + 0.5)
    u.uHover.value = s.hover
    u.uOpacity.value = Math.max(0, 1 - p * 1.4)

    // The halo sits behind and drifts the other way, which is what sells the depth.
    if (halo.current) {
      halo.current.position.set(anchor.cx - s.x * 0.3, anchor.cy + 0.1 - s.y * 0.15, -1.2)
      ;(halo.current.material as THREE.MeshBasicMaterial).opacity = 0.2 * Math.max(0, 1 - p * 1.6)
    }
  })

  return (
    <>
      <mesh ref={halo} scale={[anchor.halfW * 4.2, anchor.halfW * 4.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={haloMap}
          color={ACCENT}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <group ref={group}>
        <mesh material={material}>
          <planeGeometry args={[1, 1, 48, 60]} />
        </mesh>
      </group>
    </>
  )
}

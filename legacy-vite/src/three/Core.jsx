import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { budget, pointerState, scrollState } from '../lib/state'

const RINGS = [
  { r: 2.5, tube: 0.012, rot: [Math.PI / 2.2, 0, 0], color: '#22d3ee', speed: 0.18 },
  { r: 3.1, tube: 0.009, rot: [Math.PI / 3, Math.PI / 5, 0], color: '#8b5cf6', speed: -0.13 },
  { r: 3.7, tube: 0.007, rot: [Math.PI / 1.7, -Math.PI / 6, 0], color: '#f472b6', speed: 0.09 },
]

/**
 * The centrepiece: a distorting dark core inside a glowing wireframe cage,
 * wrapped by three tilted rings. Fully procedural — no assets.
 */
export default function Core() {
  const group = useRef()
  const cage = useRef()
  const ringRefs = [useRef(), useRef(), useRef()]

  const seg = budget.sphereSeg
  const tseg = budget.torusSeg

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05)
    const t = state.clock.elapsedTime
    const g = group.current
    if (!g) return

    // Pointer-follow tilt, eased.
    g.rotation.y += (pointerState.x * 0.35 - g.rotation.y) * 0.05
    g.rotation.x += (pointerState.y * 0.25 - g.rotation.x) * 0.05

    // Sit beside the headline on wide screens, centred on narrow ones.
    const wide = state.viewport.aspect > 1.05
    const restX = wide ? 2.5 : 0
    const restY = wide ? 0.1 : 1.1

    // Leave the frame once the visitor is past the hero, so it never
    // competes with the content sections.
    const h = Math.min(1, scrollState.hero)
    const ease = h * h

    g.position.x += (restX - g.position.x) * 0.06
    g.position.y = restY + 0.15 * Math.sin(t * 0.5) + ease * 9
    g.scale.setScalar((wide ? 1 : 0.72) * (1 - ease * 0.45))

    if (cage.current) {
      cage.current.rotation.y += d * 0.14
      cage.current.rotation.z -= d * 0.05
    }
    for (let i = 0; i < RINGS.length; i++) {
      const r = ringRefs[i].current
      if (r) r.rotation.z += d * RINGS[i].speed
    }
  })

  return (
    <group ref={group}>
      {/* inner morphing core */}
      <mesh>
        <sphereGeometry args={[1.35, seg, seg / 2]} />
        <MeshDistortMaterial
          color="#0a0f1f"
          emissive="#0e7490"
          emissiveIntensity={0.35}
          roughness={0.18}
          metalness={0.9}
          distort={0.34}
          speed={1.1}
        />
      </mesh>

      {/* glowing wireframe cage */}
      <Icosahedron ref={cage} args={[2.05, budget.icoDetail]}>
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Icosahedron>

      {/* orbit rings */}
      {RINGS.map((ring, i) => (
        <mesh key={i} ref={ringRefs[i]} rotation={ring.rot}>
          <torusGeometry args={[ring.r, ring.tube, 6, tseg]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.42}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

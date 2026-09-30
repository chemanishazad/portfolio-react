import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { budget, scrollState } from '../lib/state'

/**
 * Floating glass slabs. Plain boxes with a transparent standard material —
 * no rounded-box tessellation, no clearcoat, no transmission. Real glass
 * costs an extra render pass per frame for almost no visual gain at this
 * size and opacity.
 */
const SHARDS = [
  { p: [-4.4, 1.7, -1.2], r: [0.4, 0.7, -0.25], s: [1.5, 2.0, 0.06], c: '#22d3ee' },
  { p: [4.6, -1.2, -0.6], r: [-0.3, -0.6, 0.2], s: [1.8, 1.2, 0.06], c: '#8b5cf6' },
  { p: [-3.2, -2.3, 1.4], r: [0.2, 0.4, 0.5], s: [1.1, 1.1, 0.06], c: '#f472b6' },
  { p: [3.4, 2.4, 1.1], r: [-0.5, 0.3, -0.4], s: [1.0, 1.4, 0.06], c: '#67e8f9' },
]

export default function Shards() {
  const list = useMemo(() => SHARDS.slice(0, budget.shards), [])
  const group = useRef()

  useFrame(() => {
    const g = group.current
    if (!g) return
    // Sink and drift back as the hero scrolls away.
    const h = Math.min(1, scrollState.hero)
    g.position.y = -h * h * 7
    g.position.z = -h * 4
  })

  return (
    <group ref={group}>
      {list.map((s, i) => (
        <Float
          key={i}
          speed={1.1 + i * 0.16}
          rotationIntensity={0.3}
          floatIntensity={0.8}
          floatingRange={[-0.22, 0.22]}
        >
          <mesh position={s.p} rotation={s.r}>
            <boxGeometry args={s.s} />
            <meshStandardMaterial
              color="#0d1424"
              emissive={s.c}
              emissiveIntensity={0.22}
              roughness={0.12}
              metalness={0.4}
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

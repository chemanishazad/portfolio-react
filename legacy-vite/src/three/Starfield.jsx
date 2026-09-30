import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { pointerState } from '../lib/state'

/**
 * One soft round sprite, generated once and shared by every layer.
 * Previously each layer built its own canvas texture — three identical
 * uploads to the GPU for no reason.
 */
let DOT
function dotTexture() {
  if (DOT) return DOT
  const size = 32
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  DOT = new THREE.CanvasTexture(c)
  return DOT
}

function Layer({ count, radius, size, color, speed, depth }) {
  const ref = useRef()
  const tex = dotTexture()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Spherical shell, so the field has real depth rather than a flat wall.
      const r = radius * (0.55 + Math.random() * 0.45)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    const d = Math.min(dt, 0.05)
    g.rotation.y += d * speed
    // Parallax: nearer layers react more to the pointer.
    g.position.x += (pointerState.x * depth - g.position.x) * 0.04
    g.position.y += (-pointerState.y * depth - g.position.y) * 0.04
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        size={size}
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Starfield({ counts }) {
  return (
    <group>
      <Layer count={counts[0]} radius={34} size={0.07} color="#8fd6ff" speed={0.012} depth={0.35} />
      <Layer count={counts[1]} radius={20} size={0.1} color="#c4b5fd" speed={0.022} depth={0.8} />
      <Layer count={counts[2]} radius={12} size={0.15} color="#67e8f9" speed={0.04} depth={1.5} />
    </group>
  )
}

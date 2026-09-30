import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, AdaptiveDpr } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

import Starfield from './Starfield'
import Core from './Core'
import Shards from './Shards'
import { budget, pointerState, prefersReducedMotion, scrollState } from '../lib/state'

/** Scroll- and pointer-driven camera. Nothing here causes a React render. */
function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05)
    const h = Math.min(1, scrollState.hero)
    const narrow = state.viewport.aspect < 1.05

    // Pull back through the hero, then hold: past the fold the canvas is
    // ambient depth, not the subject.
    const wantZ = (narrow ? 9.6 : 7.4) + h * 4.5
    const wantY = h * 1.4
    const wantX = pointerState.x * (narrow ? 0.3 : 0.9)

    camera.position.z += (wantZ - camera.position.z) * (1 - Math.pow(0.002, d))
    camera.position.y += (wantY - camera.position.y) * (1 - Math.pow(0.005, d))
    camera.position.x += (wantX - camera.position.x) * (1 - Math.pow(0.01, d))

    target.current.set(narrow ? 0 : 0.8, h * 1.1, 0)
    camera.lookAt(target.current)
  })

  return null
}

function SceneContents() {
  return (
    <>
      <color attach="background" args={['#04050a']} />
      <fog attach="fog" args={['#04050a', 12, 46]} />

      <ambientLight intensity={0.3} />
      <pointLight position={[6, 5, 6]} intensity={95} color="#22d3ee" distance={28} decay={2} />
      <pointLight position={[-7, -4, 4]} intensity={70} color="#8b5cf6" distance={28} decay={2} />

      {/* Procedural environment map — built in-engine once, no HDRI download. */}
      <Environment resolution={budget.envRes} frames={1}>
        <mesh scale={60}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#05060c" side={THREE.BackSide} />
        </mesh>
        <Lightformer intensity={2.4} color="#22d3ee" position={[0, 4, -6]} scale={[10, 3, 1]} />
        <Lightformer intensity={1.8} color="#8b5cf6" position={[-6, -2, 4]} scale={[8, 4, 1]} />
      </Environment>

      <Starfield counts={budget.stars} />
      <Core />
      <Shards />

      <CameraRig />
      <AdaptiveDpr pixelated />

      {budget.post && (
        <EffectComposer multisampling={0} disableNormalPass>
          {budget.bloom ? (
            <Bloom
              intensity={1.0}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.4}
              mipmapBlur
              radius={0.66}
            />
          ) : (
            <></>
          )}
          {/* radialModulation keeps the fringing off the centre of frame,
              where the headline and the core sit */}
          <ChromaticAberration
            offset={new THREE.Vector2(0.0004, 0.0006)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation
            modulationOffset={0.55}
          />
          <Vignette eskil={false} offset={0.24} darkness={0.82} />
        </EffectComposer>
      )}
    </>
  )
}

/**
 * The canvas only renders while the hero is on screen and the tab is
 * visible. Past the fold the scene has already flown out of frame, so
 * running the loop there was paying full GPU cost for nothing — this is
 * the single biggest win for scroll smoothness.
 */
function useSceneActive() {
  const [onScreen, setOnScreen] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('home')
    let io
    if (hero) {
      io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.01 })
      io.observe(hero)
    }
    const onVis = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return onScreen && visible
}

export default function Scene() {
  const active = useSceneActive()

  // Reduced-motion visitors get a still gradient instead of a live canvas.
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 32%, rgba(34,211,238,0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 78% 70%, rgba(139,92,246,0.14), transparent 62%), #04050a',
        }}
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, budget.dpr]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 7.4], fov: 46, near: 0.1, far: 90 }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
        }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  )
}

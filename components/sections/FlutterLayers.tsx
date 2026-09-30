'use client'

import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { flutterLayers } from '@/lib/story'

/* "Flutter, Beyond UI": a phone that comes apart as you scroll, each sheet standing
   for a layer beneath the widget tree. Pure CSS 3D driven by scroll progress — no
   WebGL. The list beside it carries the same content for anyone not watching. */

const GAP = 54

function Sheet({ index, progress, count }: { index: number; progress: MotionValue<number>; count: number }) {
  // Bottom sheet stays put; each one above rises further as the stack opens.
  const z = useTransform(progress, [0, 1], [index * 2, index * GAP])
  const top = index === count - 1

  return (
    <motion.div
      style={{ z }}
      className={`absolute inset-0 rounded-[28px] border ${
        top ? 'border-line-strong bg-surface-2' : 'border-accent/30 bg-surface/90'
      }`}
    >
      <div className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full bg-line-strong" />
      {top ? (
        <div className="absolute inset-x-5 top-12 space-y-3">
          <div className="h-3 w-24 rounded-full bg-line-strong" />
          <div className="h-24 rounded-2xl border border-accent/40 bg-accent-soft" />
          <div className="h-10 rounded-xl bg-line" />
          <div className="h-10 rounded-xl bg-line" />
          <div className="h-10 w-2/3 rounded-xl bg-line" />
        </div>
      ) : (
        <div className="absolute inset-5 top-12 grid grid-cols-4 gap-2 opacity-80">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className={`aspect-square rounded-md ${(i + index) % 5 === 0 ? 'bg-accent/40' : 'bg-line'}`} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function FlutterLayers() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 35%'] })
  // Reduced motion: hold the stack half-open instead of animating it. Decided after mount
  // so the server and first client render agree (a mismatch here is a hydration error).
  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const fixed = useMotionValue(0.75)
  const progress = still ? fixed : scrollYProgress
  const order = [...flutterLayers].reverse() // deepest layer at the bottom of the stack

  return (
    <div ref={ref} aria-hidden className="relative mx-auto h-[400px] w-full max-w-[420px] overflow-hidden sm:h-[460px] [perspective:1400px]">
      {/* Smaller on phones: the tilted stack is wider than it looks. */}
      <div className="absolute inset-0 origin-center scale-[0.72] sm:scale-100">
        <div
          className="absolute left-1/2 top-1/2 h-[380px] w-[210px] [transform-style:preserve-3d]"
          style={{ transform: 'translate(-50%, -50%) rotateX(58deg) rotateZ(-32deg)' }}
        >
          {order.map((layer, i) => (
            <Sheet key={layer.id} index={i} progress={progress} count={order.length} />
          ))}
        </div>
      </div>
    </div>
  )
}

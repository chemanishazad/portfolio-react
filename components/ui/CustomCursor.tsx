'use client'

import { useEffect, useRef, useState } from 'react'
import type { CursorMode } from '@/lib/store'

const LABELS: Partial<Record<CursorMode, string>> = { view: 'View', drag: 'Drag', open: 'Open' }

/** Restrained desktop cursor: a small dot and a ring that grows over links and
    carries a short label over projects. Mount is conditional on a real pointer;
    `html.has-cursor` (set by DeviceProbe) is what hides the native one. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<CursorMode>('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mq.matches || reduced.matches) return
    setEnabled(true)

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let current: CursorMode = 'default'
    let visible = false

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        visible = true
        rx = x
        ry = y
        if (dot.current) dot.current.style.opacity = '1'
        if (ring.current) ring.current.style.opacity = '1'
      }
      const hit = (e.target as Element | null)?.closest?.('[data-cursor], a, button, input, select, textarea')
      let next: CursorMode = 'default'
      if (hit) {
        const attr = hit.getAttribute('data-cursor') as CursorMode | null
        next = attr ?? 'link'
      }
      if (next !== current) {
        current = next
        setMode(next)
      }
    }
    const onLeave = () => {
      visible = false
      if (dot.current) dot.current.style.opacity = '0'
      if (ring.current) ring.current.style.opacity = '0'
    }

    const tick = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  if (!enabled) return null

  const label = LABELS[mode]
  const big = mode !== 'default'

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[400]">
      <div ref={dot} className="fixed left-0 top-0 opacity-0 transition-opacity duration-300">
        <div className="-ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-accent" />
      </div>
      <div ref={ring} className="fixed left-0 top-0 opacity-0 transition-opacity duration-300">
        <div
          className={`grid place-items-center rounded-full border transition-all duration-300 ease-out ${
            big
              ? label
                ? 'h-[72px] w-[72px] border-accent bg-accent-soft'
                : 'h-12 w-12 border-accent'
              : 'h-8 w-8 border-line-strong'
          }`}
          style={{ marginLeft: big ? (label ? -36 : -24) : -16, marginTop: big ? (label ? -36 : -24) : -16 }}
        >
          {label && <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">{label}</span>}
        </div>
      </div>
    </div>
  )
}

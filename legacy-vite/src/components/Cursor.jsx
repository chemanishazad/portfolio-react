import { useEffect, useRef, useState } from 'react'
import { isTouch, prefersReducedMotion } from '../lib/state'

/** A two-part cursor: instant dot + lagging neon ring that swells on links. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  // Stay invisible until the pointer actually moves, so the ring never
  // parks in the middle of the hero on load or on hybrid touch laptops.
  const [awake, setAwake] = useState(false)

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return
    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let mx = rx
    let my = ry
    let scale = 1
    let wantScale = 1
    let raf

    const move = (e) => {
      if (e.pointerType === 'touch') return
      mx = e.clientX
      my = e.clientY
      setAwake(true)
      if (dot.current) dot.current.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)'
    }

    const over = (e) => {
      const t = e.target.closest('a,button,[data-cursor="grow"]')
      wantScale = t ? 2.4 : 1
    }

    const loop = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      scale += (wantScale - scale) * 0.12
      if (ring.current) {
        ring.current.style.transform =
          'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + scale.toFixed(3) + ')'
        ring.current.style.opacity = scale > 1.6 ? '0.5' : '0.9'
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch || prefersReducedMotion) return null

  return (
    <div
      aria-hidden
      className={
        'pointer-events-none fixed inset-0 z-[70] hidden transition-opacity duration-300 md:block ' +
        (awake ? 'opacity-100' : 'opacity-0')
      }
    >
      <div
        ref={ring}
        className="absolute h-8 w-8 rounded-full border border-neon-cyan/70"
        style={{ boxShadow: '0 0 18px rgba(34,211,238,0.45)' }}
      />
      <div ref={dot} className="absolute h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  )
}

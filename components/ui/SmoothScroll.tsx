'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { scrollState, pointerState } from '@/lib/scrollState'
import { scrollToId, setLenis } from '@/lib/scroll'

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

/** Smooth scrolling (Lenis), scroll → shared 3D state, pointer parallax, and
    in-page anchor handling. Renders nothing. Native scrolling when the visitor
    asks for reduced motion; touch scrolling is always native. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let lenis: Lenis | null = null

    const heroEl = () => document.getElementById('hero')
    // Without motion-ok the hero is a plain 100svh section: nothing to drive.
    const motionOk = document.documentElement.classList.contains('motion-ok')
    let lastHero = -1

    const update = (y: number) => {
      scrollState.y = y
      scrollState.vh = window.innerHeight
      const hero = heroEl()
      if (hero && motionOk) {
        const total = Math.max(1, hero.offsetHeight - window.innerHeight)
        scrollState.hero = clamp((y - hero.offsetTop) / total)
        if (scrollState.hero !== lastHero) {
          lastHero = scrollState.hero
          hero.style.setProperty('--hp', scrollState.hero.toFixed(4))
        }
      }
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollState.page = clamp(y / max)
    }

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      setLenis(lenis)
      lenis.on('scroll', ({ scroll }: { scroll: number }) => update(scroll))
      const loop = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    const onNativeScroll = () => update(window.scrollY)
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    window.addEventListener('resize', onNativeScroll)
    update(window.scrollY)

    const onPointer = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerState.y = (e.clientY / window.innerHeight) * 2 - 1
      pointerState.t = performance.now()
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    // In-page anchors: real <a href="#id"> links, smoothly scrolled, focus moved to the target.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')!.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      e.preventDefault()
      scrollToId(id)
      history.replaceState(null, '', `#${id}`)
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      setLenis(null)
      window.removeEventListener('scroll', onNativeScroll)
      window.removeEventListener('resize', onNativeScroll)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}

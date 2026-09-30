import type Lenis from 'lenis'

let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}

export const getLenis = () => instance

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scroll to a section id, through Lenis when it is running, natively otherwise. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
  }
}

/** Freeze page scroll while a full-screen layer (the case study) is open. */
export function lockScroll(locked: boolean) {
  if (locked) {
    instance?.stop()
    document.documentElement.style.overflow = 'hidden'
  } else {
    instance?.start()
    document.documentElement.style.overflow = ''
  }
}

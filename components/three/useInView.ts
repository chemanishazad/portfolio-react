'use client'

import { useEffect, useRef, useState } from 'react'

/** True while the element is (nearly) on screen. Scenes use it to stop rendering
    when they cannot be seen — an invisible canvas should cost nothing. */
export function useInView<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}

/** True while the browser tab is visible. */
export function usePageVisible() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const on = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])
  return visible
}

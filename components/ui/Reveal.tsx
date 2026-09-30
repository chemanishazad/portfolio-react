'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/* CSS-driven reveal. Elements are hidden only while <html> carries `motion-ok`,
   a class an inline script in <head> adds before first paint — and only when
   the visitor has not asked for reduced motion. Without JS, or with reduced
   motion, everything is simply visible. See `.reveal` in globals.css. */

let observer: IntersectionObserver | null = null
const callbacks = new WeakMap<Element, () => void>()

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.()
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
  }
  return observer
}

interface RevealProps {
  children: ReactNode
  as?: 'div' | 'p' | 'li' | 'span' | 'article' | 'section' | 'ul' | 'header' | 'figure'
  className?: string
  /** Delay in ms, for staggering siblings. */
  delay?: number
  style?: CSSProperties
}

export function Reveal({ children, as = 'div', className = '', delay = 0, style }: RevealProps) {
  // One ref type for every tag; they are all HTMLElements at runtime.
  const Tag = as as 'div'
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = getObserver()
    callbacks.set(el, () => el.classList.add('in'))
    io.observe(el)
    return () => {
      io.unobserve(el)
      callbacks.delete(el)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...style, ['--d' as string]: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

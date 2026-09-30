'use client'

import { useEffect, useRef, useState } from 'react'
import { contact, navOrder, profile, sections } from '@/lib/profile'
import { pad2 } from '@/lib/format'
import { scrollState } from '@/lib/scrollState'

const navItems = navOrder
  .map((id) => sections.find((s) => s.id === id))
  .filter((s): s is (typeof sections)[number] => Boolean(s))

export function SiteNavigation() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  // Which section is under the middle of the viewport.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id)
            if (idx >= 0) setActive(idx)
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Progress bar + "scrolled" state, off React's render path.
  useEffect(() => {
    let raf = 0
    let last = -1
    let lastScrolled = false
    const tick = () => {
      if (scrollState.page !== last && bar.current) {
        last = scrollState.page
        bar.current.style.transform = `scaleX(${last})`
      }
      const s = scrollState.y > 24
      if (s !== lastScrolled) {
        lastScrolled = s
        setScrolled(s)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const current = sections[active]

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled || open ? 'bg-bg/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#hero" className="font-mono text-[0.78rem] font-medium tracking-[0.2em]" data-cursor="link">
            {profile.name.toUpperCase()}
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current?.id === item.id ? 'true' : undefined}
                  className={`eyebrow py-2 transition-colors hover:text-fg ${current?.id === item.id ? 'text-fg' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <span aria-hidden className="eyebrow hidden tabular-nums md:inline">
              {pad2(active + 1)} / {pad2(sections.length)}
            </span>
            <a href="#contact" className="btn hidden !min-h-10 !px-4 lg:inline-flex">
              Let&apos;s connect
            </a>
            <button
              ref={toggle}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-fg transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-3 h-px w-5 bg-fg transition-all ${open ? 'top-1.5 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </nav>
        <div aria-hidden className="h-px w-full bg-line">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-[80] overflow-y-auto bg-bg pt-24 lg:hidden"
      >
        <ul className="px-5 pb-16">
          {sections.map((s, i) => (
            <li key={s.id} className="border-b border-line">
              <a href={`#${s.id}`} onClick={() => setOpen(false)} className="flex min-h-14 items-baseline gap-4 py-3">
                <span className="eyebrow tabular-nums">{pad2(i + 1)}</span>
                <span className="text-2xl font-semibold tracking-tight">{s.label}</span>
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a href={`mailto:${contact.email}`} className="btn btn-solid w-full">
              Email
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

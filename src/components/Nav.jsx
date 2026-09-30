import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nav, contact, profile } from '../data/content'

export default function Nav() {
  const [active, setActive] = useState('home')
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500 ' +
          (solid ? 'py-3' : 'py-6')
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.04] font-display text-sm font-bold text-white transition-colors group-hover:border-neon-cyan/60">
              MR
              <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100" style={{ boxShadow: '0 0 24px -4px rgba(34,211,238,0.7)' }} />
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight text-white/85 sm:block">
              {profile.name}
            </span>
          </button>

          {/* desktop pill nav */}
          <nav
            className={
              'hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex ' +
              (solid ? 'glass-blur' : 'border border-transparent')
            }
          >
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={
                  'relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ' +
                  (active === n.id ? 'text-white' : 'text-white/50 hover:text-white/85')
                }
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-inset ring-neon-cyan/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={contact.resume}
              download
              className="hidden rounded-full border border-neon-cyan/35 bg-neon-cyan/10 px-4 py-2 text-[13px] font-medium text-white transition-all hover:border-neon-cyan/80 hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.7)] sm:block"
            >
              Résumé ↓
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.04] lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <div className="space-y-1.5">
                <span className={'block h-px w-4 bg-white transition-transform ' + (open ? 'translate-y-[3px] rotate-45' : '')} />
                <span className={'block h-px w-4 bg-white transition-transform ' + (open ? '-translate-y-[3px] -rotate-45' : '')} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink-900/90 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col items-start justify-center gap-2 px-10">
              {nav.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(n.id)}
                  className="font-display text-4xl font-semibold text-white/85 hover:text-neon-cyan"
                >
                  {n.label}
                </motion.button>
              ))}
              <a href={contact.resume} download className="btn-neon mt-8">
                <span>Download résumé</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

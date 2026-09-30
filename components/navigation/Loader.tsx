'use client'

import { useEffect, useState } from 'react'
import { profile } from '@/lib/profile'

/* Short intro: name, "system initializing", then the five domains. ~1.6 s on the
   first visit of a session; skipped on later ones and for reduced motion (the
   inline boot script in layout.tsx adds `skip-intro`, which hides it via CSS
   before first paint). */

const STEP_MS = 260
const HOLD_MS = 420

export function Loader() {
  const [shown, setShown] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('skip-intro')) {
      setGone(true)
      return
    }
    const timers: number[] = []
    profile.keywords.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), 280 + i * STEP_MS))
    })
    const end = 280 + profile.keywords.length * STEP_MS + HOLD_MS
    timers.push(window.setTimeout(() => setLeaving(true), end))
    timers.push(
      window.setTimeout(() => {
        setGone(true)
        try {
          sessionStorage.setItem('mr-intro', '1')
        } catch {
          /* private mode — the intro simply plays again next time */
        }
      }, end + 700),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      className={`loader fixed inset-0 z-[300] grid place-items-center bg-bg transition-opacity duration-700 ease-out ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-[min(86vw,420px)]">
        <p className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">{profile.name.toUpperCase()}</p>
        <p className="eyebrow mb-8 flex items-center gap-2">
          System initializing
          <span className="anim-caret inline-block h-3 w-1.5 bg-accent" />
        </p>
        <div className="mb-6 h-px w-full overflow-hidden bg-line-strong">
          <div
            className="h-full origin-left bg-accent transition-transform ease-out"
            style={{
              transform: `scaleX(${shown / profile.keywords.length})`,
              transitionDuration: `${STEP_MS}ms`,
            }}
          />
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.7rem] tracking-[0.18em]">
          {profile.keywords.map((k, i) => (
            <li key={k} className={`transition-colors duration-300 ${i < shown ? 'text-fg' : 'text-dim'}`}>
              {k.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

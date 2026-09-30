import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content'

const MIN_MS = 600 // don't flash the loader on an instant load
const MAX_MS = 2800 // never hold the page hostage on a slow device

/**
 * Progress creeps toward 90% on a timer, then jumps to 100 and leaves as
 * soon as the window has actually loaded. A hard cap guarantees it always
 * gets out of the way, even if something upstream never fires.
 */
export default function Loader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  const mounted = useRef(Date.now())

  useEffect(() => {
    let creep
    let cap
    let v = 0

    const finish = () => {
      clearInterval(creep)
      setPct(100)
      const waited = Date.now() - mounted.current
      setTimeout(() => setDone(true), Math.max(0, MIN_MS - waited) + 320)
    }

    creep = setInterval(() => {
      v = Math.min(90, v + Math.max(1.5, (90 - v) * 0.12))
      setPct(Math.round(v))
    }, 60)

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    cap = setTimeout(finish, MAX_MS)

    return () => {
      clearInterval(creep)
      clearTimeout(cap)
      window.removeEventListener('load', finish)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] grid place-items-center bg-ink-900"
        >
          <div className="w-[min(78vw,420px)]">
            <div className="mb-5 flex items-end justify-between">
              <span className="font-display text-sm font-medium tracking-tight text-white/80">
                {profile.name}
              </span>
              <span className="font-mono text-xs text-neon-cyan/80">{pct}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink transition-[width] duration-200"
                style={{ width: pct + '%' }}
              />
            </div>
            <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/25">
              Compiling scene…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

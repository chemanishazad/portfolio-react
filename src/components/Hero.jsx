import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile, contact, about } from '../data/content'

const EASE = [0.16, 1, 0.3, 1]

function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [words.length])

  return (
    <span className="relative inline-block h-[1.25em] overflow-hidden align-bottom">
      {/* An invisible in-flow copy gives the box its exact width. Without it
          the box would need a fixed min-width, which either clips the longest
          word or leaves a dead gap after the shortest one. */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {words[i]}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '0.55em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.55em' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink bg-clip-text text-transparent"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const line1 = 'Senior Software'
  const line2 = 'Developer'

  // Animate per letter, but keep whole words unbreakable so long headings
  // never split mid-word on narrow screens.
  const letters = (text, base) => {
    let n = 0
    return text.split(' ').map((word, w) => (
      <span key={w} className="inline-block whitespace-nowrap">
        {word.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 44, rotateX: -55 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: base + n++ * 0.028, duration: 0.85, ease: EASE }}
          >
            {ch}
          </motion.span>
        ))}
        {w < text.split(' ').length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ))
  }

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-32">
        {/* availability chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-lime opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-lime" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            {profile.availability}
          </span>
        </motion.div>

        <h1
          className="font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.03em] text-white sm:text-[10vw] lg:text-[7.4vw]"
          style={{ perspective: '600px' }}
        >
          <span className="block">{letters(line1, 0.3)}</span>
          <span className="block">
            {letters(line2, 0.3 + line1.length * 0.028)}
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
              className="ml-3 inline-block h-3 w-3 rounded-full bg-neon-cyan align-super sm:h-4 sm:w-4"
              style={{ boxShadow: '0 0 32px 4px rgba(34,211,238,0.8)' }}
            />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end"
        >
          <div>
            <p className="font-display text-2xl font-medium leading-snug text-white/90 sm:text-3xl">
              {profile.pitch}
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50 sm:text-base">
              <span className="text-white/75">{profile.headline}</span> based in {profile.location},
              currently at <span className="text-white/75">{profile.company}</span> — working in{' '}
              {/* nowrap keeps the full stop attached to the rotating word, so a
                  line never begins with a stray period */}
              <span className="whitespace-nowrap">
                <RotatingWord words={profile.rotating} />.
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-neon" data-cursor="grow">
                <span>See selected work</span>
                <span aria-hidden>→</span>
              </a>
              <a href={contact.resume} download className="btn-ghost" data-cursor="grow">
                <span>Résumé</span>
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          {/* glass stat panel */}
          <div className="glass rounded-2xl p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="eyebrow">At a glance</span>
              <span className="font-mono text-[11px] text-white/35">{profile.location}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-white">{s.value}</div>
                  <div className="mt-1 text-[12px] leading-tight text-white/45">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            Scroll
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/[0.12]">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-neon-cyan to-transparent"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  )
}

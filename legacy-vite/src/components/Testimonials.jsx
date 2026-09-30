import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import { showTestimonials, testimonials } from '../data/content'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6500)
    return () => clearInterval(t)
  }, [paused])

  const t = testimonials[i]

  // A page carrying "Name Surname" quotes reads as unfinished — worse than
  // having no testimonials at all. The section appears once a real one exists.
  if (!showTestimonials) return null

  return (
    <Section
      id="voices"
      eyebrow="Voices"
      title="What people say."
      lead="Swap these for real LinkedIn recommendations in src/data/content.js — specific quotes carry far more weight than generic praise."
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="glass relative overflow-hidden rounded-3xl p-8 md:p-14"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -left-6 -top-14 select-none font-display text-[16rem] leading-none text-white/[0.035]"
        >
          &ldquo;
        </span>

        <div className="relative min-h-[210px] sm:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-xl font-medium leading-relaxed text-white/85 md:text-3xl md:leading-[1.35]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-white/[0.05] font-display text-sm text-white/70">
                  {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">{t.name}</span>
                  <span className="block text-[12.5px] text-white/45">
                    {t.title} · {t.company}
                  </span>
                </span>
                {t.placeholder && (
                  <span className="ml-auto hidden rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300/80 sm:block">
                    placeholder
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-2.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={'Show quote ' + (idx + 1)}
              className="group relative h-1 w-10 overflow-hidden rounded-full bg-white/[0.12]"
            >
              <span
                className={
                  'absolute inset-0 origin-left rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet transition-transform duration-500 ' +
                  (idx === i ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50')
                }
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}

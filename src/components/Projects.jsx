import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { projects } from '../data/content'
import { stagger, staggerItem } from './Reveal'
import { isTouch } from '../lib/state'

const MAX_VISIBLE_FEATURES = 3

/**
 * Card that tilts toward the pointer and lights a follow spotlight.
 * All pointer work writes straight to the DOM inside one rAF — the old
 * version called setState on every mousemove, re-rendering the whole card
 * (and its feature list) dozens of times a second.
 */
function Card({ p }) {
  const root = useRef(null)
  const glow = useRef(null)
  const frame = useRef(0)
  const next = useRef({ px: 0.5, py: 0.5 })
  const [open, setOpen] = useState(false)

  const paint = useCallback(() => {
    frame.current = 0
    const el = root.current
    if (!el) return
    const { px, py } = next.current
    el.style.transform =
      'perspective(900px) rotateY(' +
      ((px - 0.5) * 8).toFixed(2) +
      'deg) rotateX(' +
      ((0.5 - py) * 8).toFixed(2) +
      'deg) translateY(-5px)'
    if (glow.current) {
      glow.current.style.background =
        'radial-gradient(420px circle at ' +
        (px * 100).toFixed(1) +
        '% ' +
        (py * 100).toFixed(1) +
        '%, ' +
        p.accent +
        '22, transparent 70%)'
    }
  }, [p.accent])

  const onMove = (e) => {
    if (isTouch) return
    const el = root.current
    if (!el) return
    const r = el.getBoundingClientRect()
    next.current = { px: (e.clientX - r.left) / r.width, py: (e.clientY - r.top) / r.height }
    if (!frame.current) frame.current = requestAnimationFrame(paint)
  }

  const onEnter = () => {
    if (root.current) root.current.style.willChange = 'transform'
  }

  const onLeave = () => {
    if (frame.current) {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
    const el = root.current
    if (el) {
      el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)'
      el.style.willChange = 'auto'
    }
    if (glow.current) glow.current.style.background = 'none'
  }

  const features = p.features || []
  const shown = open ? features : features.slice(0, MAX_VISIBLE_FEATURES)
  const hidden = features.length - shown.length

  return (
    <motion.article
      variants={staggerItem}
      ref={root}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      data-cursor="grow"
      className="glass group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-[border-color,box-shadow,transform] duration-300 hover:border-white/20 md:p-8"
    >
      {/* pointer spotlight */}
      <div ref={glow} aria-hidden className="pointer-events-none absolute inset-0" />
      {/* accent edge */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] opacity-60"
        style={{ background: 'linear-gradient(to bottom, ' + p.accent + ', transparent)' }}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {p.title}
            </h3>
            <p
              className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ color: p.accent }}
            >
              {p.subtitle}
            </p>
          </div>
          {p.current && (
            <span className="shrink-0 rounded-full border border-neon-lime/30 bg-neon-lime/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neon-lime/90">
              current
            </span>
          )}
          {p.rnd && (
            <a
              href="#rnd"
              className="shrink-0 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neon-cyan/90 transition-colors hover:border-neon-cyan/70"
            >
              R&amp;D ↓
            </a>
          )}
          {!p.current && p.year && (
            <span className="shrink-0 font-mono text-[11px] text-white/30">{p.year}</span>
          )}
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-white/60">{p.blurb}</p>

        {features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {shown.map((f) => (
              <li key={f} className="flex gap-3 text-[13.5px] leading-relaxed text-white/50">
                <span
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ background: p.accent }}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {features.length > MAX_VISIBLE_FEATURES && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-3 self-start font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-neon-cyan"
          >
            {open ? '— show less' : '+ ' + hidden + ' more'}
          </button>
        )}

        <div className="mt-auto">
          {p.metrics?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.07] pt-5">
              {p.metrics.map((m) => (
                <div key={m.k}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                    {m.k}
                  </div>
                  <div className="mt-0.5 text-sm text-white/75">{m.v}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {p.links?.live && (
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:text-neon-cyan"
                >
                  Live ↗
                </a>
              )}
              {p.links?.repo && (
                <a
                  href={p.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:text-neon-cyan"
                >
                  Code ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Ten systems, one habit."
      lead="Understand the operation, model it properly, then make the interface disappear. Government transport, state schools, traffic policing, CRM, lead marketplaces — and the tooling that generates the boring parts."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-8%' }}
        className="grid items-stretch gap-6 md:grid-cols-2"
      >
        {projects.map((p) => (
          <Card key={p.title} p={p} />
        ))}
      </motion.div>
    </Section>
  )
}

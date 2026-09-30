import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import Reveal, { stagger, staggerItem } from './Reveal'
import { contact, engagement, services } from '../data/content'

function ServiceCard({ s }) {
  return (
    <motion.div
      variants={staggerItem}
      className="glass glass-hover relative overflow-hidden rounded-2xl p-6 md:p-7"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] opacity-60"
        style={{ background: 'linear-gradient(to bottom, ' + s.accent + ', transparent)' }}
      />
      <div className="flex items-center gap-2.5">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: s.accent, boxShadow: '0 0 14px 2px ' + s.accent + '99' }}
        />
        <h3 className="font-display text-lg font-semibold tracking-tight text-white">{s.title}</h3>
      </div>
      <p className="mt-3 text-[15px] leading-snug text-white/70">{s.tagline}</p>
      <ul className="mt-5 space-y-2.5">
        {s.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-[13.5px] leading-relaxed text-white/50">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: s.accent }} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function Engagement() {
  const [active, setActive] = useState(0)
  const e = engagement[active]

  const href = (kind) =>
    kind === 'resume' ? contact.resume : kind === 'work' ? '#projects' : 'mailto:' + contact.email

  return (
    <div className="glass mt-6 overflow-hidden rounded-3xl">
      {/* tabs */}
      <div
        role="tablist"
        aria-label="How to work with me"
        className="flex flex-wrap gap-1 border-b border-white/[0.07] p-2"
      >
        {engagement.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={
              'relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ' +
              (i === active ? 'text-white' : 'text-white/45 hover:text-white/80')
            }
          >
            {i === active && (
              <motion.span
                layoutId="engagement-pill"
                className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-inset ring-neon-cyan/25"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{t.tab}</span>
          </button>
        ))}
      </div>

      <div className="p-7 md:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={e.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-2xl font-display text-xl font-medium leading-snug text-white/90 md:text-2xl">
              {e.lead}
            </p>

            <div className="mt-7">
              <span className="eyebrow">{e.listTitle}</span>
              <ul className="mt-4 space-y-3 md:columns-2 md:gap-x-10 md:space-y-0">
                {e.list.map((item) => (
                  <li key={item} className="flex break-inside-avoid gap-3 text-[14px] leading-relaxed text-white/60 md:mb-3">
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={href(e.cta.kind)}
                className="btn-neon"
                data-cursor="grow"
                {...(e.cta.kind === 'resume' ? { download: true } : {})}
              >
                <span>{e.cta.label}</span>
                <span aria-hidden>{e.cta.kind === 'resume' ? '↓' : '→'}</span>
              </a>
              {e.secondary && (
                <a
                  href={href(e.secondary.kind)}
                  className="btn-ghost"
                  data-cursor="grow"
                  {...(e.secondary.kind === 'resume' ? { download: true } : {})}
                >
                  <span>{e.secondary.label}</span>
                  <span aria-hidden>{e.secondary.kind === 'resume' ? '↓' : '→'}</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <Section id="services" eyebrow={services.eyebrow} title={services.title} lead={services.lead}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-8%' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.items.map((s) => (
          <ServiceCard key={s.title} s={s} />
        ))}
      </motion.div>

      <Reveal delay={0.1}>
        <div className="mt-14">
          <div className="mb-1 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-neon-violet to-transparent" />
            <span className="eyebrow">How to work with me</span>
          </div>
          <Engagement />
        </div>
      </Reveal>
    </Section>
  )
}

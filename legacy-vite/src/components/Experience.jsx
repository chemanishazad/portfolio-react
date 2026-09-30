import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Section from './Section'
import Reveal from './Reveal'
import { experience } from '../data/content'

function Item({ job, i }) {
  return (
    <Reveal delay={i * 0.05} className="relative pl-12 md:pl-20">
      {/* node */}
      <span className="absolute left-[7px] top-3 md:left-[15px]">
        <span
          className={
            'block h-[11px] w-[11px] rounded-full border-2 ' +
            (job.current
              ? 'border-neon-cyan bg-neon-cyan'
              : 'border-white/25 bg-ink-900')
          }
          style={job.current ? { boxShadow: '0 0 20px 3px rgba(34,211,238,0.7)' } : undefined}
        />
      </span>

      <div className="glass glass-hover group rounded-2xl p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
              {job.role}
            </h3>
            <p className="mt-1 text-sm text-neon-cyan/80">{job.company}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              {job.period}
            </p>
            <p className="mt-1 text-[11px] text-white/30">
              {job.duration} · {job.type}
            </p>
          </div>
        </div>

        {job.summary && (
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">{job.summary}</p>
        )}

        {job.highlights?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {job.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-white/45">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neon-violet" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {job.stack?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {job.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-white/55"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  })
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 90,
    damping: 24,
  })

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Logistics, then databases, then everything."
      lead="Creative direction, then logistics, then production database support in 2021 — and from there into mobile, and now full-stack ERP architecture."
    >
      <div ref={ref} className="relative">
        {/* rail */}
        <div className="absolute left-3 top-2 h-full w-px bg-white/[0.08] md:left-5" />
        <motion.div
          style={{ height }}
          className="absolute left-3 top-2 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-pink md:left-5"
        />
        <div className="space-y-6">
          {experience.map((job, i) => (
            <Item key={job.role + job.period} job={job} i={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

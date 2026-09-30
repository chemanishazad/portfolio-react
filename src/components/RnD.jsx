import Section from './Section'
import Reveal from './Reveal'
import { motion } from 'framer-motion'
import { rnd } from '../data/content'
import { stagger, staggerItem } from './Reveal'

function Pipeline({ steps }) {
  return (
    <div className="relative">
      {/* connector — desktop only */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[13px] hidden h-px md:block"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(34,211,238,0.45) 12%, rgba(139,92,246,0.45) 88%, transparent)',
        }}
      />
      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="relative grid gap-8 md:grid-cols-4 md:gap-6"
      >
        {steps.map((s, i) => (
          <motion.li key={s.step} variants={staggerItem} className="relative">
            <div className="flex items-center gap-3 md:block">
              <span className="relative z-10 grid h-[27px] w-[27px] place-items-center rounded-full border border-neon-cyan/40 bg-ink-900 font-mono text-[11px] text-neon-cyan">
                {i + 1}
              </span>
              <h4 className="font-display text-base font-semibold tracking-tight text-white md:mt-4">
                {s.step}
              </h4>
            </div>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/50 md:mt-3">{s.detail}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}

export default function RnD() {
  const f = rnd.flagship

  return (
    <Section id="rnd" eyebrow={rnd.eyebrow} title={rnd.title} lead={rnd.lead}>
      <Reveal>
        <article className="glass relative overflow-hidden rounded-3xl p-7 md:p-10 lg:p-12">
          {/* ambient corner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.16), transparent 66%)' }}
          />

          <header className="relative">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {f.title}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                {f.year} · personal R&amp;D
              </span>
            </div>
            <p className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-neon-cyan/80">
              {f.kicker}
            </p>
            <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-white/65 md:text-lg">
              {f.summary}
            </p>
          </header>

          {/* headline numbers */}
          <div className="relative mt-10 grid grid-cols-2 gap-y-7 border-y border-white/[0.07] py-7 sm:grid-cols-4">
            {f.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold text-white md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 max-w-[14ch] text-[12px] leading-tight text-white/45">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* generation pipeline */}
          <div className="relative mt-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-neon-cyan to-transparent" />
              <span className="eyebrow">The pipeline</span>
            </div>
            <Pipeline steps={f.pipeline} />
          </div>

          {/* engineering decisions */}
          <div className="relative mt-12">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-neon-violet to-transparent" />
              <span className="eyebrow">Decisions worth defending</span>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8%' }}
              className="grid gap-x-10 gap-y-8 md:grid-cols-2"
            >
              {f.decisions.map((d) => (
                <motion.div key={d.title} variants={staggerItem}>
                  <h4 className="font-display text-[15.5px] font-semibold leading-snug text-white">
                    {d.title}
                  </h4>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/50">{d.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* stack */}
          <div className="relative mt-11 border-t border-white/[0.07] pt-7">
            <div className="flex flex-wrap gap-2">
              {f.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10.5px] text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  )
}

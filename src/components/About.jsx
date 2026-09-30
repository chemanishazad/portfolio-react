import Section from './Section'
import Reveal from './Reveal'
import { about, profile } from '../data/content'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>Operations first.<br />Interface last.</>}
    >
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-white/75 md:text-xl">{about.intro}</p>
          </Reveal>
          {about.body.map((t, i) => (
            <Reveal key={i} delay={0.06 + i * 0.05}>
              <p className="leading-relaxed text-white/50">{t}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-9">
              <span className="eyebrow">In practice</span>
              <ul className="mt-4 space-y-3">
                {about.practice.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-white/70">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal delay={0.08}>
            <div className="glass glass-hover rounded-2xl p-6">
              <span className="eyebrow">Currently</span>
              <p className="mt-3 font-display text-xl font-medium text-white">{profile.role}</p>
              <p className="mt-1 text-sm text-white/50">{profile.company}</p>
              <div className="mt-5 h-px w-full bg-white/[0.07]" />
              <p className="mt-5 text-sm leading-relaxed text-white/45">
                Full-stack ERPNext work, plus a React + Node.js ERP for the Tamil Nadu MTC
                transport department.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass glass-hover rounded-2xl p-6">
              <span className="eyebrow">How I work</span>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                {[
                  'Start from the workflow, not the screen.',
                  'Model the data before drawing anything.',
                  'Ship in vertical slices, not layers.',
                  'Leave the codebase easier to change than I found it.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass glass-hover rounded-2xl p-6">
              <span className="eyebrow">Focus areas</span>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                {about.focus.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon-violet" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

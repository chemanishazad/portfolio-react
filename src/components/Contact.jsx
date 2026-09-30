import { useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import { about, contact, profile } from '../data/content'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = 'mailto:' + contact.email
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title={<>Let&rsquo;s build<br />something solid.</>}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.20), transparent 65%)' }}
            />
            <p className="max-w-md text-lg leading-relaxed text-white/70 md:text-xl">
              Open to senior full-stack and Flutter roles, ERP and ERPNext work, and
              operations-heavy product problems. The fastest way to reach me is email.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={'mailto:' + contact.email}
                className="btn-neon max-w-full"
                data-cursor="grow"
              >
                <span className="break-all text-[13px] sm:text-[15px]">{contact.email}</span>
              </a>
              <button onClick={copy} className="btn-ghost" data-cursor="grow">
                <span>{copied ? 'Copied ✓' : 'Copy address'}</span>
              </button>
            </div>

            {contact.phone && (
              <p className="mt-6 font-mono text-sm text-white/45">{contact.phone}</p>
            )}

            <div className="mt-10 h-px w-full bg-white/[0.07]" />
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <div className="eyebrow">Based in</div>
                <div className="mt-1.5 text-sm text-white/70">{profile.location}</div>
              </div>
              <div>
                <div className="eyebrow">Timezone</div>
                <div className="mt-1.5 text-sm text-white/70">IST · UTC+5:30</div>
              </div>
              <div>
                <div className="eyebrow">Reply time</div>
                <div className="mt-1.5 text-sm text-white/70">{contact.responseTime}</div>
              </div>
              <div>
                <div className="eyebrow">Languages</div>
                <div className="mt-1.5 text-sm text-white/70">{about.languages.join(' · ')}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {contact.socials.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i}>
              {s.href ? (
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  data-cursor="grow"
                  className="glass glass-hover group flex items-center justify-between rounded-2xl p-6"
                >
                  <span>
                    <span className="block font-display text-lg font-medium text-white">{s.label}</span>
                    <span className="mt-0.5 block font-mono text-[11.5px] text-white/40">{s.handle}</span>
                  </span>
                  <span className="text-white/30 transition-all group-hover:translate-x-1 group-hover:text-neon-cyan">
                    ↗
                  </span>
                </a>
              ) : (
                <div className="glass flex items-center justify-between rounded-2xl p-6 opacity-55">
                  <span>
                    <span className="block font-display text-lg font-medium text-white">{s.label}</span>
                    <span className="mt-0.5 block font-mono text-[11.5px] text-amber-300/70">{s.handle}</span>
                  </span>
                </div>
              )}
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <a
              href={contact.resume}
              download
              data-cursor="grow"
              className="group flex items-center justify-between rounded-2xl border border-neon-cyan/30 bg-neon-cyan/[0.07] p-6 transition-all hover:border-neon-cyan/70 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.6)]"
            >
              <span>
                <span className="block font-display text-lg font-medium text-white">Résumé</span>
                <span className="mt-0.5 block font-mono text-[11.5px] text-white/45">PDF download</span>
              </span>
              <span className="text-neon-cyan transition-transform group-hover:translate-y-1">↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

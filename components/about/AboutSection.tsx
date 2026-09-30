import { ProfilePortrait } from '@/components/hero/ProfilePortrait'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import type { PortraitAssets } from '@/lib/assets'
import { about, profile } from '@/lib/profile'

export function AboutSection({ portrait }: { portrait: PortraitAssets | null }) {
  return (
    <Section id="about" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-4">
          <ProfilePortrait assets={portrait} variant="about" />
        </Reveal>

        <div className="lg:col-span-8">
          <SectionHead id="about" eyebrow="About" title="Operations first. Data model first. Interface last." />

          <div className="max-w-[62ch] space-y-5 text-lg text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? 'text-fg' : ''}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <ul className="mt-10 space-y-2.5">
              {about.practice.map((p) => (
                <li key={p} className="flex gap-3 text-fg">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: 'Based in', v: profile.location },
                { k: 'Education', v: profile.education },
                { k: 'Company', v: profile.company },
                { k: 'Languages', v: about.languages.join(' · ') },
              ].map((row) => (
                <div key={row.k} className="bg-bg p-5">
                  <dt className="eyebrow mb-1">{row.k}</dt>
                  <dd className="text-fg">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

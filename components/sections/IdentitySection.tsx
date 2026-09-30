import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { identity } from '@/lib/profile'
import { pad2 } from '@/lib/format'

const LINKS: Record<string, string> = {
  enterprise: '#enterprise',
  government: '#government',
  mobile: '#mobile-web',
  leadership: '#leadership',
}

export function IdentitySection() {
  const [lead, ...rest] = identity.statement.split(' of ')

  return (
    <Section id="identity" className="!pt-10 md:!pt-16">
      <Reveal>
        <p className="eyebrow mb-8 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          Professional identity
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 id="identity-title" className="h-section max-w-[24ch] text-balance">
          <span className="text-accent">{lead}</span> of {rest.join(' of ')}
        </h2>
      </Reveal>

      <ul className="mt-16 grid border border-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {identity.pillars.map((pillar, i) => (
          <Reveal as="li" key={pillar.id} delay={i * 90} className="border-b border-line last:border-b-0 sm:border-r sm:even:border-r-0 lg:border-b-0 lg:border-r lg:even:border-r lg:last:border-r-0">
            <a
              href={LINKS[pillar.id]}
              className="group relative flex h-full min-h-[300px] flex-col p-7 transition-colors hover:bg-surface md:p-9"
            >
              <span aria-hidden className="draw absolute left-0 top-0 h-px w-full origin-left bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="eyebrow tabular-nums text-accent">{pad2(i + 1)}</span>
              <h3 className="mt-4 text-2xl font-semibold uppercase tracking-tight">{pillar.title}</h3>
              <ul className="mt-6 space-y-2.5 text-muted">
                {pillar.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-line-strong" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="eyebrow mt-auto pt-8 transition-colors group-hover:text-accent">
                Explore <span aria-hidden>→</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

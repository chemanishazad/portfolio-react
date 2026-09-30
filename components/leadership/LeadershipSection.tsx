import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { pad2 } from '@/lib/format'
import { leadership } from '@/lib/profile'

export function LeadershipSection() {
  return (
    <Section id="leadership" className="border-t border-line">
      <SectionHead
        id="leadership"
        eyebrow="Leadership"
        title="Engineering leadership."
        lede="Leading a team is the same job as building the system: understand the requirement, decide the structure, and see it through to release."
      />

      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {leadership.responsibilities.map((r, i) => (
          <li key={r.title} className="bg-bg">
            <Reveal delay={(i % 4) * 80} className="p-7">
              <p className="eyebrow mb-5 tabular-nums text-accent">{pad2(i + 1)}</p>
              <h3 className="text-lg font-semibold tracking-tight">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

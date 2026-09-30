import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { pad2 } from '@/lib/format'
import { techGroups } from '@/lib/technologies'

/* Technologies by engineering domain. Only things that appear in real projects or
   roles; no proficiency bars or percentages — a list of what is used, not a score. */
export function StackSection() {
  return (
    <Section id="stack" className="border-t border-line">
      <SectionHead
        id="stack"
        eyebrow="Technical stack"
        title="What the work is built with."
        lede="Grouped by the kind of problem each tool solves."
      />

      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {techGroups.map((group, i) => (
          <li key={group.id} className="bg-bg">
            <Reveal delay={(i % 3) * 90} className="p-7 md:p-9">
            <p className="eyebrow mb-4 tabular-nums text-accent">{pad2(i + 1)}</p>
            <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
            <p className="mt-1 text-sm text-dim">{group.blurb}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

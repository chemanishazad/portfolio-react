import { ProjectLink } from '@/components/projects/ProjectLink'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { governmentTiles } from '@/lib/story'

/* Section 28. Calm, structured, no claims about scale or adoption — the tiles are
   who the work was for and what was built, nothing more. */
export function GovernmentSection() {
  return (
    <Section id="government" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead
            id="government"
            eyebrow="Government technology"
            title="Technology at public scale."
            lede="Work for transport corporations, government schools and the police."
            className="!mb-10"
          />
          <Reveal delay={120}>
            <ProjectVisual kind="government" seed="public-sector" className="aspect-[4/3] w-full border border-line" />
          </Reveal>
        </div>

        <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {governmentTiles.map((tile, i) => (
            <li key={tile.id} className="bg-bg">
              <Reveal delay={i * 90} className="p-7 md:p-9">
              <p className="eyebrow mb-4">{tile.note}</p>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{tile.title}</h3>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${tile.title} projects`}>
                {tile.projects.map((id) => (
                  <li key={id}>
                    <ProjectLink id={id} />
                  </li>
                ))}
              </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

import { ProjectMiniCard } from '@/components/projects/ProjectMiniCard'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { pad2 } from '@/lib/format'
import { projects } from '@/lib/projects'
import { flutterLayers } from '@/lib/story'
import { FlutterLayers } from './FlutterLayers'

const mobile = projects.filter((p) => p.platforms.includes('Mobile'))
const web = projects.filter((p) => p.platforms.includes('Web'))

export function MobileWebSection() {
  return (
    <Section id="mobile-web" className="border-t border-line">
      <SectionHead
        id="mobile-web"
        eyebrow="Mobile & web"
        title="Apps people carry, systems people run."
        lede="Flutter applications across education, traffic policing, CRM and public services — and web front-ends over Node.js APIs."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-12 lg:col-span-7">
          {[
            { title: 'Mobile', list: mobile },
            { title: 'Web', list: web },
          ].map((group, g) => (
            <Reveal key={group.title} delay={g * 100}>
              <h3 className="eyebrow mb-4 flex items-center gap-3">
                {group.title}
                <span className="tabular-nums text-dim">{pad2(group.list.length)}</span>
              </h3>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {group.list.map((p) => (
                  <li key={p.id} className="bg-bg">
                    <ProjectMiniCard project={p} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="lg:col-span-5">
          <ProjectVisual kind="mobile" seed="mobile-web" platforms={['Mobile', 'Web']} className="aspect-[4/3] w-full border border-line" />
        </Reveal>
      </div>

      {/* Flutter, Beyond UI */}
      <div className="mt-28 grid items-center gap-12 border-t border-line pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              Flutter specialization
            </p>
            <h3 className="h-section max-w-[14ch]">Flutter, beyond UI.</h3>
            <p className="lede mt-6">
              A Flutter app is more than its widget tree. These are the layers underneath it — the parts that decide
              whether an interface feels right.
            </p>
          </Reveal>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {flutterLayers.map((layer, i) => (
              <Reveal key={layer.id} delay={i * 60} className="grid gap-1 py-4 sm:grid-cols-12 sm:gap-6">
                <dt className="sm:col-span-5">
                  <span className="eyebrow mr-3 tabular-nums text-accent">{pad2(i + 1)}</span>
                  <span className="font-medium">{layer.label}</span>
                  <span className="mt-1 block font-mono text-[0.68rem] tracking-[0.06em] text-dim sm:pl-8">{layer.api}</span>
                </dt>
                <dd className="text-sm text-muted sm:col-span-7">{layer.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <FlutterLayers />
        </div>
      </div>
    </Section>
  )
}

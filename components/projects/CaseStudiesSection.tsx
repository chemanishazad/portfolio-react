'use client'

import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { pad2 } from '@/lib/format'
import { categoryLine, publicView } from '@/lib/projectView'
import { projectById } from '@/lib/projects'
import { useUI } from '@/lib/store'
import { caseStudyIds } from '@/lib/story'
import { ProjectVisual } from './ProjectVisual'

/* Three projects opened up front. MSMS leads: it is the clearest case of
   cross-platform work for government education. Each shows one line of what it
   was and, where the data has it, the result. */
export function CaseStudiesSection() {
  const openProject = useUI((s) => s.openProject)
  const studies = caseStudyIds.map((id) => projectById(id)).filter((p) => p !== undefined).map(publicView)

  return (
    <Section id="case-studies" className="border-t border-line">
      <SectionHead
        id="case-studies"
        eyebrow="Selected case studies"
        title="Three projects, opened up."
        lede="The reasoning behind the work, not just the screens."
      />

      <div className="space-y-px border border-line bg-line">
        {studies.map((p, i) => {
          const line = p.outcome ?? p.solution ?? p.summary
          return (
            <div key={p.id} className="bg-bg">
              <Reveal>
              <article className="grid gap-8 p-6 md:grid-cols-12 md:items-center md:gap-12 md:p-10">
                <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <ProjectVisual kind={p.visual} seed={p.id} platforms={p.platforms} className="aspect-[4/3] w-full border border-line" />
                </div>
                <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <p className="eyebrow mb-4 flex gap-3">
                    <span className="tabular-nums text-accent">{pad2(i + 1)}</span>
                    {categoryLine(p)}
                  </p>
                  <h3 className="h-panel text-balance">{p.name}</h3>
                  <p className="mt-4 max-w-[58ch] text-muted">{line}</p>

                  {p.facts && p.facts.length > 0 && (
                    <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                      {p.facts.map((f) => (
                        <div key={f.label} className="bg-bg p-4">
                          <dd className="text-xl font-semibold tracking-tight text-accent">{f.value}</dd>
                          <dt className="eyebrow mt-1">{f.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}

                  <button
                    type="button"
                    className="btn mt-8"
                    onClick={(e) => openProject(p.id, e.currentTarget.closest('article')!.getBoundingClientRect())}
                  >
                    Read the case study <span aria-hidden>→</span>
                  </button>
                </div>
              </article>
              </Reveal>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

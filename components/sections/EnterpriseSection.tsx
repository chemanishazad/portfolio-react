import { ProjectLink } from '@/components/projects/ProjectLink'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { pad2 } from '@/lib/format'
import { erpContrast, erpPipeline, erpProjectIds } from '@/lib/story'

/* Section 27: what separates an enterprise workflow system from a CRUD app. The
   contrast and pipeline describe the discipline in general terms; the project
   chips are the work, and nothing here claims they all share one architecture. */
export function EnterpriseSection() {
  return (
    <Section id="enterprise" className="border-t border-line">
      <SectionHead
        id="enterprise"
        eyebrow="Enterprise / ERP"
        title="From forms to enterprise systems."
        lede="A form saves a row. An enterprise system decides who may touch it next, what must be true before it moves, and who answers for it afterwards."
      />

      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {[erpContrast.crud, erpContrast.enterprise].map((c, i) => (
          <div key={c.title} className="bg-bg">
            <Reveal delay={i * 100} className="p-7 md:p-10">
            <p className={`eyebrow mb-4 ${i === 1 ? 'text-accent' : ''}`}>{i === 0 ? 'Simple' : 'Enterprise'}</p>
            <h3 className="text-2xl font-semibold tracking-tight">{c.title}</h3>
            <ul className="mt-5 space-y-3 text-muted">
              {c.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className={`mt-3 h-px w-4 shrink-0 ${i === 1 ? 'bg-accent' : 'bg-line-strong'}`} />
                  {p}
                </li>
              ))}
            </ul>
            </Reveal>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Reveal>
          <p className="eyebrow mb-8">The path of one record</p>
        </Reveal>
        <ol className="relative grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[15px] hidden h-px bg-line-strong xl:block"
          />
          <span
            aria-hidden
            className="absolute left-0 top-[15px] hidden h-px w-1/4 bg-accent xl:block [animation:scan_5s_linear_infinite]"
          />
          {erpPipeline.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 70} className="relative">
              <span className="relative z-[1] mb-4 grid h-[31px] w-[31px] place-items-center rounded-full border border-accent bg-bg font-mono text-[0.62rem] tabular-nums text-accent">
                {pad2(i + 1)}
              </span>
              <h3 className="font-semibold tracking-tight">{s.step}</h3>
              <p className="mt-1 text-sm text-muted">{s.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-20">
        <Reveal>
          <p className="eyebrow mb-5">Systems in this family</p>
          <ul className="flex flex-wrap gap-2">
            {erpProjectIds.map((id) => (
              <li key={id}>
                <ProjectLink id={id} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

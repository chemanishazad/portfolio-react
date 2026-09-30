'use client'

import { useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { experience } from '@/lib/experience'
import { formatPeriod, pad2 } from '@/lib/format'

/* Interactive timeline: one entry open at a time, the current role open first.
   Entries with nothing more to say (no highlights) simply stay as they are. */
export function ExperienceSection() {
  const [open, setOpen] = useState<string | null>(experience.find((e) => e.current)?.id ?? null)

  return (
    <Section id="experience">
      <SectionHead
        id="experience"
        eyebrow="Experience"
        title="The path to team lead."
        lede="From logistics and creative direction into engineering — and the operations-side view still shapes how the software gets designed."
      />

      <ol className="relative border-l border-line-strong pl-6 md:pl-0 md:before:absolute md:before:left-[calc(25%-0.5px)] md:before:top-0 md:before:h-full md:before:w-px md:before:bg-line-strong md:before:content-['']">
        {experience.map((job, i) => {
          const expanded = open === job.id
          const expandable = job.highlights.length > 0
          const panelId = `exp-${job.id}`
          return (
            <Reveal as="li" key={job.id} delay={i * 50} className="relative md:grid md:grid-cols-12 md:gap-10">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-9 h-2.5 w-2.5 rounded-full border md:left-[calc(25%-5px)] ${
                  job.current ? 'border-accent bg-accent shadow-[0_0_0_4px_var(--color-accent-soft)]' : 'border-line-strong bg-bg'
                }`}
              />

              <div className="pb-2 pt-8 md:col-span-3 md:pr-6 md:pt-9 md:text-right">
                <p className="eyebrow tabular-nums text-metal">{formatPeriod(job.start, job.end)}</p>
                <p className="eyebrow mt-1 !text-dim">{job.type}</p>
              </div>

              <div className="border-b border-line pb-8 pt-2 md:col-span-9 md:pl-10 md:pt-8">
                {expandable ? (
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : job.id)}
                    className="group flex w-full items-start justify-between gap-6 text-left"
                  >
                    <Heading job={job} index={i + 1} />
                    <span
                      aria-hidden
                      className={`mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-lg transition-all group-hover:border-accent ${
                        expanded ? 'rotate-45 border-accent text-accent' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                ) : (
                  <Heading job={job} index={i + 1} />
                )}

                <p className="mt-3 max-w-[58ch] text-muted">{job.summary}</p>

                {expandable && (
                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-6 space-y-2.5">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-fg">
                            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}

function Heading({ job, index }: { job: (typeof experience)[number]; index: number }) {
  return (
    <div>
      <p className="eyebrow mb-2 tabular-nums text-accent">
        {pad2(index)}
        {job.current && <span className="ml-3 rounded-full border border-accent/50 px-2 py-0.5 text-[0.62rem]">Current</span>}
      </p>
      <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{job.role}</h3>
      <p className="mt-1 text-metal">{job.company}</p>
    </div>
  )
}

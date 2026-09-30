'use client'

import { Reveal } from '@/components/ui/Reveal'
import { pad2 } from '@/lib/format'
import { metaLine, publicView } from '@/lib/projectView'
import { useUI } from '@/lib/store'
import type { Project } from '@/lib/types'
import { ProjectVisual } from './ProjectVisual'

interface ProjectPanelProps {
  project: Project
  index: number
  total: number
  flip: boolean
  /** Label of the universe node currently lighting this project, if any. */
  litBy: string | null
}

/** One large, cinematic project panel. Sparse projects show only what is known. */
export function ProjectPanel({ project: raw, index, total, flip, litBy }: ProjectPanelProps) {
  const openProject = useUI((s) => s.openProject)
  const p = publicView(raw)
  const meta = metaLine(p)
  const who = [p.client, p.domain].filter(Boolean).join(' — ')

  return (
    <article
      id={`project-${p.id}`}
      aria-labelledby={`project-${p.id}-title`}
      className={`group relative scroll-mt-28 border-t py-10 transition-colors duration-500 md:py-16 ${
        litBy ? 'border-accent' : 'border-line'
      }`}
    >
      <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <Reveal className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            data-cursor="view"
            onClick={(e) => openProject(p.id, e.currentTarget.getBoundingClientRect())}
            className="relative block aspect-[4/3] w-full overflow-hidden border border-line text-left transition-colors duration-500 group-hover:border-line-strong md:aspect-[16/11]"
          >
            <ProjectVisual kind={p.visual} seed={p.id} platforms={p.platforms} className="!absolute inset-0" />
            {/* Hover strip: project · category · technology count · view */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-bg/90 to-transparent px-4 pb-3 pt-10 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-metal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="truncate">
                {p.shortName} · {p.category[0]}
                {p.technologies.length > 0 && ` · ${p.technologies.length} tech`}
              </span>
              <span className="text-accent">View →</span>
            </span>
          </button>
        </Reveal>

        <Reveal delay={100} className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
          <p className="eyebrow mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-accent tabular-nums">
              {pad2(index)} / {pad2(total)}
            </span>
            <span className="truncate">{meta}</span>
          </p>

          {litBy && (
            <p className="chip mb-4 !border-accent/50 !text-accent" role="status">
              Lit by {litBy}
            </p>
          )}

          <h3 id={`project-${p.id}-title`} className="h-panel text-balance">
            {p.name}
          </h3>

          {who && <p className="eyebrow mt-3 !text-metal">{who}</p>}

          <p className="mt-5 max-w-[46ch] text-muted">{p.summary}</p>

          {p.technologies.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {p.technologies.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {(p.role || p.contribution.length > 0) && (
            <dl className="mt-6 space-y-3 text-sm">
              {p.role && (
                <div className="flex gap-4">
                  <dt className="eyebrow w-16 shrink-0 pt-0.5">Role</dt>
                  <dd className="text-fg">{p.role}</dd>
                </div>
              )}
              {p.contribution.length > 0 && (
                <div className="flex gap-4">
                  <dt className="eyebrow w-16 shrink-0 pt-0.5">Built</dt>
                  <dd className="text-muted">
                    {p.contribution.map((c) => (
                      <span key={c} className="block">
                        {c}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <button
            type="button"
            className="btn mt-8"
            aria-label={`View case study: ${p.name}`}
            onClick={(e) => openProject(p.id, e.currentTarget.closest('article')!.getBoundingClientRect())}
          >
            View case study <span aria-hidden>→</span>
          </button>
        </Reveal>
      </div>
    </article>
  )
}

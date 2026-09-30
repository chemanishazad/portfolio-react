'use client'

import { Section, SectionHead } from '@/components/ui/Section'
import { categoryLabels, filterOrder, projects } from '@/lib/projects'
import { useUI } from '@/lib/store'
import { universeNodes } from '@/lib/universe'
import { ProjectPanel } from './ProjectPanel'

export function WorkSection() {
  const filter = useUI((s) => s.filter)
  const setFilter = useUI((s) => s.setFilter)
  const focusNode = useUI((s) => s.focusNode)
  const setFocusNode = useUI((s) => s.setFocusNode)

  const visible = projects.filter((p) => filter === 'all' || p.category.includes(filter))
  const node = universeNodes.find((n) => n.id === focusNode) ?? null
  const lit = new Set(node?.projects ?? [])
  const countFor = (f: (typeof filterOrder)[number]) =>
    f === 'all' ? projects.length : projects.filter((p) => p.category.includes(f)).length

  return (
    <Section id="work">
      <SectionHead
        id="work"
        eyebrow="Featured projects"
        title="Real systems, in the order I'd walk you through them."
        lede="A curated sequence — not a ranking. Every panel opens into a case study."
      />

      <div className="sticky top-16 z-30 -mx-5 mb-2 border-b border-line bg-bg/85 px-5 py-3 backdrop-blur-md md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {filterOrder.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`chip min-h-11 cursor-pointer px-4 transition-colors ${
                  filter === f ? '!border-accent !bg-accent-soft !text-accent' : 'hover:border-accent hover:!text-fg'
                }`}
              >
                {f === 'all' ? 'All' : categoryLabels[f]}
                <span className="ml-2 text-dim tabular-nums">{countFor(f)}</span>
              </button>
            ))}
          </div>

          {node && (
            <button
              type="button"
              onClick={() => setFocusNode(null)}
              className="chip ml-auto min-h-11 cursor-pointer !border-accent/50 px-4 !text-accent"
              aria-label={`Stop highlighting ${node.label}`}
            >
              Highlighting {node.label} <span aria-hidden className="ml-2">✕</span>
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" role="status">
        Showing {visible.length} of {projects.length} projects
      </p>

      <div>
        {visible.map((p, i) => (
          <ProjectPanel
            key={p.id}
            project={p}
            index={i + 1}
            total={visible.length}
            flip={i % 2 === 1}
            litBy={node && lit.has(p.id) ? node.label : null}
          />
        ))}
        {visible.length === 0 && <p className="border-t border-line py-16 text-muted">No projects in this category.</p>}
      </div>
    </Section>
  )
}

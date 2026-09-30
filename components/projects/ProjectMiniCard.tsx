'use client'

import { categoryLine, platformLine, publicView } from '@/lib/projectView'
import { useUI } from '@/lib/store'
import type { Project } from '@/lib/types'

/** A compact, clickable project row for grouped lists (mobile, web). */
export function ProjectMiniCard({ project }: { project: Project }) {
  const openProject = useUI((s) => s.openProject)
  const p = publicView(project)

  return (
    <button
      type="button"
      data-cursor="view"
      onClick={(e) => openProject(p.id, e.currentTarget.getBoundingClientRect())}
      className="group flex w-full min-h-[84px] flex-col items-start justify-between gap-3 bg-bg p-5 text-left transition-colors hover:bg-surface"
    >
      <span className="flex w-full items-start justify-between gap-3">
        <span className="font-semibold tracking-tight">{p.name}</span>
        <span aria-hidden className="text-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </span>
      <span className="eyebrow">
        {[p.domain, platformLine(p)].filter(Boolean).join(' · ') || categoryLine(p)}
      </span>
    </button>
  )
}

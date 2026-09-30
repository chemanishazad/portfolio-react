'use client'

import type { ReactNode } from 'react'
import { projectById } from '@/lib/projects'
import { useUI } from '@/lib/store'

/** A chip that opens a project's case study. Renders nothing for an unknown id. */
export function ProjectLink({ id, children, className = '' }: { id: string; children?: ReactNode; className?: string }) {
  const openProject = useUI((s) => s.openProject)
  const project = projectById(id)
  if (!project) return null

  return (
    <button
      type="button"
      data-cursor="view"
      onClick={(e) => openProject(id, e.currentTarget.getBoundingClientRect())}
      aria-label={`Open case study: ${project.name}`}
      className={`chip min-h-11 cursor-pointer px-4 !text-fg transition-colors hover:border-accent hover:!text-accent ${className}`}
    >
      {children ?? project.shortName}
    </button>
  )
}

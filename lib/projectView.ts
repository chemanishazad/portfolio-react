import { categoryLabels } from './projects'
import type { Project } from './types'

/** What the public site may show of a project. A confidential project keeps its
    category and platform but loses client, architecture, integrations, media and
    any detail that could identify the client or expose internals (spec §48). */
export function publicView(p: Project): Project {
  if (!p.confidential) return p
  return {
    ...p,
    name: p.name,
    client: undefined,
    summary: p.summary || 'Confidential client. Details are available on request.',
    architecture: undefined,
    integrations: undefined,
    pipeline: undefined,
    decisions: undefined,
    specs: undefined,
    modules: undefined,
    media: undefined,
  }
}

export const categoryLine = (p: Project) => p.category.map((c) => categoryLabels[c]).join(' · ')

export const platformLine = (p: Project) => p.platforms.join(' + ')

/** Category labels plus any platform they do not already say ("Mobile" is both). */
export const metaLine = (p: Project) => {
  const cats = p.category.map((c) => categoryLabels[c])
  const extra = p.platforms.filter((pl) => !cats.some((c) => c.toLowerCase() === pl.toLowerCase()))
  return [...cats, ...extra].join(' · ')
}

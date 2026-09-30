export type ProjectCategory =
  | 'enterprise'
  | 'erp'
  | 'government'
  | 'mobile'
  | 'web'
  | 'ai'
  | 'product'

export type ProjectKind = 'client-project' | 'product'

/** Which procedural visual a project panel draws. */
export type VisualKind = 'erp' | 'government' | 'mobile' | 'traffic' | 'ai'

export interface Project {
  id: string
  name: string
  /** Short label used in the universe, nav and tight spaces. */
  shortName: string
  kind: ProjectKind
  category: ProjectCategory[]
  client?: string
  domain?: string
  platforms: string[]
  role: string
  technologies: string[]
  summary: string
  contribution: string[]
  modules?: string[]
  challenge?: string
  solution?: string
  architecture?: string
  integrations?: string[]
  outcome?: string
  /** Facts worth showing as a small key/value strip. Only ever real data. */
  facts?: { label: string; value: string }[]
  /** Technical spec rows shown in the case study (backend, database, ...). */
  specs?: { label: string; value: string }[]
  /** Ordered stages of how the system works. */
  pipeline?: { step: string; detail: string }[]
  /** Design decisions worth defending. */
  decisions?: { title: string; body: string }[]
  confidential?: boolean
  featured: boolean
  visual: VisualKind
  media?: {
    images?: string[]
    videos?: string[]
  }
}

export type ProductStatus = 'in-development' | 'beta' | 'live' | 'internal'

export interface Product extends Project {
  kind: 'product'
  tagline?: string
  status?: ProductStatus
  problem?: string
  audience?: string
  features?: string[]
  ownership?: string
  links?: {
    website?: string
    playStore?: string
    appStore?: string
    demo?: string
  }
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  type: string
  /** ISO year-month. */
  start: string
  end: string | 'present'
  summary: string
  highlights: string[]
  stack: string[]
  current?: boolean
}

export interface TechGroup {
  id: string
  title: string
  blurb: string
  items: string[]
}

export interface UniverseNode {
  id: string
  label: string
  blurb: string
  /** Project ids this node lights up. */
  projects: string[]
  /** Other node ids drawn as connected when this one is active. */
  links: string[]
}

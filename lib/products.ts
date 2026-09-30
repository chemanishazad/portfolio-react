import type { Product } from './types'

/* ============================================================================
   PRODUCTS (spec §20) — things built and owned, separate from client work.

   Status: intake not yet filled in. The section stays hidden (and its nav item
   absent) until a product here has a real name. Fill the template in §20.6,
   replace the placeholder below, and the section appears — no component changes.

   Study Place and AI Form Builder move here only after they are confirmed as
   products; until then they stay in projects.ts as client-project.
   ========================================================================== */

export const products: Product[] = [
  {
    id: 'new-product',
    name: 'TBD',
    shortName: 'TBD',
    kind: 'product',
    category: ['product'],
    platforms: [],
    role: 'TBD',
    technologies: [],
    summary: '',
    contribution: [],
    status: 'in-development',
    featured: true,
    visual: 'ai',
  },
]

const isConfirmed = (p: Product) => p.name.trim() !== '' && p.name.trim().toUpperCase() !== 'TBD'

export const confirmedProducts = products.filter(isConfirmed)

export const statusLabels = {
  'in-development': 'In development',
  beta: 'Beta',
  live: 'Live',
  internal: 'Internal',
} as const

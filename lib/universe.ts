import { projects } from './projects'
import type { UniverseNode } from './types'

const ids = (...list: string[]) => list

/* The constellation. `projects` is what a node lights up; `links` is which
   other nodes it draws connections to while active. */
export const universeNodes: UniverseNode[] = [
  {
    id: 'flutter',
    label: 'FLUTTER',
    blurb: 'Cross-platform mobile applications in Flutter and Dart, from requirement to store release.',
    projects: ids('smart-traffic-kavalar', 'msms', 'study-place', 'eco-park', 'rapid-collaborate', 'emarketz-leads', 'insta-crm'),
    links: ['mobile', 'api'],
  },
  {
    id: 'erp',
    label: 'ERP',
    blurb: 'Custom enterprise systems built around roles, workflows, validation and approvals.',
    projects: ids('irt-core-erp', 'mtc-erp', 'tnstc-erp', 'tnstc-cbe', 'madurai-erp', 'tancem', 'erpnext-implementations'),
    links: ['frappe', 'erpnext', 'database', 'government', 'architecture'],
  },
  {
    id: 'frappe',
    label: 'FRAPPE',
    blurb: 'The framework beneath ERPNext — custom doctypes, workflows, server scripts and hooks.',
    projects: ids('irt-core-erp', 'erpnext-implementations'),
    links: ['erp', 'erpnext'],
  },
  {
    id: 'erpnext',
    label: 'ERPNEXT',
    blurb: 'ERPNext customisation: workflows, scheduled jobs, reports and queries over the ERP data model.',
    projects: ids('irt-core-erp', 'erpnext-implementations'),
    links: ['erp', 'frappe'],
  },
  {
    id: 'web',
    label: 'WEB',
    blurb: 'Web front-ends and admin systems — React over Node.js APIs.',
    projects: ids('irt-core-erp', 'mtc-erp', 'msms', 'ai-form-builder'),
    links: ['api', 'products'],
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    blurb: 'Mobile applications across education, policing, CRM and public services.',
    projects: ids('study-place', 'msms', 'eco-park', 'tasmac-mobile', 'smart-traffic-kavalar', 'rapid-collaborate', 'emarketz-leads', 'insta-crm'),
    links: ['flutter', 'government', 'api'],
  },
  {
    id: 'api',
    label: 'API',
    blurb: 'REST services, third-party integrations and payment gateways.',
    projects: ids('mtc-erp', 'msms', 'study-place', 'rapid-collaborate', 'insta-crm', 'ai-form-builder'),
    links: ['web', 'mobile', 'database'],
  },
  {
    id: 'database',
    label: 'DATABASE',
    blurb: 'Relational data modelling and query work in PostgreSQL, MySQL and MariaDB.',
    projects: ids('mtc-erp', 'msms', 'ai-form-builder', 'erpnext-implementations'),
    links: ['api', 'erp'],
  },
  {
    id: 'government',
    label: 'GOVERNMENT',
    blurb: 'Transport, education, police and public-sector systems.',
    projects: projects.filter((p) => p.category.includes('government')).map((p) => p.id),
    links: ['erp', 'mobile'],
  },
  {
    id: 'architecture',
    label: 'ARCHITECTURE',
    blurb: 'Data model first, interface last — structure decided before screens.',
    projects: ids('ai-form-builder'),
    links: ['erp', 'leadership'],
  },
  {
    id: 'leadership',
    label: 'LEADERSHIP',
    blurb: 'Team lead — project development and delivery from requirement to release.',
    projects: [],
    links: ['architecture', 'products'],
  },
  {
    id: 'products',
    label: 'PRODUCTS',
    blurb: 'Things designed, built and owned — not delivered for a single client.',
    // Until a product is confirmed this lights up projects tagged "product".
    projects: projects.filter((p) => p.kind === 'product' || p.category.includes('product')).map((p) => p.id),
    links: ['web', 'leadership'],
  },
]

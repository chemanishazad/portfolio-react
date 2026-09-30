import type { Project, ProjectCategory } from './types'

/* ============================================================================
   PROJECT DATABASE — single source of truth for every project on the site.

   Provenance
   - The 12 projects in presentation order come from the portfolio spec.
   - Facts (features, stacks, roles, outcomes) come from the OLD portfolio's
     content.js wherever it had the project. Nothing has been added to them.
   - Projects with no old data (IRT, TNSTC, TNSTC-CBE, Madurai ERP, TANCEM,
     TASMAC) carry only what the spec states. Empty fields are omitted by the UI,
     never filled in. To add detail, fill the field here — no component changes.

   Open questions, flagged in place below:
   - `erpnext-implementations`: is this the same work as IRT? Kept separate until confirmed.
   - `ai-form-builder`: the old portfolio called it "Form Builder" and described
     no AI. Merged under the spec's name; AI provider / input method still TBD.
   - `msms` outcome percentages are carried over from the old portfolio; they are
     the user's own figures, but worth a re-check against the spec's "no invented
     metrics" rule.
   ========================================================================== */

export const projects: Project[] = [
  /* ---- curated presentation order (not a ranking) ------------------------ */
  {
    id: 'irt-core-erp',
    name: 'IRT — Core Custom ERP',
    shortName: 'IRT',
    kind: 'client-project',
    category: ['enterprise', 'erp'],
    domain: 'Core systems',
    platforms: ['Web'],
    role: 'Team Lead / Software Engineer',
    technologies: ['Frappe', 'ERPNext', 'HRMS'],
    summary:
      'A custom enterprise ERP ecosystem with multiple business workflows and domain-specific modules.',
    contribution: [],
    featured: true,
    visual: 'erp',
  },
  {
    id: 'mtc-erp',
    name: 'MTC ERP',
    shortName: 'MTC ERP',
    kind: 'client-project',
    category: ['enterprise', 'erp', 'government'],
    client: 'Tamil Nadu Metropolitan Transport Corporation',
    domain: 'Transport',
    platforms: ['Web'],
    role: 'Full-stack developer',
    technologies: ['React', 'Node.js', 'SQL'],
    summary:
      'ERP for the Tamil Nadu Metropolitan Transport Corporation — digitising depot and fleet operations for a state transport department.',
    contribution: ['React front-end, Node.js services and the SQL data model'],
    modules: ['Depot and fleet operations workflows', 'Role-based access across departmental users'],
    featured: true,
    visual: 'erp',
  },
  {
    id: 'tnstc-erp',
    name: 'TNSTC ERP',
    shortName: 'TNSTC',
    kind: 'client-project',
    category: ['enterprise', 'erp', 'government'],
    client: 'Tamil Nadu State Transport Corporation',
    domain: 'Transport',
    platforms: [],
    role: '',
    technologies: [],
    summary: 'Enterprise resource planning system for the Tamil Nadu State Transport Corporation.',
    contribution: [],
    featured: true,
    visual: 'erp',
  },
  {
    id: 'tnstc-cbe',
    name: 'TNSTC-CBE',
    shortName: 'TNSTC-CBE',
    kind: 'client-project',
    category: ['enterprise', 'erp', 'government'],
    client: 'TNSTC Coimbatore',
    domain: 'Transport',
    platforms: [],
    role: '',
    technologies: [],
    summary: 'Enterprise ERP for TNSTC Coimbatore, delivered separately from the main TNSTC ERP.',
    contribution: [],
    featured: true,
    visual: 'erp',
  },
  {
    id: 'smart-traffic-kavalar',
    name: 'Smart Traffic Kavalar',
    shortName: 'Smart Traffic',
    kind: 'client-project',
    category: ['government', 'mobile'],
    client: 'Tamil Nadu Police Department',
    domain: 'Traffic policing',
    platforms: ['Mobile'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'Google Maps', 'Real-time', 'Sensors'],
    summary:
      'Field application for traffic police — accident tracking, personnel assignment, VIP routing and sensor-fed vehicle detection.',
    contribution: [],
    modules: [
      'Real-time accident tracking and incident management',
      'Attendance and work assignment for traffic control personnel',
      'VIP route allocation and optimisation',
      'Vehicle detection and classification via sensors and cameras',
    ],
    featured: true,
    visual: 'traffic',
  },
  {
    id: 'msms',
    name: 'MSMS — Model School Management System',
    shortName: 'MSMS',
    kind: 'client-project',
    category: ['government', 'mobile', 'web'],
    client: 'Tamil Nadu Government Schools',
    domain: 'Education',
    platforms: ['Mobile', 'Web'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'MySQL', 'REST APIs'],
    summary:
      'School operations platform with five role-based logins, covering admissions, attendance, hostel life, food services and assets.',
    contribution: [],
    modules: [
      'Five role-based login types with distinct permissions',
      'Attendance tracking',
      'Leave approvals',
      'Asset management',
      'Admissions and class assignment',
      'Food services',
    ],
    outcome:
      'Attendance rates up 15%, leave-approval administrative processing time down 20%, and asset maintenance costs down 10%.',
    facts: [
      { label: 'Logins', value: '5 role types' },
      { label: 'Attendance', value: '+15%' },
      { label: 'Admin time', value: '−20%' },
      { label: 'Asset upkeep', value: '−10%' },
    ],
    featured: true,
    visual: 'mobile',
  },
  {
    id: 'ai-form-builder',
    name: 'AI Form Builder',
    shortName: 'AI Form Builder',
    // Stays a client-project until it is confirmed as an owned product (spec §20.5).
    kind: 'client-project',
    category: ['ai', 'web', 'product'],
    domain: 'Code generation',
    platforms: ['Web'],
    role: 'Sole architect',
    technologies: ['React 19', 'Express 5', 'Drizzle ORM', 'Zod', 'PostgreSQL', 'TypeScript', 'Vite'],
    summary:
      'A visual form designer that emits a complete full-stack CRUD module — schema, validation, API and UI — from one field definition.',
    contribution: ['Sole architect of the generator, the builder UI and the generated runtime'],
    solution:
      'Draw a form, press Save & Generate, and a complete module exists on both sides of the wire — a Postgres table, validation, repository, service, controller and routes on the server; a typed API client, form, list and page on the client — mounted and reachable without touching application code.',
    pipeline: [
      { step: 'Design', detail: 'Fields, layout, theme and list settings composed in the builder UI.' },
      { step: 'Describe', detail: 'Save & Generate posts a typed GenerateConfig to the generator API — the whole module as data.' },
      { step: 'Generate', detail: 'The engine snake_cases field names, renders templates into both projects and regenerates shared CSS.' },
      { step: 'Mount', detail: 'Both _registry.ts files are rewritten, so Express picks up /api/<module> and the router adds /<module>.' },
    ],
    decisions: [
      {
        title: 'Templates are the source of truth, never the output',
        body: 'Generated files carry a do-not-edit banner and are overwritten on every run. Changing output means changing a template, which keeps every module consistent by construction.',
      },
      {
        title: 'Registry rewriting instead of dynamic imports',
        body: 'Both sides read a generated _registry.ts. Mounting stays static and type-checked, so a broken module fails at build time rather than at request time.',
      },
      {
        title: 'Layout fields carry no column',
        body: 'Section breaks, tabs, collapsible sections and static text shape the form without touching the schema, so presentation changes never trigger a migration.',
      },
    ],
    specs: [
      { label: 'Backend', value: 'Express 5' },
      { label: 'Database', value: 'PostgreSQL via Drizzle ORM' },
      { label: 'Validation', value: 'Zod' },
      { label: 'Form schema', value: 'One field definition (GenerateConfig)' },
      { label: 'Generated output', value: 'Table, validation, API and UI — 13 files per module' },
      // TBD — confirm before adding: AI provider, input method, export, authentication.
    ],
    featured: true,
    visual: 'ai',
  },
  {
    id: 'study-place',
    name: 'Study Place',
    shortName: 'Study Place',
    kind: 'client-project',
    category: ['mobile'],
    domain: 'Education',
    platforms: ['Mobile'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'Firebase', 'REST APIs'],
    summary:
      'A study companion built on one rule: never make a student leave the material to take a note.',
    contribution: [],
    modules: [
      'Digital library with folder-based organisation',
      'In-built note-taking while reading books or watching lessons',
      'Question paper access, test writing and submission',
      'Performance evaluation from previous test results',
      'Study-hour and progress tracking reports',
    ],
    featured: true,
    visual: 'mobile',
  },
  {
    id: 'eco-park',
    name: 'ECO Park',
    shortName: 'ECO Park',
    kind: 'client-project',
    category: ['mobile', 'government'],
    domain: 'Public / leisure',
    platforms: ['Mobile'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'Payments', 'Ticketing'],
    summary: 'Visitor app for a public park — entry tickets, park information and event coordination.',
    contribution: [],
    modules: [
      'Entry ticket purchase with payment integration',
      'Park overview, details and features',
      'Event listings and coordination',
    ],
    featured: true,
    visual: 'mobile',
  },
  {
    id: 'tasmac-mobile',
    name: 'TASMAC Mobile App',
    shortName: 'TASMAC',
    kind: 'client-project',
    category: ['government', 'enterprise', 'mobile'],
    client: 'TASMAC',
    platforms: ['Mobile'],
    role: '',
    technologies: [],
    summary: 'Mobile application built for TASMAC.',
    contribution: [],
    featured: true,
    visual: 'mobile',
  },
  {
    id: 'madurai-erp',
    name: 'Madurai ERP',
    shortName: 'Madurai ERP',
    kind: 'client-project',
    category: ['enterprise', 'erp', 'government'],
    domain: 'Regional / Government',
    platforms: [],
    role: '',
    technologies: [],
    summary: 'Enterprise ERP system built for Madurai.',
    contribution: [],
    featured: true,
    visual: 'erp',
  },
  {
    id: 'tancem',
    name: 'TANCEM',
    shortName: 'TANCEM',
    kind: 'client-project',
    category: ['enterprise', 'government'],
    domain: 'Government / Public Sector',
    platforms: [],
    role: '',
    technologies: [],
    summary: 'Enterprise system delivered in the government and public sector.',
    contribution: [],
    featured: true,
    visual: 'government',
  },

  /* ---- from the old portfolio, not in the spec's list -------------------- */
  {
    id: 'rapid-collaborate',
    name: 'Rapid Collaborate',
    shortName: 'Rapid Collaborate',
    kind: 'client-project',
    category: ['mobile'],
    domain: 'Client support',
    platforms: ['Mobile'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'Firebase', 'REST APIs'],
    summary: 'Client-facing project and support platform — projects, queries and a full ticketing system.',
    contribution: ['Designed and implemented 15 new form types'],
    modules: [
      'Project and query management',
      'Support ticket lifecycle handling',
      'Firebase real-time push notifications',
    ],
    featured: false,
    visual: 'mobile',
  },
  {
    id: 'emarketz-leads',
    name: 'Emarketz — Leads Panel',
    shortName: 'Emarketz',
    kind: 'client-project',
    category: ['mobile'],
    domain: 'Sales / leads',
    platforms: ['Mobile'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'Payment gateway', 'OneSignal'],
    summary:
      'Lead marketplace and wallet — sourcing, tagging, gateway payments and a reviewable financial history.',
    contribution: [],
    modules: [
      'Lead acquisition, sourcing and purchase flows',
      'Tag-based lead categorisation',
      'Payment gateway transactions and wallet handling',
      'Payment history review and reconciliation',
      'OneSignal push notification delivery',
    ],
    featured: false,
    visual: 'mobile',
  },
  {
    id: 'insta-crm',
    name: 'Insta CRM — Support App',
    shortName: 'Insta CRM',
    kind: 'client-project',
    category: ['mobile'],
    domain: 'CRM',
    platforms: ['Mobile'],
    role: 'Flutter developer',
    technologies: ['Flutter', 'REST APIs'],
    summary:
      'Support desk in your pocket — a metrics dashboard and reusable email and WhatsApp templates so agents stop retyping replies.',
    contribution: [],
    modules: [
      'Support metrics dashboard',
      'Ten types of query detail views',
      'Email and WhatsApp template builders',
      'Payment detail lookups',
    ],
    featured: false,
    visual: 'mobile',
  },
  {
    // Kept apart from IRT until it is confirmed they are the same work.
    id: 'erpnext-implementations',
    name: 'ERPNext Implementations',
    shortName: 'ERPNext',
    kind: 'client-project',
    category: ['enterprise', 'erp'],
    platforms: [],
    role: 'Full-stack developer',
    technologies: ['ERPNext', 'Frappe', 'Python', 'MariaDB'],
    summary:
      'Custom doctypes, workflows, server scripts and reporting built on ERPNext for live business operations.',
    contribution: [],
    modules: [
      'Custom doctypes and workflow automation',
      'Server scripts, hooks and scheduled jobs',
      'Reporting and query design over the ERP data model',
    ],
    featured: false,
    visual: 'erp',
  },
]

export const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id)

export const categoryLabels: Record<ProjectCategory, string> = {
  enterprise: 'Enterprise',
  erp: 'ERP',
  government: 'Government',
  mobile: 'Mobile',
  web: 'Web',
  ai: 'AI',
  product: 'Product',
}

/** Filter bar order, exactly as the spec lists it. */
export const filterOrder: ('all' | ProjectCategory)[] = [
  'all',
  'enterprise',
  'erp',
  'government',
  'mobile',
  'web',
  'ai',
  'product',
]

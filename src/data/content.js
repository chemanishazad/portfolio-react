/* ============================================================================
   SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
   ----------------------------------------------------------------------------
   Everything on the site reads from this file. Edit here, nowhere else.
   Written to be skimmed: a recruiter reads the first line of each block and
   the numbers. Keep new copy short and specific.
   ========================================================================== */

export const profile = {
  name: 'Manikandan R',
  role: 'Senior Software Developer',
  headline: 'ERP & Full-Stack Engineer',
  // The one line that has to land. Keep it under ~90 characters.
  pitch: 'I build ERP systems and the apps that feed them.',
  location: 'Chennai, India',
  company: 'Vivid Trans Tech Solutions India',
  availability: 'Open to full-time, freelance & retainer work',
  rotating: ['ERPNext', 'React', 'Node.js', 'Flutter', 'PostgreSQL'],
}

/* ------------------------------------------------------ the ten-second scan */
/* This strip sits directly under the hero. It is the block a recruiter
   actually reads. Facts only — no adjectives. */
export const snapshot = [
  { label: 'Role', value: 'Senior Software Developer' },
  { label: 'Experience', value: '5+ years' },
  { label: 'Core stack', value: 'ERPNext · React · Node.js · Flutter · SQL' },
  { label: 'Shipped', value: '10 projects · 4 companies' },
  { label: 'Based in', value: 'Chennai, India · IST (UTC+5:30)' },
  { label: 'Work mode', value: 'On-site · Hybrid · Remote (India & global)' },
  { label: 'Open to', value: 'Full-time · Freelance · Retainer' },
  { label: 'Languages', value: 'Tamil · English · Telugu' },
]

/* ---------------------------------------------------------------- services */
export const services = {
  eyebrow: 'What I do',
  title: 'Four things, done properly.',
  lead: 'Pick the one you need. Every engagement starts with the workflow and the data model, not the screen.',
  items: [
    {
      title: 'ERPNext / Frappe',
      tagline: 'Make ERPNext fit the business instead of the reverse.',
      accent: '#22d3ee',
      points: [
        'Custom doctypes and workflow automation',
        'Server scripts, hooks and scheduled jobs',
        'Reports and query design over the ERP data model',
      ],
    },
    {
      title: 'Flutter apps',
      tagline: 'One codebase, both stores. Seven shipped.',
      accent: '#8b5cf6',
      points: [
        'Design hand-off through to store release',
        'Payments, maps and push notifications',
        'Multi-role auth and offline-friendly data',
      ],
    },
    {
      title: 'React + Node.js systems',
      tagline: 'Admin panels, dashboards and full ERPs.',
      accent: '#f472b6',
      points: [
        'React front-ends over Node/Express APIs',
        'Relational schema design in PostgreSQL and MySQL',
        'Role-based access and operational reporting',
      ],
    },
    {
      title: 'Internal tools & codegen',
      tagline: 'When a pattern repeats, build the thing that generates it.',
      accent: '#a3e635',
      points: [
        'Form builders and module generators',
        'Template-driven code generation',
        'Developer workflow automation',
      ],
    },
  ],
}

/* ------------------------------------------------------- how to engage me */
/* Three audiences, three answers. The tab switcher renders these in order. */
export const engagement = [
  {
    key: 'hiring',
    tab: 'Hiring teams',
    lead: 'You need someone who owns a feature end to end — schema through shipped UI.',
    listTitle: 'What you get',
    list: [
      'Five years across mobile, web and ERP, in that order of depth.',
      'A record of replacing manual processes with measurable results: −20% administrative processing, +15% attendance, −10% asset maintenance cost.',
      'Comfortable in Scrum with release-branch discipline and code review.',
      'Available on-site in Chennai, hybrid, or fully remote.',
    ],
    cta: { label: 'Email me', kind: 'email' },
    secondary: { label: 'Download résumé', kind: 'resume' },
  },
  {
    key: 'freelance',
    tab: 'Freelance project',
    lead: 'Fixed scope, fixed deliverable, written down before anyone starts.',
    listTitle: 'How it works',
    list: [
      'One call to map the workflow and the data behind it.',
      'A written scope with milestones and a delivery date.',
      'Built in slices you can review — not one big reveal at the end.',
      'Handover with documentation and repository access.',
    ],
    cta: { label: 'Describe your project', kind: 'email' },
    secondary: { label: 'See past work', kind: 'work' },
  },
  {
    key: 'retainer',
    tab: 'Retainer / part-time',
    lead: 'Agreed hours each month, alongside my current role.',
    listTitle: 'Good for',
    list: [
      'Keeping a live ERPNext instance healthy and evolving.',
      'Steady incremental feature work on an existing product.',
      'A Flutter app that needs regular releases, not a rebuild.',
      'Hours scheduled around IST, agreed in advance each month.',
    ],
    cta: { label: 'Ask about availability', kind: 'email' },
    secondary: null,
  },
]

/* ------------------------------------------------------------------- about */
export const about = {
  intro:
    'Right now: full-stack ERPNext work plus a React + Node.js ERP for the Tamil Nadu MTC transport department. Before that, seven Flutter applications across education, traffic policing, CRM and field operations.',
  body: [
    'I work operations-first. Before I draw a screen I want to know who touches the process, what they already do in Excel, and where the data actually lives. Most of what I have shipped replaced a paper workflow or a spreadsheet nobody wanted to own.',
    'Data model first, interface last — which is why the numbers moved rather than just the screens.',
  ],
  practice: [
    'One person, whole feature — schema, API, interface, release.',
    'Numbers in the brief, not just in the retrospective.',
    'If a pattern repeats often enough, automate it. See R&D.',
  ],
  stats: [
    { value: '5+', label: 'Years building software' },
    { value: '10', label: 'Projects shipped' },
    { value: '20%', label: 'Admin time removed' },
    { value: '15%', label: 'Attendance lift' },
  ],
  focus: [
    'ERP architecture — ERPNext / Frappe and custom React + Node.js',
    'Cross-platform mobile with Flutter',
    'Relational data modelling and SQL performance',
    'Developer tooling and code generation',
  ],
  languages: ['Tamil', 'English', 'Telugu'],
}

/* ---------------------------------------------------------------- experience */
export const experience = [
  {
    role: 'Senior Software Developer',
    company: 'Vivid Trans Tech Solutions India',
    type: 'Full-time · On-site',
    period: 'Aug 2025 — Present',
    duration: '1 yr 1 mo',
    current: true,
    summary: 'Full-stack ERP architecture: ERPNext customisation and a React + Node.js ERP for a state transport department.',
    highlights: [
      'Building the TN MTC transport ERP — React front-end, Node.js services, SQL data model.',
      'ERPNext / Frappe: custom doctypes, workflows, server scripts, reports.',
      'Own features end to end, from schema design to shipped interface.',
    ],
    stack: ['ERPNext', 'Frappe', 'React', 'Node.js', 'Python', 'SQL'],
  },
  {
    role: 'Flutter Developer',
    company: 'ELK Education Consultants Pvt Ltd',
    type: 'Full-time · On-site',
    period: 'Mar 2024 — Aug 2025',
    duration: '1 yr 6 mos',
    summary: 'Flutter applications for the education sector, delivered sprint to sprint in Scrum.',
    highlights: [
      'Multi-role education platforms with five distinct login types.',
      'REST and third-party API integration, payment gateways, push notifications.',
      'Release-branch discipline across a distributed review culture.',
    ],
    stack: ['Flutter', 'Dart', 'MySQL', 'REST APIs', 'Scrum'],
  },
  {
    role: 'Flutter Developer',
    company: 'Bonton Softwares Pvt. Ltd.',
    type: 'Full-time · On-site',
    period: 'Jan 2022 — Mar 2024',
    duration: '2 yrs 3 mos',
    summary: 'Delivery point for client-facing Flutter apps across CRM, traffic policing and field operations.',
    highlights: [
      'Production Flutter apps from requirement to store release.',
      'Stripe and other payment gateways, Google Maps and Google APIs.',
      'Firebase and OneSignal push notification pipelines.',
      'Turned client requirements directly into technical plans and MVPs.',
    ],
    stack: ['Flutter', 'Dart', 'Firebase', 'MVVM', 'Stripe', 'Google Maps'],
  },
  {
    role: 'Backend Support Executive',
    company: 'Bonton Softwares Pvt. Ltd.',
    type: 'Full-time · On-site',
    period: 'Feb 2021 — Jan 2022',
    duration: '1 yr',
    summary: 'First engineering role: production database support. Where the SQL habits came from.',
    highlights: [
      'Diagnosed and resolved production data issues in MySQL.',
      'Wrote and optimised queries and reports for internal teams.',
    ],
    stack: ['MySQL', 'SQL optimisation'],
  },
  {
    role: 'Logistics Executive',
    company: 'Butterfly Gandhimathi Appliances',
    type: 'Full-time · Hybrid',
    period: 'Feb 2020 — Dec 2020',
    duration: '11 mos',
    summary: 'Operations and logistics coordination — the operations-side view I still design software from.',
    highlights: [],
    stack: ['Operations', 'Coordination'],
  },
  {
    role: 'Creative Director',
    company: 'Maitreya Events',
    type: 'Self-employed',
    period: 'Aug 2017 — Jan 2020',
    duration: '2 yrs 6 mos',
    summary: 'Design direction and strategic creative development for events.',
    highlights: [],
    stack: ['Design direction', 'Creative strategy', 'Branding'],
  },
]

/* -------------------------------------------------------------------- skills */
export const skillGroups = [
  {
    title: 'ERP & Backend',
    accent: '#22d3ee',
    skills: [
      { name: 'ERPNext / Frappe', level: 85 },
      { name: 'Node.js & Express', level: 82 },
      { name: 'MySQL · PostgreSQL', level: 90 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    title: 'Mobile',
    accent: '#8b5cf6',
    skills: [
      { name: 'Flutter', level: 95 },
      { name: 'Dart', level: 92 },
      { name: 'MVVM / MVP architecture', level: 88 },
      { name: 'Store release & versioning', level: 82 },
    ],
  },
  {
    title: 'Web & Integrations',
    accent: '#f472b6',
    skills: [
      { name: 'React', level: 84 },
      { name: 'REST & third-party APIs', level: 90 },
      { name: 'Payment gateways (Stripe)', level: 85 },
      { name: 'Firebase · OneSignal · Google APIs', level: 88 },
    ],
  },
  {
    title: 'Practice',
    accent: '#a3e635',
    skills: [
      { name: 'Requirement analysis', level: 88 },
      { name: 'Git & version control', level: 90 },
      { name: 'Scrum delivery', level: 88 },
      { name: 'CI/CD — Jenkins, GitLab CI', level: 72 },
    ],
  },
]

/* ------------------------------------------------------------------ projects */
/* Optional per project: `company`, `year`, `links: { live, repo }`.
   `current: true` adds a green chip; `rnd: true` adds a link to the R&D section. */
export const projects = [
  {
    title: 'TN MTC Transport ERP',
    subtitle: 'React · Node.js · SQL',
    blurb:
      'ERP for the Tamil Nadu Metropolitan Transport Corporation — digitising depot and fleet operations for a state transport department.',
    features: [
      'React front-end over Node.js APIs and a relational data model',
      'Depot and fleet operations workflows',
      'Role-based access across departmental users',
    ],
    metrics: [
      { k: 'Client', v: 'TN MTC · Govt.' },
      { k: 'Role', v: 'Full-stack developer' },
    ],
    tags: ['React', 'Node.js', 'SQL', 'ERP'],
    accent: '#22d3ee',
    current: true,
  },
  {
    title: 'ERPNext Implementations',
    subtitle: 'Frappe · Python · MariaDB',
    blurb:
      'Custom doctypes, workflows, server scripts and reporting built on ERPNext for live business operations.',
    features: [
      'Custom doctypes and workflow automation',
      'Server scripts, hooks and scheduled jobs',
      'Reporting and query design over the ERP data model',
    ],
    metrics: [
      { k: 'Platform', v: 'ERPNext / Frappe' },
      { k: 'Role', v: 'Full-stack developer' },
    ],
    tags: ['ERPNext', 'Frappe', 'Python', 'SQL'],
    accent: '#8b5cf6',
    current: true,
  },
  {
    title: 'Form Builder — Code Generation Platform',
    subtitle: 'React 19 · Express 5 · Drizzle · PostgreSQL',
    blurb:
      'A visual form designer that emits a complete full-stack CRUD module — schema, validation, API and UI — from one field definition.',
    features: [
      '23 field types across input, selection and layout',
      '13 files generated per module, wired up without a restart',
      'Both route registries rewritten on generate, so modules auto-mount',
      'Drizzle migrations run as part of the generate step',
      'Three independent npm projects sharing one workspace',
    ],
    metrics: [
      { k: 'Scope', v: '~17k lines TS' },
      { k: 'Role', v: 'Sole architect' },
    ],
    tags: ['React 19', 'Express 5', 'Drizzle ORM', 'Zod', 'PostgreSQL', 'Codegen'],
    accent: '#67e8f9',
    rnd: true,
  },
  {
    title: 'MSMS — Model School Management System',
    subtitle: 'Flutter · MySQL · REST',
    blurb:
      'School operations platform with five role-based logins, covering admissions, attendance, hostel life, food services and assets.',
    features: [
      '5 role-based login types with distinct permissions',
      'Attendance tracking — 15% improvement in attendance rates',
      'Leave approvals — 20% less administrative processing time',
      'Asset management — 10% reduction in maintenance costs',
      'Admissions, class assignment and food services modules',
    ],
    metrics: [
      { k: 'Logins', v: '5 role types' },
      { k: 'Impact', v: '+15% attendance' },
    ],
    tags: ['Flutter', 'MySQL', 'Multi-role', 'Reporting'],
    accent: '#f472b6',
  },
  {
    title: 'Study Place',
    subtitle: 'Flutter · Firebase · REST',
    blurb:
      'A study companion built on one rule: never make a student leave the material to take a note.',
    features: [
      'Digital library with folder-based organisation',
      'In-built note-taking while reading books or watching lessons',
      'Question paper access, test writing and submission',
      'Performance evaluation from previous test results',
      'Study-hour and progress tracking reports',
    ],
    metrics: [
      { k: 'Domain', v: 'EdTech' },
      { k: 'Role', v: 'Flutter developer' },
    ],
    tags: ['Flutter', 'Video', 'Offline notes', 'Analytics'],
    accent: '#a3e635',
  },
  {
    title: 'Smart Traffic Kavalar',
    subtitle: 'Flutter · Google Maps · Sensors',
    blurb:
      'Field application for traffic police — accident tracking, personnel assignment, VIP routing and sensor-fed vehicle detection.',
    features: [
      'Real-time accident tracking and incident management',
      'Attendance and work assignment for traffic control personnel',
      'VIP route allocation and optimisation',
      'Vehicle detection and classification via sensors and cameras',
    ],
    metrics: [
      { k: 'Users', v: 'Traffic police' },
      { k: 'Role', v: 'Flutter developer' },
    ],
    tags: ['Flutter', 'Google Maps', 'Real-time', 'Govt.'],
    accent: '#38bdf8',
  },
  {
    title: 'Rapid Collaborate',
    subtitle: 'Flutter · Firebase · REST',
    blurb:
      'Client-facing project and support platform — projects, queries and a full ticketing system.',
    features: [
      '15 new form types designed and implemented',
      'Project and query management',
      'Support ticket lifecycle handling',
      'Firebase real-time push notifications',
    ],
    metrics: [
      { k: 'Forms', v: '15 types built' },
      { k: 'Role', v: 'Flutter developer' },
    ],
    tags: ['Flutter', 'Firebase', 'Ticketing', 'Forms'],
    accent: '#c084fc',
  },
  {
    title: 'Emarketz — Leads Panel',
    subtitle: 'Flutter · Payment gateway · OneSignal',
    blurb:
      'Lead marketplace and wallet — sourcing, tagging, gateway payments and a reviewable financial history.',
    features: [
      'Lead acquisition, sourcing and purchase flows',
      'Tag-based lead categorisation',
      'Payment gateway transactions and wallet handling',
      'Payment history review and reconciliation',
      'OneSignal push notification delivery',
    ],
    metrics: [
      { k: 'Domain', v: 'Sales / leads' },
      { k: 'Role', v: 'Flutter developer' },
    ],
    tags: ['Flutter', 'Payments', 'Wallet', 'OneSignal'],
    accent: '#fb923c',
  },
  {
    title: 'Insta CRM — Support App',
    subtitle: 'Flutter · REST · Templates',
    blurb:
      'Support desk in your pocket — metrics dashboard and reusable email and WhatsApp templates so agents stop retyping replies.',
    features: [
      'Support metrics dashboard',
      '10 types of query detail views',
      'Email and WhatsApp template builders',
      'Payment detail lookups',
    ],
    metrics: [
      { k: 'Queries', v: '10 detail types' },
      { k: 'Role', v: 'Flutter developer' },
    ],
    tags: ['Flutter', 'CRM', 'Templates'],
    accent: '#facc15',
  },
  {
    title: 'ECO Park',
    subtitle: 'Flutter · Payments · Ticketing',
    blurb: 'Visitor app for a public park — entry tickets, park information and event coordination.',
    features: [
      'Entry ticket purchase with payment integration',
      'Park overview, details and features',
      'Event listings and coordination',
    ],
    metrics: [
      { k: 'Domain', v: 'Public / leisure' },
      { k: 'Role', v: 'Flutter developer' },
    ],
    tags: ['Flutter', 'Ticketing', 'Payments'],
    accent: '#34d399',
  },
]

/* ----------------------------------------------------------------------- R&D */
export const rnd = {
  eyebrow: 'Research & development',
  title: 'Build the thing that builds the thing.',
  lead: 'Client work pays once. Tooling pays every time somebody uses it.',
  flagship: {
    title: 'Form Builder',
    kicker: 'A visual designer that generates full-stack CRUD modules',
    year: '2026',
    summary:
      'Draw a form, press Save & Generate, and a complete module exists on both sides of the wire — Postgres table, validation, repository, service, controller and routes on the server; typed API client, form, list and page on the client — mounted and reachable without touching a line of application code.',
    pipeline: [
      { step: 'Design', detail: 'Fields, layout, theme and list settings composed in the builder UI (React 19, port 5174).' },
      { step: 'Describe', detail: 'Save & Generate POSTs a typed GenerateConfig to the generator API — the whole module as data.' },
      { step: 'Generate', detail: 'The engine snake_cases field names, renders templates into both projects and regenerates shared CSS.' },
      { step: 'Mount', detail: 'Both _registry.ts files are rewritten, so Express picks up /api/<module> and the router adds /<module>.' },
    ],
    stats: [
      { value: '23', label: 'Field types supported' },
      { value: '13', label: 'Files generated per module' },
      { value: '3', label: 'npm projects, one workspace' },
      { value: '~17k', label: 'Lines of TypeScript' },
    ],
    decisions: [
      {
        title: 'Templates are the source of truth, never the output',
        body: 'Generated files carry a do-not-edit banner and are overwritten on every run. Changing output means changing a template — which keeps every module consistent by construction.',
      },
      {
        title: 'Registry rewriting instead of dynamic imports',
        body: 'Both sides read a generated _registry.ts. Mounting stays static and type-checked, so a broken module fails at build time rather than at request time.',
      },
      {
        title: 'drizzle-kit generate + migrate, never push',
        body: 'The database also holds hand-managed tables Drizzle does not declare. Push diffs the whole schema and proposes dropping them — and prompts interactively, so it cannot run unattended inside a generate step.',
      },
      {
        title: 'Layout fields carry no column',
        body: 'Section breaks, tabs, collapsible sections and static text shape the form without touching the schema, so presentation changes never trigger a migration.',
      },
    ],
    stack: ['React 19', 'Ant Design 6', 'React Router 7', 'Express 5', 'Drizzle ORM', 'Zod', 'PostgreSQL', 'TypeScript', 'Vite'],
  },
}

/* -------------------------------------------------------------- testimonials */
/* The whole section stays HIDDEN until at least one entry has
   `placeholder` removed — a page with "Name Surname" quotes on it reads as
   unfinished, which is worse than no testimonials at all.
   To switch it on: replace a quote with a real one and delete its
   `placeholder: true` line. */
export const testimonials = [
  {
    quote: 'Paste a real LinkedIn recommendation here, then delete the placeholder flag below.',
    name: 'Name Surname',
    title: 'Engineering Manager',
    company: 'Company',
    placeholder: true,
  },
  {
    quote: 'A line from a manager or client naming a shipped project and its outcome is the strongest version of this section.',
    name: 'Name Surname',
    title: 'Product Owner',
    company: 'Company',
    placeholder: true,
  },
  {
    quote: 'No written recommendations yet? Ask two former colleagues on LinkedIn. It takes them five minutes.',
    name: 'Name Surname',
    title: 'Senior Developer',
    company: 'Company',
    placeholder: true,
  },
]

export const showTestimonials = testimonials.some((t) => !t.placeholder)

/* ------------------------------------------------------------------- contact */
export const contact = {
  email: 'chemanishazad@gmail.com',
  phone: '+91 87781 45196',
  website: 'https://www.chemanishazad.com',
  resume: '/Manikandan-R-Resume.pdf', // drop your PDF into /public with this name
  responseTime: 'Usually within a day', // TODO adjust if you want
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manikandan-r-flutter/', handle: '/in/manikandan-r-flutter' },
    { label: 'GitHub', href: '', handle: 'add your GitHub URL' }, // TODO
    { label: 'Website', href: 'https://www.chemanishazad.com', handle: 'chemanishazad.com' },
    { label: 'Phone', href: 'tel:+918778145196', handle: '+91 87781 45196' },
  ],
}

/* Scrolling tech strip under the hero. */
export const marquee = [
  'ERPNext / Frappe', 'React 19', 'Node.js', 'Express', 'Flutter', 'Dart',
  'PostgreSQL', 'MySQL', 'Drizzle ORM', 'Zod', 'TypeScript', 'Python',
  'Firebase', 'REST APIs', 'Git', 'Scrum',
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'rnd', label: 'R&D' },
  { id: 'experience', label: 'Career' },
  { id: 'skills', label: 'Skills' },
  ...(showTestimonials ? [{ id: 'voices', label: 'Voices' }] : []),
  { id: 'contact', label: 'Contact' },
]

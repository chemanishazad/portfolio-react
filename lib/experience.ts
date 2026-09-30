import type { ExperienceEntry } from './types'

/* Dates and titles come from the old portfolio. Vivid's title is the spec's
   ("Team Lead"); the old site listed "Senior Software Developer" from Aug 2025.
   When the title changed is unknown, so the period is the company tenure. */
export const experience: ExperienceEntry[] = [
  {
    id: 'vivid',
    role: 'Team Lead',
    company: 'Vivid Trans Tech Solutions India',
    type: 'Full-time · On-site',
    start: '2025-08',
    end: 'present',
    current: true,
    summary:
      'Full-stack ERP architecture: ERPNext customisation and a React + Node.js ERP for a state transport department.',
    highlights: [
      'Building the TN MTC transport ERP — React front-end, Node.js services, SQL data model.',
      'ERPNext / Frappe: custom doctypes, workflows, server scripts, reports.',
      'Own features end to end, from schema design to shipped interface.',
    ],
    stack: ['ERPNext', 'Frappe', 'React', 'Node.js', 'Python', 'SQL'],
  },
  {
    id: 'elk',
    role: 'Flutter Developer',
    company: 'ELK Education Consultants Pvt Ltd',
    type: 'Full-time · On-site',
    start: '2024-03',
    end: '2025-08',
    summary: 'Flutter applications for the education sector, delivered sprint to sprint in Scrum.',
    highlights: [
      'Multi-role education platforms with five distinct login types.',
      'REST and third-party API integration, payment gateways, push notifications.',
      'Release-branch discipline across a distributed review culture.',
    ],
    stack: ['Flutter', 'Dart', 'MySQL', 'REST APIs', 'Scrum'],
  },
  {
    id: 'bonton-flutter',
    role: 'Flutter Developer',
    company: 'Bonton Softwares Pvt. Ltd.',
    type: 'Full-time · On-site',
    start: '2022-01',
    end: '2024-03',
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
    id: 'bonton-support',
    role: 'Backend Support Executive',
    company: 'Bonton Softwares Pvt. Ltd.',
    type: 'Full-time · On-site',
    start: '2021-02',
    end: '2022-01',
    summary: 'First engineering role: production database support.',
    highlights: [
      'Diagnosed and resolved production data issues in MySQL.',
      'Wrote and optimised queries and reports for internal teams.',
    ],
    stack: ['MySQL', 'SQL optimisation'],
  },
  {
    id: 'butterfly',
    role: 'Logistics Executive',
    company: 'Butterfly Gandhimathi Appliances',
    type: 'Full-time · Hybrid',
    start: '2020-02',
    end: '2020-12',
    summary: 'Operations and logistics coordination — the operations-side view software is still designed from.',
    highlights: [],
    stack: ['Operations', 'Coordination'],
  },
  {
    id: 'maitreya',
    role: 'Creative Director',
    company: 'Maitreya Events',
    type: 'Self-employed',
    start: '2017-08',
    end: '2020-01',
    summary: 'Design direction and strategic creative development for events.',
    highlights: [],
    stack: ['Design direction', 'Creative strategy', 'Branding'],
  },
]

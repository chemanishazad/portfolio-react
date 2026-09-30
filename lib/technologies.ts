import type { TechGroup } from './types'

/* Only technologies that appear in the old portfolio's projects, roles or
   stack lists. No proficiency levels — the old skill bars are gone on purpose. */
export const techGroups: TechGroup[] = [
  {
    id: 'mobile',
    title: 'Mobile',
    blurb: 'One codebase, both stores.',
    items: ['Flutter', 'Dart', 'Android', 'iOS', 'MVVM / MVP architecture', 'Store release & versioning'],
  },
  {
    id: 'enterprise',
    title: 'Enterprise / ERP',
    blurb: 'Make the platform fit the business.',
    items: ['Frappe', 'ERPNext', 'HRMS', 'Python', 'Custom doctypes', 'Workflow automation', 'Server scripts & hooks', 'Reports'],
  },
  {
    id: 'web',
    title: 'Web',
    blurb: 'Interfaces over real data models.',
    items: ['React', 'TypeScript', 'Vite', 'Ant Design', 'React Router'],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs, validation and integrations.',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'Zod', 'Drizzle ORM'],
  },
  {
    id: 'database',
    title: 'Database',
    blurb: 'Data model first, interface last.',
    items: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQL optimisation'],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    blurb: 'Payments, maps and push.',
    items: ['Stripe', 'Payment gateways', 'Firebase', 'OneSignal', 'Google Maps', 'Google APIs'],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    blurb: 'How the work gets delivered.',
    items: ['Git', 'Scrum', 'Code review', 'Release branches', 'CI/CD — Jenkins, GitLab CI', 'Requirement analysis', 'Code generation'],
  },
]

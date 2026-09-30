import { confirmedProducts } from './products'

/* Identity, about, contact and navigation.
   Headline facts (Team Lead, 7 years) are the portfolio spec's. The old
   portfolio said "Senior Software Developer" and "5+ years"; if the spec's
   figures change, this is the one place to edit. */

export const profile = {
  name: 'Manikandan R',
  roleLines: ['Team Lead', 'Software Engineer'],
  title: 'Team Lead · Software Engineer',
  years: 7,
  company: 'Vivid Trans Tech Solutions India',
  education: 'BCA',
  location: 'Chennai, India',
  pitch: 'Building mobile applications, enterprise platforms and government technology systems.',
  keywords: ['Mobile', 'Enterprise', 'Government', 'ERP', 'Web'],
}

export const identity = {
  statement:
    '7 years of building software across enterprise systems, government technology, mobile applications and custom ERP platforms.',
  pillars: [
    { id: 'enterprise', title: 'Enterprise', items: ['ERP', 'Custom core systems', 'Business workflows', 'Role-based systems'] },
    { id: 'government', title: 'Government', items: ['Transport', 'Education', 'Police', 'Public services'] },
    { id: 'mobile', title: 'Mobile', items: ['Flutter', 'Dart', 'Android', 'Cross-platform applications'] },
    { id: 'leadership', title: 'Leadership', items: ['Team Lead', 'Project development', 'Architecture', 'Delivery'] },
  ],
}

export const about = {
  paragraphs: [
    "I'm Manikandan R, a Team Lead and Software Engineer with 7 years of experience building mobile applications, enterprise systems, government technology platforms and custom ERP solutions.",
    'My work spans Flutter-based mobile products, web applications, enterprise workflows and custom business systems, with experience across transport, education, public-sector and enterprise domains.',
    'I work operations-first. Before I draw a screen I want to know who touches the process, what they already do in Excel, and where the data actually lives. Data model first, interface last.',
  ],
  practice: [
    'One person, whole feature — schema, API, interface, release.',
    'If a pattern repeats often enough, automate it.',
  ],
  languages: ['Tamil', 'English', 'Telugu'],
}

export const contact = {
  email: 'chemanishazad@gmail.com',
  phone: '+91 87781 45196',
  phoneHref: 'tel:+918778145196',
  linkedin: 'https://www.linkedin.com/in/manikandan-r-flutter/',
  github: '', // not provided — the button is not rendered while this is empty
  website: 'https://www.chemanishazad.com',
  resume: '/Manikandan-R-Resume.pdf', // shown only once this file exists in /public
}

/** Three ways to work together, from the old portfolio's engagement tabs. */
export const engagement = [
  {
    id: 'hiring',
    title: 'Hiring teams',
    lead: 'You need someone who owns a feature end to end — schema through shipped UI.',
    points: [
      'Across mobile, web and ERP work.',
      'Comfortable in Scrum with release-branch discipline and code review.',
      'On-site in Chennai, hybrid, or remote.',
    ],
  },
  {
    id: 'freelance',
    title: 'Freelance project',
    lead: 'Fixed scope, fixed deliverable, written down before anyone starts.',
    points: [
      'One call to map the workflow and the data behind it.',
      'Built in slices you can review — not one big reveal at the end.',
      'Handover with documentation and repository access.',
    ],
  },
  {
    id: 'retainer',
    title: 'Retainer / part-time',
    lead: 'Agreed hours each month, alongside the current role.',
    points: [
      'Keeping a live ERPNext instance healthy and evolving.',
      'Steady incremental feature work on an existing product.',
      'A Flutter app that needs regular releases, not a rebuild.',
    ],
  },
]

export const leadership = {
  responsibilities: [
    { title: 'Team leadership', body: 'Leading delivery as Team Lead at Vivid Trans Tech Solutions India.' },
    { title: 'Project development', body: 'Taking work from requirement to a released system.' },
    { title: 'Architecture', body: 'Data model first, interface last — schema and structure before screens.' },
    { title: 'Requirement understanding', body: 'Turning client requirements directly into technical plans and MVPs.' },
    { title: 'Delivery', body: 'Scrum delivery with release-branch discipline, from development to store or production release.' },
    { title: 'Code review', body: 'Review as part of a distributed release process.' },
    { title: 'Integration', body: 'REST and third-party APIs, payment gateways, maps and push notifications.' },
    { title: 'Production support', body: 'Diagnosing and resolving production data issues — where the SQL habits came from.' },
  ],
}

/** Section anchors, in page order. `nav` marks the ones shown in the top bar. */
export const sections = [
  { id: 'hero', label: 'Home', nav: false },
  { id: 'identity', label: 'Identity', nav: false },
  { id: 'universe', label: 'Universe', nav: false },
  { id: 'experience', label: 'Experience', nav: true },
  { id: 'work', label: 'Work', nav: true },
  ...(confirmedProducts.length ? [{ id: 'products', label: 'Products', nav: true }] : []),
  { id: 'enterprise', label: 'Enterprise', nav: false },
  { id: 'government', label: 'Government', nav: false },
  { id: 'mobile-web', label: 'Mobile & Web', nav: false },
  { id: 'stack', label: 'Stack', nav: true },
  { id: 'leadership', label: 'Leadership', nav: false },
  { id: 'case-studies', label: 'Case studies', nav: false },
  { id: 'about', label: 'About', nav: true },
  { id: 'contact', label: 'Contact', nav: true },
]

/** Top-bar order the spec asks for: WORK, PRODUCTS, EXPERIENCE, STACK, ABOUT, CONTACT. */
export const navOrder = ['work', 'products', 'experience', 'stack', 'about', 'contact']

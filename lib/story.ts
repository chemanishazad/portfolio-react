/* Copy for the long-form technical sections. Everything here is either a
   general, accurate description of a technology or a fact from the old
   portfolio — none of it claims usage on a specific project. */

/** Section 27 — the path a record takes through an enterprise system. */
export const erpPipeline = [
  { step: 'User', note: 'Someone who touches the process.' },
  { step: 'Role', note: 'What they may see and do.' },
  { step: 'Workflow', note: 'Who acts next, and in what order.' },
  { step: 'Validation', note: 'Rules a record must satisfy.' },
  { step: 'Business logic', note: 'What the record means to the business.' },
  { step: 'Database', note: 'The data model underneath.' },
  { step: 'Reporting', note: 'The same data, asked a question.' },
  { step: 'Approval', note: 'The decision, on the record.' },
]

export const erpContrast = {
  crud: {
    title: 'A CRUD application',
    points: ['Create, read, update and delete rows.', 'One kind of user.', 'A record is either saved or not.'],
  },
  enterprise: {
    title: 'An enterprise workflow system',
    points: [
      'Records move through states, owned by different roles.',
      'Who may act depends on where the record is.',
      'Every move, and who made it, is kept.',
    ],
  },
}

export const erpProjectIds = ['irt-core-erp', 'mtc-erp', 'tnstc-erp', 'tnstc-cbe', 'madurai-erp', 'tancem']

/** Section 28 — public-sector clients and domains, with the projects under each. */
export const governmentTiles = [
  { id: 'police', title: 'Tamil Nadu Police', note: 'Traffic policing', projects: ['smart-traffic-kavalar'] },
  { id: 'schools', title: 'Tamil Nadu Government Schools', note: 'Education', projects: ['msms'] },
  { id: 'transport', title: 'Transport corporations', note: 'Transport', projects: ['mtc-erp', 'tnstc-erp', 'tnstc-cbe'] },
  { id: 'public', title: 'Public-sector applications', note: 'Public services', projects: ['tancem', 'madurai-erp', 'tasmac-mobile', 'eco-park'] },
]

/** Section 26 — the layers beneath a Flutter widget tree. Descriptions are of the
    technologies themselves, not claims about where they were used. */
export const flutterLayers = [
  {
    id: 'interaction',
    label: 'Custom interaction',
    api: 'GestureDetector · AnimationController',
    note: 'Touch, drag and animation driven directly rather than through stock widgets.',
  },
  {
    id: 'scroll',
    label: 'Scroll & slivers',
    api: 'SliverPersistentHeader',
    note: 'Headers that pin or float inside a CustomScrollView, sized by a delegate.',
  },
  {
    id: 'lifecycle',
    label: 'Widget lifecycle',
    api: 'AutomaticKeepAliveClientMixin',
    note: 'Keeping a State alive inside lazy lists and tab views while it is offscreen.',
  },
  {
    id: 'paint',
    label: 'Rendering performance',
    api: 'RepaintBoundary · shader warm-up',
    note: 'Isolating repaints to a subtree, and compiling shaders before first use so animations do not stutter.',
  },
  {
    id: 'concurrency',
    label: 'Isolates',
    api: 'Isolate.run · compute',
    note: 'Dart concurrency with separate memory — heavy work moved off the UI thread.',
  },
  {
    id: 'delivery',
    label: 'Deferred components',
    api: 'Play Feature Delivery',
    note: 'Loading parts of an Android app at runtime to keep the initial install small.',
  },
]

/** Section 13 — which projects open as the headline case studies. */
export const caseStudyIds = ['msms', 'ai-form-builder', 'smart-traffic-kavalar']

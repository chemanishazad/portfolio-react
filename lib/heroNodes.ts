import { projectById } from './projects'

/** The nodes floating around the hero portrait — the spec's §13 labels, in order. */
export const HERO_IDS = [
  'irt-core-erp',
  'mtc-erp',
  'tnstc-erp',
  'tnstc-cbe',
  'msms',
  'smart-traffic-kavalar',
  'tasmac-mobile',
  'eco-park',
  'ai-form-builder',
]

export const HERO_LABELS = HERO_IDS.map((id) => projectById(id)?.shortName.toUpperCase() ?? id.toUpperCase())

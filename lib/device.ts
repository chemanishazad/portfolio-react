export type QualityTier = 'low' | 'mid' | 'high'

export interface DeviceInfo {
  webgl: boolean
  tier: QualityTier
  reducedMotion: boolean
  coarsePointer: boolean
  /** Upper bound for the canvas device pixel ratio. */
  maxDpr: number
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Reads capabilities once, in the browser. Safe to call only after mount. */
export function detectDevice(): DeviceInfo {
  const params = new URLSearchParams(window.location.search)
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const narrow = window.innerWidth < 768
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4

  let tier: QualityTier = 'high'
  if (narrow || coarsePointer || cores <= 4 || memory <= 4) tier = 'mid'
  if ((narrow && (cores <= 4 || memory <= 2)) || cores <= 2 || memory <= 2) tier = 'low'

  // Test another class of device: ?tier=low | mid | high
  const forced = params.get('tier')
  if (forced === 'low' || forced === 'mid' || forced === 'high') tier = forced

  // Recommended DPR: desktop min(dpr, 2), mobile min(dpr, 1.5).
  const maxDpr = Math.min(window.devicePixelRatio || 1, narrow || coarsePointer ? 1.5 : 2)

  return {
    webgl: params.get('webgl') === 'off' ? false : hasWebGL(),
    tier,
    reducedMotion,
    coarsePointer,
    maxDpr,
  }
}

/** Particle and detail budgets per tier — tune performance here and nowhere else. */
export const budget: Record<QualityTier, { heroParticles: number; universeParticles: number; sphereDetail: number; labels: boolean }> = {
  low: { heroParticles: 260, universeParticles: 140, sphereDetail: 8, labels: false },
  mid: { heroParticles: 620, universeParticles: 320, sphereDetail: 14, labels: true },
  high: { heroParticles: 1400, universeParticles: 700, sphereDetail: 20, labels: true },
}

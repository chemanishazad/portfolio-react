// Module-level, non-reactive state shared between DOM scroll/pointer
// listeners and the r3f render loop. Deliberately outside React so that
// scrolling and mouse movement never trigger a re-render.

export const scrollState = { progress: 0, hero: 0 }
export const pointerState = { x: 0, y: 0 }

const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches

export const isTouch = mq('(hover: none) and (pointer: coarse)')
export const prefersReducedMotion = mq('(prefers-reduced-motion: reduce)')

/**
 * Coarse device tier. Everything expensive in the scene scales off this:
 * particle counts, geometry detail, postprocessing, device pixel ratio.
 */
function detectTier() {
  if (typeof window === 'undefined') return 'mid'

  // Override for testing: append ?tier=low|mid|high to the URL.
  const forced = new URLSearchParams(window.location.search).get('tier')
  if (forced === 'low' || forced === 'mid' || forced === 'high') return forced

  const cores = navigator.hardwareConcurrency || 4
  const mem = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : 8

  if (isTouch || window.innerWidth < 820 || cores <= 2 || mem <= 2) return 'low'
  if (cores <= 4 || mem <= 4) return 'mid'
  return 'high'
}

export const perf = { tier: detectTier() }

/** Scene budgets in one place, so tuning is a single edit. */
export const budget = {
  low: {
    stars: [420, 240, 90],
    sphereSeg: 24,
    icoDetail: 1,
    torusSeg: 40,
    shards: 2,
    post: false,
    bloom: false,
    dpr: 1,
    envRes: 32,
  },
  mid: {
    stars: [800, 460, 170],
    sphereSeg: 40,
    icoDetail: 1,
    torusSeg: 56,
    shards: 3,
    post: true,
    bloom: false,
    dpr: 1.2,
    envRes: 64,
  },
  high: {
    stars: [1150, 640, 240],
    sphereSeg: 48,
    icoDetail: 2,
    torusSeg: 72,
    shards: 4,
    post: true,
    bloom: true,
    dpr: 1.5,
    envRes: 64,
  },
}[perf.tier]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** '2025-08' → 'Aug 2025'. */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[(m ?? 1) - 1]} ${y}`
}

export function formatPeriod(start: string, end: string): string {
  return `${formatMonth(start)} — ${end === 'present' ? 'Present' : formatMonth(end)}`
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

/** Small deterministic hash so a project's procedural visual is stable per id. */
export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Seeded 0…1 generator. */
export function rng(seed: number) {
  let a = seed || 1
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

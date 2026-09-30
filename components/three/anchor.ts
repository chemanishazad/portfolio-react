export interface Anchor {
  cx: number
  cy: number
  halfW: number
  halfH: number
}

/** Where the portrait sits, in world units at z=0, measured from the DOM so the 3D
    portrait and the ring of nodes follow the real layout at every screen size. */
export function measureAnchor(
  size: { width: number; height: number },
  viewport: { width: number; height: number },
): Anchor {
  const el = typeof document !== 'undefined' ? document.querySelector('[data-portrait-anchor]') : null
  if (el) {
    const r = el.getBoundingClientRect()
    if (r.width > 0) {
      return {
        cx: ((r.left + r.width / 2) / size.width - 0.5) * viewport.width,
        cy: -((r.top + r.height / 2) / size.height - 0.5) * viewport.height,
        halfW: (r.width / size.width) * viewport.width * 0.5,
        halfH: (r.height / size.height) * viewport.height * 0.5,
      }
    }
  }
  const wide = viewport.width / viewport.height > 1
  return {
    cx: wide ? viewport.width * 0.2 : 0,
    cy: wide ? 0 : -viewport.height * 0.1,
    halfW: viewport.width * 0.12,
    halfH: viewport.height * 0.3,
  }
}

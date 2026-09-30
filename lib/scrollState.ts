/* Non-reactive scroll/pointer state. The 3D scenes read this every frame; it is
   plain mutable data on purpose — scrolling must never cause a React render. */
export const scrollState = {
  /** Scroll offset in px. */
  y: 0,
  /** Viewport height in px. */
  vh: 0,
  /** 0 → 1 across the pinned hero's scroll distance. */
  hero: 0,
  /** Whole-page progress, 0 → 1. */
  page: 0,
}

/** Pointer in -1…1 on both axes, for gentle parallax. `t` is when it last moved
    (performance.now()), so scenes can drift on their own when nobody is steering. */
export const pointerState = { x: 0, y: 0, t: 0 }

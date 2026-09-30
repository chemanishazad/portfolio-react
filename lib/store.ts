'use client'

import { create } from 'zustand'
import type { DeviceInfo } from './device'
import type { ProjectCategory } from './types'

/* Global state kept deliberately small: only what more than one far-apart
   part of the page needs to agree on. */

export type CursorMode = 'default' | 'view' | 'drag' | 'open' | 'link'

interface UIState {
  device: DeviceInfo | null
  setDevice: (d: DeviceInfo) => void

  /** True once the 3D portrait is drawing, so the flat one can step aside. */
  portraitLive: boolean
  setPortraitLive: (v: boolean) => void

  /** Case study overlay. */
  openProjectId: string | null
  /** Where the card was on screen, so the overlay can unfold from it. */
  openOrigin: { top: number; left: number; width: number; height: number } | null
  openProject: (id: string, origin?: DOMRect | null) => void
  closeProject: () => void
  setOpenProject: (id: string) => void

  /** Work filter. */
  filter: 'all' | ProjectCategory
  setFilter: (f: 'all' | ProjectCategory) => void

  /** A universe node whose projects are highlighted in the work list. */
  focusNode: string | null
  setFocusNode: (id: string | null) => void
}

export const useUI = create<UIState>((set) => ({
  device: null,
  setDevice: (device) => set({ device }),

  portraitLive: false,
  setPortraitLive: (portraitLive) => set({ portraitLive }),

  openProjectId: null,
  openOrigin: null,
  openProject: (id, origin) =>
    set({
      openProjectId: id,
      openOrigin: origin
        ? { top: origin.top, left: origin.left, width: origin.width, height: origin.height }
        : null,
    }),
  closeProject: () => set({ openProjectId: null }),
  setOpenProject: (id) => set({ openProjectId: id, openOrigin: null }),

  filter: 'all',
  setFilter: (filter) => set({ filter }),

  focusNode: null,
  setFocusNode: (focusNode) => set({ focusNode }),
}))

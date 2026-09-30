'use client'

import { Component, type ReactNode } from 'react'

/** If a scene throws (context creation fails, a driver bug), show the static
    alternative — never a broken canvas. */
export class CanvasBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('3D scene unavailable, using the static view.', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

'use client'

import { useEffect } from 'react'
import { detectDevice } from '@/lib/device'
import { useUI } from '@/lib/store'

/** Reads device capability once after mount so 3D can pick a quality tier. */
export function DeviceProbe() {
  const setDevice = useUI((s) => s.setDevice)

  useEffect(() => {
    const device = detectDevice()
    setDevice(device)
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    document.documentElement.classList.toggle('has-cursor', finePointer && !device.reducedMotion)
  }, [setDevice])

  return null
}

'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { budget } from '@/lib/device'
import { HERO_LABELS } from '@/lib/heroNodes'
import { useUI } from '@/lib/store'
import { CanvasBoundary } from '@/components/three/CanvasBoundary'
import { useInView, usePageVisible } from '@/components/three/useInView'
import type { PortraitAssets } from '@/lib/assets'
import { HeroFallback } from './HeroFallback'

// three.js and R3F load only when a capable device asks for the scene.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

export function HeroCanvas({ portrait }: { portrait: PortraitAssets | null }) {
  const device = useUI((s) => s.device)
  const setPortraitLive = useUI((s) => s.setPortraitLive)
  const [ref, inView] = useInView<HTMLDivElement>('0px')
  const pageVisible = usePageVisible()
  const [ready, setReady] = useState(false)
  const labelEls = useRef<(HTMLElement | null)[]>([])
  const showLabels = device ? budget[device.tier].labels : false
  const onPortraitReady = useCallback(() => setPortraitLive(true), [setPortraitLive])
  // If the canvas goes away, the flat portrait must come back.
  useEffect(() => () => setPortraitLive(false), [setPortraitLive])

  return (
    <div ref={ref} className="absolute inset-0 z-0" aria-hidden>
      {device && !device.webgl && <HeroFallback />}
      {device?.webgl && (
        <CanvasBoundary fallback={<HeroFallback />}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <HeroScene
              device={device}
              active={inView && pageVisible}
              onReady={() => setReady(true)}
              labelEls={labelEls}
              portrait={portrait?.cutout ? { cutout: portrait.cutout, depth: portrait.depth } : null}
              onPortraitReady={onPortraitReady}
            />
          </div>
          {showLabels && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {HERO_LABELS.map((label, i) => (
                <span
                  key={label}
                  ref={(el) => {
                    labelEls.current[i] = el
                  }}
                  className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-metal will-change-transform"
                  style={{ opacity: 0 }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </CanvasBoundary>
      )}
    </div>
  )
}

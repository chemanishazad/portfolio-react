'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { PortraitAssets } from '@/lib/assets'
import { profile } from '@/lib/profile'
import { pointerState } from '@/lib/scrollState'
import { useUI } from '@/lib/store'

interface ProfilePortraitProps {
  /** The supplied photo and its derived assets; null until a photo is added. */
  assets: PortraitAssets | null
  /** Hero (large, drives the 3D card) or a framed version for the About section. */
  variant?: 'hero' | 'about'
  priority?: boolean
}

const bracket = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'bottom-0 left-0 border-b border-l',
  'bottom-0 right-0 border-b border-r',
]

/** In the hero this is the layout anchor the 3D portrait is measured from, and the
    stand-in while the scene loads or when WebGL is missing — it cross-fades out the
    moment the 3D card is drawing. It is never a broken image: with no photo (or a
    failed one) it shows a monogram frame. */
export function ProfilePortrait({ assets, variant = 'hero', priority = false }: ProfilePortraitProps) {
  const frame = useRef<HTMLDivElement>(null)
  const live = useUI((s) => s.portraitLive)
  const [failed, setFailed] = useState(false)
  const hero = variant === 'hero'

  const cutout = assets?.cutout ?? null
  const src = cutout ?? assets?.original ?? null
  const showImage = src && !failed
  // Only the hero has a 3D card to hand over to.
  const handedOver = hero && live

  // Flat fallback: a light tilt toward the pointer, only while no 3D card is doing it.
  useEffect(() => {
    if (!hero || live) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    let rx = 0
    let ry = 0
    const tick = () => {
      rx += (-pointerState.y * 5 - rx) * 0.06
      ry += (pointerState.x * 7 - ry) * 0.06
      if (frame.current) frame.current.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      if (frame.current) frame.current.style.transform = ''
    }
  }, [hero, live])

  return (
    <figure
      {...(hero ? { 'data-portrait-anchor': '' } : {})}
      className={`relative mx-auto ${
        hero ? 'w-[min(56vw,250px)] sm:w-[min(42vw,320px)] md:w-full md:max-w-[520px]' : 'w-full max-w-[400px]'
      }`}
    >
      <div ref={frame} className="relative will-change-transform [transform-style:preserve-3d]">
        <div
          className={`relative aspect-[4/5] ${
            hero ? '' : 'overflow-hidden border border-line-strong bg-surface'
          } ${!cutout && showImage ? 'overflow-hidden border border-line-strong bg-surface' : ''}`}
        >
          {/* Soft light behind the figure (the 3D scene draws its own). */}
          <div
            aria-hidden
            className={`absolute -inset-x-[12%] bottom-[6%] top-[6%] rounded-full bg-[radial-gradient(closest-side,rgb(92_200_255/0.2),transparent)] transition-opacity duration-1000 ${
              handedOver ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {showImage ? (
            <Image
              src={src}
              alt={`Portrait of ${profile.name}`}
              fill
              priority={priority}
              sizes={hero ? '(min-width: 768px) 520px, 56vw' : '400px'}
              className={`object-cover object-top transition-opacity duration-1000 ${
                cutout ? '[mask-image:linear-gradient(to_bottom,black_76%,transparent)]' : ''
              } ${handedOver ? 'opacity-0' : 'opacity-100'}`}
              onError={() => setFailed(true)}
            />
          ) : (
            <div aria-hidden className="grid-bg absolute inset-0 grid place-items-center">
              <span className="select-none text-[6rem] font-semibold tracking-tighter text-line-strong md:text-[9rem]">
                MR
              </span>
            </div>
          )}

          <figcaption className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between px-1 pb-1">
            <span className="eyebrow !text-fg">{profile.name}</span>
            <span className="eyebrow">{profile.years} yrs</span>
          </figcaption>
        </div>

        {/* Corner brackets, pushed off the plane a little for depth. */}
        {bracket.map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute h-5 w-5 border-accent ${pos} -m-2`}
            style={{ transform: 'translateZ(24px)' }}
          />
        ))}
      </div>
    </figure>
  )
}

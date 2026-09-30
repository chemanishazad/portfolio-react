'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { hashString, rng } from '@/lib/format'
import type { VisualKind } from '@/lib/types'

/* Procedural, decorative project illustrations — SVG and CSS only, so sixteen
   panels cost no WebGL contexts. Each kind has its own language (spec §21):
   ERP: grid, panels, workflow lines · government: contours, network, institutional
   geometry · mobile: floating device frames · traffic: roads and moving flow ·
   AI: schema → generator → form. A seed (the project id) varies the layout so two
   ERPs never look identical. They carry no text: nothing here can be mistaken
   for a real screenshot or a real number. */

interface ProjectVisualProps {
  kind: VisualKind
  seed: string
  platforms?: string[]
  className?: string
}

const panel = 'fill-surface-2 stroke-line-strong'
const hair = 'stroke-line-strong'

function Frame({ children }: { children: ReactNode }) {
  // Unique per instance: sixteen SVGs on one page must not share <defs> ids.
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
      <defs>
        <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="stroke-line" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="var(--color-surface)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-surface)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-grid)`} opacity="0.7" />
      {children}
      <rect width="400" height="300" fill={`url(#${uid}-fade)`} />
    </svg>
  )
}

/* ---------------------------------------------------------------- ERP */
function Erp({ seed }: { seed: string }) {
  const r = rng(hashString(seed))
  const cols = [28, 150, 272]
  const rows = [30, 116, 202]
  const W = 100
  const H = 66
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }
  const chosen = cells.slice(0, 6).sort((a, b) => a - b)
  const panels = chosen.map((c) => ({ x: cols[c % 3], y: rows[Math.floor(c / 3)] }))
  const paths = panels.slice(1).map((p, i) => {
    const a = panels[i]
    if (a.y === p.y) return `M${a.x + W} ${a.y + H / 2} H${p.x}`
    const ax = a.x + W / 2
    const ay = a.y + H
    const bx = p.x + W / 2
    const my = (ay + p.y) / 2
    return `M${ax} ${ay} V${my} H${bx} V${p.y}`
  })

  return (
    <Frame>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} className={hair} strokeWidth="1.5" />
          <path d={d} className="anim-flow stroke-accent" strokeWidth="1.5" strokeDasharray="6 18" strokeLinecap="round" />
        </g>
      ))}
      {panels.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={W} height={H} rx="4" className={panel} />
          <rect x={p.x} y={p.y} width={W} height="14" rx="4" className="fill-line" />
          <circle cx={p.x + 9} cy={p.y + 7} r="2" className="anim-pulse fill-accent" style={{ animationDelay: `${i * 380}ms` }} />
          <rect x={p.x + 10} y={p.y + 24} width={W - 38} height="4" rx="2" className="fill-line-strong" />
          <rect x={p.x + 10} y={p.y + 35} width={W - 20} height="4" rx="2" className="fill-line" />
          <rect x={p.x + 10} y={p.y + 46} width={(W - 20) * (0.35 + ((i * 37) % 50) / 100)} height="4" rx="2" className="fill-line" />
        </g>
      ))}
    </Frame>
  )
}

/* --------------------------------------------------------- government */
function Government({ seed }: { seed: string }) {
  const r = rng(hashString(seed))
  const contours = Array.from({ length: 6 }, (_, k) => {
    const y = 40 + k * 42
    return `M-10 ${y + r() * 20} C 90 ${y - 30 + r() * 50}, 230 ${y + 30 - r() * 50}, 410 ${y - 10 + r() * 30}`
  })
  const nodes = Array.from({ length: 8 }, () => ({ x: 24 + r() * 210, y: 30 + r() * 220 }))

  return (
    <Frame>
      {contours.map((d, i) => (
        <path key={i} d={d} className="stroke-line-strong" strokeWidth="1" opacity={0.35 + (i % 3) * 0.15} />
      ))}
      {nodes.map((n, i) => {
        const m = nodes[(i + 3) % nodes.length]
        return (
          <g key={i}>
            <line x1={n.x} y1={n.y} x2={nodes[(i + 1) % nodes.length].x} y2={nodes[(i + 1) % nodes.length].y} className="stroke-accent" strokeOpacity="0.25" />
            <line x1={n.x} y1={n.y} x2={m.x} y2={m.y} className="stroke-accent" strokeOpacity="0.12" />
          </g>
        )
      })}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 4 : 2.6} className="anim-pulse fill-accent" style={{ animationDelay: `${i * 420}ms` }} />
      ))}
      {/* Institutional geometry */}
      <g className="stroke-metal" strokeWidth="1.25" opacity="0.75">
        <path d="M252 190 L312 152 L372 190 Z" />
        <rect x="252" y="190" width="120" height="9" />
        {[264, 288, 312, 336, 360].map((x) => (
          <line key={x} x1={x} y1="199" x2={x} y2="246" />
        ))}
        <rect x="246" y="246" width="132" height="8" />
      </g>
    </Frame>
  )
}

/* ------------------------------------------------------------- mobile */
function Phone({ x, y, scale = 1, variant, delay = 0 }: { x: number; y: number; scale?: number; variant: 0 | 1; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="anim-float" style={{ animationDelay: `${delay}ms` }}>
        <rect width="104" height="208" rx="18" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
        <rect x="38" y="7" width="28" height="5" rx="2.5" className="fill-line-strong" />
        {variant === 0 ? (
          <>
            <rect x="10" y="24" width="60" height="6" rx="3" className="fill-line-strong" />
            <rect x="10" y="38" width="84" height="56" rx="8" className="fill-accent-soft stroke-accent" strokeOpacity="0.5" />
            <g className="anim-drift">
              <rect x="10" y="104" width="84" height="22" rx="6" className="fill-line" />
              <rect x="10" y="132" width="84" height="22" rx="6" className="fill-line" />
            </g>
            <rect x="10" y="160" width="84" height="22" rx="6" className="fill-line" />
            <rect x="10" y="192" width="84" height="6" rx="3" className="fill-line-strong" />
          </>
        ) : (
          <>
            <rect x="10" y="24" width="44" height="6" rx="3" className="fill-line-strong" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={12 + i * 17} y={110 - [30, 52, 38, 70, 46][i]} width="10" height={[30, 52, 38, 70, 46][i]} rx="2" className={i === 3 ? 'fill-accent' : 'fill-line-strong'} />
            ))}
            <rect x="10" y="124" width="84" height="8" rx="4" className="fill-line" />
            <rect x="10" y="140" width="60" height="8" rx="4" className="fill-line" />
            <rect x="10" y="156" width="72" height="8" rx="4" className="fill-line" />
          </>
        )}
      </g>
    </g>
  )
}

function Mobile({ platforms }: { platforms: string[] }) {
  const web = platforms.includes('Web')
  return (
    <Frame>
      {web && (
        <g opacity="0.9">
          <rect x="28" y="52" width="250" height="168" rx="8" className={panel} />
          <line x1="28" y1="72" x2="278" y2="72" className={hair} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={42 + i * 12} cy="62" r="2.5" className="fill-line-strong" />
          ))}
          <rect x="28" y="72" width="54" height="148" className="fill-line" opacity="0.6" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="96" y={88 + i * 26} width={150 - (i % 3) * 26} height="8" rx="4" className="fill-line-strong" />
          ))}
        </g>
      )}
      <Phone x={web ? 214 : 96} y={web ? 44 : 38} variant={0} />
      <Phone x={web ? 300 : 222} y={web ? 84 : 62} scale={0.82} variant={1} delay={900} />
    </Frame>
  )
}

/* ------------------------------------------------------------ traffic */
const ROADS = [
  'M-10 210 C 90 190, 140 130, 230 140 S 350 90, 410 60',
  'M70 -10 C 90 70, 170 110, 190 170 S 260 260, 300 310',
  'M-10 90 C 80 100, 160 70, 250 120 S 360 200, 410 190',
]

function Traffic() {
  const dots = [
    { road: 0, dur: '7s', begin: '0s' },
    { road: 0, dur: '9s', begin: '-4s' },
    { road: 1, dur: '8s', begin: '-2s' },
    { road: 2, dur: '10s', begin: '-6s' },
    { road: 2, dur: '7s', begin: '-1s' },
  ]
  return (
    <Frame>
      {ROADS.map((d, i) => (
        <g key={i}>
          <path d={d} className="stroke-line-strong" strokeWidth="14" opacity="0.5" strokeLinecap="round" />
          <path d={d} className="stroke-surface-2" strokeWidth="12" strokeLinecap="round" />
          <path d={d} className="stroke-line-strong" strokeWidth="1" strokeDasharray="6 8" />
        </g>
      ))}
      {dots.map((dot, i) => (
        <circle key={i} r="3" className="fill-accent">
          <animateMotion dur={dot.dur} begin={dot.begin} repeatCount="indefinite" path={ROADS[dot.road]} />
        </circle>
      ))}
      {[
        { x: 206, y: 146 },
        { x: 170, y: 128 },
        { x: 86, y: 200 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r="9" className="anim-pulse stroke-accent" strokeWidth="1" style={{ animationDelay: `${i * 700}ms` }} />
          <circle r="3.5" className="fill-accent" />
        </g>
      ))}
    </Frame>
  )
}

/* ----------------------------------------------------------------- AI */
function Ai() {
  return (
    <Frame>
      {/* Schema */}
      <g>
        <rect x="26" y="52" width="108" height="124" rx="6" className={panel} />
        <rect x="26" y="52" width="108" height="18" rx="6" className="fill-line" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="36" y={82 + i * 22} width="44" height="6" rx="3" className="fill-line-strong" />
            <rect x="92" y={82 + i * 22} width="32" height="6" rx="3" className={i === 1 ? 'fill-accent' : 'fill-line'} opacity={i === 1 ? 0.8 : 1} />
          </g>
        ))}
        {/* JSON */}
        <text x="26" y="206" className="fill-dim" fontSize="15" fontFamily="var(--font-mono), monospace">{'{'}</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="42" y={199 + i * 13} width={[52, 70, 38][i]} height="4" rx="2" className="fill-line-strong" />
        ))}
        <rect x="42" y="238" width="6" height="10" className="anim-caret fill-accent" />
        <text x="26" y="258" className="fill-dim" fontSize="15" fontFamily="var(--font-mono), monospace">{'}'}</text>
      </g>

      {/* Generator */}
      <path d="M134 110 H176" className={hair} strokeWidth="1.5" />
      <path d="M134 110 H176" className="anim-flow stroke-accent" strokeWidth="1.5" strokeDasharray="6 18" strokeLinecap="round" />
      <path d="M224 110 H266" className={hair} strokeWidth="1.5" />
      <path d="M224 110 H266" className="anim-flow stroke-accent" strokeWidth="1.5" strokeDasharray="6 18" strokeLinecap="round" />
      <g transform="translate(200 110)">
        <rect x="-24" y="-24" width="48" height="48" rx="10" className="fill-accent-soft stroke-accent" strokeOpacity="0.6" />
        <path d="M-7 -9 L-15 0 L-7 9 M7 -9 L15 0 L7 9" className="stroke-accent" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Generated form */}
      <g>
        <rect x="266" y="44" width="110" height="170" rx="6" className={panel} />
        <rect x="278" y="58" width="50" height="6" rx="3" className="fill-line-strong" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="278" y={76 + i * 38} width="34" height="4" rx="2" className="fill-line" />
            <rect x="278" y={86 + i * 38} width="86" height="16" rx="4" className="fill-surface stroke-line-strong" />
          </g>
        ))}
        <rect x="278" y="192" width="44" height="14" rx="7" className="fill-accent" opacity="0.85" />
      </g>
      {/* Schema rows feed form fields */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M134 ${85 + i * 22} C 190 ${85 + i * 22}, 210 ${94 + i * 38}, 266 ${94 + i * 38}`} className="stroke-accent" strokeOpacity="0.18" />
      ))}
    </Frame>
  )
}

export function ProjectVisual({ kind, seed, platforms = [], className = '' }: ProjectVisualProps) {
  const wrap = useRef<HTMLDivElement>(null)

  // Animate only while on screen, and never when the visitor prefers reduced motion.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const svg = el.querySelector('svg') as SVGSVGElement | null
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      svg?.pauseAnimations?.()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.active = String(entry.isIntersecting)
        if (entry.isIntersecting) svg?.unpauseAnimations?.()
        else svg?.pauseAnimations?.()
      },
      { rootMargin: '120px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} data-active="false" aria-hidden="true" className={`relative overflow-hidden bg-surface ${className}`}>
      {kind === 'erp' && <Erp seed={seed} />}
      {kind === 'government' && <Government seed={seed} />}
      {kind === 'mobile' && <Mobile platforms={platforms} />}
      {kind === 'traffic' && <Traffic />}
      {kind === 'ai' && <Ai />}
    </div>
  )
}

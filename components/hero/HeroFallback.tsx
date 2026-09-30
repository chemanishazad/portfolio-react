import { projectById } from '@/lib/projects'

/* Static stand-in for the hero's 3D environment: same nodes, same labels, no WebGL.
   Positions are percentages so it scales with the hero. */

const NODES: { id: string; x: number; y: number }[] = [
  { id: 'irt-core-erp', x: 66, y: 10 },
  { id: 'mtc-erp', x: 82, y: 9 },
  { id: 'tnstc-erp', x: 58, y: 24 },
  { id: 'tnstc-cbe', x: 53, y: 39 },
  { id: 'smart-traffic-kavalar', x: 55, y: 55 },
  { id: 'tasmac-mobile', x: 58, y: 71 },
  { id: 'msms', x: 64, y: 91 },
  { id: 'eco-park', x: 79, y: 92 },
  { id: 'ai-form-builder', x: 50, y: 82 },
]

const EDGES = NODES.map((_, i) => [i, (i + 1) % NODES.length] as const)

export function HeroFallback() {
  return (
    <div className="absolute inset-0 hidden md:block" aria-hidden>
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_72%_50%,black,transparent)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--color-accent)"
            strokeOpacity="0.22"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {NODES.map((n) => (
        <div
          key={n.id}
          className="absolute flex items-center gap-2"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-4px, -50%)' }}
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-metal">
            {(projectById(n.id)?.shortName ?? n.id).toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  )
}

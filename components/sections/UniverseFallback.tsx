import { universeNodes } from '@/lib/universe'

/* The constellation without WebGL: the same twelve nodes on a flat ring. Nodes are
   real buttons, so this view is fully usable on its own. */

const pos = (i: number) => {
  const a = (i / universeNodes.length) * Math.PI * 2 - Math.PI / 2
  return { x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 34 }
}

export function UniverseFallback({ active, onSelect }: { active: string | null; onSelect: (id: string) => void }) {
  const node = universeNodes.find((n) => n.id === active)

  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {universeNodes.map((n, i) => {
          const p = pos(i)
          const lit = n.id === active || node?.links.includes(n.id)
          return (
            <line
              key={n.id}
              x1={50}
              y1={50}
              x2={p.x}
              y2={p.y}
              stroke={lit ? 'var(--color-accent)' : 'var(--color-line-strong)'}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-accent-soft px-4 py-2 font-mono text-[0.68rem] tracking-[0.2em]"
        aria-hidden
      >
        MANIKANDAN R
      </div>
      {universeNodes.map((n, i) => {
        const p = pos(i)
        const chosen = n.id === active
        const lit = chosen || node?.links.includes(n.id)
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(n.id)}
            aria-pressed={chosen}
            className={`absolute min-h-11 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 font-mono text-[0.62rem] tracking-[0.14em] transition-colors ${
              chosen
                ? 'border-accent bg-accent-soft text-accent'
                : lit
                  ? 'border-accent/60 text-accent'
                  : 'border-line-strong bg-bg text-metal hover:border-accent'
            }`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {n.label}
          </button>
        )
      })}
    </div>
  )
}

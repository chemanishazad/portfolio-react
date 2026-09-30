'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CanvasBoundary } from '@/components/three/CanvasBoundary'
import type { UniverseLabels } from '@/components/three/UniverseScene'
import { useInView, usePageVisible } from '@/components/three/useInView'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { projectById } from '@/lib/projects'
import { useUI } from '@/lib/store'
import { universeNodes } from '@/lib/universe'
import { UniverseFallback } from './UniverseFallback'

const UniverseScene = dynamic(() => import('@/components/three/UniverseScene'), { ssr: false })

export function UniverseSection() {
  const device = useUI((s) => s.device)
  const focusNode = useUI((s) => s.focusNode)
  const setFocusNode = useUI((s) => s.setFocusNode)
  const openProject = useUI((s) => s.openProject)

  const [ref, inView] = useInView<HTMLDivElement>('300px')
  const pageVisible = usePageVisible()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  const nodeEls = useRef<(HTMLElement | null)[]>([])
  const centerEl = useRef<HTMLElement | null>(null)
  const labels = useRef<UniverseLabels>({ nodes: nodeEls, center: centerEl }).current

  const choose = useCallback((id: string) => setFocusNode(id), [setFocusNode])
  const node = universeNodes.find((n) => n.id === focusNode) ?? null
  const related = node ? node.projects.map((id) => projectById(id)).filter(Boolean) : []
  const webgl = device?.webgl

  return (
    <Section id="universe">
      <SectionHead
        id="universe"
        eyebrow="Engineering universe"
        title="Every project is a node in one system."
        lede="Hover or tap a node. What it connects to lights up, and the projects behind it appear."
      />

      <div className="grid gap-8 lg:grid-cols-12 [&>*]:min-w-0">
        <Reveal className="lg:col-span-8">
          <div
            ref={ref}
            role="group"
            aria-label="Engineering universe constellation. The node list below offers the same controls."
            className="relative aspect-square w-full overflow-hidden border border-line bg-surface sm:aspect-[16/10]"
          >
            <div aria-hidden className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />

            {device && webgl && mounted ? (
              <CanvasBoundary fallback={<UniverseFallback active={focusNode} onSelect={choose} />}>
                <UniverseScene
                  device={device}
                  active={focusNode}
                  running={inView && pageVisible}
                  labels={labels}
                  onSelect={choose}
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  {universeNodes.map((n, i) => (
                    <span
                      key={n.id}
                      ref={(el) => {
                        nodeEls.current[i] = el
                      }}
                      className="absolute left-0 top-0 whitespace-nowrap font-mono text-[0.6rem] tracking-[0.18em] text-metal will-change-transform sm:text-[0.66rem]"
                      style={{ opacity: 0 }}
                    >
                      {n.label}
                    </span>
                  ))}
                  <span
                    ref={centerEl}
                    className="absolute left-0 top-0 whitespace-nowrap font-mono text-[0.68rem] font-medium tracking-[0.22em] text-fg will-change-transform"
                  >
                    MANIKANDAN R
                  </span>
                </div>
              </CanvasBoundary>
            ) : device && !webgl ? (
              <UniverseFallback active={focusNode} onSelect={choose} />
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4">
          <aside aria-live="polite" className="flex h-full min-h-[220px] flex-col border border-line bg-surface p-6 md:p-8">
            {node ? (
              <>
                <p className="eyebrow mb-3 text-accent">Node</p>
                <h3 className="text-3xl font-semibold tracking-tight">{node.label}</h3>
                <p className="mt-3 text-muted">{node.blurb}</p>

                {node.links.length > 0 && (
                  <p className="eyebrow mt-6">
                    Connected to{' '}
                    <span className="text-metal">
                      {node.links
                        .map((id) => universeNodes.find((n) => n.id === id)?.label)
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </p>
                )}

                {related.length > 0 ? (
                  <div className="mt-6">
                    <p className="eyebrow mb-3">
                      {related.length} project{related.length === 1 ? '' : 's'} highlighted
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {related.map((p) => (
                        <li key={p!.id}>
                          <button
                            type="button"
                            data-cursor="view"
                            onClick={(e) => openProject(p!.id, e.currentTarget.getBoundingClientRect())}
                            className="chip min-h-11 cursor-pointer !text-fg transition-colors hover:border-accent hover:!text-accent"
                          >
                            {p!.shortName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-6 text-sm text-muted">
                    This one is about how the work is run rather than a single project — see the{' '}
                    <a href={`#${node.id === 'leadership' ? 'leadership' : 'about'}`} className="text-accent underline underline-offset-4">
                      section below
                    </a>
                    .
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {related.length > 0 && (
                    <a href="#work" className="btn !min-h-10 !px-4">
                      See in work
                    </a>
                  )}
                  <button type="button" onClick={() => setFocusNode(null)} className="btn !min-h-10 !px-4">
                    Clear
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="eyebrow mb-3">Start anywhere</p>
                <h3 className="text-2xl font-semibold tracking-tight">Twelve ways into the same work.</h3>
                <p className="mt-3 text-muted">
                  Flutter, ERP, Frappe, ERPNext, web, mobile, APIs, databases, government, architecture, leadership and
                  products are all connected. Pick one and follow it to the projects.
                </p>
              </>
            )}
          </aside>
        </Reveal>
      </div>

      <div role="group" aria-label="Universe nodes" className="mt-6 flex flex-wrap gap-2">
        {universeNodes.map((n) => (
          <button
            key={n.id}
            type="button"
            aria-pressed={focusNode === n.id}
            onClick={() => choose(n.id)}
            className={`chip min-h-11 cursor-pointer px-4 transition-colors ${
              focusNode === n.id ? '!border-accent !bg-accent-soft !text-accent' : 'hover:border-accent hover:!text-fg'
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>
    </Section>
  )
}

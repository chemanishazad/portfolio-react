'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { pad2 } from '@/lib/format'
import { categoryLine, platformLine, publicView } from '@/lib/projectView'
import { projects } from '@/lib/projects'
import { lockScroll } from '@/lib/scroll'
import { useUI } from '@/lib/store'
import { ProjectVisual } from './ProjectVisual'

/* The case study: a full-screen layer that unfolds from the card you clicked.
   Structure follows spec §23 — domain, role, technology, challenge, approach,
   system/UI, contribution, result — and any row with nothing real to say is
   left out rather than filled. ESC closes; ← → move between projects. */

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-10 md:py-10">
      <h3 className="eyebrow md:col-span-3">{label}</h3>
      <div className="md:col-span-9">{children}</div>
    </div>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function CaseStudyOverlay() {
  const openId = useUI((s) => s.openProjectId)
  const origin = useUI((s) => s.openOrigin)
  const closeProject = useUI((s) => s.closeProject)
  const setOpenProject = useUI((s) => s.setOpenProject)
  const reduced = useReducedMotion()

  const dialog = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)

  const index = openId ? projects.findIndex((p) => p.id === openId) : -1
  const project = index >= 0 ? publicView(projects[index]) : null
  const prev = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : null
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const isOpen = index >= 0

  // Unfold from the clicked card's rectangle (falls back to a centred inset).
  const clipFrom = useMemo(() => {
    if (!origin || typeof window === 'undefined') return 'inset(14% 14% 14% 14% round 24px)'
    const { innerWidth: vw, innerHeight: vh } = window
    const t = Math.max(0, origin.top)
    const l = Math.max(0, origin.left)
    const r = Math.max(0, vw - origin.left - origin.width)
    const b = Math.max(0, vh - origin.top - origin.height)
    return `inset(${t}px ${r}px ${b}px ${l}px round 12px)`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, isOpen])

  // Open / close boundary: freeze the page, hide it from assistive tech, restore focus.
  useEffect(() => {
    if (!isOpen) return
    returnTo.current = document.activeElement as HTMLElement | null
    lockScroll(true)
    const main = document.getElementById('main')
    const header = document.querySelector('header')
    main?.setAttribute('inert', '')
    header?.setAttribute('inert', '')
    const t = window.setTimeout(() => closeBtn.current?.focus(), 60)
    return () => {
      window.clearTimeout(t)
      lockScroll(false)
      main?.removeAttribute('inert')
      header?.removeAttribute('inert')
      returnTo.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen])

  // Start each project at the top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [openId])

  // Keyboard: ESC closes, arrows move, Tab stays inside.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeProject()
      } else if (e.key === 'ArrowRight' && next) {
        setOpenProject(next.id)
      } else if (e.key === 'ArrowLeft' && prev) {
        setOpenProject(prev.id)
      } else if (e.key === 'Tab' && dialog.current) {
        const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, next, prev, closeProject, setOpenProject])

  const p = project
  const rows = p
    ? [
        Boolean(p.client || p.domain),
        Boolean(p.role),
        p.technologies.length > 0,
        Boolean(p.challenge),
        Boolean(p.solution || p.pipeline?.length || p.decisions?.length),
        Boolean(p.modules?.length || p.specs?.length || p.platforms.length || p.media?.images?.length),
        p.contribution.length > 0,
        Boolean(p.outcome || p.facts?.length),
      ].filter(Boolean).length
    : 0

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="case-study"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          data-lenis-prevent
          className="fixed inset-0 z-[200] bg-bg"
          initial={reduced ? { opacity: 0 } : { clipPath: clipFrom }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0px 0px 0px 0px round 0px)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: clipFrom }}
          transition={{ duration: reduced ? 0.15 : 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div ref={scroller} className="h-full overflow-y-auto overscroll-contain">
            <div className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur-md">
              <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
                <button ref={closeBtn} type="button" onClick={closeProject} className="btn !min-h-11 !px-4">
                  <span aria-hidden>←</span> All projects
                </button>
                <span aria-hidden className="eyebrow hidden tabular-nums sm:inline">
                  {pad2(index + 1)} / {pad2(projects.length)}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => prev && setOpenProject(prev.id)}
                    className="btn !min-h-11 !px-4"
                    aria-label={`Previous project: ${prev?.name}`}
                  >
                    <span aria-hidden>←</span>
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => next && setOpenProject(next.id)}
                    className="btn !min-h-11 !px-4"
                    aria-label={`Next project: ${next?.name}`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              key={p.id}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-[1200px] px-5 pb-28 pt-12 md:px-10 md:pt-20"
            >
              <header className="grid items-end gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="eyebrow mb-5 text-accent">{categoryLine(p)}</p>
                  <h2 id="case-title" className="h-section text-balance">
                    {p.name}
                  </h2>
                  <p className="lede mt-6">{p.summary}</p>
                </div>
                <ProjectVisual
                  kind={p.visual}
                  seed={p.id}
                  platforms={p.platforms}
                  className="aspect-[4/3] w-full border border-line md:col-span-5"
                />
              </header>

              <div className="mt-16 md:mt-24">
                {(p.client || p.domain) && (
                  <Row label="Domain">
                    {p.client && <p className="text-xl font-medium tracking-tight">{p.client}</p>}
                    {p.domain && <p className="text-muted">{p.domain}</p>}
                  </Row>
                )}

                {p.role && (
                  <Row label="My role">
                    <p className="text-xl font-medium tracking-tight">{p.role}</p>
                  </Row>
                )}

                {p.technologies.length > 0 && (
                  <Row label="Technology">
                    <ul className="flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Row>
                )}

                {p.challenge && (
                  <Row label="Challenge">
                    <p className="max-w-[60ch] text-muted">{p.challenge}</p>
                  </Row>
                )}

                {(p.solution || p.pipeline?.length || p.decisions?.length) && (
                  <Row label="Approach">
                    {p.solution && <p className="max-w-[62ch] text-muted">{p.solution}</p>}
                    {p.pipeline && p.pipeline.length > 0 && (
                      <ol className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                        {p.pipeline.map((s, i) => (
                          <li key={s.step} className="bg-bg p-5">
                            <p className="eyebrow mb-2 text-accent">
                              {pad2(i + 1)} · {s.step}
                            </p>
                            <p className="text-sm text-muted">{s.detail}</p>
                          </li>
                        ))}
                      </ol>
                    )}
                    {p.decisions && p.decisions.length > 0 && (
                      <div className="mt-8 space-y-6">
                        <p className="eyebrow">Decisions worth defending</p>
                        {p.decisions.map((d) => (
                          <div key={d.title}>
                            <h4 className="font-medium tracking-tight">{d.title}</h4>
                            <p className="mt-1 max-w-[62ch] text-sm text-muted">{d.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Row>
                )}

                {Boolean(p.modules?.length || p.specs?.length || p.platforms.length || p.media?.images?.length) && (
                  <Row label="System / UI">
                    {p.platforms.length > 0 && (
                      <p className="eyebrow mb-5">
                        Platform <span className="text-fg">{platformLine(p)}</span>
                      </p>
                    )}
                    {p.modules && p.modules.length > 0 && (
                      <ul className="space-y-2.5">
                        {p.modules.map((m) => (
                          <li key={m} className="flex gap-3 text-muted">
                            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    )}
                    {p.specs && p.specs.length > 0 && (
                      <dl className="mt-8 divide-y divide-line border-y border-line">
                        {p.specs.map((s) => (
                          <div key={s.label} className="grid grid-cols-3 gap-4 py-3 text-sm">
                            <dt className="eyebrow pt-0.5">{s.label}</dt>
                            <dd className="col-span-2 text-fg">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {p.media?.images && p.media.images.length > 0 && (
                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {p.media.images.map((src) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={src}
                            src={src}
                            alt={`${p.name} screen`}
                            loading="lazy"
                            className="w-full border border-line"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </Row>
                )}

                {p.contribution.length > 0 && (
                  <Row label="My contribution">
                    <ul className="space-y-2.5">
                      {p.contribution.map((c) => (
                        <li key={c} className="flex gap-3 text-fg">
                          <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Row>
                )}

                {(p.outcome || p.facts?.length) && (
                  <Row label="Result">
                    {p.outcome && <p className="max-w-[60ch] text-lg text-fg">{p.outcome}</p>}
                    {p.facts && p.facts.length > 0 && (
                      <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-4">
                        {p.facts.map((f) => (
                          <div key={f.label} className="bg-bg p-5">
                            <dd className="text-2xl font-semibold tracking-tight text-accent">{f.value}</dd>
                            <dt className="eyebrow mt-1">{f.label}</dt>
                          </div>
                        ))}
                      </dl>
                    )}
                  </Row>
                )}

                {rows < 3 && (
                  <p className="border-t border-line pt-8 text-sm text-dim">
                    Further detail on this project is being added.
                  </p>
                )}
              </div>

              {next && (
                <button
                  type="button"
                  onClick={() => setOpenProject(next.id)}
                  className="group mt-16 flex w-full items-end justify-between gap-6 border-t border-line pt-10 text-left"
                >
                  <span>
                    <span className="eyebrow block">Next project</span>
                    <span className="h-panel mt-3 block transition-colors group-hover:text-accent">{next.name}</span>
                  </span>
                  <span aria-hidden className="text-3xl transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

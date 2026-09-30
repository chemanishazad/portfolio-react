import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Extra classes for the inner container. */
  innerClassName?: string
}

/** Page section: anchor target, consistent gutters and vertical rhythm. */
export function Section({ id, children, className = '', innerClassName = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-16 py-24 md:py-36 ${className}`}>
      <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-10 ${innerClassName}`}>{children}</div>
    </section>
  )
}

interface SectionHeadProps {
  id: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}

export function SectionHead({ id, eyebrow, title, lede, className = '' }: SectionHeadProps) {
  return (
    <header className={`mb-14 md:mb-20 ${className}`}>
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={`${id}-title`} className="h-section max-w-[18ch] text-balance">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={160}>
          <p className="lede mt-6">{lede}</p>
        </Reveal>
      )}
    </header>
  )
}

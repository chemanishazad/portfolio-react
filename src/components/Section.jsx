import Reveal from './Reveal'

export default function Section({ id, eyebrow, title, lead, children, className = '' }) {
  return (
    <section id={id} className={'relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32 ' + className}>
      <div className="mb-14 max-w-3xl">
        {eyebrow && (
          <Reveal y={14}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-neon-cyan to-transparent" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </Reveal>
        )}
        {title && (
          <Reveal delay={0.06}>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              {title}
            </h2>
          </Reveal>
        )}
        {lead && (
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">{lead}</p>
          </Reveal>
        )}
      </div>
      {children}
    </section>
  )
}

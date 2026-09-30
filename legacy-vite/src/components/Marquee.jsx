import { marquee } from '../data/content'

export default function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5">
      <div
        className="marquee-track flex w-max animate-[marquee_38s_linear_infinite] gap-12"
        style={{ animationName: 'marquee' }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-sm font-medium tracking-wide text-white/40">{t}</span>
            <span className="h-1 w-1 rounded-full bg-neon-cyan/50" />
          </span>
        ))}
      </div>
      <style>{'@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  )
}

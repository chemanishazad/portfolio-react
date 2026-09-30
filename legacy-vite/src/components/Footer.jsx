import { nav, profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-[11.5px] text-white/35">
          © {new Date().getFullYear()} {profile.name} · Built with React, Three.js & too much coffee
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {nav.slice(1).map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              className="text-[12.5px] text-white/40 transition-colors hover:text-neon-cyan"
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

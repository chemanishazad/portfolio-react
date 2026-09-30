import type { PortraitAssets } from '@/lib/assets'
import { profile, contact } from '@/lib/profile'
import { HeroCanvas } from './HeroCanvas'
import { ProfilePortrait } from './ProfilePortrait'

/* The pinned hero. Its height (in globals.css) gives the scroll distance; while it
   is pinned, `--hp` (0 → 1, written by SmoothScroll) drives the text, the portrait
   and — through scrollState — the 3D camera. Server component: the only client
   islands are the canvas and the portrait. */

const FACTS = [`${profile.years} years`, 'Flutter', 'Enterprise ERP', 'Government technology']

export function HeroSection({ portrait }: { portrait: PortraitAssets | null }) {
  return (
    <section id="hero" aria-label="Introduction" className="relative">
      <div className="sticky top-0 h-svh min-h-[600px] overflow-hidden">
        <HeroCanvas portrait={portrait} />

        {/* Keeps the type legible over the scene. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(90%_70%_at_18%_55%,rgb(5_7_11/0.78),transparent_70%),linear-gradient(to_bottom,transparent_70%,var(--color-bg))]"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-5 px-5 pb-14 pt-20 md:grid md:grid-cols-12 md:items-center md:gap-8 md:px-10 md:pb-16">
          <div
            className="md:col-span-7"
            style={{
              transform: 'translate3d(0, calc(var(--hp, 0) * -70px), 0)',
              opacity: 'calc(1 - var(--hp, 0) * 1.7)',
            }}
          >
            <p className="eyebrow mb-4 flex items-center gap-3 md:mb-6">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {profile.company}
            </p>

            <h1 className="text-[clamp(2.5rem,6.6vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
              {profile.name.toUpperCase()}
            </h1>

            <p className="mt-4 text-lg font-semibold uppercase leading-tight tracking-tight md:mt-7 md:text-3xl">
              <span className="block">{profile.roleLines[0]}</span>
              <span className="block text-metal">{profile.roleLines[1]}</span>
            </p>

            <p className="lede mt-4 max-w-[40ch] text-[0.95rem] md:mt-6 md:text-[1.15rem]">{profile.pitch}</p>

            <ul className="mt-5 hidden flex-wrap gap-2 sm:flex md:mt-7" aria-label="At a glance">
              {FACTS.map((f) => (
                <li key={f} className="chip">
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 md:mt-9">
              <a href="#work" className="btn btn-solid">
                Explore projects
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn hidden sm:inline-flex">
                LinkedIn
              </a>
            </div>
          </div>

          <div
            className="md:col-span-5"
            style={{
              transform: 'translate3d(0, calc(var(--hp, 0) * -40px), 0) scale(calc(1 - var(--hp, 0) * 0.1))',
              opacity: 'calc(1 - var(--hp, 0) * 1.4)',
            }}
          >
            <ProfilePortrait assets={portrait} priority />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-5 z-10 hidden justify-center md:flex"
          style={{ opacity: 'calc(1 - var(--hp, 0) * 4)' }}
        >
          <span className="eyebrow flex items-center gap-3">
            Scroll
            <span className="relative block h-px w-12 overflow-hidden bg-line-strong">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-accent [animation:scan_2.2s_ease-in-out_infinite]" />
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

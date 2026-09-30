import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import type { PortraitAssets } from '@/lib/assets'
import { contact, engagement, profile } from '@/lib/profile'

interface ContactSectionProps {
  /** Only set when the PDF actually exists in /public. */
  resume: string | null
}

/* Buttons render only for things that exist: no GitHub URL, no résumé file — no button. */
export function ContactSection({ resume }: ContactSectionProps) {
  const buttons = [
    { label: 'LinkedIn', href: contact.linkedin, external: true },
    { label: 'Email', href: `mailto:${contact.email}`, external: false },
    { label: 'GitHub', href: contact.github, external: true },
    { label: 'Download résumé', href: resume ?? '', external: false, download: true },
  ].filter((b) => b.href)

  return (
    <Section id="contact" className="border-t border-line">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="contact-title" className="display max-w-[12ch] text-balance">
            Have a system worth building?
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="lede mt-8">Let&apos;s talk about the product, the problem, and the engineering behind it.</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap gap-3">
            {buttons.map((b, i) => (
              <a
                key={b.label}
                href={b.href}
                className={`btn ${i === 0 ? 'btn-solid' : ''}`}
                {...(b.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(b.download ? { download: '' } : {})}
              >
                {b.label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            <a href={`mailto:${contact.email}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              {contact.email}
            </a>
            <span aria-hidden className="mx-3 text-dim">
              ·
            </span>
            <a href={contact.phoneHref} className="hover:text-fg">
              {contact.phone}
            </a>
          </p>
        </Reveal>

        <div className="mt-24 grid gap-px border border-line bg-line md:grid-cols-3">
          {engagement.map((e, i) => (
            <div key={e.id} className="bg-bg">
              <Reveal delay={i * 90} className="p-7 md:p-9">
              <p className="eyebrow mb-4 text-accent">{e.title}</p>
              <p className="font-medium tracking-tight">{e.lead}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                    {pt}
                  </li>
                ))}
              </ul>
              </Reveal>
            </div>
          ))}
        </div>
    </Section>
  )
}

/** Page footer — outside <main>, so it is the page's contentinfo landmark. */
export function SiteFooter({ portrait }: { portrait: PortraitAssets | null }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-5 py-8 md:px-10">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-12 overflow-hidden rounded-[2px] border border-line bg-surface">
            {portrait && (
              <Image
                src={portrait.cutout ?? portrait.original}
                alt=""
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            )}
          </div>
          <div>
            <p className="font-mono text-[0.78rem] font-medium tracking-[0.2em]">{profile.name.toUpperCase()}</p>
            <p className="eyebrow mt-1">
              {profile.title} · {profile.location}
            </p>
          </div>
        </div>
        <p className="eyebrow">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}

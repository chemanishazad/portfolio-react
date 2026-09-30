import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { confirmedProducts, statusLabels } from '@/lib/products'
import type { Product } from '@/lib/types'
import { ProjectVisual } from './ProjectVisual'

/* Products (spec §20): things built and owned, apart from client work. The page
   only mounts this when at least one product in lib/products.ts has a real name.
   Every field is optional and rendered only when present; links only when real. */

function ProductCard({ product: p }: { product: Product }) {
  const links = [
    p.links?.website && { label: 'View product', href: p.links.website },
    p.links?.demo && { label: 'Live demo', href: p.links.demo },
    p.links?.playStore && { label: 'Google Play', href: p.links.playStore },
    p.links?.appStore && { label: 'App Store', href: p.links.appStore },
  ].filter(Boolean) as { label: string; href: string }[]

  const facts = [
    p.problem && { label: 'Problem', value: p.problem },
    p.audience && { label: "Who it's for", value: p.audience },
    p.platforms.length > 0 && { label: 'Platform', value: p.platforms.join(' + ') },
    p.ownership && { label: 'Ownership', value: p.ownership },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <article
      aria-labelledby={`product-${p.id}`}
      className="overflow-hidden border border-line-strong bg-surface"
    >
      <ProjectVisual kind={p.visual} seed={p.id} platforms={p.platforms} className="aspect-[16/7] w-full" />

      <div className="p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3 id={`product-${p.id}`} className="h-panel">
            {p.name}
          </h3>
          {p.status && (
            <span className="chip !border-accent/60 !text-accent">{statusLabels[p.status]}</span>
          )}
        </div>
        {p.tagline && <p className="lede mt-3">{p.tagline}</p>}
        {p.summary && <p className="mt-4 max-w-[60ch] text-muted">{p.summary}</p>}

        {facts.length > 0 && (
          <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow mb-1">{f.label}</dt>
                <dd className="text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {p.features && p.features.length > 0 && (
          <ul className="mt-8 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 text-muted">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i === 0 ? 'btn-solid' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export function ProductsSection() {
  if (confirmedProducts.length === 0) return null

  return (
    <Section id="products">
      <SectionHead
        id="products"
        eyebrow="Products"
        title="Things we design, build and own."
        lede="Separate from delivery work for clients: products with their own name, roadmap and identity."
      />
      <div className="space-y-8">
        {confirmedProducts.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

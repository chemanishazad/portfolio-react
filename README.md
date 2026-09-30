# Manikandan R — Portfolio

A cinematic, scroll-driven portfolio. Next.js 16 · React 19 · TypeScript · Tailwind v4 ·
React Three Fiber · Motion · Lenis. Content lives in typed data files; nothing on the page is
hard-coded into a component.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Where things are

| You want to change | Edit |
|---|---|
| Headline facts, about, contact, leadership, engagement | `lib/profile.ts` |
| Projects (copy, stack, role, outcome) | `lib/projects.ts` |
| Products section | `lib/products.ts` — hidden until a product has a real name |
| Experience timeline | `lib/experience.ts` |
| Technologies | `lib/technologies.ts` |
| Universe nodes and which projects they light | `lib/universe.ts` |
| ERP pipeline, government tiles, Flutter layers | `lib/story.ts` |
| Colours, type, motion tokens | `app/globals.css` (`@theme`) |

**Rule for content: unknown means empty.** A project field left empty is simply not rendered — a
sparse project shows only what is known. Nothing is filled in. Fields with real detail (MSMS,
Study Place, Smart Traffic, ECO Park, MTC, the Form Builder) came from the old portfolio.

## Assets

* **Portrait** — `public/images/profile/manikandan.jpg` is the supplied photo, untouched.
  `node scripts/make-cutout.mjs` makes the transparent cut-out the 3D hero uses, a soft depth
  map, and the social-preview portrait. Only near-white pixels connected to the photo's top and
  side edges become transparent, so the face, hair, blazer and shirt are never altered.
* **Résumé** — drop a PDF at `public/Manikandan-R-Resume.pdf`; the *Download résumé* button
  appears only once it exists. The GitHub button appears only when `contact.github` is set.
* **Project media** — `public/images/projects/<id>/…`, listed in a project's `media.images`.
  A missing file is hidden, never shown broken.

## How it behaves

* **3D** loads lazily and only on capable devices. `?tier=low|mid|high` previews another device
  class; `?webgl=off` previews the no-WebGL fallback (static hero diagram, button-ring universe).
  Budgets (particles, DPR) are in `lib/device.ts`. Scenes stop rendering when off-screen.
* **Mouse** — the hero portrait is a 3D card that turns toward the pointer and is lit by a soft
  cursor-following highlight; the node ring and camera parallax with it. Without a pointer it
  sways on its own.
* **Reduced motion** — no intro, no pinned hero, no smooth scroll, no custom cursor, no
  reveal animation; the scenes render once, still. Everything stays usable.
* **Keyboard** — skip link, visible focus, the case study traps focus, closes with **Esc**, moves
  with **← →**, and returns focus to where it opened.
* **Confidentiality** — set `confidential: true` on a project and `lib/projectView.ts` strips
  client, architecture, integrations and media everywhere it is shown.

## SEO

Metadata, Open Graph (`app/opengraph-image.tsx`), sitemap, robots, manifest and favicon are
generated. Set `NEXT_PUBLIC_SITE_URL` when serving from a domain other than
`contact.website`.

## Notes

* `legacy-vite/` is the previous Vite site, kept as a backup. Delete it when you are happy.
* `_delete_me/` was already here and is ignored by the build.

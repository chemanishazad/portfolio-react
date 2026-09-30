# Manikandan R — 3D Portfolio

A dark, cinematic single-page portfolio built with **React + Vite + React Three Fiber**.
The 3D background (particle field, distorting core, orbit rings, floating glass slabs,
bloom + chromatic aberration) is fully procedural — there are no model or texture files
to download.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # serve the built output locally
```

Node 18+ required (built and tested on Node 22).

## Edit your content — one file

**All text, jobs, skills, projects, testimonials and links live in
`src/data/content.js`.** You should not need to touch any component to keep the site
current. Anything marked `// TODO` in that file is a placeholder.

### Sections

`Home · About · Services · Work · R&D · Career · Skills · Contact`

Written to be skimmed. Two blocks do most of the work for visitors who will
never read a paragraph:

- **Snapshot** — the strip directly under the hero. Role, years, stack, location,
  work mode, what you are open to. Facts only, driven by the `snapshot` array.
  This is the block a recruiter actually reads.
- **Services** — four service cards (`services.items`) plus a tab switcher
  (`engagement`) that answers three different visitors separately: hiring teams,
  freelance clients, and retainer enquiries. Each tab has its own lead line,
  list and call to action. Add or remove tabs by editing the `engagement` array.

The **R&D** section is a single-project deep dive, driven by the `rnd` object in
`content.js`: a headline stat row, the four-step generation pipeline, four
"decisions worth defending", and the stack. Right now it holds Form Builder.
Add more flagships by generalising `rnd.flagship` into an array — the component
renders one object today.

Everything is real except two things:

1. `testimonials` — still placeholders, and **the whole section is hidden**
   because of it. A page carrying "Name Surname" quotes reads as unfinished,
   which is worse than having no testimonials. Replace one quote with a real
   recommendation and delete its `placeholder: true` line — the section and its
   nav item appear automatically.
2. `contact.socials` — the GitHub entry has an empty `href`. Fill it in and the
   card becomes a live link; leave it empty and it renders dimmed.

Optional per project: add `company`, `year`, or `links: { live, repo }` to any
entry in `projects` and the card picks them up automatically. Setting `rnd: true`
on a project adds an "R&D ↓" chip that jumps to the R&D section; `current: true`
adds a green "current" chip. The tech strip under the hero is the `marquee`
array.

## Résumé download

Drop your PDF into `public/` named exactly:

```
public/Manikandan-R-Resume.pdf
```

The nav button, hero button and contact card all point at it via `contact.resume`.
Until the file exists, those buttons 404 — that is the only thing on the page that
needs a file from you.

## Project structure

```
src/
  data/content.js       ← everything you edit
  lib/state.js          ← non-reactive scroll/pointer state + device tier detection
  three/
    Scene.jsx           ← Canvas, lights, procedural env map, postprocessing, camera rig
    Starfield.jsx       ← three parallax particle layers
    Core.jsx            ← distorting core, wireframe cage, orbit rings
    Shards.jsx          ← floating glass slabs
  components/           ← Nav, Hero, About, Experience, Projects, Skills,
                          Testimonials, Contact, Footer, Loader, Cursor, Marquee
```

## Performance notes

This started out laggy. What fixed it, in rough order of impact:

1. **The canvas stops rendering past the hero.** An `IntersectionObserver` on
   `#home` flips `<Canvas frameloop>` between `always` and `never`, and the tab's
   `visibilitychange` does the same. The scene has already flown out of frame by
   then, so running the loop there was paying full GPU cost for an invisible
   picture. This is what took scrolling from ~12fps to a solid 60 in testing.
2. **No `backdrop-filter` on cards.** A blurred backdrop over a live WebGL canvas
   forces the browser to re-rasterise every card every frame. `.glass` is now a
   translucent dark base plus a light gradient — visually the same on this
   background, free to composite. `.glass-blur` (real blur) is used on exactly one
   small element that never moves: the nav pill.
3. **Pointer tilt writes to the DOM, not to state.** The project cards used to call
   `setState` on every `mousemove`, re-rendering the card and its whole feature
   list dozens of times a second. Now one rAF-coalesced style write per frame.
4. **No animated `filter: blur()`.** Every scroll reveal used to animate a blur,
   which re-rasterises the element on each frame of each reveal. Transform and
   opacity only now.
5. **Budgets in one place.** `budget` in `src/lib/state.js` holds particle counts,
   geometry detail, shard count, postprocessing flags and max DPR per device
   tier — tune performance by editing that object, nothing else.
6. Particle counts roughly a third of what they were; one shared sprite texture
   instead of three identical ones; plain boxes instead of rounded-box glass with
   clearcoat.

Other guarantees:

- Scroll and pointer values live in plain module state, so moving the mouse or
  scrolling never triggers a React re-render — only the r3f loop reads them.
- `prefers-reduced-motion` replaces the whole canvas with a static gradient.
- The environment map is generated in-engine (drei `<Environment>` with
  `<Lightformer>` children), so nothing is fetched at runtime except Google Fonts.

### Testing a different device tier

The tier is detected from CPU cores, memory, touch and viewport width. To see
what another class of machine gets, append a query param:

```
?tier=low     # no postprocessing, ~750 particles, 2 shards, dpr 1
?tier=mid     # merged effects but no bloom
?tier=high    # bloom + chromatic aberration + vignette, dpr up to 1.5
```

## Deploy

Any static host. The build output is `/dist` and `base` is set to `./`, so it works
from a subpath too.

- **Vercel / Netlify** — connect the repo, build command `npm run build`, output `dist`.
- **GitHub Pages** — push `dist` to `gh-pages`.

## Customising the look

- Colours: `tailwind.config.js` (`neon.*`, `ink.*`) and the `--cyan/--violet/--pink`
  variables in `src/index.css`.
- Scene intensity: `Bloom intensity` and `ChromaticAberration offset` in
  `src/three/Scene.jsx`.
- Camera travel on scroll: the `wantZ` / `wantY` values in `CameraRig`.

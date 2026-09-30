/* Separates the subject of the supplied portrait from its white studio backdrop.

   Run:  node scripts/make-cutout.mjs
   In:   public/images/profile/manikandan.jpg        (the supplied photo — never modified)
   Out:  public/images/profile/manikandan-cutout.webp (same pixels, backdrop made transparent)
         public/images/profile/og-portrait.png         (the same cut-out, smaller, for the social preview)
         public/images/profile/manikandan-depth.webp   (a soft, blurred silhouette used only to
                                                        give the 3D card a gentle rounded volume)

   Why it is safe for a face: only pixels that are near-white AND connected to the
   top/left/right edge of the photo can become transparent, so skin, hair, the blazer
   and the white shirt (enclosed by the blazer) are never keyed. A narrow ring around
   that backdrop gets a soft edge — alpha from local colour-to-alpha against a locally
   estimated subject colour, with the backdrop colour removed from the edge pixels so
   hair strands carry no white halo. No pixel inside the subject is moved, blurred,
   recoloured or redrawn. */

import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'public/images/profile/manikandan.jpg')
const OUT = path.join(root, 'public/images/profile/manikandan-cutout.webp')
const DEPTH = path.join(root, 'public/images/profile/manikandan-depth.webp')
const OG = path.join(root, 'public/images/profile/og-portrait.png')
const PREVIEW = process.argv[2] // optional: path for a preview composited on the page colour

const CROP = 6 // the supplied photo has a thin frame line at its edge
const WHITE_MIN = 226 // a backdrop pixel: every channel at least this bright…
const NEUTRAL_MAX = 26 // …and nearly neutral (the light-blue blazer is not)
const RING = 6 // soft-edge width in px
const BLUR_R = 9 // radius used to estimate the subject colour near an edge

const meta = await sharp(SRC).metadata()
const { data, info } = await sharp(SRC)
  .extract({ left: CROP, top: CROP, width: meta.width - CROP * 2, height: meta.height - CROP * 2 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
const w = info.width
const h = info.height
const n = w * h

const isWhite = (i) => {
  const r = data[i * 3]
  const g = data[i * 3 + 1]
  const b = data[i * 3 + 2]
  const mn = Math.min(r, g, b)
  return mn >= WHITE_MIN && Math.max(r, g, b) - mn <= NEUTRAL_MAX
}

/* 1 — backdrop = near-white pixels connected to the top, left or right edge. */
const bg = new Uint8Array(n)
const queue = new Int32Array(n)
let qh = 0
let qt = 0
const seed = (x, y) => {
  const i = y * w + x
  if (!bg[i] && isWhite(i)) {
    bg[i] = 1
    queue[qt++] = i
  }
}
for (let x = 0; x < w; x++) seed(x, 0)
for (let y = 0; y < Math.floor(h * 0.75); y++) {
  seed(0, y)
  seed(w - 1, y)
}
while (qh < qt) {
  const i = queue[qh++]
  const x = i % w
  const y = (i / w) | 0
  if (x > 0 && !bg[i - 1] && isWhite(i - 1)) ((bg[i - 1] = 1), (queue[qt++] = i - 1))
  if (x < w - 1 && !bg[i + 1] && isWhite(i + 1)) ((bg[i + 1] = 1), (queue[qt++] = i + 1))
  if (y > 0 && !bg[i - w] && isWhite(i - w)) ((bg[i - w] = 1), (queue[qt++] = i - w))
  if (y < h - 1 && !bg[i + w] && isWhite(i + w)) ((bg[i + w] = 1), (queue[qt++] = i + w))
}

/* 2 — distance (in px, capped) from the backdrop, by layered BFS, to find the ring. */
const dist = new Uint8Array(n).fill(255)
qh = 0
qt = 0
for (let i = 0; i < n; i++) {
  if (bg[i]) {
    dist[i] = 0
    queue[qt++] = i
  }
}
while (qh < qt) {
  const i = queue[qh++]
  const d = dist[i]
  if (d >= RING) continue
  const x = i % w
  const y = (i / w) | 0
  const visit = (j) => {
    if (dist[j] === 255) {
      dist[j] = d + 1
      queue[qt++] = j
    }
  }
  if (x > 0) visit(i - 1)
  if (x < w - 1) visit(i + 1)
  if (y > 0) visit(i - w)
  if (y < h - 1) visit(i + w)
}

/* 3 — local subject colour: masked box blur (integral images) over "solid" pixels,
       i.e. those farther than the ring from the backdrop. */
const solid = (i) => dist[i] > RING
const integral = (channel) => {
  const s = new Float64Array((w + 1) * (h + 1))
  for (let y = 0; y < h; y++) {
    let row = 0
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      row += channel(i)
      s[(y + 1) * (w + 1) + (x + 1)] = s[y * (w + 1) + (x + 1)] + row
    }
  }
  return s
}
const sumR = integral((i) => (solid(i) ? data[i * 3] : 0))
const sumG = integral((i) => (solid(i) ? data[i * 3 + 1] : 0))
const sumB = integral((i) => (solid(i) ? data[i * 3 + 2] : 0))
const cnt = integral((i) => (solid(i) ? 1 : 0))
const box = (s, x, y, r) => {
  const x0 = Math.max(0, x - r)
  const y0 = Math.max(0, y - r)
  const x1 = Math.min(w, x + r + 1)
  const y1 = Math.min(h, y + r + 1)
  return s[y1 * (w + 1) + x1] - s[y0 * (w + 1) + x1] - s[y1 * (w + 1) + x0] + s[y0 * (w + 1) + x0]
}

/* 4 — alpha + decontaminated colour. */
const out = Buffer.alloc(n * 4)
const PAGE = [11, 13, 18] // colour stored under fully transparent pixels: no white bleeds in when minified
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = y * w + x
    const o = i * 4
    const r = data[i * 3]
    const g = data[i * 3 + 1]
    const b = data[i * 3 + 2]
    if (bg[i]) {
      out[o] = PAGE[0]
      out[o + 1] = PAGE[1]
      out[o + 2] = PAGE[2]
      out[o + 3] = 0
    } else if (dist[i] <= RING) {
      let c = box(cnt, x, y, BLUR_R)
      let rad = BLUR_R
      while (c < 6 && rad < 40) {
        rad += 6
        c = box(cnt, x, y, rad)
      }
      let a = 1
      let fr = r
      let fg = g
      let fb = b
      if (c >= 1) {
        fr = box(sumR, x, y, rad) / c
        fg = box(sumG, x, y, rad) / c
        fb = box(sumB, x, y, rad) / c
        // Project the pixel onto the line from white to the local subject colour.
        const dr = fr - 255
        const dg = fg - 255
        const db = fb - 255
        const denom = dr * dr + dg * dg + db * db
        a = denom > 1 ? ((r - 255) * dr + (g - 255) * dg + (b - 255) * db) / denom : 1
        a = Math.min(1, Math.max(0, a))
      }
      // Remove the backdrop's contribution so edges carry no halo.
      const k = a > 0.02 ? 1 / a : 0
      out[o] = Math.min(255, Math.max(0, Math.round((r - (1 - a) * 255) * k)))
      out[o + 1] = Math.min(255, Math.max(0, Math.round((g - (1 - a) * 255) * k)))
      out[o + 2] = Math.min(255, Math.max(0, Math.round((b - (1 - a) * 255) * k)))
      out[o + 3] = Math.round(a * 255)
      if (a <= 0.02) {
        out[o] = PAGE[0]
        out[o + 1] = PAGE[1]
        out[o + 2] = PAGE[2]
      }
    } else {
      out[o] = r
      out[o + 1] = g
      out[o + 2] = b
      out[o + 3] = 255
    }
  }
}

const img = sharp(out, { raw: { width: w, height: h, channels: 4 } })
await img.clone().webp({ quality: 92, alphaQuality: 95, effort: 5 }).toFile(OUT)
console.log(`cut-out written: ${w}x${h} -> ${path.relative(root, OUT)}`)

await img.clone().resize({ width: 520 }).png({ compressionLevel: 9 }).toFile(OG)
console.log(`social preview portrait written -> ${path.relative(root, OG)}`)

// A smooth bump from the silhouette: nothing in it comes from the face, so nothing
// about the face can be distorted by it — it only decides how far each part of the
// card sits from the viewer when it turns.
await img
  .clone()
  .extractChannel(3)
  .resize(280, 350)
  .blur(14)
  .normalise()
  .blur(6)
  .webp({ quality: 90 })
  .toFile(DEPTH)
console.log(`depth map written -> ${path.relative(root, DEPTH)}`)

if (PREVIEW) {
  await sharp({ create: { width: w, height: h, channels: 3, background: { r: 5, g: 7, b: 11 } } })
    .composite([{ input: await img.clone().png().toBuffer() }])
    .png()
    .toFile(PREVIEW)
  console.log(`preview written: ${PREVIEW}`)
}

import fs from 'node:fs'
import path from 'node:path'
import { contact } from './profile'

/* Optional assets the owner drops into /public. Checked at build/request time on
   the server so a missing file renders a graceful alternative instead of a
   broken image or a 404 button. */

const PUBLIC_DIR = path.join(process.cwd(), 'public')

/** First portrait found at /public/images/profile/manikandan.{jpg,jpeg,png,webp}. */
export function getPortraitSrc(): string | null {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const rel = `images/profile/manikandan.${ext}`
    if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return `/${rel}`
  }
  return null
}

export interface PortraitAssets {
  /** The supplied photo, untouched — used for previews and structured data. */
  original: string
  /** Same pixels with the studio backdrop transparent (scripts/make-cutout.mjs). */
  cutout: string | null
  /** Soft silhouette that gives the 3D card a rounded volume. */
  depth: string | null
}

/** Everything the hero needs to show the portrait; null when no photo was added. */
export function getPortraitAssets(): PortraitAssets | null {
  const original = getPortraitSrc()
  if (!original) return null
  const has = (rel: string) => fs.existsSync(path.join(PUBLIC_DIR, rel))
  return {
    original,
    cutout: has('images/profile/manikandan-cutout.webp') ? '/images/profile/manikandan-cutout.webp' : null,
    depth: has('images/profile/manikandan-depth.webp') ? '/images/profile/manikandan-depth.webp' : null,
  }
}

/** The résumé link, only if the PDF is actually there. */
export function getResumeHref(): string | null {
  const rel = contact.resume.replace(/^\//, '')
  return fs.existsSync(path.join(PUBLIC_DIR, rel)) ? contact.resume : null
}

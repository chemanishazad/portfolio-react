import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Manikandan R — Team Lead & Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Social preview: name, role and domains on the dark technical ground, with the
   portrait (the cut-out, unaltered). Rendered once at build time. */
export default async function OpenGraphImage() {
  let portrait: string | null = null
  try {
    const file = await readFile(path.join(process.cwd(), 'public/images/profile/og-portrait.png'))
    portrait = `data:image/png;base64,${file.toString('base64')}`
  } catch {
    // No portrait yet: the card still works as a typographic one.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#05070b',
          color: '#eef1f6',
          fontFamily: 'sans-serif',
        }}
      >
        {/* technical grid + accent glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: 40,
            width: 760,
            height: 760,
            display: 'flex',
            borderRadius: 760,
            background: 'radial-gradient(closest-side, rgba(92,200,255,0.28), rgba(92,200,255,0))',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 72px',
            width: 760,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', color: '#5cc8ff', fontSize: 22, letterSpacing: 6 }}>
            <div style={{ width: 48, height: 2, background: '#5cc8ff', marginRight: 18, display: 'flex' }} />
            PORTFOLIO
          </div>
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1, marginTop: 28 }}>
            MANIKANDAN R
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28, fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>
            <span>TEAM LEAD</span>
            <span style={{ color: '#b4bccb' }}>SOFTWARE ENGINEER</span>
          </div>
          <div style={{ display: 'flex', marginTop: 40, fontSize: 24, color: '#8d96a7', letterSpacing: 1 }}>
            Flutter · Enterprise · ERP · Government Technology
          </div>
        </div>

        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait}
            width={504}
            height={630}
            alt=""
            style={{ position: 'absolute', right: 40, bottom: 0, width: 504, height: 630, objectFit: 'cover', objectPosition: 'top' }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'linear-gradient(to top, #05070b 0%, rgba(5,7,11,0) 18%)',
          }}
        />
      </div>
    ),
    size,
  )
}

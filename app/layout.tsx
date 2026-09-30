import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Loader } from '@/components/navigation/Loader'
import { SiteNavigation } from '@/components/navigation/SiteNavigation'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { DeviceProbe } from '@/components/ui/DeviceProbe'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { contact, profile } from '@/lib/profile'
import { SITE_URL } from '@/lib/site'

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const TITLE = 'Manikandan R — Team Lead & Software Engineer'
const DESCRIPTION =
  'Portfolio of Manikandan R, a Team Lead and Software Engineer building mobile applications, enterprise ERP platforms, government technology systems and custom software.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Flutter Developer',
    'Software Engineer',
    'Team Lead',
    'ERP Developer',
    'Frappe Developer',
    'ERPNext',
    'Mobile Application Developer',
    'Enterprise Software',
    'Tamil Nadu',
    'Chennai',
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: profile.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#05070b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Team Lead and Software Engineer',
  url: SITE_URL,
  worksFor: { '@type': 'Organization', name: profile.company },
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressCountry: 'IN' },
  sameAs: [contact.linkedin].filter(Boolean),
  knowsAbout: [
    'Flutter',
    'Dart',
    'ERPNext',
    'Frappe',
    'Enterprise resource planning',
    'Mobile application development',
    'Government technology',
    'React',
    'Node.js',
  ],
}

// Runs before first paint: tells CSS whether reveal animation may hide content, and
// whether the intro was already seen this session.
const bootScript = `(function(){try{var d=document.documentElement;var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('motion-ok');if(r||sessionStorage.getItem('mr-intro'))d.classList.add('skip-intro')}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <DeviceProbe />
        <Loader />
        <CustomCursor />
        <SiteNavigation />
        {children}
      </body>
    </html>
  )
}

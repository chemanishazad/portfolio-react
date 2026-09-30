import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manikandan R — Team Lead & Software Engineer',
    short_name: 'Manikandan R',
    description: 'Portfolio of Manikandan R: mobile applications, enterprise ERP platforms and government technology.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05070b',
    theme_color: '#05070b',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}

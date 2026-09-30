import { contact } from './profile'

/** The canonical origin. Override with NEXT_PUBLIC_SITE_URL when the site is served
    from another domain (a preview deployment, a new domain). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? contact.website).replace(/\/$/, '')

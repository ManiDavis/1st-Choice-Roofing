/**
 * Transforms a Sanity CDN image URL to serve a resized, WebP-converted version.
 * Sanity's image CDN handles this server-side, so the browser gets a small WebP
 * instead of the raw upload (which can be 5-20 MB for high-res images).
 *
 * Use for hero/background images. Skip for logos/icons that need exact quality.
 */
export function sanityImageUrl(
  url: string | undefined | null,
  { width = 1920, quality = 82 }: { width?: number; quality?: number } = {}
): string | undefined {
  if (!url) return undefined
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${width}&auto=format&fit=crop&q=${quality}`
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatPhone(phone: string): string {
  // Returns tel: href format
  return 'tel:' + phone.replace(/\D/g, '')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length).trimEnd() + '…'
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1stchoice-roofing.com'

export const BUSINESS = {
  name: '1st Choice Roofing',
  phone: '508-250-0565',
  phoneHref: 'tel:5082500565',
  email: 'support@1stchoice-roofing.com',
  address: {
    street: 'Webster, MA',
    city: 'Webster',
    state: 'MA',
    zip: '01570',
    country: 'US',
    display: 'Webster, MA',
  },
  hours: {
    weekdays: '7:00 AM – 6:00 PM',
    saturday: '8:00 AM – 4:00 PM',
    sunday: 'Emergency calls only',
  },
  rating: {
    value: 5.0,
    count: 14,
  },
  serviceAreas: [
    'Worcester County', 'Middlesex County', 'Norfolk County',
    'Suffolk County', 'Essex County', 'Plymouth County',
    'Bristol County', 'Hampden County', 'Hampshire County',
    'Franklin County', 'Berkshire County', 'Barnstable County',
    'Dukes County', 'Nantucket County',
  ],
} as const

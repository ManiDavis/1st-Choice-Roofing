import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
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
  phone: '508-450-2720',
  phoneHref: 'tel:5084502720',
  email: '',
  address: {
    street: '40 Westwind Dr',
    city: 'Webster',
    state: 'MA',
    zip: '01570',
    country: 'US',
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
    'Webster', 'Worcester', 'Shrewsbury', 'Auburn', 'Millbury',
    'Oxford', 'Dudley', 'Southbridge', 'Grafton', 'Northborough',
    'Holden', 'Leicester', 'Spencer', 'Charlton', 'Sturbridge',
  ],
} as const

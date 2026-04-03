import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { BUSINESS, SITE_URL } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} | Roofing Contractor in Webster & Worcester, MA`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: `${BUSINESS.name} is a fully licensed & insured roofing contractor serving Webster, Worcester, and all of Worcester County, MA. Free estimates on residential & commercial roofing.`,
  keywords: [
    'roofing contractor Webster MA',
    'roofing company Worcester MA',
    'roof repair Massachusetts',
    'roof replacement Webster MA',
    'commercial roofing Worcester MA',
    'residential roofing Webster MA',
    '1st Choice Roofing',
    'roofing contractor Massachusetts',
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | Roofing Contractor Webster & Worcester MA`,
    description: 'Licensed & Insured Roofing Contractor — Free Estimates — Serving all of Worcester County, MA.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} — Roofing Contractor Webster MA`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS.name} | Roofing Contractor Webster & Worcester MA`,
    description: 'Licensed & Insured Roofing Contractor — Free Estimates.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

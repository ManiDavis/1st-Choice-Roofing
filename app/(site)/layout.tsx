import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { OfferBanner } from '@/components/layout/OfferBanner'
import { sanityFetch } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { BUSINESS } from '@/lib/utils'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<{
    businessName?: string
    phone?: string
    email?: string
    address?: { street: string; city: string; state: string; zip: string }
    social?: { facebook?: string; instagram?: string; google?: string; yelp?: string }
    footerText?: string
    navLinks?: { label: string; href: string; children?: { label: string; href: string }[] }[]
    offerBanner?: {
      enabled: boolean
      text: string
      ctaLabel?: string
      ctaHref?: string
      backgroundColor?: 'red' | 'navy' | 'gold' | 'green'
      dismissible?: boolean
    }
    logo?: { asset: { url: string } }
  }>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  }).catch(() => null)

  const phone = settings?.phone || BUSINESS.phone
  const email = settings?.email || BUSINESS.email
  const businessName = settings?.businessName || BUSINESS.name

  return (
    <>
      {/* Offer Banner — sits above everything, defaults off via Sanity */}
      {settings?.offerBanner?.enabled && (
        <OfferBanner
          text={settings.offerBanner.text}
          ctaLabel={settings.offerBanner.ctaLabel}
          ctaHref={settings.offerBanner.ctaHref}
          backgroundColor={settings.offerBanner.backgroundColor}
          dismissible={settings.offerBanner.dismissible}
        />
      )}

      <Header
        phone={phone}
        logoUrl={settings?.logo?.asset?.url}
        navLinks={settings?.navLinks}
        businessName={businessName}
      />

      <main id="main-content">{children}</main>

      <Footer
        phone={phone}
        email={email}
        address={settings?.address || BUSINESS.address}
        social={settings?.social}
        footerText={settings?.footerText}
        businessName={businessName}
      />
    </>
  )
}

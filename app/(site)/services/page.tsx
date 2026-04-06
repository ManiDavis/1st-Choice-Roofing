import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { ALL_SERVICES_QUERY } from '@/sanity/lib/queries'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { breadcrumbSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL } from '@/lib/utils'
import { STATIC_SERVICES } from '@/lib/static-services'

export const metadata: Metadata = {
  title: 'Roofing Services Massachusetts | 1st Choice Roofing',
  description: 'Residential & commercial roofing services across Massachusetts. Roof repair, replacement, rubber & flat roofing, emergency roofing, and solar referrals. Licensed & insured. Free estimates.',
  alternates: { canonical: `${SITE_URL}/services` },
}

export default async function ServicesPage() {
  const sanityServices = await sanityFetch<any[]>({ query: ALL_SERVICES_QUERY, tags: ['servicePage'] }).catch(() => [])
  const services = sanityServices.length > 0 ? sanityServices : STATIC_SERVICES

  const schema = breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Page Header */}
      <section className="bg-brand-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
            Our Roofing Services
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            From single-shingle repairs to complete commercial re-roofs — we have the right crew for every job in Massachusetts.
          </p>
        </div>
      </section>

      <ServicesGrid services={services} heading="Residential & Commercial Roofing" subheading="Every service backed by our quality guarantee. Free estimates always." />

      <CTASection phone={BUSINESS.phone} />
    </>
  )
}

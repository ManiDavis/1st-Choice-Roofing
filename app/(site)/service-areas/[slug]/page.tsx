import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/client'
import { SERVICE_AREA_BY_SLUG_QUERY, SERVICE_AREA_SLUGS_QUERY, ALL_SERVICES_QUERY } from '@/sanity/lib/queries'
import { EstimateForm } from '@/components/sections/EstimateForm'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { breadcrumbSchema, localBusinessSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL, formatPhone } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: SERVICE_AREA_SLUGS_QUERY, tags: ['serviceArea'] }).catch(() => [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = await sanityFetch<any>({ query: SERVICE_AREA_BY_SLUG_QUERY, params: { slug: params.slug }, tags: ['serviceArea'] }).catch(() => null)
  if (!area) return {}

  const areaName = `${area.name}, ${area.state}`
  const title = area.seo?.metaTitle || `Roofing Contractor ${areaName} | 1st Choice Roofing`
  const description = area.seo?.metaDescription || `${BUSINESS.name} provides expert residential & commercial roofing in ${areaName}. Free estimates. Licensed & insured. Call ${BUSINESS.phone}.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/service-areas/${params.slug}` },
    openGraph: { title, description },
  }
}

export default async function ServiceAreaPage({ params }: Props) {
  const [area, services] = await Promise.all([
    sanityFetch<any>({ query: SERVICE_AREA_BY_SLUG_QUERY, params: { slug: params.slug }, tags: ['serviceArea'] }).catch(() => null),
    sanityFetch<any[]>({ query: ALL_SERVICES_QUERY, tags: ['servicePage'] }).catch(() => []),
  ])
  if (!area) notFound()

  const areaName = `${area.name}, ${area.state}`

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Service Areas', url: `${SITE_URL}/service-areas` },
      { name: areaName, url: `${SITE_URL}/service-areas/${params.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor',
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: SITE_URL,
      areaServed: { '@type': 'City', name: area.name, containedIn: { '@type': 'State', name: 'Massachusetts' } },
    },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="bg-brand-navy relative overflow-hidden py-20">
        {area.heroImage?.asset?.url && (
          <Image src={area.heroImage.asset.url} alt={areaName} fill className="object-cover opacity-20" priority sizes="100vw" />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Roofing in {areaName}</span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Local Roofing Contractor</p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
              Roofing Contractor in {areaName}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {area.heroDescription || `${BUSINESS.name} provides expert residential and commercial roofing services in ${areaName}. Licensed, insured, and locally based — we know the area.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark transition-colors">
                Get Free Estimate in {area.name}
              </Link>
              <a href={formatPhone(BUSINESS.phone)} className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors">
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Why choose for this area */}
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-navy mb-4">
                  Why {BUSINESS.name} for {areaName}?
                </h2>
                <ul className="space-y-3">
                  {[
                    `Locally based in Webster, MA — fast response to ${area.name}`,
                    'Licensed & insured roofing contractor in Massachusetts',
                    'Residential and commercial roofing services available',
                    'Free, no-obligation estimates for all jobs',
                    'We know the Massachusetts climate and local building codes',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-gray-700">
                      <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rich text body */}
              {area.body && (
                <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-red">
                  <PortableText value={area.body} />
                </div>
              )}

              {/* Nearby towns */}
              {area.nearbyTowns?.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-3">Also Serving Nearby</h3>
                  <div className="flex flex-wrap gap-2">
                    {area.nearbyTowns.map((town: string) => (
                      <span key={town} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">{town}, MA</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl bg-white border-2 border-brand-red/20 shadow-xl p-7">
                <h3 className="text-xl font-display font-bold text-brand-navy mb-1">Free Estimate in {area.name}</h3>
                <p className="text-sm text-gray-500 mb-6">We cover {areaName} and surrounding towns.</p>
                <EstimateForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this area */}
      {services.length > 0 && (
        <ServicesGrid
          services={services}
          heading={`Our Services in ${areaName}`}
          subheading="Full residential and commercial roofing services available in your area."
        />
      )}
    </>
  )
}

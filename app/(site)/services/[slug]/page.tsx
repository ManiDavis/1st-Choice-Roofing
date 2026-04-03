import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/client'
import { SERVICE_BY_SLUG_QUERY, SERVICE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { EstimateForm } from '@/components/sections/EstimateForm'
import { CTASection } from '@/components/sections/CTASection'
import { FAQSection } from '@/components/sections/extras/FAQSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { breadcrumbSchema, serviceSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: SERVICE_SLUGS_QUERY, tags: ['servicePage'] }).catch(() => [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await sanityFetch<any>({ query: SERVICE_BY_SLUG_QUERY, params: { slug: params.slug }, tags: ['servicePage'] }).catch(() => null)
  if (!service) return {}

  const title = service.seo?.metaTitle || `${service.title} in Webster & Worcester MA`
  const description = service.seo?.metaDescription || `${service.shortDescription} Licensed & insured. Free estimates. Serving Webster, Worcester, and all of Worcester County, MA.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${params.slug}` },
    openGraph: {
      title,
      description,
      images: service.heroImage?.asset?.url ? [{ url: service.heroImage.asset.url }] : [],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const service = await sanityFetch<any>({ query: SERVICE_BY_SLUG_QUERY, params: { slug: params.slug }, tags: ['servicePage'] }).catch(() => null)
  if (!service) notFound()

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Services', url: `${SITE_URL}/services` },
      { name: service.title, url: `${SITE_URL}/services/${params.slug}` },
    ]),
    serviceSchema({
      name: service.title,
      description: service.shortDescription,
      url: `${SITE_URL}/services/${params.slug}`,
      businessName: BUSINESS.name,
      businessUrl: SITE_URL,
    }),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="bg-brand-navy relative overflow-hidden">
        {service.heroImage?.asset?.url && (
          <Image
            src={service.heroImage.asset.url}
            alt={service.heroImage.alt || service.title}
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>›</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <div className="max-w-2xl">
            {service.serviceType && service.serviceType !== 'both' && (
              <span className="inline-block rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white mb-4 capitalize">
                {service.serviceType}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-gray-300 mb-8">{service.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark transition-colors">
                Get Free Estimate
              </Link>
              <a href={`tel:${BUSINESS.phone.replace(/\D/g,'')}`} className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors">
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
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Rich text body */}
              {service.body && (
                <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-red">
                  <PortableText value={service.body} />
                </div>
              )}

              {/* Benefits */}
              {service.benefits?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Key Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((b: { title: string; description: string }, i: number) => (
                      <div key={i} className="rounded-xl bg-gray-50 p-5 border border-gray-100">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="font-semibold text-brand-navy">{b.title}</p>
                            {b.description && <p className="text-sm text-gray-600 mt-0.5">{b.description}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process */}
              {service.process?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Our Process</h2>
                  <div className="space-y-4">
                    {service.process.map((step: { step: number; title: string; description: string }) => (
                      <div key={step.step} className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <p className="font-semibold text-brand-navy">{step.title}</p>
                          {step.description && <p className="text-sm text-gray-600 mt-0.5">{step.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Estimate form sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl bg-white border-2 border-brand-red/20 shadow-xl p-7">
                <h3 className="text-xl font-display font-bold text-brand-navy mb-1">Get a Free Estimate</h3>
                <p className="text-sm text-gray-500 mb-6">For {service.title}. We reply within 2 hours.</p>
                <EstimateForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs?.length > 0 && (
        <FAQSection faqs={service.faqs} heading={`${service.title} — FAQs`} />
      )}

      {/* Related services */}
      {service.relatedServices?.length > 0 && (
        <ServicesGrid services={service.relatedServices} heading="Related Services" subheading="" />
      )}

      <CTASection phone={BUSINESS.phone} />
    </>
  )
}

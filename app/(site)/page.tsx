import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { HOME_PAGE_QUERY, ALL_SERVICES_QUERY, ALL_SERVICE_AREAS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Hero } from '@/components/sections/Hero'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { CTASection } from '@/components/sections/CTASection'
import { Gallery } from '@/components/sections/extras/Gallery'
import { Financing } from '@/components/sections/extras/Financing'
import { Awards } from '@/components/sections/extras/Awards'
import { BlogFeed } from '@/components/sections/extras/BlogFeed'
import { PartnerLogos } from '@/components/sections/extras/PartnerLogos'
import { localBusinessSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL, sanityImageUrl } from '@/lib/utils'
import { STATIC_SERVICES } from '@/lib/static-services'

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<any>({ query: HOME_PAGE_QUERY, tags: ['homePage'] }).catch(() => null)

  const title = homePage?.seo?.metaTitle || 'Roofing Contractor Massachusetts | 1st Choice Roofing'
  const description = homePage?.seo?.metaDescription || '1st Choice Roofing — licensed & insured roofing contractor serving Massachusetts & New England. Residential & commercial roofing, repairs, replacements, rubber roofing & solar. Free estimates.'

  return {
    title,
    description,
    alternates: { canonical: homePage?.seo?.canonicalUrl || SITE_URL },
    openGraph: { title, description },
  }
}

export default async function HomePage() {
  const [homePage, services, areas, settings] = await Promise.all([
    sanityFetch<any>({ query: HOME_PAGE_QUERY, tags: ['homePage'] }).catch(() => null),
    sanityFetch<any[]>({ query: ALL_SERVICES_QUERY, tags: ['servicePage'] }).catch(() => []),
    sanityFetch<any[]>({ query: ALL_SERVICE_AREAS_QUERY, tags: ['serviceArea'] }).catch(() => []),
    sanityFetch<any>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] }).catch(() => null),
  ])

  const phone = BUSINESS.phone
  const reviewCount = settings?.reviewCount ?? BUSINESS.rating.count
  const reviewRating = settings?.reviewRating ?? BUSINESS.rating.value

  const hero = homePage?.hero
  const intro = homePage?.introStrip
  const whyUs = homePage?.whyUsSection
  const testimonialsSection = homePage?.testimonialsSection
  const ctaBanner = homePage?.ctaBanner
  const gallery = homePage?.gallery
  const financing = homePage?.financing
  const awards = homePage?.awards
  const blogFeed = homePage?.blogFeed
  const partnerLogos = homePage?.partnerLogos

  const schema = localBusinessSchema({
    name: BUSINESS.name,
    phone: phone,
    address: BUSINESS.address,
    hours: BUSINESS.hours,
    rating: { value: reviewRating, count: reviewCount },
    siteUrl: SITE_URL,
  })

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        headline={hero?.headline}
        subheadline={hero?.subheadline}
        primaryCta={hero?.primaryCta}
        secondaryCta={hero?.secondaryCta}
        backgroundImageUrl={sanityImageUrl(hero?.backgroundImage?.asset?.url)}
        badges={hero?.badges}
        phone={phone}
        rating={{ value: reviewRating, count: reviewCount }}
      />

      {/* Trust / Stats */}
      {(intro?.enabled !== false) && (
        <TrustSignals
          heading={intro?.heading}
          body={intro?.body}
          stats={intro?.stats}
        />
      )}

      {/* Services — falls back to static data when Sanity has none */}
      <ServicesGrid
        heading={homePage?.servicesSection?.heading}
        subheading={homePage?.servicesSection?.subheading}
        services={
          homePage?.servicesSection?.featuredServices?.length
            ? homePage.servicesSection.featuredServices
            : services.length > 0
              ? services
              : STATIC_SERVICES
        }
      />

      {/* Testimonials — just below "Our Roofing Services" */}
      {(testimonialsSection?.enabled !== false) && testimonialsSection?.featuredTestimonials?.length > 0 && (
        <Testimonials
          heading={testimonialsSection.heading}
          testimonials={testimonialsSection.featuredTestimonials}
          reviewCount={reviewCount}
          reviewRating={reviewRating}
        />
      )}

      {/* Partner Logos (extra, defaults off) */}
      {partnerLogos?.enabled && <PartnerLogos heading={partnerLogos.heading} logos={partnerLogos.logos} />}

      {/* Why Us */}
      {(whyUs?.enabled !== false) && (
        <WhyUs
          heading={whyUs?.heading}
          subheading={whyUs?.subheading}
          reasons={whyUs?.reasons}
        />
      )}

      {/* Awards (extra, defaults off) */}
      {awards?.enabled && <Awards heading={awards.heading} items={awards.items} />}

      {/* Gallery (extra, defaults off) */}
      {gallery?.enabled && <Gallery heading={gallery.heading} subheading={gallery.subheading} images={gallery.images} />}

      {/* Financing (extra, defaults off) */}
      {financing?.enabled && (
        <Financing
          heading={financing.heading}
          body={financing.body}
          features={financing.features}
          ctaLabel={financing.ctaLabel}
          ctaHref={financing.ctaHref}
        />
      )}

      {/* Service Areas */}
      <ServiceAreas
        heading={homePage?.areasSection?.heading}
        subheading={homePage?.areasSection?.subheading}
        backgroundImageUrl={homePage?.areasSection?.backgroundImage?.asset?.url}
      />

      {/* Blog feed (extra, defaults off) */}
      {blogFeed?.enabled && <BlogFeed posts={[]} heading="Roofing Tips & News" />}

      {/* CTA Banner */}
      {(ctaBanner?.enabled !== false) && (
        <CTASection
          heading={ctaBanner?.heading}
          subheading={ctaBanner?.subheading}
          primaryCta={ctaBanner?.primaryCta}
          secondaryCta={ctaBanner?.secondaryCta}
          phone={phone}
        />
      )}
    </>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Service {
  _id: string
  title: string
  slug: string
  shortDescription: string
  icon?: string
  serviceType?: string
  heroImage?: { asset: { url: string }; alt?: string }
}

interface ServicesGridProps {
  heading?: string
  subheading?: string
  services: Service[]
}

export function ServicesGrid({
  heading = 'Our Roofing Services',
  subheading = 'From minor repairs to full replacements — we do it right the first time.',
  services,
}: ServicesGridProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-24" aria-label="Services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">{heading}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{subheading}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-red/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-brand-navy/10 overflow-hidden">
                {service.heroImage?.asset?.url ? (
                  <Image
                    src={service.heroImage.asset.url}
                    alt={service.heroImage.alt || service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-navy to-brand-navy-light">
                    <span className="text-5xl">{service.icon || '🔨'}</span>
                  </div>
                )}
                {service.serviceType && service.serviceType !== 'both' && (
                  <span className="absolute top-3 right-3 rounded-full bg-brand-red px-2.5 py-0.5 text-xs font-semibold text-white capitalize">
                    {service.serviceType}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.shortDescription}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md border-2 border-brand-red px-6 py-3 font-semibold text-brand-red hover:bg-brand-red hover:text-white transition-colors"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

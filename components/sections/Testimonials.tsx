import Image from 'next/image'
import { StarRating } from '@/components/ui/StarRating'

interface Testimonial {
  _id: string
  customerName: string
  location?: string
  rating: number
  quote: string
  serviceReceived?: string
  source?: string
  photo?: { asset: { url: string }; alt?: string }
}

interface TestimonialsProps {
  heading?: string
  testimonials: Testimonial[]
  reviewCount?: number
  reviewRating?: number
}

export function Testimonials({
  heading = 'What Our Customers Say',
  testimonials,
  reviewCount,
  reviewRating = 5.0,
}: TestimonialsProps) {
  if (!testimonials.length) return null

  const displayCount = reviewCount ?? testimonials.length
  const ratingDisplay = reviewRating.toFixed(1)

  return (
    <section className="bg-gray-50 py-16 sm:py-24" aria-label="Customer testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">Verified Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-6">{heading}</h2>

          {/* Aggregate rating banner */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl px-8 py-5 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-5xl font-display font-extrabold text-brand-navy leading-none">{ratingDisplay}</span>
              <StarRating rating={5} size="lg" className="mt-1" />
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-2xl font-bold text-brand-navy">{displayCount}+</span>
              <span className="text-sm text-gray-500 font-medium">5-Star Google Reviews</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            {/* Google "G" badge */}
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-gray-600">Google</span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md hover:border-brand-red/20 transition-all"
            >
              {/* Top row: avatar + name + source */}
              <div className="flex items-start gap-3">
                {t.photo?.asset?.url ? (
                  <Image
                    src={t.photo.asset.url}
                    alt={t.customerName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {t.customerName[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-navy text-sm leading-tight">{t.customerName}</p>
                  {t.location && <p className="text-xs text-gray-400 mt-0.5">{t.location}</p>}
                  <div className="flex items-center gap-1 mt-1">
                    <StarRating rating={t.rating} size="sm" />
                  </div>
                </div>
                {/* Google icon in card */}
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 border-l-2 border-brand-red/30 pl-3 italic">
                "{t.quote}"
              </blockquote>

              {/* Service badge */}
              {t.serviceReceived && (
                <span className="text-xs font-semibold text-brand-red bg-brand-red/8 rounded-full px-3 py-1 w-fit border border-brand-red/20">
                  {t.serviceReceived}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm mb-4">
            Join {displayCount}+ satisfied homeowners and businesses across Massachusetts.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark transition-colors shadow-md shadow-brand-red/20"
          >
            Get Your Free Estimate
          </a>
        </div>
      </div>
    </section>
  )
}

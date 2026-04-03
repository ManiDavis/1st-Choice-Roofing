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
  sourceUrl?: string
  photo?: { asset: { url: string }; alt?: string }
  active?: boolean
}

interface TestimonialsProps {
  heading?: string
  reviewCountLabel?: string
  testimonials: Testimonial[]
}

const sourceLabel: Record<string, string> = {
  google: 'Google',
  facebook: 'Facebook',
  yelp: 'Yelp',
  direct: 'Direct',
}

const SourceIcon = ({ source }: { source?: string }) => {
  if (source === 'google') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
      </svg>
    )
  }
  if (source === 'facebook') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    )
  }
  return <span className="text-xs font-medium">★</span>
}

export function Testimonials({
  heading = 'What Our Customers Say',
  reviewCountLabel = '14+',
  testimonials,
}: TestimonialsProps) {
  const active = testimonials.filter((t) => t.active !== false)
  if (!active.length) return null

  return (
    <section className="bg-white py-16 sm:py-24" aria-label="Customer testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Real Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-5">{heading}</h2>
          {/* Aggregate badge */}
          <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5">
            <StarRating rating={5} size="md" />
            <span className="text-brand-navy font-semibold text-sm">
              5.0 Average &middot; <span className="text-brand-gold font-bold">{reviewCountLabel} 5-Star Reviews</span>
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {active.map((t) => (
            <div
              key={t._id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <blockquote className="text-gray-700 leading-relaxed flex-1 relative">
                <span className="absolute -top-2 -left-1 text-4xl text-brand-gold/20 font-serif leading-none select-none">&ldquo;</span>
                <p className="pt-3 pl-3">{t.quote}</p>
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                {t.photo?.asset?.url ? (
                  <Image
                    src={t.photo.asset.url}
                    alt={t.customerName}
                    width={44}
                    height={44}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold font-bold text-lg flex-shrink-0">
                    {t.customerName[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-navy text-sm truncate">{t.customerName}</p>
                  <p className="text-xs text-gray-500">
                    {t.location && `${t.location} · `}
                    {t.sourceUrl ? (
                      <a
                        href={t.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brand-gold hover:underline"
                      >
                        <SourceIcon source={t.source} />
                        {sourceLabel[t.source || ''] || 'Google'}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-500">
                        <SourceIcon source={t.source} />
                        {sourceLabel[t.source || ''] || 'Google'}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {t.serviceReceived && (
                <p className="text-xs font-medium text-brand-gold bg-amber-50 border border-amber-100 rounded-full px-3 py-1 w-fit">
                  {t.serviceReceived}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

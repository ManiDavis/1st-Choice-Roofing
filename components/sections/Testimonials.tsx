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
}

const sourceIcons: Record<string, string> = {
  google: '🔍 Google',
  facebook: '📘 Facebook',
  yelp: '⭐ Yelp',
  direct: '✉️ Direct',
}

export function Testimonials({
  heading = 'What Our Customers Say',
  testimonials,
}: TestimonialsProps) {
  if (!testimonials.length) return null

  return (
    <section className="bg-white py-16 sm:py-24" aria-label="Customer testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">Real Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">{heading}</h2>
          {/* Aggregate stars */}
          <div className="inline-flex items-center gap-2">
            <StarRating rating={5} size="lg" />
            <span className="text-gray-600 font-medium">5.0 Average · {testimonials.length}+ Reviews</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <blockquote className="text-gray-700 leading-relaxed flex-1">
                <span className="text-3xl text-brand-red/30 font-serif leading-none">"</span>
                {t.quote}
                <span className="text-3xl text-brand-red/30 font-serif leading-none">"</span>
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                {t.photo?.asset?.url ? (
                  <Image
                    src={t.photo.asset.url}
                    alt={t.customerName}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-lg">
                    {t.customerName[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-brand-navy text-sm">{t.customerName}</p>
                  <p className="text-xs text-gray-500">
                    {t.location && `${t.location} · `}
                    {t.source ? sourceIcons[t.source] || t.source : 'Google'}
                  </p>
                </div>
              </div>

              {t.serviceReceived && (
                <p className="text-xs font-medium text-brand-red bg-brand-red/5 rounded-full px-3 py-1 w-fit">
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

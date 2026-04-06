import Link from 'next/link'
import Image from 'next/image'
import { formatPhone } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'

interface HeroProps {
  headline?: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  backgroundImageUrl?: string
  badges?: string[]
  phone: string
  rating?: { value: number; count: number }
}

export function Hero({
  headline = "Massachusetts's #1 Roofing Contractor",
  subheadline = 'Licensed & Insured • Free Estimates • Residential & Commercial • Serving All of Massachusetts',
  primaryCta = { label: 'Get a Free Estimate', href: '/contact' },
  secondaryCta,
  backgroundImageUrl,
  badges = ['Licensed & Insured', 'Free Estimates', '5-Star Rated', 'Same-Day Response'],
  phone,
  rating = { value: 5, count: 14 },
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-navy">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt="Roofing work by 1st Choice Roofing"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        ) : (
          /* Geometric pattern fallback */
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(192,57,43,0.3) 40px, rgba(192,57,43,0.3) 80px)`,
            }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-navy/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Rating pill */}
          {rating && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <StarRating rating={rating.value} size="sm" />
              <span className="text-sm font-medium text-white">{rating.value} Stars · {rating.count}+ Google Reviews</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight mb-5">
            {headline.split('&').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-brand-red">&</span>}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-8 py-4 text-lg font-bold text-white hover:bg-brand-red-dark transition-all shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {primaryCta.label}
            </Link>
            <a
              href={formatPhone(phone)}
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-brand-navy transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call {phone}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            {badges.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-sm text-gray-300">
                <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Angled bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
    </section>
  )
}

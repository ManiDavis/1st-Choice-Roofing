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
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">

      {/* Background layer */}
      <div className="absolute inset-0 bg-[#0d1117]">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt="Professional roofing work by 1st Choice Roofing"
            fill
            className="object-cover opacity-55"
            priority
            sizes="100vw"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(217,119,6,0.4) 40px, rgba(217,119,6,0.4) 80px)`,
            }}
          />
        )}
        {/* Directional gradient — dark left for readability, fades right to show image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-[#0d1117]/25" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Rating pill */}
          {rating && (
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
              <StarRating rating={rating.value} size="sm" />
              <span className="text-sm font-semibold text-white tracking-wide">
                {rating.value} Stars &nbsp;·&nbsp; {rating.count}+ Google Reviews
              </span>
            </div>
          )}

          {/* Gold eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-brand-gold rounded-full" />
            <span className="text-brand-gold text-sm font-bold uppercase tracking-widest">Massachusetts Roofing Experts</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
            {headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line.split('&').map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && <span className="text-brand-gold">&</span>}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-8 py-4 text-base font-bold text-brand-navy hover:bg-amber-400 transition-all shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {primaryCta.label}
            </Link>
            <a
              href={formatPhone(phone)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 px-8 py-4 text-base font-bold text-white hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call {phone}
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
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

        {/* Stats strip — desktop only, bottom right */}
        <div className="hidden lg:flex absolute right-0 bottom-24 flex-col items-end gap-6 pr-2">
          {[
            { value: '500+', label: 'Roofs Completed' },
            { value: '10+', label: 'Years Experience' },
            { value: '5★', label: 'Google Rating' },
          ].map(({ value, label }) => (
            <div key={label} className="text-right">
              <div className="text-4xl font-extrabold text-brand-gold leading-none">{value}</div>
              <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Angled bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  )
}

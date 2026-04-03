import Link from 'next/link'
import { formatPhone } from '@/lib/utils'

interface CTASectionProps {
  heading?: string
  subheading?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  phone: string
}

export function CTASection({
  heading = 'Ready to Get Your Free Estimate?',
  subheading = 'Call us or fill out the form. We get back to you the same day.',
  primaryCta = { label: 'Get Free Estimate', href: '/contact' },
  secondaryCta,
  phone,
}: CTASectionProps) {
  return (
    <section
      className="relative bg-brand-navy py-16 sm:py-24 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Decorative diagonal accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, #F59E0B 0%, transparent 50%)',
          clipPath: 'polygon(0 0, 35% 0, 55% 100%, 0 100%)',
        }}
      />
      {/* Gold accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-light to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
          <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">Free Estimates · Same-Day Response</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mb-4">
          {heading}
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">{subheading}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-8 py-4 text-lg font-bold text-brand-navy hover:bg-brand-gold-dark transition-colors shadow-lg shadow-brand-gold/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {primaryCta.label}
          </Link>
          <a
            href={formatPhone(phone)}
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/40 px-8 py-4 text-lg font-bold text-white hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  )
}

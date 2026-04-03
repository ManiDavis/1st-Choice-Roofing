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
      className="relative bg-brand-red py-16 sm:py-24 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Diagonal overlay */}
      <div className="absolute inset-0 bg-brand-red-dark opacity-30" style={{ clipPath: 'polygon(0 0, 40% 0, 60% 100%, 0 100%)' }} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mb-4">
          {heading}
        </h2>
        <p className="text-lg text-red-100 mb-10 max-w-2xl mx-auto">{subheading}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-8 py-4 text-lg font-bold text-brand-red hover:bg-gray-100 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {primaryCta.label}
          </Link>
          <a
            href={formatPhone(phone)}
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-colors"
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

import Link from 'next/link'

interface FinancingProps {
  heading?: string
  body?: string
  features?: string[]
  ctaLabel?: string
  ctaHref?: string
}

export function Financing({
  heading = 'Flexible Financing Available',
  body = 'A new roof is a major investment. We partner with trusted lenders to offer financing options that fit your budget — so you can get the roof you need today and pay over time.',
  features = [
    'Low monthly payments available',
    'Competitive interest rates',
    'Fast approval process',
    'No prepayment penalties',
  ],
  ctaLabel = 'Ask About Financing',
  ctaHref = '/contact',
}: FinancingProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy rounded-3xl px-8 py-12 md:px-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Financing</p>
            <h2 className="text-3xl font-display font-bold text-white mb-4">{heading}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{body}</p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
          <ul className="space-y-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <svg className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

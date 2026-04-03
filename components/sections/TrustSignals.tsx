interface TrustSignalsProps {
  stats?: { value: string; label: string }[]
  heading?: string
  body?: string
}

const defaultStats = [
  { value: '500+', label: 'Roofs Completed' },
  { value: '5.0★', label: 'Google Rating' },
  { value: '10+', label: 'Years Experience' },
  { value: '3', label: 'Expert Crews' },
]

export function TrustSignals({
  stats = defaultStats,
  heading = 'Proudly Serving Webster, MA & the Greater Worcester Area',
  body = 'We're a locally-owned, fully licensed and insured roofing contractor with crews dedicated to residential and commercial work. When you call 1st Choice Roofing, you get an experienced local team that knows Massachusetts weather, local building codes, and your neighborhood.',
}: TrustSignalsProps) {
  return (
    <section className="bg-white py-14 sm:py-20" aria-label="About us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">Trusted Local Roofers</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-5">{heading}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{body}</p>
            {/* Checklist */}
            <ul className="space-y-2.5">
              {[
                'Fully licensed & insured in Massachusetts',
                'Residential & commercial crews available',
                'Same-day response on inquiries',
                'Free, no-obligation estimates',
                'All work backed by our quality guarantee',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700">
                  <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100 hover:border-brand-red/30 hover:shadow-md transition-all"
              >
                <p className="text-4xl font-display font-extrabold text-brand-red mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

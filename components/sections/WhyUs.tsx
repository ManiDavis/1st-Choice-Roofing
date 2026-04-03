interface Reason {
  icon?: string
  title: string
  description: string
}

interface WhyUsProps {
  heading?: string
  subheading?: string
  reasons?: Reason[]
}

const defaultReasons: Reason[] = [
  {
    icon: '🏆',
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured in Massachusetts. Every job is covered, giving you total peace of mind.',
  },
  {
    icon: '📞',
    title: 'Same-Day Response',
    description: 'We reply fast. Most inquiries get a callback within 2 hours during business hours.',
  },
  {
    icon: '🏠',
    title: 'Residential Specialists',
    description: 'Two dedicated residential crews mean we can handle multiple projects without sacrificing quality.',
  },
  {
    icon: '🏢',
    title: 'Commercial Experts',
    description: 'A dedicated commercial crew with experience on flat roofs, TPO, EPDM and large commercial installs.',
  },
  {
    icon: '💰',
    title: 'Free, Honest Estimates',
    description: "No pressure, no games. We give you a clear, itemised quote so you know exactly what you're paying for.",
  },
  {
    icon: '✅',
    title: 'Quality Guarantee',
    description: "We stand behind every roof we install. If there's an issue, we come back and fix it.",
  },
]

export function WhyUs({
  heading = 'Why Choose 1st Choice Roofing?',
  subheading = 'Three crews. Local knowledge. A reputation built on honest work.',
  reasons = defaultReasons,
}: WhyUsProps) {
  return (
    <section className="bg-white py-16 sm:py-24" aria-label="Why choose us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">Our Promise</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">{heading}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{subheading}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div key={i} className="group rounded-2xl p-7 border border-gray-100 hover:border-brand-red/30 hover:shadow-lg transition-all bg-gray-50 hover:bg-white">
              <div className="mb-4 text-4xl">{reason.icon}</div>
              <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { BUSINESS } from '@/lib/utils'

interface ServiceArea {
  _id: string
  name: string
  state: string
  slug: string
}

interface ServiceAreasProps {
  heading?: string
  subheading?: string
  areas?: ServiceArea[]
}

// Fallback static areas for before Sanity content exists
const fallbackAreas = BUSINESS.serviceAreas.map((name, i) => ({
  _id: String(i),
  name,
  state: 'MA',
  slug: name.toLowerCase().replace(/\s+/g, '-'),
}))

export function ServiceAreas({
  heading = 'Serving All of Worcester County, MA',
  subheading = 'Fast local response — we know your neighbourhood.',
  areas,
}: ServiceAreasProps) {
  const displayAreas = areas && areas.length > 0 ? areas : fallbackAreas

  return (
    <section className="bg-brand-navy py-16 sm:py-24 relative overflow-hidden" aria-label="Service areas">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Coverage</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">{heading}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayAreas.map((area) => (
            <Link
              key={area._id}
              href={`/service-areas/${area.slug}`}
              className="group flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {area.name}, {area.state}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm mb-4">Don't see your town? We likely cover it.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-dark transition-colors"
          >
            Check Your Area & Get a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}

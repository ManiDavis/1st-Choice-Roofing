import Link from 'next/link'
import Image from 'next/image'
import { sanityImageUrl } from '@/lib/utils'

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
  backgroundImageUrl?: string
}

// MA counties as fallback static data
const fallbackAreas: ServiceArea[] = [
  { _id: '1', name: 'Worcester County', state: 'MA', slug: 'worcester-county' },
  { _id: '2', name: 'Middlesex County', state: 'MA', slug: 'middlesex-county' },
  { _id: '3', name: 'Norfolk County', state: 'MA', slug: 'norfolk-county' },
  { _id: '4', name: 'Suffolk County', state: 'MA', slug: 'suffolk-county' },
  { _id: '5', name: 'Essex County', state: 'MA', slug: 'essex-county' },
  { _id: '6', name: 'Plymouth County', state: 'MA', slug: 'plymouth-county' },
  { _id: '7', name: 'Bristol County', state: 'MA', slug: 'bristol-county' },
  { _id: '8', name: 'Hampden County', state: 'MA', slug: 'hampden-county' },
  { _id: '9', name: 'Hampshire County', state: 'MA', slug: 'hampshire-county' },
  { _id: '10', name: 'Franklin County', state: 'MA', slug: 'franklin-county' },
  { _id: '11', name: 'Berkshire County', state: 'MA', slug: 'berkshire-county' },
  { _id: '12', name: 'Barnstable County', state: 'MA', slug: 'barnstable-county' },
]

export function ServiceAreas({
  heading = 'Serving All of Massachusetts',
  subheading = 'From Worcester County to Cape Cod — and beyond. We go where the roof takes us.',
  areas,
  backgroundImageUrl,
}: ServiceAreasProps) {
  const displayAreas = areas && areas.length > 0 ? areas : fallbackAreas

  return (
    <section className="bg-brand-navy py-16 sm:py-24 relative overflow-hidden" aria-label="Service areas">
      {/* Background image (aerial shot) */}
      {backgroundImageUrl && (
        <>
          <Image
            src={sanityImageUrl(backgroundImageUrl, { width: 1920, quality: 80 })!}
            alt="Massachusetts service area"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/50 to-brand-navy/80" />
        </>
      )}

      {/* Fallback dot pattern when no image */}
      {!backgroundImageUrl && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Coverage</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">{heading}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {displayAreas.map((area) => (
            <Link
              key={area._id}
              href={`/service-areas/${area.slug}`}
              className="group flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/40 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {area.name}
            </Link>
          ))}
        </div>

        {/* New England note */}
        <p className="text-center text-gray-400 text-sm mt-6 italic">
          And all of New England — CT, RI, NH, VT, ME
        </p>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm mb-4">Not sure if we cover your area? We likely do — just ask.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20"
          >
            Check Your Area &amp; Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  )
}

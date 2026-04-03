import Image from 'next/image'

interface Logo {
  name: string
  logo?: { asset: { url: string } }
}

interface PartnerLogosProps {
  heading?: string
  logos: Logo[]
}

export function PartnerLogos({ heading = 'Trusted Brands We Install', logos }: PartnerLogosProps) {
  if (!logos?.length) return null
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">{heading}</p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo, i) => (
            <div key={i} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              {logo.logo?.asset?.url ? (
                <Image src={logo.logo.asset.url} alt={logo.name} width={100} height={50} className="object-contain h-12 w-auto" />
              ) : (
                <span className="text-sm font-bold text-gray-400">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

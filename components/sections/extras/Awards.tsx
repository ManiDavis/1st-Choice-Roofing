import Image from 'next/image'

interface AwardItem {
  name: string
  logo?: { asset: { url: string } }
  description?: string
}

interface AwardsProps {
  heading?: string
  items: AwardItem[]
}

export function Awards({ heading = 'Certifications & Awards', items }: AwardsProps) {
  if (!items?.length) return null
  return (
    <section className="bg-white py-16 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">{heading}</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              {item.logo?.asset?.url ? (
                <Image src={item.logo.asset.url} alt={item.name} width={80} height={80} className="object-contain" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">🏅</div>
              )}
              <p className="text-xs font-medium text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

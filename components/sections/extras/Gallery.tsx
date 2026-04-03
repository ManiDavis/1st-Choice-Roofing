import Image from 'next/image'

interface GalleryImage {
  asset: { url: string }
  alt?: string
  caption?: string
}

interface GalleryProps {
  heading?: string
  subheading?: string
  images: GalleryImage[]
}

export function Gallery({ heading = 'Our Work', subheading, images }: GalleryProps) {
  if (!images?.length) return null
  return (
    <section className="bg-white py-16 sm:py-24" aria-label="Photo gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-2">{heading}</h2>
          {subheading && <p className="text-gray-500">{subheading}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image
                src={img.asset.url}
                alt={img.alt || `Roofing project ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt?: string
  featuredImage?: { asset: { url: string }; alt?: string }
  categories?: string[]
}

interface BlogFeedProps {
  posts: BlogPost[]
  heading?: string
}

export function BlogFeed({ posts, heading = 'Roofing Tips & News' }: BlogFeedProps) {
  if (!posts?.length) return null
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-2">Blog</p>
            <h2 className="text-3xl font-display font-bold text-brand-navy">{heading}</h2>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="relative h-48 bg-gray-100">
                {post.featuredImage?.asset?.url ? (
                  <Image src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                ) : (
                  <div className="flex items-center justify-center h-full bg-brand-navy/10 text-5xl">📰</div>
                )}
              </div>
              <div className="p-6">
                {post.publishedAt && (
                  <p className="text-xs text-gray-400 mb-2">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                )}
                <h3 className="font-bold text-brand-navy group-hover:text-brand-red transition-colors mb-2 line-clamp-2">{post.title}</h3>
                {post.excerpt && <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/client'
import { ALL_BLOG_POSTS_QUERY } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Roofing Blog — Tips, News & Guides for Massachusetts Homeowners',
  description: 'Roofing tips, guides, and news for Massachusetts homeowners from 1st Choice Roofing. Learn how to maintain your roof and protect your home.',
  alternates: { canonical: `${SITE_URL}/blog` },
}

const categoryLabels: Record<string, string> = {
  tips: 'Roofing Tips',
  residential: 'Residential',
  commercial: 'Commercial',
  maintenance: 'Maintenance',
  'storm-damage': 'Storm Damage',
  news: 'News',
}

export default async function BlogPage() {
  const posts = await sanityFetch<any[]>({ query: ALL_BLOG_POSTS_QUERY, tags: ['blogPost'] }).catch(() => [])

  return (
    <>
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Knowledge Centre</p>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">Roofing Blog</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Tips, guides and news for Massachusetts homeowners from the team at 1st Choice Roofing.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-brand-navy mb-2">Coming Soon</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Our roofing tips and guides are on the way. Check back soon for helpful content from the 1st Choice team.
              </p>
            </div>
          ) : (
            <>
              {/* Featured post (first one) */}
              {posts.length > 0 && (
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="group block mb-12 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto min-h-64 bg-gray-100">
                      {posts[0].featuredImage?.asset?.url ? (
                        <Image
                          src={posts[0].featuredImage.asset.url}
                          alt={posts[0].featuredImage.alt || posts[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-brand-navy/5 text-6xl">📰</div>
                      )}
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1 rounded-full">
                          Featured
                        </span>
                        {posts[0].categories?.slice(0, 2).map((cat: string) => (
                          <span key={cat} className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                            {categoryLabels[cat] || cat}
                          </span>
                        ))}
                      </div>
                      {posts[0].publishedAt && (
                        <p className="text-xs text-gray-400 mb-2">
                          {new Date(posts[0].publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy group-hover:text-brand-gold transition-colors mb-3">
                        {posts[0].title}
                      </h2>
                      {posts[0].excerpt && (
                        <p className="text-gray-600 leading-relaxed mb-5 line-clamp-3">{posts[0].excerpt}</p>
                      )}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold">
                        Read Article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Remaining posts grid */}
              {posts.length > 1 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative h-48 bg-gray-100 flex-shrink-0">
                        {post.featuredImage?.asset?.url ? (
                          <Image
                            src={post.featuredImage.asset.url}
                            alt={post.featuredImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-brand-navy/5 text-5xl">📰</div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        {post.categories?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.categories.slice(0, 2).map((cat: string) => (
                              <span key={cat} className="inline-block bg-amber-50 text-brand-gold text-xs font-medium px-2.5 py-0.5 rounded-full border border-amber-100">
                                {categoryLabels[cat] || cat}
                              </span>
                            ))}
                          </div>
                        )}
                        {post.publishedAt && (
                          <p className="text-xs text-gray-400 mb-1.5">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        )}
                        <h2 className="font-bold text-lg text-brand-navy group-hover:text-brand-gold transition-colors mb-2 line-clamp-2 flex-1">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                        )}
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold mt-auto">
                          Read More
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

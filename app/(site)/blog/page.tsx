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

export default async function BlogPage() {
  const posts = await sanityFetch<any[]>({ query: ALL_BLOG_POSTS_QUERY, tags: ['blogPost'] }).catch(() => [])

  return (
    <>
      <section className="bg-brand-navy py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Knowledge Centre</p>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">Roofing Blog</h1>
          <p className="text-gray-300 max-w-xl mx-auto">Tips, guides and news for Massachusetts homeowners from the team at 1st Choice Roofing.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📝</p>
              <h2 className="text-2xl font-bold text-brand-navy mb-2">Coming Soon</h2>
              <p className="text-gray-500">Roofing tips and guides are being added. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all">
                  <div className="relative h-48 bg-gray-100">
                    {post.featuredImage?.asset?.url ? (
                      <Image src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-brand-navy/10 text-5xl">📰</div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.publishedAt && (
                      <p className="text-xs text-gray-400 mb-2">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                    <h2 className="font-bold text-lg text-brand-navy group-hover:text-brand-red transition-colors mb-2 line-clamp-2">{post.title}</h2>
                    {post.excerpt && <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>}
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-red">
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
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/client'
import { BLOG_POST_BY_SLUG_QUERY, BLOG_SLUGS_QUERY } from '@/sanity/lib/queries'
import { CTASection } from '@/components/sections/CTASection'
import { breadcrumbSchema, blogPostSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: BLOG_SLUGS_QUERY, tags: ['blogPost'] }).catch(() => [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch<any>({ query: BLOG_POST_BY_SLUG_QUERY, params: { slug: params.slug }, tags: ['blogPost'] }).catch(() => null)
  if (!post) return {}

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.featuredImage?.asset?.url ? [{ url: post.featuredImage.asset.url }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await sanityFetch<any>({ query: BLOG_POST_BY_SLUG_QUERY, params: { slug: params.slug }, tags: ['blogPost'] }).catch(() => null)
  if (!post) notFound()

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: post.title, url: `${SITE_URL}/blog/${params.slug}` },
    ]),
    blogPostSchema({
      title: post.title,
      description: post.excerpt || '',
      url: `${SITE_URL}/blog/${params.slug}`,
      publishedAt: post.publishedAt,
      imageUrl: post.featuredImage?.asset?.url,
      businessName: BUSINESS.name,
      businessUrl: SITE_URL,
    }),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Header */}
      <section className="bg-brand-navy py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">{post.title}</h1>
          {post.publishedAt && (
            <p className="text-gray-400 text-sm">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {post.featuredImage?.asset?.url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-red prose-img:rounded-xl">
            <PortableText value={post.body} />
          </div>
        </div>
      </section>

      <CTASection phone={BUSINESS.phone} heading="Need a Roofer in Massachusetts?" subheading="Get a free estimate from 1st Choice Roofing today." />
    </>
  )
}

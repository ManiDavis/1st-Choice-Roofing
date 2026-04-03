import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { SERVICE_SLUGS_QUERY, SERVICE_AREA_SLUGS_QUERY, BLOG_SLUGS_QUERY } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceslugs, areaslugs, blogslugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY).catch(() => []),
    client.fetch<{ slug: string }[]>(SERVICE_AREA_SLUGS_QUERY).catch(() => []),
    client.fetch<{ slug: string }[]>(BLOG_SLUGS_QUERY).catch(() => []),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceslugs.map(({ slug }) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const areaPages: MetadataRoute.Sitemap = areaslugs.map(({ slug }) => ({
    url: `${SITE_URL}/service-areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogslugs.map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages]
}

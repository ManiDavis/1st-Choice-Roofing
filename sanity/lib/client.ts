import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

const baseClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    // Embed invisible metadata in strings so the Presentation overlay
    // can link UI elements back to their Sanity document + field.
    enabled: true,
    studioUrl: '/studio',
  },
})

// Re-export for any direct client usage (mutations, etc.)
export const client = baseClient

export function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}) {
  // In draft mode (Presentation tool): fetch draft content in real-time,
  // no caching. On the live site: fetch published content, cache 60s.
  const isDraft = draftMode().isEnabled

  return baseClient.fetch<T>(query, params, {
    perspective: isDraft ? 'previewDrafts' : 'published',
    stega: isDraft,
    next: {
      revalidate: isDraft ? 0 : 60,
      tags,
    },
  })
}

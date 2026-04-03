import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // disable CDN so draft mode always gets fresh data
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  // Safe draft mode check — throws outside Server Component / Route Handler context
  let isDraftMode = false
  try {
    const { draftMode } = await import('next/headers')
    isDraftMode = draftMode().isEnabled
  } catch {
    isDraftMode = false
  }

  if (isDraftMode) {
    return client.fetch<T>(query, params, {
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
      cache: 'no-store',
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    } as any)
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  })
}

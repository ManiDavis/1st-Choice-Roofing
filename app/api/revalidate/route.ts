import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const TAGS: Record<string, string[]> = {
  siteSettings: ['siteSettings'],
  homePage: ['homePage'],
  servicePage: ['servicePage'],
  serviceArea: ['serviceArea'],
  testimonial: ['testimonial'],
  blogPost: ['blogPost'],
  faq: ['faq'],
  teamMember: ['teamMember'],
  page: ['page'],
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const documentType = body._type as string | undefined

  if (documentType && TAGS[documentType]) {
    TAGS[documentType].forEach(revalidateTag)
  } else {
    // Revalidate everything
    Object.values(TAGS).flat().forEach(revalidateTag)
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}

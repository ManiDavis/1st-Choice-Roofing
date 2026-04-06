import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
    request.url
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  draftMode().enable()
  redirect(redirectTo)
}

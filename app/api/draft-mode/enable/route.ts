import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * Called by Sanity Presentation tool to enable Next.js Draft Mode.
 * Sanity passes a `secret` query param — validate it against SANITY_REVALIDATE_SECRET.
 * Falls back to allowing all requests when no secret is configured (local dev convenience).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const redirectTo = searchParams.get('redirect') || '/'

  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  // If a secret is configured, enforce it
  if (expectedSecret) {
    if (!secret || secret !== expectedSecret) {
      return new Response('Invalid secret', { status: 401 })
    }
  }

  draftMode().enable()

  // redirect() throws internally — must be called outside try/catch
  redirect(redirectTo)
}

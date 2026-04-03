import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * Called by Sanity Presentation tool to enable Next.js Draft Mode.
 *
 * Sanity sends:
 *   ?sanity-preview-view-secret=<token>
 *   &sanity-preview-perspective=drafts
 *   &sanity-preview-pathname=<path>
 *
 * Validating the Sanity-generated secret properly requires @sanity/preview-url-secret.
 * For local development we skip that validation — the Studio is already authenticated.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  // Sanity sends the redirect path as sanity-preview-pathname
  const redirectTo = searchParams.get('sanity-preview-pathname') || '/'

  draftMode().enable()
  redirect(redirectTo)
}

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * Disables Next.js Draft Mode and redirects back to the site.
 * Called when the user clicks "Exit Draft Mode" in the Visual Editing toolbar.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const redirectTo = searchParams.get('redirect') || '/'

  draftMode().disable()
  redirect(redirectTo)
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface OfferBannerProps {
  text: string
  ctaLabel?: string
  ctaHref?: string
  backgroundColor?: 'red' | 'navy' | 'gold' | 'green'
  dismissible?: boolean
}

const bgMap = {
  red: 'bg-brand-red text-white',
  navy: 'bg-brand-navy text-white',
  gold: 'bg-brand-gold text-brand-navy',
  green: 'bg-green-700 text-white',
}

export function OfferBanner({
  text,
  ctaLabel,
  ctaHref = '/contact',
  backgroundColor = 'red',
  dismissible = true,
}: OfferBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className={cn(
        'relative z-50 flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium text-center',
        bgMap[backgroundColor]
      )}
      role="banner"
      aria-label="Promotional offer"
    >
      <span>{text}</span>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className={cn(
            'rounded px-3 py-0.5 text-xs font-bold border-2 transition-colors',
            backgroundColor === 'gold'
              ? 'border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
              : 'border-white text-white hover:bg-white hover:text-brand-red'
          )}
        >
          {ctaLabel}
        </Link>
      )}
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss offer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

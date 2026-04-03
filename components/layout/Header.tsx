'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn, formatPhone } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

interface HeaderProps {
  phone: string
  logoUrl?: string
  navLinks?: NavLink[]
  businessName: string
}

export function Header({ phone, logoUrl, navLinks, businessName }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const defaultLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Residential Roofing', href: '/services/residential-roofing' },
        { label: 'Commercial Roofing', href: '/services/commercial-roofing' },
        { label: 'Roof Repair', href: '/services/roof-repair' },
        { label: 'Roof Replacement', href: '/services/roof-replacement' },
        { label: 'Gutter Services', href: '/services/gutter-services' },
        { label: 'Roof Inspection', href: '/services/roof-inspection' },
      ],
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  const links = navLinks && navLinks.length > 0 ? navLinks : defaultLinks

  const logoSrc = logoUrl || '/logo.jpg'

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-brand-navy shadow-lg'
          : 'bg-brand-navy/95 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label={`${businessName} home`}>
            <Image
              src={logoSrc}
              alt={businessName}
              width={120}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {links.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                >
                  {link.label}
                  {link.children && (
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
                {link.children && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-white shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={formatPhone(phone)}
              className="flex items-center gap-2 text-white font-semibold hover:text-brand-gold transition-colors"
              aria-label={`Call us at ${phone}`}
            >
              <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {phone}
            </a>
            <Link
              href="/contact"
              className="rounded-md bg-brand-gold px-4 py-2 text-sm font-bold text-brand-navy hover:bg-brand-gold-dark transition-colors"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-brand-navy">
          <nav className="px-4 py-3 space-y-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-1.5 text-sm text-gray-400 hover:text-brand-gold rounded-md transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 pb-2 border-t border-white/10 space-y-2">
              <a
                href={formatPhone(phone)}
                className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-brand-gold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call: {phone}
              </a>
              <Link
                href="/contact"
                className="block w-full text-center rounded-md bg-brand-gold px-4 py-3 text-base font-bold text-brand-navy hover:bg-brand-gold-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

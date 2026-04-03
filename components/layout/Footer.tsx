import Link from 'next/link'
import { formatPhone, BUSINESS } from '@/lib/utils'

interface FooterProps {
  phone?: string
  email?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
  }
  social?: {
    facebook?: string
    instagram?: string
    google?: string
    yelp?: string
  }
  footerText?: string
  businessName?: string
}

export function Footer({
  phone = BUSINESS.phone,
  email,
  address = BUSINESS.address,
  social,
  footerText,
  businessName = BUSINESS.name,
}: FooterProps) {
  const serviceLinks = [
    { label: 'Residential Roofing', href: '/services/residential-roofing' },
    { label: 'Commercial Roofing', href: '/services/commercial-roofing' },
    { label: 'Roof Repair', href: '/services/roof-repair' },
    { label: 'Roof Replacement', href: '/services/roof-replacement' },
    { label: 'Gutter Services', href: '/services/gutter-services' },
    { label: 'Roof Inspection', href: '/services/roof-inspection' },
  ]

  const areaLinks = [
    { label: 'Webster, MA', href: '/service-areas/webster' },
    { label: 'Worcester, MA', href: '/service-areas/worcester' },
    { label: 'Shrewsbury, MA', href: '/service-areas/shrewsbury' },
    { label: 'Auburn, MA', href: '/service-areas/auburn' },
    { label: 'Oxford, MA', href: '/service-areas/oxford' },
    { label: 'Dudley, MA', href: '/service-areas/dudley' },
  ]

  return (
    <footer className="bg-brand-navy text-gray-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="space-y-4">
            <div>
              <span className="text-2xl font-display font-extrabold text-white">
                1<span className="text-brand-red">st</span> Choice
              </span>
              <span className="ml-1 text-sm font-semibold text-brand-gold uppercase tracking-widest">
                Roofing
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {footerText || `Licensed & Insured Roofing Contractor Serving Webster, Worcester & Surrounding Massachusetts Towns.`}
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['Licensed', 'Insured', 'Free Estimates'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                  <svg className="w-3 h-3 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
            {/* Social links */}
            {social && (
              <div className="flex gap-3">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  </a>
                )}
                {social.google && (
                  <a href={social.google} target="_blank" rel="noopener noreferrer" aria-label="Google Reviews" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-brand-red">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Service Areas</h3>
            <ul className="space-y-2">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-brand-red">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={formatPhone(phone)} className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  {phone}
                </a>
              </li>
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4 mt-0.5 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {email}
                  </a>
                </li>
              )}
              <li>
                <div className="flex items-start gap-2 text-gray-400">
                  <svg className="w-4 h-4 mt-0.5 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{address.street}, {address.city}, {address.state} {address.zip}</span>
                </div>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block rounded-md bg-brand-red px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-red-dark transition-colors"
                >
                  Get Free Estimate
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

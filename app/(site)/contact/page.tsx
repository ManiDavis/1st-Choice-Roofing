import type { Metadata } from 'next'
import { EstimateForm } from '@/components/sections/EstimateForm'
import { breadcrumbSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL, formatPhone } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'

export const metadata: Metadata = {
  title: 'Get a Free Roofing Estimate — Webster & Worcester MA',
  description: 'Request a free, no-obligation roofing estimate in Webster, Worcester, or anywhere in Worcester County, MA. Call 1st Choice Roofing or fill out our quick form.',
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  const schema = breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact / Free Estimate', url: `${SITE_URL}/contact` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <section className="bg-brand-navy py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Contact Us</p>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
            Get Your Free Estimate
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Call us or fill out the form below. We get back to you the same day — no obligation, no pressure.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Contact Details</h2>
                <ul className="space-y-5">
                  <li>
                    <a href={formatPhone(BUSINESS.phone)} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Phone</p>
                        <p className="text-xl font-bold text-brand-navy group-hover:text-brand-red transition-colors">{BUSINESS.phone}</p>
                        <p className="text-sm text-gray-500">Mon–Fri 7am–6pm · Sat 8am–4pm</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Based In</p>
                      <p className="text-lg font-bold text-brand-navy">{BUSINESS.address.street}</p>
                      <p className="text-gray-600">{BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}</p>
                      <p className="text-sm text-gray-500 mt-1">Serving all of Worcester County, MA</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-white p-7 border border-gray-100">
                <h3 className="font-bold text-brand-navy mb-4">Business Hours</h3>
                <dl className="space-y-2 text-sm">
                  {[
                    { day: 'Mon – Fri', hours: BUSINESS.hours.weekdays },
                    { day: 'Saturday', hours: BUSINESS.hours.saturday },
                    { day: 'Sunday', hours: BUSINESS.hours.sunday },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between text-gray-700">
                      <dt className="font-medium">{day}</dt>
                      <dd className="text-gray-500">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-brand-red font-medium">Emergency roof repairs available — call anytime.</p>
              </div>

              {/* Google rating */}
              <div className="rounded-2xl bg-brand-navy p-7 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={5} size="md" />
                  <span className="font-bold">5.0 Stars</span>
                </div>
                <p className="text-gray-300 text-sm">{BUSINESS.rating.count}+ verified Google reviews from customers in Webster, Worcester, and surrounding towns.</p>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-xl p-8">
              <h2 className="text-2xl font-display font-bold text-brand-navy mb-2">Request a Free Estimate</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form and we'll be in touch within 2 hours during business hours.</p>
              <EstimateForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

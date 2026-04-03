'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface FAQ {
  _id: string
  question: string
  answer: unknown
}

interface FAQSectionProps {
  faqs: FAQ[]
  heading?: string
}

export function FAQSection({ faqs, heading = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [open, setOpen] = useState<string | null>(null)

  if (!faqs.length) return null

  return (
    <section className="bg-gray-50 py-16 sm:py-24" aria-label="FAQ">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy">{heading}</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq._id} className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === faq._id ? null : faq._id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-brand-navy hover:text-brand-red transition-colors"
                aria-expanded={open === faq._id}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-brand-red transition-transform ${open === faq._id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === faq._id && (
                <div className="px-6 pb-5 prose prose-sm max-w-none text-gray-600">
                  <PortableText value={faq.answer as any} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Static fallback service data — used when Sanity CMS returns no services.
// Keep in sync with the services created in Sanity Studio.

export interface StaticService {
  _id: string
  title: string
  slug: string
  shortDescription: string
  icon: string
  serviceType: 'residential' | 'commercial' | 'both'
  heroImage?: { asset: { url: string }; alt?: string }
}

export const STATIC_SERVICES: StaticService[] = [
  {
    _id: 'static-residential',
    title: 'Residential Roofing',
    slug: 'residential-roofing',
    shortDescription: 'Expert residential roofing installations and replacements for homeowners across Massachusetts. Quality materials, clean job sites, and lasting results.',
    icon: '🏠',
    serviceType: 'residential',
  },
  {
    _id: 'static-commercial',
    title: 'Commercial Roofing',
    slug: 'commercial-roofing',
    shortDescription: 'Commercial roofing solutions for businesses, warehouses, and multi-unit buildings across Massachusetts. Minimal disruption, maximum protection.',
    icon: '🏢',
    serviceType: 'commercial',
  },
  {
    _id: 'static-repair',
    title: 'Roof Repair',
    slug: 'roof-repair',
    shortDescription: 'Fast, reliable roof repairs to stop leaks and protect your home or business. Same-day response available across Massachusetts.',
    icon: '🔧',
    serviceType: 'both',
  },
  {
    _id: 'static-replacement',
    title: 'Roof Replacement',
    slug: 'roof-replacement',
    shortDescription: 'Full roof replacements with premium materials. We remove the old roof, inspect the decking, and install a new roof built to last Massachusetts winters.',
    icon: '🏗️',
    serviceType: 'both',
  },
  {
    _id: 'static-rubber-flat',
    title: 'Rubber & Flat Roofing',
    slug: 'rubber-flat-roofing',
    shortDescription: 'Specialist rubber (EPDM) and flat roofing installations and repairs for residential and commercial properties across Massachusetts.',
    icon: '⬛',
    serviceType: 'both',
  },
  {
    _id: 'static-solar',
    title: 'Solar Roofing',
    slug: 'solar-roofing',
    shortDescription: 'Interested in solar? We have a trusted solar referral partner. Call us and we\'ll connect you with the right team to get your solar project started.',
    icon: '☀️',
    serviceType: 'both',
  },
]

export interface StaticServiceDetail extends StaticService {
  body?: string
  benefits?: { title: string; description: string }[]
  process?: { step: number; title: string; description: string }[]
  faqs?: { _id: string; question: string; answer: string }[]
}

export const STATIC_SERVICE_DETAILS: Record<string, StaticServiceDetail> = {
  'residential-roofing': {
    _id: 'static-residential',
    title: 'Residential Roofing',
    slug: 'residential-roofing',
    shortDescription: 'Expert residential roofing installations and replacements for homeowners across Massachusetts. Quality materials, clean job sites, and lasting results.',
    icon: '🏠',
    serviceType: 'residential',
    benefits: [
      { title: 'Licensed & Insured', description: 'Full coverage protecting you, your home, and our crew on every job.' },
      { title: 'Quality Materials', description: 'We use manufacturer-backed shingles and underlayment rated for Massachusetts weather.' },
      { title: 'Free Estimates', description: 'No-obligation estimate with a detailed breakdown — no surprises on the bill.' },
      { title: 'Clean Job Sites', description: 'We protect your landscaping and clean up every nail before we leave.' },
    ],
    process: [
      { step: 1, title: 'Free Estimate', description: 'We come out, inspect your roof, and provide a detailed written estimate at no cost.' },
      { step: 2, title: 'Material Selection', description: 'Choose from a range of shingle styles, colours, and warranty levels to suit your budget.' },
      { step: 3, title: 'Installation Day', description: 'Our crew removes the old roof, inspects the decking, and installs your new roof in one efficient visit.' },
      { step: 4, title: 'Final Walkthrough', description: 'We walk the job with you, clean up the site completely, and hand over your warranty paperwork.' },
    ],
  },
  'commercial-roofing': {
    _id: 'static-commercial',
    title: 'Commercial Roofing',
    slug: 'commercial-roofing',
    shortDescription: 'Commercial roofing solutions for businesses, warehouses, and multi-unit buildings across Massachusetts. Minimal disruption, maximum protection.',
    icon: '🏢',
    serviceType: 'commercial',
    benefits: [
      { title: 'Dedicated Commercial Crew', description: 'A separate team trained specifically for commercial-scale projects.' },
      { title: 'Minimal Business Disruption', description: 'We schedule around your hours and work efficiently to keep downtime low.' },
      { title: 'Flat & Low-Slope Expertise', description: 'EPDM, TPO, and built-up roofing systems installed to manufacturer spec.' },
      { title: 'Free Commercial Estimates', description: 'On-site inspection and detailed proposal at no charge.' },
    ],
    process: [
      { step: 1, title: 'Site Survey', description: 'We assess roof area, slope, drainage, and current condition.' },
      { step: 2, title: 'Proposal', description: 'Detailed scope of work with material specs and timeline.' },
      { step: 3, title: 'Installation', description: 'Dedicated crew completes the work on schedule with minimal disruption.' },
      { step: 4, title: 'Inspection & Handover', description: 'Final inspection, warranty documentation, and maintenance guidance.' },
    ],
  },
  'roof-repair': {
    _id: 'static-repair',
    title: 'Roof Repair',
    slug: 'roof-repair',
    shortDescription: 'Fast, reliable roof repairs to stop leaks and protect your home or business. Same-day response available across Massachusetts.',
    icon: '🔧',
    serviceType: 'both',
    benefits: [
      { title: 'Same-Day Response', description: 'We aim to get to you the same day for active leaks and storm damage.' },
      { title: 'Honest Assessment', description: 'We tell you what actually needs fixing — no unnecessary upsells.' },
      { title: 'All Roof Types', description: 'Shingle, flat, rubber, metal — we repair them all.' },
      { title: 'Insurance Claims Help', description: 'We can document storm damage to support your insurance claim.' },
    ],
    process: [
      { step: 1, title: 'Inspection', description: 'We locate the source of the problem — not just the visible symptom.' },
      { step: 2, title: 'Estimate', description: 'Clear quote before any work starts. No hidden costs.' },
      { step: 3, title: 'Repair', description: 'We fix the root cause properly so the problem doesn\'t come back.' },
      { step: 4, title: 'Follow-Up', description: 'We check in to make sure everything is holding up.' },
    ],
  },
  'roof-replacement': {
    _id: 'static-replacement',
    title: 'Roof Replacement',
    slug: 'roof-replacement',
    shortDescription: 'Full roof replacements with premium materials. We remove the old roof, inspect the decking, and install a new roof built to last Massachusetts winters.',
    icon: '🏗️',
    serviceType: 'both',
    benefits: [
      { title: 'Full Tear-Off Included', description: 'We remove all old material and inspect the decking before anything goes on top.' },
      { title: 'Manufacturer Warranties', description: 'Our materials carry full manufacturer warranties backed by proper installation.' },
      { title: 'One-Day Installs', description: 'Most residential replacements completed in a single day.' },
      { title: 'Permit Handling', description: 'We handle any required permits so you don\'t have to.' },
    ],
    process: [
      { step: 1, title: 'Estimate & Scope', description: 'Full measurement, material selection, and written quote.' },
      { step: 2, title: 'Scheduling', description: 'We book a convenient date and confirm materials in advance.' },
      { step: 3, title: 'Full Installation', description: 'Tear-off, decking inspection, underlayment, shingles, and all flashings replaced.' },
      { step: 4, title: 'Clean-Up & Walkthrough', description: 'Full site clean-up including magnetic nail sweep, then a walkthrough with you.' },
    ],
  },
  'rubber-flat-roofing': {
    _id: 'static-rubber-flat',
    title: 'Rubber & Flat Roofing',
    slug: 'rubber-flat-roofing',
    shortDescription: 'Specialist rubber (EPDM) and flat roofing installations and repairs for residential and commercial properties across Massachusetts.',
    icon: '⬛',
    serviceType: 'both',
    benefits: [
      { title: 'EPDM Rubber Roofing', description: 'Durable, watertight rubber membrane ideal for flat and low-slope roofs.' },
      { title: 'TPO & Modified Bitumen', description: 'We install multiple flat roofing systems to match your budget and building type.' },
      { title: 'Leak-Free Guarantee', description: 'Properly installed flat roofing should give you decades of trouble-free service.' },
      { title: 'Repairs & Re-Roofing', description: 'From patching a small leak to a complete flat roof replacement.' },
    ],
    process: [
      { step: 1, title: 'Roof Assessment', description: 'We inspect the current surface, drainage, and any problem areas.' },
      { step: 2, title: 'System Recommendation', description: 'We recommend the right membrane type for your roof and budget.' },
      { step: 3, title: 'Installation', description: 'Full installation with proper seaming, flashing, and drain integration.' },
      { step: 4, title: 'Inspection', description: 'Post-install inspection and sign-off before we leave the site.' },
    ],
  },
  'solar-roofing': {
    _id: 'static-solar',
    title: 'Solar Roofing',
    slug: 'solar-roofing',
    shortDescription: 'Interested in solar? We have a trusted solar referral partner. Call us and we\'ll connect you with the right team to get your solar project started.',
    icon: '☀️',
    serviceType: 'both',
    benefits: [
      { title: 'Trusted Referral Partner', description: 'We work with a vetted solar installer we trust to do right by our customers.' },
      { title: 'Roof-Ready Coordination', description: 'If your roof needs work before solar goes on, we handle that first.' },
      { title: 'No Hassle Introduction', description: 'One call to us and we make the introduction — you take it from there.' },
      { title: 'Massachusetts Incentives', description: 'Our partner can walk you through state and federal solar incentives available in MA.' },
    ],
    process: [
      { step: 1, title: 'Call Us', description: 'Give us a call and let us know you\'re interested in solar.' },
      { step: 2, title: 'Roof Check', description: 'We\'ll check your roof is in good shape and ready for a solar installation.' },
      { step: 3, title: 'Warm Introduction', description: 'We connect you directly with our trusted solar partner for a no-obligation consultation.' },
      { step: 4, title: 'You\'re Looked After', description: 'Our partner takes it from there with full transparency on costs and timelines.' },
    ],
  },
}

import { groq } from 'next-sanity'

// ─── Fragment helpers ──────────────────────────────────────────────────────
const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    ogImage { asset->{ url }, alt },
    noIndex,
    canonicalUrl
  }
`

const ctaButtonFragment = groq`
  label,
  href,
  variant
`

const testimonialFragment = groq`
  _id,
  customerName,
  location,
  rating,
  quote,
  serviceReceived,
  source,
  photo { asset->{ url }, alt }
`

const serviceCardFragment = groq`
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  icon,
  serviceType,
  heroImage { asset->{ url }, alt }
`

// ─── Site Settings ─────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    phone,
    phoneAlt,
    email,
    address,
    hours,
    licenseNumber,
    reviewCount,
    reviewRating,
    offerBanner,
    navLinks,
    social,
    footerText,
    defaultSeo { ${seoFragment} },
    logo { asset->{ url }, alt },
    logoLight { asset->{ url }, alt },
    googleAnalyticsId,
    googleTagManagerId,
    googleVerification,
  }
`

// ─── Home Page ──────────────────────────────────────────────────────────────
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    hero {
      headline,
      subheadline,
      primaryCta { ${ctaButtonFragment} },
      secondaryCta { ${ctaButtonFragment} },
      backgroundImage { asset->{ url }, alt },
      badges,
    },
    introStrip,
    servicesSection {
      enabled,
      heading,
      subheading,
      featuredServices[]-> { ${serviceCardFragment} },
    },
    whyUsSection,
    testimonialsSection {
      enabled,
      heading,
      featuredTestimonials[]-> { ${testimonialFragment} },
    },
    areasSection {
      enabled,
      heading,
      subheading,
      backgroundImage { asset->{ url }, alt },
    },
    ctaBanner {
      enabled,
      heading,
      subheading,
      primaryCta { ${ctaButtonFragment} },
      secondaryCta { ${ctaButtonFragment} },
    },
    gallery,
    financing,
    awards,
    beforeAfter,
    partnerLogos,
    videoTestimonials,
    serviceAreaMap,
    ${seoFragment},
  }
`

// ─── All Services ──────────────────────────────────────────────────────────
// Excludes gutters and roof inspection services (no longer offered)
export const ALL_SERVICES_QUERY = groq`
  *[_type == "servicePage" && !(slug.current in ["gutter-services", "gutters", "gutter-installation", "gutter-cleaning", "roof-inspection", "roof-inspections", "roof-inspection-service"])] | order(order asc) {
    ${serviceCardFragment}
  }
`

// ─── Single Service ────────────────────────────────────────────────────────
export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "servicePage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    serviceType,
    heroImage { asset->{ url }, alt },
    body,
    benefits,
    extraContent,
    processPosition,
    process,
    faqs[]-> {
      _id,
      question,
      answer,
    },
    relatedServices[]-> { ${serviceCardFragment} },
    ${seoFragment},
  }
`

export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "servicePage"] { "slug": slug.current }
`

// ─── All Service Areas ──────────────────────────────────────────────────────
export const ALL_SERVICE_AREAS_QUERY = groq`
  *[_type == "serviceArea" && featured == true] | order(order asc) {
    _id,
    name,
    state,
    "slug": slug.current,
  }
`

export const SERVICE_AREA_BY_SLUG_QUERY = groq`
  *[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    name,
    state,
    "slug": slug.current,
    heroDescription,
    heroImage { asset->{ url }, alt },
    body,
    nearbyTowns,
    localFacts,
    ${seoFragment},
  }
`

export const SERVICE_AREA_SLUGS_QUERY = groq`
  *[_type == "serviceArea"] { "slug": slug.current }
`

// ─── All Testimonials ───────────────────────────────────────────────────────
export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(date desc) {
    ${testimonialFragment}
  }
`

// ─── Blog ───────────────────────────────────────────────────────────────────
export const ALL_BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    categories,
    featuredImage { asset->{ url }, alt },
  }
`

export const BLOG_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    featuredImage { asset->{ url }, alt },
    body,
    categories,
    relatedServices[]-> { ${serviceCardFragment} },
    ${seoFragment},
  }
`

export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`

// ─── FAQs ───────────────────────────────────────────────────────────────────
export const FEATURED_FAQS_QUERY = groq`
  *[_type == "faq" && featured == true] | order(order asc) {
    _id,
    question,
    answer,
    category,
  }
`

export const ALL_FAQS_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
  }
`

// ─── Team ───────────────────────────────────────────────────────────────────
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember" && featured == true] | order(order asc) {
    _id,
    name,
    role,
    bio,
    yearsExperience,
    photo { asset->{ url }, alt },
  }
`

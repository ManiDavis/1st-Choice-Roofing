// JSON-LD Structured Data helpers for SEO

export interface BusinessInfo {
  name: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  rating?: {
    value: number
    count: number
  }
  siteUrl: string
}

export function localBusinessSchema(business: BusinessInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor'],
    '@id': `${business.siteUrl}/#business`,
    name: business.name,
    url: business.siteUrl,
    telephone: business.phone,
    image: `${business.siteUrl}/og-image.jpg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.0518,
      longitude: -71.8773,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    areaServed: [
      'Webster, MA',
      'Worcester, MA',
      'Shrewsbury, MA',
      'Auburn, MA',
      'Millbury, MA',
      'Oxford, MA',
      'Dudley, MA',
      'Southbridge, MA',
      'Grafton, MA',
      'Northborough, MA',
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 42.0518,
        longitude: -71.8773,
      },
      geoRadius: '40000',
    },
    knowsAbout: [
      'Residential Roofing',
      'Commercial Roofing',
      'Roof Repair',
      'Roof Replacement',
      'Gutter Installation',
      'Roof Inspection',
      'Asphalt Shingle Roofing',
      'Flat Roofing',
    ],
    hasCredential: 'Licensed & Insured Roofing Contractor – Massachusetts',
    ...(business.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.rating.value,
        reviewCount: business.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    sameAs: [
      'https://www.facebook.com/1stchoiceroofing',
    ],
  }
}

export function serviceSchema({
  name,
  description,
  url,
  businessName,
  businessUrl,
}: {
  name: string
  description: string
  url: string
  businessName: string
  businessUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: businessName,
      url: businessUrl,
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    serviceType: 'Roofing',
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function blogPostSchema({
  title,
  description,
  url,
  publishedAt,
  imageUrl,
  businessName,
  businessUrl,
}: {
  title: string
  description: string
  url: string
  publishedAt: string
  imageUrl?: string
  businessName: string
  businessUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: {
      '@type': 'Organization',
      name: businessName,
      url: businessUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: businessName,
      url: businessUrl,
    },
    ...(imageUrl && { image: imageUrl }),
  }
}

export function webPageSchema({
  title,
  description,
  url,
  businessName,
  businessUrl,
}: {
  title: string
  description: string
  url: string
  businessName: string
  businessUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: businessName,
      url: businessUrl,
    },
  }
}

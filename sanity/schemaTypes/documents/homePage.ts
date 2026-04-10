import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // ─── Hero Section ────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Main Headline', type: 'string', initialValue: "Webster & Worcester's #1 Roofing Contractor" }),
        defineField({ name: 'subheadline', title: 'Sub-headline', type: 'text', rows: 2, initialValue: "Licensed & Insured \u2022 Free Estimates \u2022 Residential & Commercial \u2022 Serving All of Massachusetts" }),
        defineField({
          name: 'primaryCta',
          title: 'Primary Button',
          type: 'ctaButton',
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary Button',
          type: 'ctaButton',
        }),
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'badges',
          title: 'Trust Badges (below CTA buttons)',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          initialValue: ['Licensed & Insured', 'Free Estimates', '5-Star Rated', 'Same-Day Response'],
        }),
      ],
    }),

    // ─── Intro / About Strip ─────────────────────────────────────────
    defineField({
      name: 'introStrip',
      title: 'Intro Strip',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Show', initialValue: true }),
        defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'Proudly Serving Webster, MA & the Greater Worcester Area' }),
        defineField({ name: 'body', type: 'text', rows: 3, title: 'Body Text' }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value (e.g. 500+)' },
              { name: 'label', type: 'string', title: 'Label (e.g. Roofs Installed)' },
            ],
          })],
          initialValue: [
            { value: '500+', label: 'Roofs Completed' },
            { value: '5★', label: 'Google Rating' },
            { value: '10+', label: 'Years Experience' },
            { value: '3', label: 'Dedicated Crews' },
          ],
        }),
      ],
    }),

    // ─── Services Section ─────────────────────────────────────────────
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Show', initialValue: true }),
        defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our Roofing Services' }),
        defineField({ name: 'subheading', type: 'string', title: 'Subheading', initialValue: 'From repairs to full replacements, we do it right the first time.' }),
        defineField({
          name: 'featuredServices',
          title: 'Featured Services',
          type: 'array',
          description: 'Pick which services to feature on the home page.',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'servicePage' }] })],
        }),
      ],
    }),

    // ─── Why Choose Us ───────────────────────────────────────────────
    defineField({
      name: 'whyUsSection',
      title: 'Why Choose Us Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Show', initialValue: true }),
        defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'Why 1st Choice Roofing?' }),
        defineField({ name: 'subheading', type: 'string', title: 'Subheading' }),
        defineField({
          name: 'reasons',
          title: 'Reasons',
          type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              { name: 'icon', type: 'string', title: 'Icon (emoji or name)', initialValue: '✓' },
              { name: 'title', type: 'string', title: 'Title' },
              { name: 'description', type: 'text', title: 'Description', rows: 2 },
            ],
          })],
        }),
      ],
    }),

    // ─── Testimonials Section ─────────────────────────────────────────
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Show', initialValue: true }),
        defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'What Our Customers Say' }),
        defineField({
          name: 'featuredTestimonials',
          title: 'Featured Testimonials',
          type: 'array',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
        }),
      ],
    }),

    // ─── Service Areas Section ───────────────────────────────────────
    defineField({
      name: 'areasSection',
      title: 'Service Areas Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Show', initialValue: true }),
        defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'Serving All of Massachusetts' }),
        defineField({ name: 'subheading', type: 'string', title: 'Subheading', initialValue: "Fast local response — we're in your neighbourhood." }),
        defineField({ name: 'backgroundImage', title: 'Background Image (aerial/landscape)', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // ─── CTA Banner ──────────────────────────────────────────────────
    defineField({
      name: 'ctaBanner',
      title: 'Bottom CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Show', initialValue: true }),
        defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'Ready to Get Your Free Estimate?' }),
        defineField({ name: 'subheading', type: 'string', title: 'Subheading', initialValue: "Call us or fill out the form. We'll get back to you the same day." }),
        defineField({ name: 'primaryCta', type: 'ctaButton', title: 'Primary Button' }),
        defineField({ name: 'secondaryCta', type: 'ctaButton', title: 'Secondary Button' }),
      ],
    }),

    // ─── Extra Sections (all default off) ───────────────────────────
    defineField({ name: 'gallery', title: 'Photo Gallery', type: 'gallerySection' }),
    defineField({ name: 'financing', title: 'Financing', type: 'financingSection' }),
    defineField({ name: 'awards', title: 'Awards & Certifications', type: 'awardsSection' }),
    defineField({ name: 'beforeAfter', title: 'Before & After', type: 'beforeAfterSection' }),
    defineField({ name: 'partnerLogos', title: 'Partner Logos', type: 'partnerLogosSection' }),
    defineField({ name: 'videoTestimonials', title: 'Video Testimonials', type: 'videoTestimonialsSection' }),
    defineField({ name: 'serviceAreaMap', title: 'Service Area Map', type: 'serviceAreaMapSection' }),

    // ─── SEO ─────────────────────────────────────────────────────────
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})

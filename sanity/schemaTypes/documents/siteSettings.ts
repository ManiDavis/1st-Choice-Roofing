import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    // ─── Business Info ───────────────────────────────────────────────
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: '1st Choice Roofing',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: "Webster & Massachusetts's Most Trusted Roofing Contractor",
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      initialValue: '508-250-6565',
    }),
    defineField({
      name: 'phoneAlt',
      title: 'Alternative Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street / Display Address', type: 'string', initialValue: 'Based in Webster, Massachusetts' }),
        defineField({ name: 'city', title: 'City', type: 'string', initialValue: 'Webster' }),
        defineField({ name: 'state', title: 'State', type: 'string', initialValue: 'MA' }),
        defineField({ name: 'zip', title: 'ZIP Code', type: 'string', initialValue: '01570' }),
        defineField({ name: 'country', title: 'Country', type: 'string', initialValue: 'US' }),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        defineField({ name: 'weekdays', title: 'Mon–Fri', type: 'string', initialValue: '7:00 AM – 6:00 PM' }),
        defineField({ name: 'saturday', title: 'Saturday', type: 'string', initialValue: '8:00 AM – 4:00 PM' }),
        defineField({ name: 'sunday', title: 'Sunday', type: 'string', initialValue: 'Emergency calls only' }),
      ],
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License Number',
      type: 'string',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count (displayed as "X+ 5-star reviews")',
      type: 'number',
      initialValue: 14,
      description: 'The number shown in the reviews badge, e.g. 14 shows as "14+".',
    }),
    defineField({
      name: 'reviewRating',
      title: 'Average Review Rating (e.g. 5.0)',
      type: 'number',
      initialValue: 5.0,
    }),

    // ─── Offer Banner ────────────────────────────────────────────────
    defineField({
      name: 'offerBanner',
      title: 'Offer Strip Banner (top of page)',
      type: 'object',
      description: 'The promotional strip that appears above the navigation bar.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Banner',
          type: 'boolean',
          initialValue: false,
          description: 'Toggle to show or hide the offer banner.',
        }),
        defineField({
          name: 'text',
          title: 'Banner Text',
          type: 'string',
          initialValue: '🎉 Spring Special: 10% off all roof replacements booked in April!',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Get a Free Quote',
        }),
        defineField({
          name: 'ctaHref',
          title: 'Button Link',
          type: 'string',
          initialValue: '/contact',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Brand Red', value: 'red' },
              { title: 'Dark Navy', value: 'navy' },
              { title: 'Gold/Amber', value: 'gold' },
              { title: 'Dark Green', value: 'green' },
            ],
            layout: 'radio',
          },
          initialValue: 'red',
        }),
        defineField({
          name: 'dismissible',
          title: 'Allow users to dismiss',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    // ─── Navigation ──────────────────────────────────────────────────
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'href', type: 'string', title: 'Path or URL' },
          {
            name: 'children',
            type: 'array',
            title: 'Dropdown Items (optional)',
            of: [defineArrayMember({
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'href', type: 'string', title: 'Path or URL' },
              ],
            })],
          },
        ],
        preview: {
          select: { title: 'label', subtitle: 'href' },
        },
      })],
    }),

    // ─── Social Links ────────────────────────────────────────────────
    defineField({
      name: 'social',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'google', title: 'Google Business URL', type: 'url' }),
        defineField({ name: 'nextdoor', title: 'Nextdoor URL', type: 'url' }),
        defineField({ name: 'yelp', title: 'Yelp URL', type: 'url' }),
      ],
    }),

    // ─── Footer ──────────────────────────────────────────────────────
    defineField({
      name: 'footerText',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'Licensed & Insured Roofing Contractor Serving Webster, Worcester & Surrounding Massachusetts Towns.',
    }),

    // ─── Default SEO ─────────────────────────────────────────────────
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seoFields',
    }),

    // ─── Page Images ─────────────────────────────────────────────────
    defineField({
      name: 'aboutHeroImage',
      title: 'About Page — Header Image',
      type: 'image',
      description: 'Background image for the About page header section.',
      options: { hotspot: true },
    }),

    // ─── Logo ────────────────────────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (light / white version)',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),

    // ─── Analytics ───────────────────────────────────────────────────
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID (GA4)',
      type: 'string',
      description: 'e.g. G-XXXXXXXXXX',
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'e.g. GTM-XXXXXXX',
    }),
    defineField({
      name: 'googleVerification',
      title: 'Google Search Console Verification',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})

import { defineField, defineType, defineArrayMember } from 'sanity'
import { ToolIcon } from '@sanity/icons'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service',
  type: 'document',
  icon: ToolIcon,
  fields: [
    defineField({ name: 'title', title: 'Service Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'shortDescription', title: 'Short Description (card/meta)', type: 'text', rows: 2, validation: (rule) => rule.required().max(200) }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', description: 'e.g. 🏠 or 🏢', initialValue: '🔨' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Full Description', type: 'portableTextContent' }),

    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
    }),

    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Benefit Title' },
          { name: 'description', type: 'string', title: 'Short Description' },
        ],
      })],
    }),

    defineField({
      name: 'extraContent',
      title: 'Additional Information (shown below Key Benefits)',
      type: 'portableTextContent',
      description: 'Optional extra text block your client can use to add more detail about this service.',
    }),

    defineField({
      name: 'processPosition',
      title: 'Our Process — Position on page',
      type: 'string',
      options: {
        list: [
          { title: 'Below additional information (default)', value: 'below' },
          { title: 'Above additional information', value: 'above' },
        ],
        layout: 'radio',
      },
      initialValue: 'below',
    }),

    defineField({
      name: 'process',
      title: 'Our Process Steps',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'step', type: 'number', title: 'Step Number' },
          { name: 'title', type: 'string', title: 'Step Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 2 },
        ],
      })],
    }),

    defineField({
      name: 'faqs',
      title: 'Service-Specific FAQs',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
    }),

    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'servicePage' }] })],
    }),

    defineField({
      name: 'featured',
      title: 'Featured on Home Page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first.',
      initialValue: 99,
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'serviceType', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `(${subtitle})` : '', media }
    },
  },
})

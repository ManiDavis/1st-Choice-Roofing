import { defineField, defineType, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', title: 'City / Town Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'state', title: 'State', type: 'string', initialValue: 'MA' }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Short local intro for this area page. Mention the town name naturally for local SEO.',
    }),
    defineField({ name: 'heroImage', title: 'Area Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Full Page Content', type: 'portableTextContent' }),
    defineField({
      name: 'nearbyTowns',
      title: 'Nearby Towns We Also Serve',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'localFacts',
      title: 'Local Facts / Context',
      type: 'array',
      description: 'Useful local details that make this page feel genuinely local (weather patterns, housing types, etc.)',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'fact', type: 'string', title: 'Fact' },
        ],
      })],
    }),
    defineField({ name: 'featured', title: 'Show in Area Grid', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 99 }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'state' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle }
    },
  },
})

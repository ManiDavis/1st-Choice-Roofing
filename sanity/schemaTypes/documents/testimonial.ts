import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'customerName', title: 'Customer Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'location', title: 'City / Area', type: 'string', description: 'e.g. Webster, MA' }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          { title: '5 Stars', value: 5 },
          { title: '4 Stars', value: 4 },
          { title: '3 Stars', value: 3 },
        ],
      },
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({ name: 'quote', title: 'Review Text', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'serviceReceived', title: 'Service Received', type: 'string', description: 'e.g. Roof Replacement' }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Yelp', value: 'yelp' },
          { title: 'Direct', value: 'direct' },
        ],
        layout: 'radio',
      },
      initialValue: 'google',
    }),
    defineField({ name: 'sourceUrl', title: 'Link to Review', type: 'url' }),
    defineField({ name: 'photo', title: 'Customer Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({
      name: 'active',
      title: 'Active (visible on site)',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this review without deleting it.',
    }),
    defineField({ name: 'date', title: 'Review Date', type: 'date' }),
  ],
  orderings: [
    { title: 'Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Rating High to Low', name: 'ratingDesc', by: [{ field: 'rating', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'customerName', subtitle: 'quote', media: 'photo', active: 'active' },
    prepare({ title, subtitle, media, active }) {
      return {
        title: `${active === false ? '🚫 ' : ''}${title}`,
        subtitle: subtitle?.substring(0, 80) + '…',
        media,
      }
    },
  },
})

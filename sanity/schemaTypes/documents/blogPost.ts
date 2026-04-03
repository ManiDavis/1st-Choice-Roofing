import { defineField, defineType, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2, description: 'Short summary shown in blog listing and meta description.' }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
    defineField({ name: 'body', title: 'Content', type: 'portableTextContent' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Roofing Tips', value: 'tips' },
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Storm Damage', value: 'storm-damage' },
          { title: 'News', value: 'news' },
        ],
      },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'servicePage' }] })],
    }),
    defineField({ name: 'featured', title: 'Featured Post', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  orderings: [
    { title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'featuredImage' },
    prepare({ title, date, media }) {
      return { title, subtitle: date ? new Date(date).toLocaleDateString() : 'Draft', media }
    },
  },
})

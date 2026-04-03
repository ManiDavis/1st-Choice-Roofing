import { defineField, defineType, defineArrayMember } from 'sanity'

// Gallery section
export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Photo Gallery Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Our Work' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Alt Text' },
          { name: 'caption', type: 'string', title: 'Caption' },
        ],
      })],
    }),
  ],
})

// Financing section
export const financingSection = defineType({
  name: 'financingSection',
  title: 'Financing Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Flexible Financing Available' }),
    defineField({ name: 'body', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string', initialValue: 'Learn More About Financing' }),
    defineField({ name: 'ctaHref', title: 'Button Link', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Features / Bullet Points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})

// Awards & certifications section
export const awardsSection = defineType({
  name: 'awardsSection',
  title: 'Awards & Certifications Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Certifications & Awards' }),
    defineField({
      name: 'items',
      title: 'Awards / Certifications',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'logo', type: 'image', title: 'Logo' },
          { name: 'description', type: 'string', title: 'Description' },
        ],
      })],
    }),
  ],
})

// Before/after section
export const beforeAfterSection = defineType({
  name: 'beforeAfterSection',
  title: 'Before & After Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Transformations' }),
    defineField({
      name: 'pairs',
      title: 'Before/After Pairs',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Project Label' },
          { name: 'before', type: 'image', title: 'Before Image' },
          { name: 'after', type: 'image', title: 'After Image' },
          { name: 'description', type: 'string', title: 'Short Description' },
        ],
      })],
    }),
  ],
})

// Partner logos section
export const partnerLogosSection = defineType({
  name: 'partnerLogosSection',
  title: 'Partner Logos Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Trusted Brands We Install' }),
    defineField({
      name: 'logos',
      title: 'Partner Logos',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Brand Name' },
          { name: 'logo', type: 'image', title: 'Logo' },
        ],
      })],
    }),
  ],
})

// Video testimonials section
export const videoTestimonialsSection = defineType({
  name: 'videoTestimonialsSection',
  title: 'Video Testimonials Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Hear From Our Customers' }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'youtubeUrl', type: 'url', title: 'YouTube URL' },
          { name: 'thumbnail', type: 'image', title: 'Thumbnail' },
        ],
      })],
    }),
  ],
})

// Service area map section
export const serviceAreaMapSection = defineType({
  name: 'serviceAreaMapSection',
  title: 'Service Area Map Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Show on site', type: 'boolean', initialValue: false }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Areas We Serve' }),
    defineField({ name: 'embedUrl', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({
      name: 'areaList',
      title: 'List of Towns/Cities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})

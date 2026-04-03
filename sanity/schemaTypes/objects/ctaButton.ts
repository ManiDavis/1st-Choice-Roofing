import { defineField, defineType } from 'sanity'

export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Use /contact for the estimate form, or a full URL for external links.',
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Red)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
          { title: 'Gold', value: 'gold' },
          { title: 'Ghost (White)', value: 'ghost' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
})

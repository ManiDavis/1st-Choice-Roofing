import { StructureBuilder } from 'sanity/structure'
import {
  HomeIcon,
  CogIcon,
  ToolIcon,
  PinIcon,
  DocumentIcon,
  StarIcon,
  UserIcon,
  HelpCircleIcon,
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('1st Choice Roofing')
    .items([
      // ─── Singleton Pages ────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.divider(),

      // ─── Services ───────────────────────────────────────────────
      S.listItem()
        .title('Services')
        .icon(ToolIcon)
        .child(
          S.documentTypeList('servicePage')
            .title('Services')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // ─── Service Areas ──────────────────────────────────────────
      S.listItem()
        .title('Service Areas')
        .icon(PinIcon)
        .child(
          S.documentTypeList('serviceArea')
            .title('Service Areas')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ─── Content ────────────────────────────────────────────────
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.listItem()
        .title('Testimonials')
        .icon(StarIcon)
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),

      S.listItem()
        .title('FAQs')
        .icon(HelpCircleIcon)
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Team Members')
        .icon(UserIcon)
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ─── Other Pages ────────────────────────────────────────────
      S.listItem()
        .title('Other Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Other Pages')),
    ])

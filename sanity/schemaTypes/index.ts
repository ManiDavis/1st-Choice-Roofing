// Objects
import { seoFields } from './objects/seoFields'
import { ctaButton } from './objects/ctaButton'
import { portableTextContent } from './objects/portableTextContent'
import {
  gallerySection,
  financingSection,
  awardsSection,
  beforeAfterSection,
  partnerLogosSection,
  videoTestimonialsSection,
  serviceAreaMapSection,
} from './objects/extraSections'

// Documents
import { siteSettings } from './documents/siteSettings'
import { homePage } from './documents/homePage'
import { servicePage } from './documents/servicePage'
import { page } from './documents/page'
import { blogPost } from './documents/blogPost'
import { testimonial } from './documents/testimonial'
import { serviceArea } from './documents/serviceArea'
import { teamMember } from './documents/teamMember'
import { faq } from './documents/faq'

export const schemaTypes = [
  // Objects (must come before documents that reference them)
  seoFields,
  ctaButton,
  portableTextContent,
  gallerySection,
  financingSection,
  awardsSection,
  beforeAfterSection,
  partnerLogosSection,
  videoTestimonialsSection,
  serviceAreaMapSection,

  // Documents
  siteSettings,
  homePage,
  servicePage,
  page,
  blogPost,
  testimonial,
  serviceArea,
  teamMember,
  faq,
]

'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: '1st Choice Roofing',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      name: 'presentation',
      title: 'Visual Editor',
      previewUrl: {
        origin: typeof window !== 'undefined' ? window.location.origin.replace(':3000/studio', ':3000').replace('/studio', '') : 'http://localhost:3000',
        preview: '/',
        draftMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
})

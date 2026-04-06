'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from '@sanity/presentation'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const previewUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
})

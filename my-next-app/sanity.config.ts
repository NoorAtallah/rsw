import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'RSW Investment Group',
  
  projectId,
  dataset,
  
  plugins: [
    deskTool(),
    visionTool(),
  ],
  
  basePath: '/studio',
  
  schema: {
    types: schemaTypes,
  },
})
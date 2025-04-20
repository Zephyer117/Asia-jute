/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Asia Jute',
  projectId: 'v82i2ztn',
  dataset: 'production',
  basePath: '/studio',
  schema,
  plugins: [
    structureTool(),
  ],
})

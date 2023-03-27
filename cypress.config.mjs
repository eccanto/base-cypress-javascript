import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'

export async function setupNodeEvents(on, config) {
  on(
    'file:preprocessor',
    createBundler({
      plugins: [],
    })
  )

  return config
}

export default defineConfig({
  e2e: {
    setupNodeEvents,
  },
})

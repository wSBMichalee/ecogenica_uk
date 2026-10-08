import { createContentHelpers } from '@intecion/ipal-kit'
import payloadConfig from '@/payload.config'
import { i18nConfig } from '@/i18n.config'

export const {
  getCachedPayload, getSettings, getConfiguredLocales, resolveRoute, getEntries, robots, sitemap, generateStaticParams,
} = createContentHelpers({
  config: payloadConfig,
  content: { collections: [] },
  i18n: i18nConfig,
})

import { cache } from 'react'
import { getSiteSettings } from '@intecion/ipal-kit'
import { getCachedPayload } from './content'
import type { SiteSetting } from '@/payload-types'

export const getSettings = cache(async (locale: string) =>
  getSiteSettings<SiteSetting>(await getCachedPayload(), { locale: locale as never, depth: 2 }),
)

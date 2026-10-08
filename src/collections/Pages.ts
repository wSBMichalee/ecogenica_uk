import type { CollectionConfig } from 'payload'
import { buildSlugField } from '@intecion/ipal-kit'
import { ContentBlock } from '@/blocks/Content/config'
import { HeroVideoBlock } from '@/blocks/HeroVideo/config'
import { AudienceSplitBlock } from '@/blocks/AudienceSplit/config'
import { ExplodedViewBlock } from '@/blocks/ExplodedView/config'
import { ClimateRangeBlock } from '@/blocks/ClimateRange/config'
import { BentoFeaturesBlock } from '@/blocks/BentoFeatures/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    buildSlugField({ from: 'title' }),
    {
      name: 'layout',
      type: 'blocks',
      blocks: [ContentBlock, HeroVideoBlock, AudienceSplitBlock, ExplodedViewBlock, ClimateRangeBlock, BentoFeaturesBlock],
    },
  ],
}

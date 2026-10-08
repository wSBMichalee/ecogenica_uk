import type { BlockComponentMap } from '@intecion/ipal-kit/rsc'
import { ContentBlockComponent } from '@/blocks/Content/Component'

import { HeroVideoComponent } from '@/blocks/HeroVideo/Component'
import { AudienceSplitComponent } from '@/blocks/AudienceSplit/Component'
import { ExplodedViewComponent } from '@/blocks/ExplodedView/Component'
import { ClimateRangeComponent } from '@/blocks/ClimateRange/Component'
import { BentoFeaturesComponent } from '@/blocks/BentoFeatures/Component'

export const blockRegistry: BlockComponentMap = {
  content: ContentBlockComponent,
  heroVideo: HeroVideoComponent,
  audienceSplit: AudienceSplitComponent,
  explodedView: ExplodedViewComponent,
  climateRange: ClimateRangeComponent,
  bentoFeatures: BentoFeaturesComponent,
}

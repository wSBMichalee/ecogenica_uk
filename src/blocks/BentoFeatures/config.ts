import type { Block } from 'payload'

export const BentoFeaturesBlock: Block = {
  slug: 'bentoFeatures',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'text', admin: { description: 'Lucide icon name (e.g. Shield, Zap, Leaf)' } },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Large (2 columns)', value: 'large' },
          ],
          defaultValue: 'normal',
        },
      ],
    },
  ],
}

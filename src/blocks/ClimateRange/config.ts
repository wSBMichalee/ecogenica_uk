import type { Block } from 'payload'

export const ClimateRangeBlock: Block = {
  slug: 'climateRange',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'temperatureValue',
      type: 'number',
      required: true,
      defaultValue: -15,
    },
    {
      name: 'temperatureUnit',
      type: 'text',
      required: true,
      defaultValue: '°C',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

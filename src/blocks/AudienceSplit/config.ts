import type { Block } from 'payload'

export const AudienceSplitBlock: Block = {
  slug: 'audienceSplit',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    {
      name: 'homeownerLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'homeownerTarget',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
    },
    {
      name: 'installerLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'installerTarget',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
    },
  ],
}

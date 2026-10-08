import type { Block } from 'payload'

export const ExplodedViewBlock: Block = {
  slug: 'explodedView',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'xPosition',
          type: 'number',
          required: true,
          admin: { description: 'Percentage from left (0-100)' },
        },
        {
          name: 'yPosition',
          type: 'number',
          required: true,
          admin: { description: 'Percentage from top (0-100)' },
        },
      ],
    },
  ],
}

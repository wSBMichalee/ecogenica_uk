import type { Block } from 'payload'

export const HeroVideoBlock: Block = {
  slug: 'heroVideo',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'videoMp4',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'videoWebm',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'videoMobile',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'ctaLabel', type: 'text', localized: true },
    {
      name: 'ctaTarget',
      type: 'relationship',
      relationTo: 'pages',
    },
    { name: 'ctaSecondaryLabel', type: 'text', localized: true },
    {
      name: 'ctaSecondaryTarget',
      type: 'relationship',
      relationTo: 'pages',
    },
  ],
}

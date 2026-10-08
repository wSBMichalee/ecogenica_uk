import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true, required: true },
  ],
}

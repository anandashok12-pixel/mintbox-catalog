import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'summary',
    defaultColumns: ['contact', 'type', 'summary', 'createdAt'],
    description: 'Non-message events: form submissions, quotes sent, stage changes, digests sent.',
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'contact',
      type: 'relationship',
      relationTo: 'contacts',
      required: true,
    },
    {
      name: 'deal',
      type: 'relationship',
      relationTo: 'deals',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Form submitted', value: 'form_submitted' },
        { label: 'Deal opened from WhatsApp', value: 'deal_opened' },
        { label: 'Quote sent', value: 'quote_sent' },
        { label: 'Stage changed', value: 'stage_changed' },
        { label: 'Digest sent', value: 'digest_sent' },
        { label: 'Contact merged', value: 'contact_merged' },
      ],
    },
    {
      name: 'summary',
      type: 'text',
      required: true,
    },
    {
      name: 'meta',
      type: 'json',
      admin: { description: 'Free-form detail, e.g. {"from":"new","to":"quoted"}.' },
    },
  ],
  timestamps: true,
}

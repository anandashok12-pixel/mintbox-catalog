import type { CollectionConfig } from 'payload'
import { updateDealActivity } from './hooks/updateDealActivity'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'preview',
    defaultColumns: ['contact', 'channel', 'direction', 'preview', 'sentAt'],
    description: 'Every message across every channel. Adapters write here; nothing sends from here.',
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
      name: 'channel',
      type: 'select',
      required: true,
      options: [
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Email', value: 'email' },
        { label: 'Website form', value: 'form' },
      ],
    },
    {
      name: 'direction',
      type: 'select',
      required: true,
      options: [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' },
      ],
      admin: {
        description: 'Outbound = fromMe on WhatsApp, or sent from a monitored mailbox. Captured read-only, never sent from here.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
    },
    {
      name: 'preview',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'First ~80 chars of body, set on create for the list view.',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'providerId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'WhatsApp message id / Gmail message id. Makes webhook retries idempotent.',
      },
    },
    {
      name: 'sentAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (typeof data.body === 'string' && data.body) {
          data.preview = data.body.slice(0, 80)
        }
        return data
      },
    ],
    afterChange: [updateDealActivity],
  },
  timestamps: true,
}

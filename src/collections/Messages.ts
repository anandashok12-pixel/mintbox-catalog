import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { updateDealActivity } from './hooks/updateDealActivity'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'preview',
    defaultColumns: ['contact', 'channel', 'direction', 'preview', 'sentAt'],
    description: 'Every message across every channel. Adapters write here; nothing sends from here.',
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
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
    // ---- Email-only fields (channel = 'email') ----
    {
      name: 'mailbox',
      type: 'text',
      index: true,
      admin: { description: 'Which of our mailboxes this message was read from / sent through.' },
    },
    {
      name: 'threadId',
      type: 'text',
      index: true,
      admin: { description: 'Gmail thread id. Groups a conversation and keeps replies threaded.' },
    },
    {
      name: 'rfcMessageId',
      type: 'text',
      admin: { description: 'RFC 5322 Message-ID header, used for In-Reply-To / References when replying.' },
    },
    { name: 'subject', type: 'text' },
    { name: 'fromEmail', type: 'text' },
    { name: 'toEmails', type: 'text', admin: { description: 'Comma separated To addresses.' } },
    { name: 'ccEmails', type: 'text', admin: { description: 'Comma separated Cc addresses.' } },
    {
      name: 'trackingToken',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Random token in the open-tracking pixel URL. Outbound CRM-sent mail only.' },
    },
    {
      name: 'openedAt',
      type: 'date',
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'First time the tracking pixel loaded. A soft signal: image proxies and blockers skew it.',
      },
    },
    {
      name: 'lastOpenedAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'openCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
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

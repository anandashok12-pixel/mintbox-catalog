import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'phoneE164', 'email', 'lastActivityAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'From WhatsApp pushName or a form. A form-submitted name is never overwritten by pushName.',
      },
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      // The join key across every channel. Unique + indexed: this is what
      // makes a WhatsApp message, a form submission and an email thread
      // resolve to the same person. See src/lib/phone.ts normalizePhone().
      name: 'phoneE164',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'E.164 normalised, e.g. +919886537631. The identity key across all channels.',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'nameSource',
      type: 'select',
      defaultValue: 'form',
      options: [
        { label: 'Website form', value: 'form' },
        { label: 'WhatsApp pushName', value: 'whatsapp' },
        { label: 'Manually edited', value: 'manual' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Governs whether pushName is allowed to overwrite name on sync.',
      },
    },
    {
      name: 'lastActivityAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'deals',
      type: 'join',
      collection: 'deals',
      on: 'contact',
      admin: {
        description: 'All deals for this contact.',
      },
    },
    {
      name: 'mergedInto',
      type: 'relationship',
      relationTo: 'contacts',
      admin: {
        position: 'sidebar',
        description: 'Set when this contact was manually merged into another (duplicate number, colleague handoff, etc).',
      },
    },
  ],
  timestamps: true,
}

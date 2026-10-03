import type { GlobalConfig } from 'payload'

/** Per-mailbox email signatures, edited from the CRM Email tab. */
export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: 'Email Settings',
  access: {
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'signatures',
      type: 'array',
      admin: { description: 'Appended below the message when sending from this mailbox.' },
      fields: [
        { name: 'mailbox', type: 'text', required: true },
        { name: 'signature', type: 'textarea' },
      ],
    },
  ],
}

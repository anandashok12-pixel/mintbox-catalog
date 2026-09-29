import type { CollectionConfig } from 'payload'

// Standalone CRM to-dos, not tied to any deal - e.g. "Call packaging vendor"
// or "Restock Diwali hampers". Per-deal to-dos live on Deals.tasks instead.
export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'done', 'dueDate', 'updatedAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (typeof data.done === 'boolean' && data.done !== originalDoc?.done) {
          data.doneAt = data.done ? new Date().toISOString() : null
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Call packaging vendor" or "Restock Diwali hampers"',
      },
    },
    { name: 'done', type: 'checkbox', defaultValue: false },
    {
      type: 'row',
      fields: [
        { name: 'dueDate', type: 'date', admin: { width: '50%' } },
        { name: 'doneAt', type: 'date', admin: { width: '50%', readOnly: true } },
      ],
    },
  ],
  timestamps: true,
}

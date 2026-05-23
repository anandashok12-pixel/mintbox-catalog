import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug && data?.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return data
      },
    ],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'emoji', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        // Read-only in the UI - auto-generated server-side from name on save.
        // To override, clear the field and type a custom value before saving.
        readOnly: true,
        description: 'Auto-generated from Name on save (e.g. "water-bottles"). Clear and retype to override.',
      },
    },
    {
      name: 'emoji',
      type: 'text',
      admin: {
        description: 'Emoji icon for this category',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order in sidebar (lower = first)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    // 'category' removed from defaultColumns — relationship columns load at depth:0
    // (just an ID), then lazily re-fetch the name client-side, causing "Loading..." on
    // every list load. Keep the list snappy with flat fields only.
    defaultColumns: ['name', 'price', 'inStock', 'customisable', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
      admin: {
        // 'drawer' opens a modal list with proper search — avoids the dropdown
        // dismissal bug where keyboard events close the select while typing, and
        // re-fetches on every open so newly created categories appear immediately.
        appearance: 'drawer',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price per unit in INR (₹)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'emoji',
      type: 'text',
      admin: {
        description: 'Emoji fallback if no image uploaded',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'moq',
      type: 'number',
      defaultValue: 10,
      min: 1,
      admin: {
        description: 'Minimum order quantity',
      },
    },
    {
      name: 'customisable',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Can be customised with logo/branding?',
      },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Currently available?',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order within category (lower = first)',
      },
    },
  ],
}

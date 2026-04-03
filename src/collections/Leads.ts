import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'referenceCode',
    defaultColumns: ['referenceCode', 'name', 'company', 'email', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      if (req.user) return true
      return false
    },
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.referenceCode = 'MB-' + Date.now().toString(36).toUpperCase().slice(-6)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'referenceCode',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated reference code',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'occasion',
      type: 'select',
      options: [
        { label: 'Employee Welcome Kit', value: 'welcome_kit' },
        { label: 'Diwali Gifting', value: 'diwali' },
        { label: 'Holi Gifting', value: 'holi' },
        { label: 'Corporate Event', value: 'corporate_event' },
        { label: 'Client Gifting', value: 'client_gifting' },
        { label: 'Festival Season', value: 'festival' },
        { label: 'Year-End Gifting', value: 'year_end' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'productName',
          type: 'text',
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
        },
        {
          name: 'unitPrice',
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      name: 'estimatedTotal',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
    },
  ],
  timestamps: true,
}

import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'referenceCode',
    defaultColumns: ['referenceCode', 'name', 'company', 'email', 'phone', 'channel', 'entryPage', 'status', 'createdAt'],
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
      // Mandatory on every site form (enforced in /api/leads). Not `required`
      // here because that adds NOT NULL and older leads have no phone.
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
      name: 'channel',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Where the lead first found us, e.g. "google / organic", "chatgpt / ai-assistant"',
      },
    },
    {
      type: 'collapsible',
      label: 'Lead source (first visit)',
      admin: {
        description: "Captured from the visitor's first ever visit to the site.",
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'source', type: 'text', admin: { readOnly: true, width: '33%', description: 'google, chatgpt, linkedin, direct…' } },
            { name: 'medium', type: 'text', admin: { readOnly: true, width: '33%', description: 'organic, cpc, ai-assistant, referral, social, none' } },
            { name: 'campaign', type: 'text', admin: { readOnly: true, width: '33%' } },
          ],
        },
        { name: 'entryPage', label: 'Entry page', type: 'text', admin: { readOnly: true, description: 'First page they landed on (with any UTM params)' } },
        { name: 'referrer', label: 'Referrer URL', type: 'text', admin: { readOnly: true } },
        {
          type: 'row',
          fields: [
            { name: 'utmTerm', label: 'UTM term / keyword', type: 'text', admin: { readOnly: true, width: '50%' } },
            { name: 'utmContent', label: 'UTM content', type: 'text', admin: { readOnly: true, width: '50%' } },
          ],
        },
        { name: 'firstVisitAt', label: 'First visit', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Lead source (visit that converted)',
      admin: {
        initCollapsed: true,
        description: 'The session in which the form was submitted. Differs from first visit for returning visitors.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'lastSource', label: 'Source', type: 'text', admin: { readOnly: true, width: '33%' } },
            { name: 'lastMedium', label: 'Medium', type: 'text', admin: { readOnly: true, width: '33%' } },
            { name: 'lastCampaign', label: 'Campaign', type: 'text', admin: { readOnly: true, width: '33%' } },
          ],
        },
        { name: 'lastEntryPage', label: 'Entry page', type: 'text', admin: { readOnly: true } },
        { name: 'lastReferrer', label: 'Referrer URL', type: 'text', admin: { readOnly: true } },
        { name: 'formPage', label: 'Form submitted on', type: 'text', admin: { readOnly: true } },
      ],
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

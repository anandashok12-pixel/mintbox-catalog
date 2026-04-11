import type { GlobalConfig } from 'payload'

export const FAQPage: GlobalConfig = {
  slug: 'faq-page',
  label: 'FAQ Page',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ── HERO ──
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Frequently asked questions' },
        { name: 'titleLine1', type: 'text', defaultValue: 'Everything you' },
        { name: 'titleLine2', type: 'text', defaultValue: 'need to know.' },
        { name: 'subtitle', type: 'textarea' },
      ],
    },

    // ── FAQ CATEGORIES with nested items ──
    {
      name: 'categories',
      type: 'array',
      admin: {
        description: 'FAQ categories with their questions and answers',
      },
      fields: [
        { name: 'categoryId', type: 'text', required: true, admin: { description: 'Unique ID (e.g. "ordering", "branding")' } },
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text', required: true },
        {
          name: 'iconId',
          type: 'select',
          required: true,
          options: [
            { label: 'Ordering', value: 'ordering' },
            { label: 'Branding', value: 'branding' },
            { label: 'Delivery', value: 'delivery' },
            { label: 'Products', value: 'products' },
            { label: 'Pricing', value: 'pricing' },
            { label: 'Sustainability', value: 'sustainability' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true, admin: { description: 'Supports <strong> and <br /> HTML tags' } },
            { name: 'searchText', type: 'text', admin: { description: 'Plain text for search matching (auto-derived from question if empty)' } },
            {
              name: 'tag',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Popular', value: 'popular' },
                { label: 'New', value: 'new' },
              ],
              defaultValue: 'none',
            },
          ],
        },
      ],
    },

    // ── STILL HAVE QUESTIONS ──
    {
      name: 'stillQuestions',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: "We're a WhatsApp message away." },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'contactCards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'text', required: true },
            { name: 'linkText', type: 'text', required: true },
            { name: 'linkUrl', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}

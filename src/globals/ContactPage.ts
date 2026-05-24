import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', defaultValue: 'Contact MintBox | Request a Corporate Gifting Quote' },
        {
          name: 'metaDescription',
          type: 'textarea',
          defaultValue:
            'Contact MintBox to plan onboarding kits, festive gifting, client gifts, and team hampers. Share your team size, occasion, and budget to get a curated quote.',
        },
      ],
    },

    // ── HERO ──
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Get in touch' },
        { name: 'titleLine1', type: 'text', defaultValue: "Let's talk" },
        { name: 'titleLine2', type: 'text', defaultValue: 'about your team.' },
        { name: 'subtitle', type: 'textarea' },
      ],
    },

    // ── FORM INFO (left column) ──
    {
      name: 'formInfo',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Send us a message' },
        { name: 'title', type: 'text', defaultValue: "We'd love to hear from you." },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'promises',
          type: 'array',
          fields: [
            { name: 'bold', type: 'text', required: true },
            { name: 'desc', type: 'text', required: true },
          ],
        },
      ],
    },

    // ── FORM CONFIG (select options + success messages) ──
    {
      name: 'formConfig',
      type: 'group',
      fields: [
        {
          name: 'occasionOptions',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        {
          name: 'teamSizeOptions',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        {
          name: 'budgetOptions',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        { name: 'successTitle', type: 'text', defaultValue: 'Message sent!' },
        { name: 'successMessage', type: 'text', defaultValue: 'Anand will get back to you within 4 hours on business days.' },
      ],
    },

    // ── CONTACT DETAILS ──
    {
      name: 'contactDetails',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '+91 9886537631' },
        { name: 'email', type: 'text', defaultValue: 'hello@themintbox.in' },
        { name: 'emailSubNote', type: 'text', defaultValue: 'Reply within 4 hours on business days' },
        { name: 'officeAddress', type: 'textarea' },
        { name: 'mapLabel', type: 'text', defaultValue: 'Sobha Alexander Plaza, Ashok Nagar' },
        { name: 'mapSublabel', type: 'text', defaultValue: 'Commissariat Rd, Bengaluru 560025' },
        { name: 'whatsappUrl', type: 'text', defaultValue: 'https://wa.me/919886537631' },
      ],
    },
  ],
}

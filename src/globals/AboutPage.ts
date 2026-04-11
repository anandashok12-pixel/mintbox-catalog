import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: () => true,
  },
  fields: [
    // ── HERO ──
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'titleLine1', type: 'text', defaultValue: 'We exist because' },
        { name: 'titleLine2', type: 'text', defaultValue: 'gifting deserved better.' },
        { name: 'manifesto', type: 'textarea' },
      ],
    },

    // ── IMAGE BANNER ──
    {
      name: 'imageBanner',
      type: 'group',
      fields: [
        { name: 'bannerImage', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },

    // ── FOUNDING STORY ──
    {
      name: 'foundingStory',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'The founding story' },
        { name: 'title', type: 'text', defaultValue: 'Born from a box that disappointed.' },
        { name: 'storyImage', type: 'upload', relationTo: 'media' },
        { name: 'paragraph1', type: 'textarea' },
        { name: 'paragraph2', type: 'textarea' },
        { name: 'pullQuote', type: 'textarea' },
        { name: 'paragraph3', type: 'textarea' },
        { name: 'paragraph4', type: 'textarea' },
        { name: 'paragraph5', type: 'textarea' },
      ],
    },

    // ── WHAT WAS BROKEN ──
    {
      name: 'whatBroke',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'What we set out to fix' },
        { name: 'title', type: 'text', defaultValue: 'The five things that were broken before MintBox existed.' },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'num', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'textarea', required: true },
          ],
        },
        {
          name: 'closingCard',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'desc', type: 'textarea' },
          ],
        },
      ],
    },

    // ── VALUES ──
    {
      name: 'values',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Our commitments' },
        { name: 'titleLine1', type: 'text', defaultValue: 'Four things we' },
        { name: 'titleLine2', type: 'text', defaultValue: 'never compromise on.' },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'num', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'tag', type: 'text', required: true },
            { name: 'desc', type: 'textarea', required: true },
            { name: 'example', type: 'textarea', required: true },
          ],
        },
      ],
    },

    // ── FOUNDER ──
    {
      name: 'founder',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'The person behind MintBox' },
        { name: 'title', type: 'text', defaultValue: 'Built by someone who felt the problem firsthand.' },
        { name: 'bioParagraph1', type: 'textarea' },
        { name: 'bioParagraph2', type: 'textarea' },
        { name: 'email', type: 'text', defaultValue: 'anand@getmintbox.com' },
        { name: 'phone', type: 'text', defaultValue: '+91 86182 37189' },
        { name: 'whatsappUrl', type: 'text', defaultValue: 'https://wa.me/918618237189' },
        { name: 'cardName', type: 'text', defaultValue: 'Anand Ashok' },
        { name: 'cardRole', type: 'text', defaultValue: 'Director, MintBox' },
        { name: 'portrait', type: 'upload', relationTo: 'media' },
      ],
    },

    // ── CTA ──
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Work with a team that takes gifting seriously.' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'primaryButtonLabel', type: 'text', defaultValue: 'Request a quote →' },
        { name: 'primaryButtonUrl', type: 'text', defaultValue: '/contact' },
        { name: 'secondaryButtonLabel', type: 'text', defaultValue: 'Browse catalogue' },
        { name: 'secondaryButtonUrl', type: 'text', defaultValue: '/catalog' },
      ],
    },
  ],
}

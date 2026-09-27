import type { MetadataRoute } from 'next'
import { isPublished } from '@/lib/publishGate'

const SITE_URL = 'https://themintbox.in'

// A few guide URLs below are embargoed until a scheduled go-live date (see
// each guide's own PUBLISH_AT); revalidate hourly so the sitemap doesn't
// advertise a URL that still 404s.
export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    // Core pages
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Seasonal hubs
    {
      url: `${SITE_URL}/diwali-corporate-gifts`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Collections
    {
      url: `${SITE_URL}/collections/corporate-gifts`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections/drinkware`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections/drinkware/customized-water-bottles`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/collections/drinkware/personalized-coffee-mugs`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/collections/eco-friendly-gifts`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections/employee-welcome-kit`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections/hampers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections/stationery`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections/tech-gifts`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Customization
    {
      url: `${SITE_URL}/customization/personalized-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Bangalore local SEO
    {
      url: `${SITE_URL}/bangalore-corporate-gifting`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/top-companies`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/where-to-buy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/gift-hampers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/famous-bangalore-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/bulk-gifting`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/same-day-delivery`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/suppliers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Industry solutions
    {
      url: `${SITE_URL}/industry-solutions`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/industry-solutions/startups`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/industry-solutions/tech-companies`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Guides
    {
      url: `${SITE_URL}/guides`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/top-corporate-gifting-companies-india`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/farewell-gifts-for-colleagues`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/secret-santa-gifts-for-colleagues`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/electronic-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/office-gift-ideas`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/employee-joining-kit`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/luxury-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gift-items-list`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-diwali-gift-hampers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/diwali-gifts-for-clients`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/new-year-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/womens-day-gifts-for-employees`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/employee-appreciation-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/gst-on-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-memento-ideas`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/guides/office-inauguration-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/guides/diwali-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/diwali-gifts-for-employees`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...(isPublished('2026-09-27T00:00:00+05:30') ? [{
      url: `${SITE_URL}/guides/diwali-gifts-for-employees-by-budget`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),
    ...(isPublished('2026-09-29T00:00:00+05:30') ? [{
      url: `${SITE_URL}/guides/diwali-hampers-for-employees-vs-clients`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),
    ...(isPublished('2026-10-02T00:00:00+05:30') ? [{
      url: `${SITE_URL}/guides/corporate-gifts-by-occasion`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),
    {
      url: `${SITE_URL}/guides/budget-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/christmas-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gift-ideas-2026`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-budget`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-etiquette`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-handbook`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-trends-2026`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-for-clients`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-for-new-employees`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-under-100`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-under-500`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-under-1000`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/how-to-choose-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/sustainable-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/unique-corporate-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/what-to-gift-employees`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/work-anniversary-gifts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Legal
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

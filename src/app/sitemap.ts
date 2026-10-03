import type { MetadataRoute } from 'next'
import { isPublished } from '@/lib/publishGate'

const SITE_URL = 'https://themintbox.in'

// Real last-change dates for static pages (from git). Dynamic, database-driven pages use the current time.
const PAGE_LASTMOD: Record<string, string> = {
  '/about': '2026-05-23',
  '/bangalore-corporate-gifting': '2026-09-27',
  '/bangalore-corporate-gifting/bulk-gifting': '2026-05-26',
  '/bangalore-corporate-gifting/same-day-delivery': '2026-05-26',
  '/bangalore-corporate-gifting/suppliers': '2026-05-26',
  '/contact': '2026-05-26',
  '/customization/personalized-corporate-gifts': '2026-05-26',
  '/faq': '2026-05-23',
  '/guides': '2026-09-27',
  '/guides/budget-corporate-gifts': '2026-09-27',
  '/guides/christmas-corporate-gifts': '2026-05-26',
  '/guides/corporate-gift-ideas-2026': '2026-05-26',
  '/guides/corporate-gifting-budget': '2026-05-26',
  '/guides/corporate-gifting-etiquette': '2026-05-26',
  '/guides/corporate-gifting-handbook': '2026-09-27',
  '/guides/corporate-gifting-trends-2026': '2026-05-26',
  '/guides/corporate-gifts-by-occasion': '2026-09-27',
  '/guides/corporate-gifts-for-clients': '2026-05-26',
  '/guides/corporate-gifts-for-new-employees': '2026-05-26',
  '/guides/corporate-gifts-under-100': '2026-05-26',
  '/guides/corporate-gifts-under-1000': '2026-09-27',
  '/guides/corporate-gifts-under-500': '2026-05-26',
  '/guides/diwali-corporate-gifts': '2026-09-27',
  '/guides/diwali-gifts-for-employees': '2026-10-03',
  '/guides/diwali-hampers-for-employees-vs-clients': '2026-09-27',
  '/guides/how-to-choose-corporate-gifts': '2026-05-26',
  '/guides/sustainable-corporate-gifts': '2026-05-26',
  '/guides/unique-corporate-gifts': '2026-05-26',
  '/guides/what-to-gift-employees': '2026-05-26',
  '/guides/work-anniversary-gifts': '2026-05-26',
  '/industry-solutions': '2026-09-27',
  '/industry-solutions/startups': '2026-05-26',
  '/industry-solutions/tech-companies': '2026-05-26',
  '/privacy': '2026-09-27',
  '/terms': '2026-09-27',
}

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
      lastModified: new Date(PAGE_LASTMOD['/about']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(PAGE_LASTMOD['/contact']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(PAGE_LASTMOD['/faq']),
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
      lastModified: new Date(PAGE_LASTMOD['/customization/personalized-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Bangalore local SEO
    {
      url: `${SITE_URL}/bangalore-corporate-gifting`,
      lastModified: new Date(PAGE_LASTMOD['/bangalore-corporate-gifting']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/bulk-gifting`,
      lastModified: new Date(PAGE_LASTMOD['/bangalore-corporate-gifting/bulk-gifting']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/same-day-delivery`,
      lastModified: new Date(PAGE_LASTMOD['/bangalore-corporate-gifting/same-day-delivery']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bangalore-corporate-gifting/suppliers`,
      lastModified: new Date(PAGE_LASTMOD['/bangalore-corporate-gifting/suppliers']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Industry solutions
    {
      url: `${SITE_URL}/industry-solutions`,
      lastModified: new Date(PAGE_LASTMOD['/industry-solutions']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/industry-solutions/startups`,
      lastModified: new Date(PAGE_LASTMOD['/industry-solutions/startups']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/industry-solutions/tech-companies`,
      lastModified: new Date(PAGE_LASTMOD['/industry-solutions/tech-companies']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Guides
    {
      url: `${SITE_URL}/guides`,
      lastModified: new Date(PAGE_LASTMOD['/guides']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/diwali-corporate-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/diwali-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/diwali-gifts-for-employees`,
      lastModified: new Date(PAGE_LASTMOD['/guides/diwali-gifts-for-employees']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/budget-corporate-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/budget-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/christmas-corporate-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/christmas-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gift-ideas-2026`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gift-ideas-2026']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-budget`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifting-budget']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-etiquette`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifting-etiquette']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-handbook`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifting-handbook']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifting-trends-2026`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifting-trends-2026']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-for-clients`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifts-for-clients']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-for-new-employees`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifts-for-new-employees']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-under-100`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifts-under-100']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-under-500`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifts-under-500']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/corporate-gifts-under-1000`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifts-under-1000']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/how-to-choose-corporate-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/how-to-choose-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/sustainable-corporate-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/sustainable-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/unique-corporate-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/unique-corporate-gifts']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/what-to-gift-employees`,
      lastModified: new Date(PAGE_LASTMOD['/guides/what-to-gift-employees']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/work-anniversary-gifts`,
      lastModified: new Date(PAGE_LASTMOD['/guides/work-anniversary-gifts']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Guides - scheduled go-live (excluded from the sitemap until their publish date)
    ...(isPublished('2026-09-29') ? [{
      url: `${SITE_URL}/guides/diwali-hampers-for-employees-vs-clients`,
      lastModified: new Date(PAGE_LASTMOD['/guides/diwali-hampers-for-employees-vs-clients']),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),
    ...(isPublished('2026-10-02') ? [{
      url: `${SITE_URL}/guides/corporate-gifts-by-occasion`,
      lastModified: new Date(PAGE_LASTMOD['/guides/corporate-gifts-by-occasion']),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),

    // Legal
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(PAGE_LASTMOD['/privacy']),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(PAGE_LASTMOD['/terms']),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

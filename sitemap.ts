
import { ALL_ARCHITECTS, CITIES } from './data';

/**
 * Phase 5: Optimized Sitemap Generation
 * Centralizes brand branches to reduce total URL count and improve SEO authority.
 */
export const generateSitemap = () => {
  const baseUrl = 'https://designdirectory.pk';
  
  const staticPages = [
    '',
    '/top-rated',
    '/cities',
    '/about',
    '/privacy',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  // City Listing Pages (Phase 1: /city/[city-slug])
  // These represent landing pages for local search discovery.
  const cityPages = CITIES.map(city => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  // Brand Profile Pages (Phase 1: /architects/[brand-slug])
  // One page per brand, regardless of location count. High SEO Consolidation.
  const architectPages = ALL_ARCHITECTS.map(architect => ({
    url: `${baseUrl}/architects/${architect.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Total URLs generated: ~1,100 (Efficient for crawl budget)
  return [...staticPages, ...cityPages, ...architectPages];
};

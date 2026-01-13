import { ALL_ARCHITECTS, CITIES, CATEGORIES } from './data';

/**
 * Programmatic Sitemap Engine
 * Returns an array of URL objects for XML generation.
 */
export const generateSitemapData = () => {
  const baseUrl = 'https://architectorly.com';
  const today = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '', priority: 1.0, freq: 'daily' },
    { url: '/top-rated', priority: 0.9, freq: 'weekly' },
    { url: '/cities', priority: 0.8, freq: 'weekly' },
    { url: '/categories', priority: 0.8, freq: 'weekly' },
    { url: '/estimate-calculator', priority: 0.9, freq: 'monthly' },
    { url: '/about', priority: 0.5, freq: 'monthly' },
    { url: '/sitemap', priority: 0.7, freq: 'monthly' },
  ].map(page => ({
    url: `${baseUrl}${page.url}`,
    lastmod: today,
    changefreq: page.freq,
    priority: page.priority,
  }));

  const cityPages = CITIES.map(city => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const categoryPages = CATEGORIES.map(cat => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.7,
  }));
  
  const architectPages = ALL_ARCHITECTS.map(architect => ({
    url: `${baseUrl}/architects/${architect.slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...categoryPages, ...architectPages];
};

/**
 * Helper to generate the actual XML string.
 * Usage: console.log(getSitemapXML());
 */
export const getSitemapXML = () => {
  const data = generateSitemapData();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  data.forEach(item => {
    xml += `  <url>\n`;
    xml += `    <loc>${item.url}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  return xml;
};
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.architectorly.com';
  const date = new Date().toISOString();

  const staticPages = [
    '',
    '/top-rated',
    '/cities',
    '/categories',
    '/estimate-calculator',
    '/sitemap',
    '/about',
    '/privacy',
    '/terms',
  ];

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `;
    })
    .join('')}
</urlset>`;

  return new NextResponse(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
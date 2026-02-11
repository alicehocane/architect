import { NextResponse } from 'next/server';
import { CITIES } from '@/data';

export async function GET() {
  const baseUrl = 'https://www.architectorly.com';
  const date = new Date().toISOString();

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${CITIES
    .map((city) => {
      return `
    <url>
      <loc>${baseUrl}/city/${city.slug}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
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
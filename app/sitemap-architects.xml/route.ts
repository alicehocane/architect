import { NextResponse } from 'next/server';
import { ALL_ARCHITECTS } from '@/data';

export async function GET() {
  const baseUrl = 'https://www.architectorly.com';
  const date = new Date().toISOString();

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${ALL_ARCHITECTS
    .map((architect) => {
      const priority = architect.slug === 'aak-architects' ? '1.0' : '0.6';
      return `
    <url>
      <loc>${baseUrl}/architects/${architect.slug}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${priority}</priority>
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
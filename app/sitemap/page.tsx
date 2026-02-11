import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CITIES, ALL_ARCHITECTS, CATEGORIES } from '@/data';
import { Architect } from '@/types';

export const metadata: Metadata = {
  title: "Site Map & Index | Architectorly",
  description: "Browse all architects, cities, and categories on Architectorly. The complete index of design professionals in Pakistan.",
};

export default function SitemapPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TableOfContents",
    "name": "Architectorly Site Map",
    "description": "Index of all pages including cities, categories, and architect profiles.",
    "url": "https://www.architectorly.com/sitemap"
  };

  const groupedArchitects = (() => {
    const groups: { [key: string]: Architect[] } = {};
    [...ALL_ARCHITECTS]
      .sort((a, b) => a["Shop Name"].localeCompare(b["Shop Name"]))
      .forEach(a => {
        const firstLetter = a["Shop Name"].charAt(0).toUpperCase();
        const key = /[A-Z]/.test(firstLetter) ? firstLetter : '#';
        if (!groups[key]) groups[key] = [];
        groups[key].push(a);
      });
    return groups;
  })();

  const letters = Object.keys(groupedArchitects).sort();

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-24 page-transition" role="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="mb-20">
        <span className="text-[13px] font-bold text-[#0066cc] uppercase tracking-[0.2em] mb-4 block">Full Index</span>
        <h1 className="text-[48px] sm:text-[64px] font-bold tracking-tight text-[#1d1d1f] mb-4 leading-none">
          Site Map.
        </h1>
        <p className="text-[21px] text-[#86868b] font-light max-w-[800px] leading-relaxed">
          Find exactly what you are looking for. Browse our complete list of cities, services, and professional firms.
        </p>
      </header>

      <section className="mb-24">
        <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]/60">Main Pages</h2>
        <nav aria-label="Main sections">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-[15px] text-[#424245]">
            <li><Link href="/" className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Directory Home <span className="text-[#d2d2d7]">→</span></Link></li>
            <li><Link href="/top-rated" className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Top Rated Firms <span className="text-[#d2d2d7]">→</span></Link></li>
            <li><Link href="/cities" className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">All Cities <span className="text-[#d2d2d7]">→</span></Link></li>
            <li><Link href="/categories" className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Services <span className="text-[#d2d2d7]">→</span></Link></li>
            <li><Link href="/estimate-calculator" className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Cost Calculator <span className="text-[#d2d2d7]">→</span></Link></li>
            <li><Link href="/about" className="hover:text-[#0071e3] transition-colors">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-[#0071e3] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#0071e3] transition-colors">Terms of Service</Link></li>
          </ul>
        </nav>
      </section>

      <section className="mb-24">
        <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]/60">Services</h2>
        <nav aria-label="Category directories">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4 text-[15px] text-[#424245]">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.slug} 
                href={`/category/${cat.slug}`}
                className="hover:text-[#0071e3] transition-colors flex justify-between items-center group py-1"
              >
                <span>{cat.name}s</span>
                <span className="text-[12px] text-[#86868b] group-hover:text-[#0071e3] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{cat.count}</span>
              </Link>
            ))}
          </div>
        </nav>
      </section>

      <section className="mb-24">
        <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]/60">Cities</h2>
        <nav aria-label="City directories">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4 text-[15px] text-[#424245]">
            {CITIES.map(city => (
              <Link 
                key={city.slug} 
                href={`/city/${city.slug}`}
                className="hover:text-[#0071e3] transition-colors flex justify-between items-center group py-1"
              >
                <span>{city.name}</span>
                <span className="text-[12px] text-[#86868b] group-hover:text-[#0071e3] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{city.count}</span>
              </Link>
            ))}
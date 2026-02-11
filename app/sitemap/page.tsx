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

  // Server-side grouping logic
  const groupedArchitects: { [key: string]: Architect[] } = {};
  [...ALL_ARCHITECTS]
    .sort((a, b) => a["Shop Name"].localeCompare(b["Shop Name"]))
    .forEach(a => {
      const firstLetter = a["Shop Name"].charAt(0).toUpperCase();
      const key = /[A-Z]/.test(firstLetter) ? firstLetter : '#';
      if (!groupedArchitects[key]) groupedArchitects[key] = [];
      groupedArchitects[key].push(a);
    });

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
                <span>{cat.name}</span>
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
          </div>
        </nav>
      </section>

      <section className="mb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#d2d2d7]/60 gap-4">
          <h2 className="text-[24px] font-bold text-[#1d1d1f]">A-Z Firms</h2>
          {/* Note: In-page anchors work natively. For smooth scrolling, CSS in globals.css handles it. */}
          <div className="flex flex-wrap gap-2">
            {letters.map(letter => (
              <a 
                key={letter} 
                href={`#index-${letter}`}
                className="text-[12px] font-bold text-[#0066cc] w-8 h-8 flex items-center justify-center bg-[#f5f5f7] rounded-full hover:bg-[#0071e3] hover:text-white transition-all uppercase no-underline"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {letters.map(letter => (
            <div key={letter} id={`index-${letter}`} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[32px] font-bold text-[#1d1d1f]">{letter}</span>
                <div className="h-px flex-1 bg-[#d2d2d7]/40"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
                {groupedArchitects[letter].map(a => (
                  <Link 
                    key={a.slug} 
                    href={`/architects/${a.slug}`}
                    className="text-[14px] text-[#424245] hover:text-[#0071e3] hover:underline truncate py-1 block"
                  >
                    {a["Shop Name"]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 pt-12 border-t border-[#d2d2d7]/50">
        <div className="bg-[#f5f5f7] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#d2d2d7]/30 text-center md:text-left">
          <div>
            <h3 className="font-bold text-[21px] text-[#1d1d1f] mb-2">Are we missing a firm?</h3>
            <p className="text-[16px] text-[#86868b] font-light">We are constantly updating our list. Let us know if you want to be added.</p>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=923215201830" target="_blank" rel="noopener noreferrer" className="bg-[#0071e3] text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-[#0077ed] transition-all shadow-xl active:scale-95">Submit Your Firm</a>
        </div>
      </footer>
    </div>
  );
}
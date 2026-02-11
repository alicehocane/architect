import React, { useMemo, useEffect } from 'react';
import { CITIES, ALL_ARCHITECTS, CATEGORIES } from '../data';
import { Architect } from '../types';

interface SitemapPageProps {
  onCityClick: (slug: string) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onCityClick }) => {
  const navigateTo = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.location.hash = url;
  };

  useEffect(() => {
    // 1. Dynamic Title
    document.title = "Site Map & Index | Architectorly";

    // 2. Dynamic Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Browse all architects, cities, and categories on Architectorly. The complete index of design professionals in Pakistan.");

    // 3. JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = {
      "@context": "https://schema.org",
      "@type": "TableOfContents",
      "name": "Architectorly Site Map",
      "description": "Index of all pages including cities, categories, and architect profiles.",
      "url": "https://www.architectorly.com/sitemap"
    };
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  const groupedArchitects = useMemo(() => {
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
  }, []);

  const letters = Object.keys(groupedArchitects).sort();

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-24 page-transition" role="main">
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
            <li><a href="/" onClick={(e) => navigateTo(e, '/')} className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Directory Home <span className="text-[#d2d2d7]">→</span></a></li>
            <li><a href="/top-rated" onClick={(e) => navigateTo(e, '/top-rated')} className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Top Rated Firms <span className="text-[#d2d2d7]">→</span></a></li>
            <li><a href="/cities" onClick={(e) => navigateTo(e, '/cities')} className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">All Cities <span className="text-[#d2d2d7]">→</span></a></li>
            <li><a href="/categories" onClick={(e) => navigateTo(e, '/categories')} className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Services <span className="text-[#d2d2d7]">→</span></a></li>
            <li><a href="/estimate-calculator" onClick={(e) => navigateTo(e, '/estimate-calculator')} className="font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2">Cost Calculator <span className="text-[#d2d2d7]">→</span></a></li>
            <li><a href="/about" onClick={(e) => navigateTo(e, '/about')} className="hover:text-[#0071e3] transition-colors">About Us</a></li>
            <li><a href="/privacy" onClick={(e) => navigateTo(e, '/privacy')} className="hover:text-[#0071e3] transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" onClick={(e) => navigateTo(e, '/terms')} className="hover:text-[#0071e3] transition-colors">Terms of Service</a></li>
          </ul>
        </nav>
      </section>

      <section className="mb-24">
        <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]/60">Services</h2>
        <nav aria-label="Category directories">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4 text-[15px] text-[#424245]">
            {CATEGORIES.map(cat => (
              <a 
                key={cat.slug} 
                href={`/category/${cat.slug}`}
                onClick={(e) => navigateTo(e, `/category/${cat.slug}`)}
                className="hover:text-[#0071e3] transition-colors flex justify-between items-center group py-1"
              >
                <span>{cat.name}s</span>
                <span className="text-[12px] text-[#86868b] group-hover:text-[#0071e3] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{cat.count}</span>
              </a>
            ))}
          </div>
        </nav>
      </section>

      <section className="mb-24">
        <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]/60">Cities</h2>
        <nav aria-label="City directories">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4 text-[15px] text-[#424245]">
            {CITIES.map(city => (
              <a 
                key={city.slug} 
                href={`/city/${city.slug}`}
                onClick={(e) => navigateTo(e, `/city/${city.slug}`)}
                className="hover:text-[#0071e3] transition-colors flex justify-between items-center group py-1"
              >
                <span>{city.name}</span>
                <span className="text-[12px] text-[#86868b] group-hover:text-[#0071e3] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{city.count}</span>
              </a>
            ))}
          </div>
        </nav>
      </section>

      <section className="mb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#d2d2d7]/60 gap-4">
          <h2 className="text-[24px] font-bold text-[#1d1d1f]">A-Z Firms</h2>
          <div className="flex flex-wrap gap-2">
            {letters.map(letter => (
              <button key={letter} onClick={() => { const el = document.getElementById(`index-${letter}`); el?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[12px] font-bold text-[#0066cc] w-8 h-8 flex items-center justify-center bg-[#f5f5f7] rounded-full hover:bg-[#0071e3] hover:text-white transition-all uppercase">{letter}</button>
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
                  <a 
                    key={a.slug} 
                    href={`/architects/${a.slug}`}
                    onClick={(e) => navigateTo(e, `/architects/${a.slug}`)}
                    className="text-[14px] text-[#424245] hover:text-[#0071e3] hover:underline truncate py-1 block"
                  >
                    {a["Shop Name"]}
                  </a>
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
          <a href="https://api.whatsapp.com/send/?phone=923215201830" className="bg-[#0071e3] text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-[#0077ed] transition-all shadow-xl active:scale-95">Submit Your Firm</a>
        </div>
      </footer>
    </div>
  );
};

export default SitemapPage;
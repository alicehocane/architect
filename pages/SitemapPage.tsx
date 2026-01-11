import React, { useMemo } from 'react';
import { CITIES, ALL_ARCHITECTS } from '../data';
import { Architect } from '../types';

interface SitemapPageProps {
  onCityClick: (slug: string) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onCityClick }) => {
  const handleLinkClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    onCityClick(slug);
  };

  const navTo = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    window.location.hash = hash;
  };

  // Group architects alphabetically for a complete brand index
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
        <span className="text-[13px] font-bold text-[#0066cc] uppercase tracking-[0.2em] mb-4 block">Index & Directory</span>
        <h1 className="text-[48px] sm:text-[64px] font-bold tracking-tight text-[#1d1d1f] mb-4">Site Map.</h1>
        <p className="text-[21px] text-[#86868b] font-light max-w-[800px]">
          A complete index of Pakistan's architectural landscape, categorized by region and professional practice.
        </p>
      </header>

      {/* 1. Main Infrastructure Links */}
      <section className="mb-24">
        <h2 className="text-[17px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]">Directory Hubs</h2>
        <nav aria-label="Main sections">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-[15px] text-[#424245]">
            <li><a href="#" onClick={(e) => navTo(e, '')} className="font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors">Directory Home</a></li>
            <li><a href="#top-rated" onClick={(e) => navTo(e, 'top-rated')} className="font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors">Top Rated Firms</a></li>
            <li><a href="#cities" onClick={(e) => navTo(e, 'cities')} className="font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors">Browse All Cities</a></li>
            <li><a href="#estimate-calculator" onClick={(e) => navTo(e, 'estimate-calculator')} className="font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors">Cost Estimator Tool</a></li>
            <li><a href="#about" onClick={(e) => navTo(e, 'about')} className="hover:text-[#0071e3] transition-colors">About Us</a></li>
            <li><a href="#privacy" onClick={(e) => navTo(e, 'privacy')} className="hover:text-[#0071e3] transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" onClick={(e) => navTo(e, 'terms')} className="hover:text-[#0071e3] transition-colors">Terms of Service</a></li>
          </ul>
        </nav>
      </section>

      {/* 2. Complete City Directory */}
      <section className="mb-24">
        <h2 className="text-[17px] font-bold text-[#1d1d1f] mb-8 pb-4 border-b border-[#d2d2d7]">Cities & Regions</h2>
        <nav aria-label="City directories">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4 text-[14px] text-[#424245]">
            {CITIES.map(city => (
              <a 
                key={city.slug} 
                href={`#city/${city.slug}`}
                onClick={(e) => handleLinkClick(e, city.slug)}
                className="hover:text-[#0071e3] transition-colors flex justify-between items-center group"
              >
                <span>Architects in {city.name}</span>
                <span className="text-[10px] text-[#86868b] group-hover:text-[#0071e3]">({city.count})</span>
              </a>
            ))}
          </div>
        </nav>
      </section>

      {/* 3. Alphabetical Brand Index (The "Complete" coverage part) */}
      <section className="mb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#d2d2d7] gap-4">
          <h2 className="text-[17px] font-bold text-[#1d1d1f]">Professional Practice Index</h2>
          <div className="flex flex-wrap gap-2">
            {letters.map(letter => (
              <a key={letter} href={`#index-${letter}`} className="text-[11px] font-bold text-[#0066cc] w-6 h-6 flex items-center justify-center bg-[#f5f5f7] rounded hover:bg-[#0071e3] hover:text-white transition-all uppercase">{letter}</a>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {letters.map(letter => (
            <div key={letter} id={`index-${letter}`} className="scroll-mt-20">
              <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-6">{letter}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
                {groupedArchitects[letter].map(a => (
                  <a 
                    key={a.slug} 
                    href={`#architects/${a.slug}`}
                    onClick={(e) => navTo(e, `architects/${a.slug}`)}
                    className="text-[13px] text-[#424245] hover:text-[#0071e3] hover:underline truncate"
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
        <div className="bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-[17px] text-[#1d1d1f] mb-1">Missing your practice?</h3>
            <p className="text-[14px] text-[#86868b]">We are constantly verifying and adding new elite architectural firms.</p>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=923215201830" className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-[14px] font-bold hover:bg-[#0077ed] transition-all">Submit Your Firm</a>
        </div>
      </footer>
    </div>
  );
};

export default SitemapPage;

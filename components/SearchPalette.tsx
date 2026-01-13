
import React, { useState, useEffect, useRef } from 'react';
import { ALL_ARCHITECTS, CITIES } from '../data';
import { Architect, CityInfo } from '../types';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArchitect: (architect: Architect) => void;
  onSelectCity: (citySlug: string) => void;
}

const SearchPalette: React.FC<SearchPaletteProps> = ({ isOpen, onClose, onSelectArchitect, onSelectCity }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase();
  
  const filteredArchitects = query.length > 1 
    ? ALL_ARCHITECTS.filter(a => 
        a["Shop Name"].toLowerCase().includes(q) ||
        a.Category?.toLowerCase().includes(q) ||
        a.Locations.some(l => l.City.toLowerCase().includes(q))
      ).slice(0, 8)
    : [];

  const filteredCities = query.length > 1
    ? CITIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-[#fbfbfd]/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-[640px] bg-white rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-[#d2d2d7]/50 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-[#e5e5e7]/60 flex items-center gap-4">
          <svg className="w-6 h-6 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-[21px] outline-none placeholder-[#86868b] text-[#1d1d1f]"
            placeholder="Search firms, cities, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.length <= 1 ? (
            <div className="py-12 text-center text-[#86868b]">
              <p className="text-[15px]">To learn more about Pakistan's top designers, start typing...</p>
            </div>
          ) : (
            <>
              {filteredCities.length > 0 && (
                <div className="mb-4">
                  <h4 className="px-4 text-[11px] font-bold text-[#86868b] uppercase tracking-[0.15em] mb-2">Cities</h4>
                  {filteredCities.map(city => (
                    <button
                      key={city.slug}
                      onClick={() => { onSelectCity(city.slug); onClose(); }}
                      className="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#f5f5f7] flex items-center justify-between group"
                    >
                      <span className="text-[17px] font-medium">{city.name}</span>
                      <span className="text-[13px] text-[#86868b] group-hover:text-[#0066cc]">{city.count} Firms</span>
                    </button>
                  ))}
                </div>
              )}
              
              {filteredArchitects.length > 0 && (
                <div>
                  <h4 className="px-4 text-[11px] font-bold text-[#86868b] uppercase tracking-[0.15em] mb-2">Architectural Firms</h4>
                  {filteredArchitects.map(a => (
                    <button
                      key={a.slug}
                      onClick={() => { onSelectArchitect(a); onClose(); }}
                      className="w-full text-left px-4 py-4 rounded-2xl hover:bg-[#f5f5f7] group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[17px] font-bold group-hover:text-[#0071e3]">{a["Shop Name"]}</span>
                          <p className="text-[13px] text-[#86868b] mt-1">{a.Locations.map(l => l.City).join(', ')}</p>
                        </div>
                        <span className="text-[12px] font-bold text-[#ff9500]">{a.globalRating?.toFixed(1)} ★</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPalette;

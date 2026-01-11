import React, { useState, useMemo } from 'react';
import { CITIES, ALL_ARCHITECTS } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';

interface HomePageProps {
  onCityClick: (citySlug: string) => void;
  onArchitectClick: (architect: Architect) => void;
}

const PAGE_SIZE_CITIES = 6;
const PAGE_SIZE_ARCHITECTS = 12;

const HomePage: React.FC<HomePageProps> = ({ onCityClick, onArchitectClick }) => {
  const [search, setSearch] = useState('');
  const [visibleCitiesCount, setVisibleCitiesCount] = useState(PAGE_SIZE_CITIES);
  const [visibleArchitectsCount, setVisibleArchitectsCount] = useState(PAGE_SIZE_ARCHITECTS);
  
  const displayedCities = useMemo(() => {
    return CITIES.slice(0, visibleCitiesCount);
  }, [visibleCitiesCount]);

  const sortedArchitects = useMemo(() => {
    // 1. Initial sort by rating and review count
    const baseList = [...ALL_ARCHITECTS].sort((a, b) => {
      const ratingA = a.globalRating || 0;
      const ratingB = b.globalRating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.totalReviews || 0) - (a.totalReviews || 0);
    });

    // 2. Explicitly move AAK Architects to the first position for brand prominence
    const aakIndex = baseList.findIndex(a => a.slug === 'aak-architects');
    if (aakIndex > -1) {
      const [aak] = baseList.splice(aakIndex, 1);
      baseList.unshift(aak);
    }
    
    return baseList;
  }, []);

  const filteredArchitects = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return sortedArchitects;
    
    return sortedArchitects.filter(a => 
      a["Shop Name"].toLowerCase().includes(q) ||
      (a.Category && a.Category.toLowerCase().includes(q)) ||
      a.Locations.some(l => l.City.toLowerCase().includes(q))
    );
  }, [search, sortedArchitects]);

  const displayedArchitects = useMemo(() => {
    return filteredArchitects.slice(0, visibleArchitectsCount);
  }, [filteredArchitects, visibleArchitectsCount]);

  const handleLoadMoreCities = () => {
    setVisibleCitiesCount(prev => Math.min(prev + PAGE_SIZE_CITIES, CITIES.length));
  };

  const handleLoadMoreArchitects = () => {
    setVisibleArchitectsCount(prev => Math.min(prev + PAGE_SIZE_ARCHITECTS, filteredArchitects.length));
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 text-center overflow-hidden">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-[52px] sm:text-[88px] font-bold tracking-[-0.035em] leading-[1.02] text-[#1d1d1f] mb-8">
            Design for the <br className="hidden sm:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] to-[#5e5ce6]">future of Pakistan.</span>
          </h1>
          <p className="text-[20px] sm:text-[26px] text-[#86868b] font-light leading-snug mb-14 max-w-[620px] mx-auto">
            Connect with elite architects across the nation. Experience architectural mastery at your fingertips.
          </p>
          
          {/* Prominent Search Bar */}
          <div className="relative max-w-[660px] mx-auto group">
            <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#0071e3] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by city, firm, or category..."
              className="w-full h-[72px] bg-white rounded-[28px] border border-[#d2d2d7]/50 shadow-[0_15px_45px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] pl-16 pr-6 text-[21px] focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/30 transition-all outline-none placeholder-[#86868b] text-[#1d1d1f]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* City Tiles - New Clean Bento Layout */}
      {!search && (
        <section className="max-w-[1024px] mx-auto px-6 mb-32">
          <div className="mb-10">
            <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f]">Browse by City</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCities.map((city) => (
              <div 
                key={city.slug}
                className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-pointer"
                onClick={() => onCityClick(city.slug)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h4c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18"/><path d="M6 18h12"/><path d="M12 18v4"/><path d="M18 22V7c0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6h-4c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4v15"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M15 10h1"/><path d="M15 14h1"/><path d="M15 18h1"/></svg>
                    </div>
                    <span className="text-[13px] font-bold text-[#0066cc] bg-blue-50 px-3 py-1 rounded-full">{city.count} Firms</span>
                  </div>
                  <h3 className="text-[26px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
                </div>
                <div className="mt-8 flex items-center gap-2 text-[14px] font-medium text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">
                  View Professionals
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            ))}
          </div>

          {visibleCitiesCount < CITIES.length && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleLoadMoreCities}
                className="px-10 py-4 rounded-full bg-white border border-[#d2d2d7] text-[17px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                Load more cities
                <span className="text-[13px] text-[#86868b] font-normal ml-1">({CITIES.length - visibleCitiesCount} remaining)</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Professional Directory Section */}
      <section className="max-w-[1024px] mx-auto px-6 mb-32">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f]">
            {search ? `Results for "${search}"` : 'Professional Directory'}
          </h2>
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="text-[#0066cc] text-[15px] font-medium hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
        
        {displayedArchitects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArchitects.map((architect) => (
              <ArchitectCard 
                key={architect.slug}
                architect={architect} 
                onClick={onArchitectClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#f5f5f7] rounded-[3rem] p-24 text-center border border-dashed border-[#d2d2d7]">
            <p className="text-[21px] text-[#86868b] font-light">
              No elite firms matching your criteria were found. <br />
              Try searching by a different city or brand name.
            </p>
          </div>
        )}

        {visibleArchitectsCount < filteredArchitects.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={handleLoadMoreArchitects}
              className="px-10 py-4 rounded-full bg-[#1d1d1f] text-white text-[17px] font-medium hover:bg-[#424245] active:scale-95 transition-all shadow-lg flex items-center gap-2"
            >
              Show more professionals
              <span className="text-[13px] opacity-60 font-normal ml-1">({filteredArchitects.length - visibleArchitectsCount} remaining)</span>
            </button>
          </div>
        )}
      </section>

      {/* Meaningful Build Full-Width CTA Section */}
      <section className="w-full bg-[#f5f5f7] py-24 mt-20 border-y border-[#d2d2d7]/30">
        <div className="max-w-[1024px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight leading-tight text-[#1d1d1f] mb-5">
              Let’s Build Something Meaningful.
            </h2>
            <p className="text-[19px] sm:text-[21px] text-[#424245] font-light leading-relaxed max-w-[700px]">
              If you’re looking for an architect who combines design intelligence, research depth, and execution clarity, 
              <button 
                onClick={() => window.location.hash = 'architects/aak-architects'}
                className="font-semibold text-[#0066cc] hover:underline"
              >
                AAK Architects
              </button> is ready to collaborate.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <a 
              href="https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20AAK%20Architects%2C%20I%E2%80%99m%20looking%20for%20architectural%20consultancy%20and%20would%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0071e3] text-white px-10 py-5 rounded-full text-[18px] font-semibold hover:bg-[#0077ed] transition-all shadow-xl shadow-blue-500/10 active:scale-95 group"
            >
              Start Your Project
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
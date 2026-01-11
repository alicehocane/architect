import React, { useState, useMemo } from 'react';
import { CITIES, ALL_ARCHITECTS } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';

interface HomePageProps {
  onCityClick: (citySlug: string) => void;
  onArchitectClick: (architect: Architect) => void;
}

const PAGE_SIZE_CITIES = 8;
const PAGE_SIZE_ARCHITECTS = 16;

const HomePage: React.FC<HomePageProps> = ({ onCityClick, onArchitectClick }) => {
  const [search, setSearch] = useState('');
  const [visibleCitiesCount, setVisibleCitiesCount] = useState(PAGE_SIZE_CITIES);
  const [visibleArchitectsCount, setVisibleArchitectsCount] = useState(PAGE_SIZE_ARCHITECTS);
  
  const displayedCities = useMemo(() => {
    return CITIES.slice(0, visibleCitiesCount);
  }, [visibleCitiesCount]);

  const sortedArchitects = useMemo(() => {
    const baseList = [...ALL_ARCHITECTS].sort((a, b) => {
      const ratingA = a.globalRating || 0;
      const ratingB = b.globalRating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.totalReviews || 0) - (a.totalReviews || 0);
    });

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
    setVisibleCitiesCount(prev => Math.min(prev + 4, CITIES.length));
  };

  const handleLoadMoreArchitects = () => {
    setVisibleArchitectsCount(prev => Math.min(prev + 8, filteredArchitects.length));
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 sm:px-12 text-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-[52px] sm:text-[82px] lg:text-[100px] font-bold tracking-[-0.04em] leading-[0.95] text-[#1d1d1f] mb-10">
            Design for the <br className="hidden md:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] to-[#5e5ce6]">future of Pakistan.</span>
          </h1>
          <p className="text-[20px] sm:text-[26px] text-[#86868b] font-light leading-snug mb-16 max-w-[720px] mx-auto">
            Connect with elite architects across the nation. <br className="hidden sm:block" /> 
            Experience architectural mastery at your fingertips.
          </p>
          
          <div className="relative max-w-[720px] mx-auto group">
            <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#0071e3] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by city, firm, or category..."
              className="w-full h-[80px] bg-white rounded-[2.5rem] border border-[#d2d2d7]/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] pl-16 pr-6 text-[22px] focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/30 transition-all outline-none placeholder-[#86868b] text-[#1d1d1f]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* City Tiles */}
      {!search && (
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 mb-32">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-[34px] sm:text-[42px] font-bold tracking-tight text-[#1d1d1f]">Browse by City</h2>
            <span className="text-[14px] font-semibold text-[#86868b] uppercase tracking-widest hidden sm:block">Explore Regions</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCities.map((city) => (
              <div 
                key={city.slug}
                className="group relative flex flex-col justify-between p-10 rounded-[3rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer"
                onClick={() => onCityClick(city.slug)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <span className="text-[14px] font-bold text-[#0066cc] bg-blue-50 px-4 py-1.5 rounded-full">{city.count} Firms</span>
                  </div>
                  <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
                </div>
                <div className="mt-12 flex items-center gap-2 text-[15px] font-semibold text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">
                  View Listings
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            ))}
          </div>

          {visibleCitiesCount < CITIES.length && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={handleLoadMoreCities}
                className="px-12 py-5 rounded-full bg-white border border-[#d2d2d7] text-[17px] font-bold text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-95 transition-all shadow-sm flex items-center gap-3"
              >
                Load more cities
                <span className="text-[14px] text-[#86868b] font-normal">({CITIES.length - visibleCitiesCount} more)</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Professional Directory */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 mb-40">
        <div className="mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="text-[34px] sm:text-[42px] font-bold tracking-tight text-[#1d1d1f]">
            {search ? `Results for "${search}"` : 'Professional Directory'}
          </h2>
          <div className="flex items-center gap-4">
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="text-[#0066cc] text-[15px] font-bold hover:underline"
              >
                Clear Results
              </button>
            )}
            <span className="text-[13px] font-bold text-[#86868b] bg-[#f5f5f7] px-4 py-2 rounded-full uppercase tracking-widest">
              {filteredArchitects.length} Elite Practices
            </span>
          </div>
        </div>
        
        {displayedArchitects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedArchitects.map((architect) => (
              <ArchitectCard 
                key={architect.slug}
                architect={architect} 
                onClick={onArchitectClick}
                isRecommended={architect.slug === 'aak-architects'}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#f5f5f7] rounded-[4rem] p-32 text-center border border-dashed border-[#d2d2d7]">
            <p className="text-[24px] text-[#86868b] font-light">
              No elite firms matching your criteria were found. <br />
              Try refining your location or brand search.
            </p>
          </div>
        )}

        {visibleArchitectsCount < filteredArchitects.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={handleLoadMoreArchitects}
              className="px-14 py-6 rounded-full bg-[#1d1d1f] text-white text-[18px] font-bold hover:bg-[#424245] active:scale-95 transition-all shadow-2xl flex items-center gap-3"
            >
              Explore more professionals
              <span className="text-[14px] opacity-50 font-normal">({filteredArchitects.length - visibleArchitectsCount} remaining)</span>
            </button>
          </div>
        )}
      </section>

      {/* Build CTA Section */}
      <section className="w-full bg-[#f5f5f7] py-32 border-y border-[#d2d2d7]/30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] mb-8">
              Let’s Build Something <br className="hidden sm:block" /> Meaningful.
            </h2>
            <p className="text-[21px] sm:text-[24px] text-[#424245] font-light leading-relaxed max-w-[800px]">
              If you’re looking for an architect who combines design intelligence, research depth, and execution clarity, 
              <button 
                onClick={() => window.location.hash = 'architects/aak-architects'}
                className="font-bold text-[#0066cc] hover:underline mx-1"
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
              className="inline-flex items-center gap-4 bg-[#0071e3] text-white px-12 py-6 rounded-full text-[20px] font-bold hover:bg-[#0077ed] transition-all shadow-2xl shadow-blue-500/20 active:scale-95 group"
            >
              Start Your Project
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

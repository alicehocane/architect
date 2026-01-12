import React, { useMemo, useState } from 'react';
import { ALL_ARCHITECTS } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';

interface TopRatedPageProps {
  onArchitectClick: (architect: Architect) => void;
}

const PAGE_SIZE = 12;

const TopRatedPage: React.FC<TopRatedPageProps> = ({ onArchitectClick }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const topRated = useMemo(() => {
    // 1. Get the standard sorted list of high-rated firms
    const list = [...ALL_ARCHITECTS]
      .filter(a => (a.globalRating || 0) >= 4.0)
      .sort((a, b) => {
        const ratingA = a.globalRating || 0;
        const ratingB = b.globalRating || 0;
        if (ratingB !== ratingA) return ratingB - ratingA;
        return (b.totalReviews || 0) - (a.totalReviews || 0);
      });
    
    // 2. Explicitly move AAK Architects to the first position
    const aakIndex = list.findIndex(a => a.slug === 'aak-architects');
    if (aakIndex > -1) {
      const [aak] = list.splice(aakIndex, 1);
      list.unshift(aak);
    }
    
    return list;
  }, []);

  const displayed = topRated.slice(0, visibleCount);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <div className="mb-16">
        <span className="text-[14px] font-bold text-[#ff9500] uppercase tracking-widest mb-4 block">Gold Tier Professionals</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-6 leading-none">
          Highest Rated <br /> Firms in Pakistan.
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[700px]">
          We’ve analyzed thousands of reviews to bring you the top {topRated.length} architectural studios excelling in client satisfaction and technical mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {displayed.map((a) => (
          <div key={a.slug} className="relative">
            <div className="absolute -top-3 -right-3 z-10 bg-[#ff9500] text-white p-1.5 rounded-full shadow-lg border-4 border-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <ArchitectCard architect={a} onClick={onArchitectClick} />
          </div>
        ))}
      </div>

      {visibleCount < topRated.length && (
        <div className="flex justify-center mt-20">
          <button 
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-medium hover:bg-[#424245] transition-all active:scale-95 shadow-xl"
          >
            Show more elite firms
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRatedPage;
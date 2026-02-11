'use client';

import React, { useState } from 'react';
import { Architect } from '../types';
import ArchitectCard from './ArchitectCard';

interface ArchitectListProps {
  architects: Architect[];
  cityContextSlug?: string;
  categoryContextSlug?: string;
}

const PAGE_SIZE = 12;

const ArchitectList: React.FC<ArchitectListProps> = ({ architects, cityContextSlug }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const displayedArchitects = architects.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
        {displayedArchitects.map((a) => (
          <div key={a.slug} className="relative flex flex-col h-full">
            <ArchitectCard 
              architect={a} 
              cityContextSlug={cityContextSlug}
              isRecommended={a.slug === 'aak-architects'}
            />
          </div>
        ))}
      </div>

      {visibleCount < architects.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, architects.length))}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
          >
            Show more firms
            <span className="opacity-50 font-normal text-[14px]">({architects.length - visibleCount} more)</span>
          </button>
        </div>
      )}
      
      {architects.length === 0 && (
        <div className="bg-[#f5f5f7] rounded-[3rem] p-24 text-center border border-dashed border-[#d2d2d7]">
          <p className="text-[21px] text-[#86868b] font-light">No professionals found.</p>
        </div>
      )}
    </>
  );
};

export default ArchitectList;
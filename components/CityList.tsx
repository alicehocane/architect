'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CityInfo } from '../types';

interface CityListProps {
  cities: CityInfo[];
}

const PAGE_SIZE = 12;

const CityList: React.FC<CityListProps> = ({ cities }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const displayedCities = cities.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {displayedCities.map((city) => (
          <Link 
            key={city.slug}
            href={`/city/${city.slug}`}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="text-right">
                  <span className="block text-[22px] font-bold text-[#1d1d1f]">{city.count}</span>
                  <span className="block text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Firms</span>
                </div>
              </div>
              <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#0066cc]">View List</span>
              <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < cities.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
          >
            Show More Cities
            <span className="opacity-50 font-normal text-[14px]">({cities.length - visibleCount} more)</span>
          </button>
        </div>
      )}
    </>
  );
};

export default CityList;
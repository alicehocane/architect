'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

interface CategoryListProps {
  categories: CategoryInfo[];
}

const PAGE_SIZE = 12;

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const displayedCategories = categories.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {displayedCategories.map((cat) => (
          <Link 
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group p-10 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span className="text-[13px] font-bold text-[#86868b] group-hover:text-[#0071e3]">{cat.count} Firms</span>
              </div>
              <h3 className="text-[26px] font-bold tracking-tight text-[#1d1d1f] leading-tight group-hover:text-[#0071e3] transition-colors">{cat.name}</h3>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[14px] font-bold text-[#0066cc] uppercase tracking-wider">
              View List
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < categories.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
          >
            Load More
            <span className="opacity-50 font-normal text-[14px]">({categories.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}
    </>
  );
};

export default CategoryList;
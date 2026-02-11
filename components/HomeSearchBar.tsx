'use client';

import React from 'react';
import { useSearch } from '../context/SearchContext';

const HomeSearchBar: React.FC = () => {
  const { openSearch } = useSearch();

  return (
    <button 
      onClick={openSearch}
      className="w-full h-[72px] bg-white rounded-[28px] border border-[#d2d2d7]/50 shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center px-8 text-[21px] text-[#86868b] transition-all text-left cursor-text"
      aria-label="Open Search"
    >
      <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
      Search Architects ...
    </button>
  );
};

export default HomeSearchBar;
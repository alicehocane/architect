
import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onSearchClick }) => {
  return (
    <header className="sticky top-0 z-[150] apple-glass border-b border-[#e5e5e7]/50">
      <div className="max-w-[1024px] mx-auto px-6 h-[48px] flex items-center justify-between text-[12px] font-normal tracking-tight text-[#1d1d1f]">
        <div 
          className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-70"
          onClick={onHomeClick}
          aria-label="Home"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-semibold uppercase tracking-[0.12em] text-[10px]">DesignDirectory</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onSearchClick}
            className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors" 
            aria-label="Search"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

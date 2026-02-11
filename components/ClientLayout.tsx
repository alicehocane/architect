'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from './Header';
import SearchPalette from './SearchPalette';
import AIChat from './AIChat';
import { Architect } from '../types';
import { SearchProvider, useSearch } from '../context/SearchContext';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const router = useRouter();

  const handleArchitectSelect = (architect: Architect) => {
    if (architect.slug === 'aak-architects') {
      router.push('/architects/aak-architects');
    } else {
      router.push(`/architects/${architect.slug}`);
    }
    closeSearch();
  };

  const handleCitySelect = (slug: string) => {
    router.push(`/city/${slug}`);
    closeSearch();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd]">
      <Header 
        onHomeClick={() => router.push('/')} 
        onSearchClick={openSearch}
      />
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-[#f5f5f7] pt-16 pb-8 px-6 mt-20 border-t border-[#d2d2d7]/40" role="contentinfo">
        <div className="max-w-[1024px] mx-auto">
          <nav className="flex items-center gap-2 mb-10 text-[12px] text-[#424245]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-black transition-colors">Architectorly</Link>
            <svg className="w-3 h-3 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-[#86868b]">Pakistan Hub</span>
          </nav>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12 mb-14 text-left">
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Directory Services</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><Link href="/" className="hover:underline hover:text-black block w-full">All Architectural Firms</Link></li>
                <li><Link href="/top-rated" className="hover:underline hover:text-black block w-full">Top Rated Architects</Link></li>
                <li><Link href="/categories" className="hover:underline hover:text-black block w-full">Professional Specialties</Link></li>
                <li><Link href="/estimate-calculator" className="hover:underline hover:text-black block w-full">Construction Cost Calculator</Link></li>
              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Major Design Hubs</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><Link href="/city/lahore" className="hover:underline hover:text-black block w-full">Architects in Lahore</Link></li>
                <li><Link href="/city/karachi" className="hover:underline hover:text-black block w-full">Architects in Karachi</Link></li>
                <li><Link href="/city/islamabad" className="hover:underline hover:text-black block w-full">Architects in Islamabad</Link></li>
                <li><Link href="/city/rawalpindi" className="hover:underline hover:text-black block w-full">Architects in Rawalpindi</Link></li>
                <li><Link href="/city/faisalabad" className="hover:underline hover:text-black block w-full">Architects in Faisalabad</Link></li>
              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Regional Branches</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><Link href="/city/multan" className="hover:underline hover:text-black block w-full">Architects in Multan</Link></li>
                <li><Link href="/city/gujranwala" className="hover:underline hover:text-black block w-full">Architects in Gujranwala</Link></li>
                <li><Link href="/city/attock" className="hover:underline hover:text-black block w-full">Architects in Attock</Link></li>
                <li><Link href="/city/rahim-yar-khan" className="hover:underline hover:text-black block w-full">Architects in Rahim Yar Khan</Link></li>
                <li><Link href="/city/kasur" className="hover:underline hover:text-black block w-full">Architects in Kasur</Link></li>
              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Emerging Markets</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><Link href="/city/mandi-bahauddin" className="hover:underline hover:text-black block w-full">Architects in Mandi Bahauddin</Link></li>
                <li><Link href="/city/sahiwal" className="hover:underline hover:text-black block w-full">Architects in Sahiwal</Link></li>
                <li><Link href="/city/bahawalpur" className="hover:underline hover:text-black block w-full">Architects in Bahawalpur</Link></li>
                <li><Link href="/city/jhelum" className="hover:underline hover:text-black block w-full">Architects in Jhelum</Link></li>
                <li><Link href="/city/sialkot" className="hover:underline hover:text-black block w-full">Architects in Sialkot</Link></li>
              </ul>
            </nav>
          </div>

          <div className="pt-8 border-t border-[#d2d2d7]/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-left">
              <p className="text-[11px] text-[#86868b]">Copyright © 2025 Architectorly Pakistan. Professional Directory for elite architects.</p>
              <div className="flex flex-wrap gap-4 text-[11px] text-[#424245]">
                <Link href="/privacy" className="hover:underline text-left">Privacy Policy</Link>
                <span className="text-[#d2d2d7] hidden sm:inline">|</span>
                <Link href="/terms" className="hover:underline text-left">Terms of Service</Link>
                <span className="text-[#d2d2d7] hidden sm:inline">|</span>
                <Link href="/sitemap" className="hover:underline text-left">Architectural Site Map</Link>
              </div>
            </div>
            <div className="flex items-center gap-2 cursor-default select-none md:justify-end">
               <span className="text-[11px] font-medium text-[#1d1d1f]">Pakistan (English)</span>
               <svg className="w-4 h-4 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </div>
        </div>
      </footer>

      <SearchPalette 
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onSelectArchitect={handleArchitectSelect}
        onSelectCity={handleCitySelect}
      />
      <AIChat />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <ClientLayoutContent>
        {children}
      </ClientLayoutContent>
    </SearchProvider>
  );
}
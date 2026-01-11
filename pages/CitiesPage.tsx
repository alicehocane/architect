import React from 'react';
import { CITIES } from '../data';

interface CitiesPageProps {
  onCityClick: (citySlug: string) => void;
}

const CitiesPage: React.FC<CitiesPageProps> = ({ onCityClick }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-20 page-transition">
      <div className="mb-20 text-center">
        <h1 className="text-[48px] sm:text-[72px] lg:text-[88px] font-bold tracking-tight text-[#1d1d1f] mb-6 leading-[0.95]">
          Explore Pakistan.
        </h1>
        <p className="text-[20px] sm:text-[26px] text-[#86868b] font-light max-w-[700px] mx-auto">
          From the vibrant hubs of Lahore to the industrial power of Faisalabad, find local expertise in every corner of the nation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CITIES.map((city) => (
          <div 
            key={city.slug}
            className="group relative flex flex-col justify-between p-10 rounded-[3rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer animate-in fade-in zoom-in-95"
            onClick={() => onCityClick(city.slug)}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="text-right">
                  <span className="block text-[22px] font-bold text-[#1d1d1f]">{city.count}</span>
                  <span className="block text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Practices</span>
                </div>
              </div>
              <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#0066cc]">Explore Directory</span>
              <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesPage;

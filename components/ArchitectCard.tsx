import React from 'react';
import Link from 'next/link';
import { Architect } from '../types';

interface ArchitectCardProps {
  architect: Architect;
  cityContextSlug?: string;
  isRecommended?: boolean;
  onClick?: (architect: Architect) => void;
}

const ArchitectCard: React.FC<ArchitectCardProps> = ({ architect, cityContextSlug, isRecommended, onClick }) => {
  const matchedBranch = cityContextSlug 
    ? architect.Locations.find(l => l.citySlug === cityContextSlug) 
    : null;

  const ratingToDisplay = matchedBranch?.Rating || architect.globalRating;
  const phoneToDisplay = matchedBranch?.["Phone Number"] || architect.Locations[0]?.["Phone Number"];

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(architect);
    }
  };

  return (
    <Link 
      href={`/architects/${architect.slug}`}
      onClick={handleClick}
      className={`group bg-white rounded-[2.5rem] border ${isRecommended ? 'border-[#0071e3] ring-1 ring-[#0071e3]/20' : 'border-[#d2d2d7]/60'} p-8 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[340px] h-full relative block`}
    >
      {isRecommended && (
        <div className="absolute top-0 left-0 right-0 bg-[#0071e3] text-white text-[10px] font-black uppercase tracking-[0.2em] py-1.5 text-center">
          DesignDirectory Recommended
        </div>
      )}
      
      <div className={isRecommended ? 'mt-4' : ''}>
        <div className="flex justify-between items-start mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#86868b] bg-[#f5f5f7] px-4 py-2 rounded-full ring-1 ring-black/5">
            {architect.Category || 'Practice'}
          </span>
          {ratingToDisplay && (
            <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#1d1d1f] bg-white px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
              <svg className="w-4 h-4 text-[#ff9500] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              {ratingToDisplay.toFixed(1)}
            </div>
          )}
        </div>
        
        <h3 className="text-[26px] font-bold tracking-tight leading-tight mb-4 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
          {architect["Shop Name"]}
        </h3>

        {phoneToDisplay && (
          <div className="flex items-center gap-2 text-[15px] text-[#424245] mb-4 font-medium">
            <svg className="w-4 h-4 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            {phoneToDisplay}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {architect.Locations.slice(0, 4).map((loc, i) => (
            <span key={i} className={`text-[12px] font-semibold px-3 py-1.5 rounded-xl ${loc.citySlug === cityContextSlug ? 'bg-blue-100 text-[#0066cc]' : 'bg-[#f5f5f7] text-[#86868b]'}`}>
              {loc.City}
            </span>
          ))}
          {architect.Locations.length > 4 && (
            <span className="text-[12px] font-medium text-[#86868b] px-3 py-1.5">+{architect.Locations.length - 4} more</span>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-between pt-8 border-t border-[#f5f5f7]">
        <div className="text-[16px] text-[#0066cc] font-bold group-hover:translate-x-1 transition-transform">
          {matchedBranch ? `View ${matchedBranch.City} Studio` : 'View Brand Hub'}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition-all shadow-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </Link>
  );
};

export default ArchitectCard;
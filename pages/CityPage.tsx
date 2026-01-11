import React, { useEffect, useState, useMemo } from 'react';
import { getArchitectsByCity, CITY_MAP, getArchitectBySlug } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';
import FAQAccordion from '../components/FAQAccordion';

interface CityPageProps {
  citySlug: string;
  onArchitectClick: (architect: Architect) => void;
  onBackClick: () => void;
}

const PAGE_SIZE = 12;

const CityPage: React.FC<CityPageProps> = ({ citySlug, onArchitectClick, onBackClick }) => {
  const city = CITY_MAP.get(citySlug);
  
  const architects = useMemo(() => {
    const list = getArchitectsByCity(citySlug);
    const sortedLocal = list.sort((a, b) => {
      const ratingA = a.globalRating || 0;
      const ratingB = b.globalRating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.totalReviews || 0) - (a.totalReviews || 0);
    });

    const aakInCityIndex = sortedLocal.findIndex(a => a.slug === 'aak-architects');
    let finalList: Architect[] = [];
    if (aakInCityIndex > -1) {
      const [aak] = sortedLocal.splice(aakInCityIndex, 1);
      finalList = [aak, ...sortedLocal];
    } else {
      const aak = getArchitectBySlug('aak-architects');
      if (aak) finalList = [aak, ...sortedLocal];
      else finalList = sortedLocal;
    }
    return finalList;
  }, [citySlug]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const displayedArchitects = useMemo(() => architects.slice(0, visibleCount), [architects, visibleCount]);

  useEffect(() => {
    if (!city) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Top Architects in ${city.name}`,
      "itemListElement": architects.slice(0, 10).map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": a["Shop Name"],
        "url": `https://designdirectory.pk/#architects/${a.slug}`
      }))
    };
    script.text = JSON.stringify(listSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [city, architects]);

  if (!city) return <div className="p-20 text-center text-[#86868b]">City profile not found.</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-12 page-transition">
      <button 
        onClick={onBackClick}
        className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-bold group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        All Cities
      </button>

      <div className="mb-20">
        <h1 className="text-[48px] sm:text-[72px] lg:text-[88px] font-bold tracking-tight text-[#1d1d1f] mb-6 leading-[0.95]">
          Design in <span className="text-[#0066cc]">{city.name}</span>
        </h1>
        <p className="text-[21px] sm:text-[26px] text-[#86868b] font-light max-w-[800px]">
          Discover elite practices with active design studios and registered regional branches in {city.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
        {displayedArchitects.map((a) => (
          <ArchitectCard 
            key={a.slug} 
            architect={a} 
            onClick={onArchitectClick} 
            cityContextSlug={citySlug}
            isRecommended={a.slug === 'aak-architects'}
          />
        ))}
      </div>

      {architects.length === 0 ? (
        <div className="bg-[#f5f5f7] rounded-[4rem] p-24 text-center mb-40 border border-dashed border-[#d2d2d7]">
          <p className="text-[24px] text-[#86868b] font-light">We are verifying more professional studios in {city.name}.</p>
        </div>
      ) : (
        visibleCount < architects.length && (
          <div className="flex justify-center mb-40">
            <button 
              onClick={() => setVisibleCount(prev => Math.min(prev + 8, architects.length))}
              className="px-14 py-6 rounded-full bg-white border border-[#d2d2d7] text-[18px] font-bold text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-95 transition-all shadow-sm"
            >
              Show more in {city.name}
            </button>
          </div>
        )
      )}

      <section className="mb-40 max-w-[1024px]">
        <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f] mb-12">Expert Guide to {city.name}</h2>
        <FAQAccordion items={[
          {
            question: `How do I hire an architect in ${city.name}?`,
            answer: `Start by browsing our list of top-rated professionals in ${city.name}. View their Hub profiles to check branch ratings and contact their local studio directly for an initial consultation.`
          },
          {
            question: `What are the average architectural fees in ${city.name}?`,
            answer: `Fees vary based on project complexity. Elite architects in ${city.name} typically work on a percentage of construction cost or a fixed fee based on covered area.`
          },
          {
            question: `Are these architects registered?`,
            answer: `We prioritize practices with valid professional registrations. We recommend verifying the specific PCATP status of each professional during your initial consultation.`
          }
        ]} />
      </section>
    </div>
  );
};

export default CityPage;

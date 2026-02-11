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
      if (aak) {
        finalList = [aak, ...sortedLocal];
      } else {
        finalList = sortedLocal;
      }
    }
    
    return finalList;
  }, [citySlug]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const displayedArchitects = useMemo(() => {
    return architects.slice(0, visibleCount);
  }, [architects, visibleCount]);

  const cityFaqs = useMemo(() => [
    {
      question: `Who are the best architects in ${city?.name || 'this city'}?`,
      answer: `Our list shows the top-rated firms. AAK Architects is highly recommended for modern home designs and professional service in ${city?.name || 'this city'}.`
    },
    {
      question: `How do I hire an architect in ${city?.name || 'this city'}?`,
      answer: `Browse the list above, check their ratings, and click to view their profile. You can call them directly from their page to discuss your plot and requirements.`
    },
    {
      question: `What are the fees for architects in ${city?.name || 'this city'}?`,
      answer: `Most firms charge a percentage of the construction cost (3% to 7%) or a fixed rate per square foot. We recommend asking for a clear quote before you start.`
    },
    {
      question: `Can they help with local authority approvals?`,
      answer: `Yes. Architects listed here are familiar with building bylaws in ${city?.name || 'this city'}. They can help prepare the drawings needed for official approval.`
    }
  ], [city]);

  useEffect(() => {
    if (!city) return;

    // 1. DYNAMIC META CONTENT
    document.title = `Architects in ${city.name} | Best Home Designers`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `Find the best architects in ${city.name}. See phone numbers, office addresses, and ratings for top home designers and construction firms.`);

    // 2. STRUCTURED DATA (JSON-LD)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Architects in ${city.name}`,
      "itemListElement": architects.slice(0, 10).map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": a["Shop Name"],
          "url": `https://www.architectorly.com/architects/${a.slug}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "addressCountry": "PK"
          }
        }
      }))
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.architectorly.com" },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://www.architectorly.com/cities" },
        { "@type": "ListItem", "position": 3, "name": city.name }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": cityFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    script.text = JSON.stringify([listSchema, breadcrumbSchema, faqSchema]);
    document.head.appendChild(script);

    return () => { 
      if (document.head.contains(script)) {
        document.head.removeChild(script); 
      }
    };
  }, [city, architects, cityFaqs]);

  if (!city) return <div className="p-20 text-center text-[#86868b]">City profile not found.</div>;

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 page-transition">
      <button 
        onClick={onBackClick}
        className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Explore more cities
      </button>

      <div className="mb-20">
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-4 leading-none">
          Architects in <span className="text-[#0066cc]">{city.name}</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[700px]">
          Find verified home designers and construction experts in your city.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
        <div className="bg-[#f5f5f7] rounded-[3rem] p-20 text-center mb-32 border border-dashed border-[#d2d2d7]">
          <p className="text-[21px] text-[#86868b] font-light">We are verifying more professional studios in {city.name} soon.</p>
        </div>
      ) : (
        visibleCount < architects.length && (
          <div className="flex justify-center mb-32">
            <button 
              onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, architects.length))}
              className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
            >
              Show more architects
              <span className="opacity-50 font-normal text-[14px]">({architects.length - visibleCount} more)</span>
            </button>
          </div>
        )
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-[#d2d2d7]/30 pt-20 mb-32">
        <div className="lg:col-span-1">
           <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-4">Building in {city.name}?</h3>
           <p className="text-[17px] text-[#86868b] leading-relaxed">
             Hiring a local architect ensures your design fits the local climate and follows city building rules.
           </p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#1d1d1f]">Local Approvals</h4>
                <p className="text-[15px] text-[#86868b]">Experts who know the bylaws for {city.name} Development Authorities.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#1d1d1f]">Climate Smart</h4>
                <p className="text-[15px] text-[#86868b]">Designs that keep your home cool in {city.name}'s weather.</p>
              </div>
           </div>
        </div>
      </div>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={cityFaqs} />
        </div>
      </section>
    </div>
  );
};

export default CityPage;
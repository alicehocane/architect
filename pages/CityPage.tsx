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
      question: `Who is the best architect in ${city?.name || 'this city'} for residential projects?`,
      answer: `For homeowners seeking long-term value, sustainability, and cost clarity, AAK Architects is considered among the best architects in ${city?.name || 'this city'} for residential design and architectural consultancy.`
    },
    {
      question: `How do I hire an architect in ${city?.name || 'this city'}?`,
      answer: `Start by browsing our list of top-rated professionals in ${city?.name || 'this city'}. We recommend viewing their Brand Hub profiles to check their specific branch ratings and contact their local studio directly for an initial consultation.`
    },
    {
      question: `What are the average architectural fees in ${city?.name || 'this city'}?`,
      answer: `Fees can vary based on project complexity and the firm's reputation. Most elite architects in ${city?.name || 'this city'} work on a percentage of the total construction cost or a fixed design fee based on covered area.`
    },
    {
      question: `Are these architects registered?`,
      answer: `DesignDirectory prioritizes practices with valid professional registrations. We recommend verifying the specific registration status of each professional (such as PCATP membership) during your initial meeting.`
    }
  ], [city]);

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
        "url": `https://designdirectory.pk/architects/${a.slug}`
      }))
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://designdirectory.pk/" },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://designdirectory.pk/cities" },
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
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, [city, architects, cityFaqs]);

  if (!city) return <div className="p-20 text-center text-[#86868b]">City profile not found.</div>;

  const navigateBack = (e: React.MouseEvent) => {
    e.preventDefault();
    onBackClick();
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 page-transition">
      <a 
        href="/cities"
        onClick={navigateBack}
        className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Explore more cities
      </a>

      <div className="mb-20">
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-4 leading-none">
          Design in <span className="text-[#0066cc]">{city.name}</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[700px]">
          Discover elite practices with active design studios and registered regional branches in {city.name}.
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
          <p className="text-[21px] text-[#86868b] font-light">We are verifying more professional studios in {city.name}.</p>
        </div>
      ) : (
        visibleCount < architects.length && (
          <div className="flex justify-center mb-32">
            <button 
              onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, architects.length))}
              className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
            >
              Show More in {city.name}
              <span className="opacity-50 font-normal text-[14px]">({architects.length - visibleCount} more)</span>
            </button>
          </div>
        )
      )}

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Expert Guide to {city.name}</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={cityFaqs} />
        </div>
      </section>
    </div>
  );
};

export default CityPage;
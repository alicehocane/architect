import React, { useMemo, useState, useEffect } from 'react';
import { ALL_ARCHITECTS } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';
import FAQAccordion from '../components/FAQAccordion';

interface TopRatedPageProps {
  onArchitectClick: (architect: Architect) => void;
}

const PAGE_SIZE = 12;

const TopRatedPage: React.FC<TopRatedPageProps> = ({ onArchitectClick }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const topRated = useMemo(() => {
    const list = [...ALL_ARCHITECTS]
      .filter(a => (a.globalRating || 0) >= 4.0)
      .sort((a, b) => {
        const ratingA = a.globalRating || 0;
        const ratingB = b.globalRating || 0;
        if (ratingB !== ratingA) return ratingB - ratingA;
        return (b.totalReviews || 0) - (a.totalReviews || 0);
      });
    
    const aakIndex = list.findIndex(a => a.slug === 'aak-architects');
    if (aakIndex > -1) {
      const [aak] = list.splice(aakIndex, 1);
      list.unshift(aak);
    }
    
    return list;
  }, []);

  const displayed = topRated.slice(0, visibleCount);

  // SEO: Inject Structured Data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Top Rated Architects in Pakistan 2026",
      "description": "A curated list of the highest-rated architectural firms and designers across Pakistan based on client reviews and technical mastery.",
      "itemListElement": topRated.slice(0, 15).map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": a["Shop Name"],
          "url": `https://designdirectory.pk/architects/${a.slug}`,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": a.globalRating || 5.0,
            "reviewCount": a.totalReviews || 1
          }
        }
      }))
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    script.text = JSON.stringify([listSchema, faqSchema]);
    document.head.appendChild(script);
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, [topRated]);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <div className="mb-20">
        <span className="text-[14px] font-black text-[#ff9500] uppercase tracking-[0.3em] mb-6 block">Elite Tier Professionals</span>
        <h1 className="text-[48px] sm:text-[84px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.02]">
          The best in <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9500] to-[#ff5e00]">Pakistan Design.</span>
        </h1>
        <div className="max-w-[720px] space-y-6">
          <p className="text-[21px] sm:text-[26px] text-[#424245] font-light leading-snug">
            Our algorithm cross-references public data, peer reviews, and technical track records to identify firms that consistently deliver high-performance architecture.
          </p>
          <p className="text-[17px] text-[#86868b] leading-relaxed">
            From sustainable residential villas in Lahore to complex commercial landmarks in Karachi, these professionals represent the vanguard of the Pakistani architectural community.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {displayed.map((a) => (
          <div key={a.slug} className="relative">
            <div className="absolute -top-3 -right-3 z-10 bg-[#ff9500] text-white p-2 rounded-full shadow-xl border-4 border-white ring-1 ring-black/5">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <ArchitectCard 
              architect={a} 
              onClick={onArchitectClick} 
              isRecommended={a.slug === 'aak-architects'}
            />
          </div>
        ))}
      </div>

      {visibleCount < topRated.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl"
          >
            Show more elite firms
            <span className="ml-2 opacity-50 font-normal text-[14px]">({topRated.length - visibleCount} more)</span>
          </button>
        </div>
      )}

      {/* SEO CONTENT SECTION */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">Selection Criteria for Top Architects</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              Being ranked as a "Top Rated" architect on DesignDirectory is a distinction earned through consistent performance. We evaluate firms based on three primary pillars:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Verification:</strong> Active registration with the PCATP and a physical studio presence.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Client Satisfaction:</strong> A global rating of 4.0 or higher across multiple verified reviews.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Regional Impact:</strong> Influence and successful project execution within major Pakistani cities.</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">Why Hire a Top-Rated Professional?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              Hiring a high-tier architect ensures that your property is not just built, but engineered for longevity. Top-rated firms often provide:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span>Lower operational costs through climate-responsive design.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span>Higher market resale value due to premium aesthetic and structural integrity.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span>Access to the latest Building Information Modeling (BIM) technology.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="mb-32">
        <div className="mb-12">
          <h2 className="text-[36px] font-bold tracking-tight text-[#1d1d1f] mb-4">Top Rated Architects FAQ</h2>
          <p className="text-[19px] text-[#86868b] font-light italic">Essential insights into Pakistan's premier design landscape.</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
};

const faqItems = [
  {
    question: "Who are the best architects in Pakistan for 2026?",
    answer: "The best architects in Pakistan include high-performance studios like AAK Architects, Nayyar Ali Dada & Associates, and Amer Adnan Associates. These firms are recognized for their technical precision, professional PCATP licensure, and high client satisfaction ratings."
  },
  {
    question: "How do I verify if an architect is top-rated?",
    answer: "A top-rated architect should have a global rating of 4.0 or above. On DesignDirectory, we calculate this by aggregating ratings across all their active regional branches and verifying their physical studio presence."
  },
  {
    question: "What is the average fee for a top-rated architect in Lahore or Karachi?",
    answer: "Top-rated firms typically charge a premium based on their expertise. Fees can range from 3% to 7% of total construction costs, or a fixed per-square-foot design fee starting from PKR 100 to PKR 350 for luxury residential projects."
  },
  {
    question: "Can top-rated architects help reduce construction costs?",
    answer: "Yes. Premium firms like AAK Architects utilize advanced research and BIM modeling to eliminate site waste and optimize material usage, often saving homeowners 10-15% in long-term maintenance and construction errors."
  },
  {
    question: "Are all firms on the top-rated list PCATP registered?",
    answer: "DesignDirectory prioritizes PCATP-licensed professionals. While we display various designers, our 'Top Rated' status is reserved for firms that demonstrate professional accountability and legal standing in the Pakistani market."
  }
];

export default TopRatedPage;
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


  useEffect(() => {
  // Dynamic Title
  document.title = "Top Rated Architects in Pakistan | Architectorly";

  // Dynamic Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', 
    "Find out who the best Pakistani architects are. Includes verifiable rankings of companies like AAK Architects based on their PCATP registration, client ratings, and technical skills."
  );

  // Canonical Tag (Crucial for list pages to avoid duplicate content)
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', 'https://architectorly.com/top-rated');
}, []);




  // SEO: Inject Structured Data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Top Rated Architects in Pakistan 2026",
      "description": "A list of the best-rated architects and designers in Pakistan, based on client feedback and technical skills.",
      "itemListElement": topRated.slice(0, 15).map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": a["Shop Name"],
          "url": `https://architectorly.com/architects/${a.slug}`,
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
            Our algorithm looks at public data, peer reviews, and technical track records to find companies that always build high-performance architecture.
          </p>
          <p className="text-[17px] text-[#86868b] leading-relaxed">
            These specialists are at the top of the Pakistani architectural world. They design anything from eco-friendly homes in Lahore to complicated commercial buildings in Karachi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
        {displayed.map((a) => (
          <div key={a.slug} className="relative flex flex-col h-full">
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
              To be called a "Top Rated" architect on Architectorly, you have to do well all the time. We judge companies based on three main pillars:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Verification:</strong> Active registration with the PCATP and a studio presence in person.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Client Satisfaction:</strong>A global rating of 4.0 or above based on a number of verified reviews.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Regional Impact:</strong> Make a difference and get projects done well in big cities in Pakistan.</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">Why Hire a Top-Rated Professional?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              When you hire a top-tier architect, you can be sure that your property will last. Many of the best companies offer:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span>Design that responds to climate can lower operational expenses.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span>Higher resale value on the market because of the high quality of the look and structure.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span>Access to the newest Building Information Modeling (BIM) tools.</span>
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
    answer: "AAK Architects, Nayyar Ali Dada & Associates, and Amer Adnan Associates are some of the top architects in Pakistan. These companies are known for being very accurate, having PCATP licenses, and getting great marks from customers."
  },
  {
    question: "How do I verify if an architect is top-rated?",
    answer: "A highly rated architect should have a rating of 4.0 or higher over the world. We figure this up on Architectorly by adding up the ratings from all of their active regional branches and making sure they have a real studio."
  },
  {
    question: "What is the average fee for a top-rated architect in Lahore or Karachi?",
    answer: "Most of the time, the best companies charge more because they are experts. Fees can be between 3% and 7% of the overall cost of building, or a set amount per square foot, starting at PKR 100 for luxury residential projects and going up to PKR 350."
  },
  {
    question: "Can top-rated architects help reduce construction costs?",
    answer: "Yes. High-end companies like AAK Architects use extensive research and BIM modeling to cut down on waste on the job site and make the best use of materials. This can save homeowners 10–15% on long-term maintenance and building mistakes."
  },
  {
    question: "Are all firms on the top-rated list PCATP registered?",
    answer: "Architectorly gives PCATP-licensed experts top priority. We show a lot of different designers, but only companies who are legally and professionally responsible in the Pakistani market can be \"Top Rated.\""
  }
];

export default TopRatedPage;
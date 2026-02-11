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
      "See the list of the best architects in Pakistan. We ranked top firms based on client reviews, quality of work, and professional standing."
    );

    // Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.architectorly.com/top-rated');
  }, []);

  // SEO: Inject Structured Data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Top Rated Architects in Pakistan",
      "description": "A list of the best-rated architects and designers in Pakistan.",
      "itemListElement": topRated.slice(0, 15).map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": a["Shop Name"],
          "url": `https://www.architectorly.com/architects/${a.slug}`,
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
        <span className="text-[14px] font-black text-[#ff9500] uppercase tracking-[0.3em] mb-6 block">Best In Class</span>
        <h1 className="text-[48px] sm:text-[84px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.02]">
          Top Architects in <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9500] to-[#ff5e00]">Pakistan.</span>
        </h1>
        <div className="max-w-[720px] space-y-6">
          <p className="text-[21px] sm:text-[26px] text-[#424245] font-light leading-snug">
            We looked at ratings, reviews, and past projects to find the most trusted design firms in the country.
          </p>
          <p className="text-[17px] text-[#86868b] leading-relaxed">
            These professionals are known for great work. Whether you are building a modern house in Lahore or a commercial plaza in Karachi, these are the experts you can trust.
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
            Show more architects
            <span className="ml-2 opacity-50 font-normal text-[14px]">({topRated.length - visibleCount} more)</span>
          </button>
        </div>
      )}

      {/* SEO CONTENT SECTION */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">How We Choose</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              To be on our "Top Rated" list, an architect must show they are reliable. We look for three main things:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Verification:</strong> We check if they have a real office and valid phone numbers.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>High Ratings:</strong> Firms must have a rating of 4.0 or higher from people who hired them.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Experience:</strong> They must have a history of completing projects in Pakistani cities.</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">Why Hire the Best?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              Hiring a top architect costs a bit more upfront, but it saves you money later. Here is why:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Smart Design:</strong> They plan homes that stay cool in summer, lowering your electric bill.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Less Waste:</strong> Exact drawings mean builders don't waste expensive materials like cement and steel.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Resale Value:</strong> A well-designed house sells for a higher price.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="mb-32">
        <div className="mb-12">
          <h2 className="text-[36px] font-bold tracking-tight text-[#1d1d1f] mb-4">Common Questions</h2>
          <p className="text-[19px] text-[#86868b] font-light italic">Helpful answers about hiring top architects.</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
};

const faqItems = [
  {
    question: "Who are the best architects in Pakistan right now?",
    answer: "AAK Architects, Amer Adnan Associates, and Nayyar Ali Dada & Associates are some of the most respected names. They are known for high-quality work and professional service."
  },
  {
    question: "How do I know if an architect is good?",
    answer: "Check their rating on Architectorly. Also, ask to see their past projects. A top-rated architect will always be happy to show you their work."
  },
  {
    question: "Do top architects charge very high fees?",
    answer: "They charge for their expertise, but it varies. Fees are usually 3% to 7% of the building cost, or a fixed rate per square foot (PKR 100 to PKR 350+). Good design often pays for itself by preventing costly mistakes."
  },
  {
    question: "Can an architect help me save money on construction?",
    answer: "Yes. Expert architects use precise planning to reduce material waste. They also design homes that use less energy, saving you money on bills for years."
  },
  {
    question: "Are these architects registered with PCATP?",
    answer: "We verify listings to the best of our ability. Many of our top-rated firms are registered with the Pakistan Council of Architects and Town Planners (PCATP). We recommend asking for their registration number during your first meeting."
  }
];

export default TopRatedPage;
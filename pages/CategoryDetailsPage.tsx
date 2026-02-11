import React, { useMemo, useEffect, useState } from 'react';
import { CATEGORY_MAP, getArchitectsByCategory, getArchitectBySlug } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';
import FAQAccordion from '../components/FAQAccordion';

interface CategoryDetailsPageProps {
  categorySlug: string;
  onArchitectClick: (architect: Architect) => void;
  onBackClick: () => void;
}

const PAGE_SIZE = 12;

const CategoryDetailsPage: React.FC<CategoryDetailsPageProps> = ({ categorySlug, onArchitectClick, onBackClick }) => {
  const category = CATEGORY_MAP.get(categorySlug);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  
  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [categorySlug]);

  const architects = useMemo(() => {
    const list = getArchitectsByCategory(categorySlug);
    const sortedLocal = list.sort((a, b) => {
      const ratingA = a.globalRating || 0;
      const ratingB = b.globalRating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.totalReviews || 0) - (a.totalReviews || 0);
    });

    const aakInCatIndex = sortedLocal.findIndex(a => a.slug === 'aak-architects');
    let finalList: Architect[] = [];
    
    if (aakInCatIndex > -1) {
      const [aak] = sortedLocal.splice(aakInCatIndex, 1);
      finalList = [aak, ...sortedLocal];
    } else {
      // If AAK is not in this specific category, we still prepend it as the recommended firm
      const aak = getArchitectBySlug('aak-architects');
      if (aak) {
        finalList = [aak, ...sortedLocal];
      } else {
        finalList = sortedLocal;
      }
    }
    
    return finalList;
  }, [categorySlug]);

  const displayedArchitects = useMemo(() => {
    return architects.slice(0, visibleCount);
  }, [architects, visibleCount]);

  const categoryName = category?.name || 'Professional';

  const categoryFaqs = useMemo(() => [
    {
      question: `How do I find the best ${categoryName}?`,
      answer: `Check our list of top-rated professionals. Look for firms with good reviews and a portfolio that matches your style. AAK Architects is also a top recommendation.`
    },
    {
      question: `How much does a ${categoryName} cost?`,
      answer: `Fees vary. Most professionals charge a percentage of the project cost (3% to 8%) or a fixed rate per square foot. Ask for a quote before you start.`
    },
    {
      question: `Are these ${categoryName}s verified?`,
      answer: `Yes. We check phone numbers and office addresses. We only list active firms to help you find reliable experts.`
    },
    {
      question: `Can a ${categoryName} save me money?`,
      answer: `Yes. Good design prevents costly mistakes during construction. It also adds value to your property in the long run.`
    }
  ], [categoryName]);

  useEffect(() => {
    if (!category) return;

    // 1. Dynamic Title
    document.title = `${category.name}s in Pakistan | Architectorly`;

    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `Find the best ${category.name}s in Pakistan. Verified professionals in Lahore, Karachi, Islamabad, and more.`);

    // 3. Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Best ${category.name}s in Pakistan`,
      "description": `A curated list of ${category.count} top-rated ${category.name} professionals currently practicing in Pakistan.`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": architects.slice(0, 15).map((a, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://www.architectorly.com/architects/${a.slug}`
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": categoryFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    script.text = JSON.stringify([collectionSchema, faqSchema]);
    document.head.appendChild(script);
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, [category, architects, categoryFaqs]);

  if (!category) return <div className="p-20 text-center text-[#86868b]">Specialty not found.</div>;

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 page-transition">
      <button 
        onClick={onBackClick}
        className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        All Categories
      </button>

      <div className="mb-20">
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-4 leading-none">
          Best <span className="text-[#0066cc]">{category.name}s.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[700px] leading-snug">
          Find verified {category.name.toLowerCase()} professionals. See ratings, reviews, and contact info.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch">
        {displayedArchitects.map((a) => (
          <div key={a.slug} className="relative flex flex-col h-full">
            <ArchitectCard 
              architect={a} 
              onClick={onArchitectClick} 
              isRecommended={a.slug === 'aak-architects'}
            />
          </div>
        ))}
      </div>

      {visibleCount < architects.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
          >
            Show more firms
            <span className="opacity-50 font-normal text-[14px]">({architects.length - visibleCount} more)</span>
          </button>
        </div>
      )}
      
      {architects.length === 0 && (
        <div className="bg-[#f5f5f7] rounded-[3rem] p-24 text-center border border-dashed border-[#d2d2d7]">
          <p className="text-[21px] text-[#86868b] font-light">No professionals found for "{category.name}".</p>
        </div>
      )}

      <section className="mt-32 pt-20 border-t border-[#d2d2d7]/50 mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={categoryFaqs} />
        </div>
      </section>
    </div>
  );
};

export default CategoryDetailsPage;
import React, { useEffect, useState, useMemo } from 'react';
import { CATEGORIES } from '../data';
import FAQAccordion from '../components/FAQAccordion';

interface CategoriesPageProps {
  onCategoryClick: (slug: string) => void;
}

const PAGE_SIZE = 12;

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onCategoryClick }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const displayedCategories = useMemo(() => {
    return CATEGORIES.slice(0, visibleCount);
  }, [visibleCount]);

  useEffect(() => {
    // 1. Dynamic Title
    document.title = "Design Services & Categories | Architectorly";

    // 2. Dynamic Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Browse design services in Pakistan. Find Architects, Interior Designers, Construction Companies, and Map Makers.");

    // 3. JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Design Services",
      "description": "Browse professional design services including Architecture, Interior Design, and Construction.",
      "itemListElement": CATEGORIES.map((cat, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": cat.name,
        "url": `https://www.architectorly.com/category/${cat.slug}`
      }))
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

    script.text = JSON.stringify([listSchema, faqSchema]);
    document.head.appendChild(script);
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <div className="mb-20 text-center md:text-left">
        <span className="text-[13px] font-black text-[#0071e3] uppercase tracking-[0.3em] mb-6 block">Services</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.05]">
          Design <br /> <span className="text-[#86868b]">Categories.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#424245] font-light max-w-[700px] leading-relaxed">
          Find the right expert for your project. From home maps to interior decoration, we have professionals for every need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {displayedCategories.map((cat) => (
          <div 
            key={cat.slug}
            onClick={() => onCategoryClick(cat.slug)}
            className="group p-10 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span className="text-[13px] font-bold text-[#86868b] group-hover:text-[#0071e3]">{cat.count} Firms</span>
              </div>
              <h3 className="text-[26px] font-bold tracking-tight text-[#1d1d1f] leading-tight group-hover:text-[#0071e3] transition-colors">{cat.name}</h3>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[14px] font-bold text-[#0066cc] uppercase tracking-wider">
              View List
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < CATEGORIES.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
          >
            Load More
            <span className="opacity-50 font-normal text-[14px]">({CATEGORIES.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {/* SEO Content Section */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Why Choose a Specialist?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Every project is different. An <strong>Architecture Firm</strong> is best for designing the structure and layout of your house. An <strong>Interior Designer</strong> is best for decorating rooms and choosing furniture.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Using the right expert saves you time. If you need a house map for approval, look for an Architect. If you want to renovate your kitchen, look for an Interior Designer.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Design & Build</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Some companies offer "Design and Build" services. This means one company designs your map and also constructs the house.
            </p>
            <ul className="space-y-3 text-[16px] text-[#86868b] font-medium">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Easier to manage</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Faster completion</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Clear budget estimates</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <FAQAccordion items={categoryFaqs} />
      </section>
    </div>
  );
};

const categoryFaqs = [
  {
    question: "What is the difference between an Architect and an Interior Designer?",
    answer: "An Architect plans the building structure, rooms, and exterior. An Interior Designer focuses on the inside look, furniture, colors, and lighting."
  },
  {
    question: "Do I need a Structural Engineer?",
    answer: "Yes, if you are building a multi-story house. A Structural Engineer ensures your building is strong and safe against earthquakes."
  },
  {
    question: "Can construction companies also design houses?",
    answer: "Yes. Many construction companies have their own architects. This is called a 'Design-Build' service, where they handle everything from the map to the final keys."
  },
  {
    question: "What is a Landscape Architect?",
    answer: "A Landscape Architect designs outdoor spaces like gardens, parks, and lawns. They know which plants grow best in your city's climate."
  }
];

export default CategoriesPage;
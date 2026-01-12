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
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Architectural and Design Specialties in Pakistan",
      "description": "Browse professional design services by specialty including Architecture, Interior Design, Construction, and Urban Planning.",
      "itemListElement": CATEGORIES.map((cat, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": cat.name,
        "url": `https://designdirectory.pk/category/${cat.slug}`
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
        <span className="text-[13px] font-black text-[#0071e3] uppercase tracking-[0.3em] mb-6 block">Industry Taxonomy</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.05]">
          Specialties in <br /> <span className="text-[#86868b]">Pakistan Design.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#424245] font-light max-w-[700px] leading-relaxed">
          From high-performance structural engineering to bespoke interior curation, find the exact expertise your project demands across our curated professional silos.
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
              Explore Industry
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
            Load More Specialties
            <span className="opacity-50 font-normal text-[14px]">({CATEGORIES.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {/* SEO Content Section */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Why Professional Categorization Matters</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              In Pakistan's rapidly evolving real estate landscape, selecting a firm based on their niche expertise is critical for project success. A specialized <strong>Architecture Firm</strong> understands municipal bylaws differently than a dedicated <strong>Interior Designer</strong>.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Our directory silos help you filter through the noise, ensuring that whether you're looking for sustainable urban planning or luxury residential craftsmanship, you connect with the right tier of professional.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">The Design-Build Advantage</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Many firms in Pakistan are now categorizing themselves as <strong>Construction Companies</strong> with integrated design studios. This "One-Window" solution, often found in our directory, reduces coordination gaps and ensures that the architectural vision is executed with technical precision on site.
            </p>
            <ul className="space-y-3 text-[16px] text-[#86868b] font-medium">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Reduced Budget Overruns</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Unified Project Responsibility</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Accelerated Project Lifecycles</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Professional Specialties FAQ</h2>
        <FAQAccordion items={categoryFaqs} />
      </section>
    </div>
  );
};

const categoryFaqs = [
  {
    question: "What is the difference between an Architect and an Architectural Designer?",
    answer: "In Pakistan, a 'Licensed Architect' is registered with the PCATP (Pakistan Council of Architects and Town Planners), allowing them to legally sign off on structural plans. An 'Architectural Designer' may focus more on the aesthetic and spatial conceptualization but often works under a licensed lead for final approvals."
  },
  {
    question: "How do I choose between an Interior Designer and an Interior Architect?",
    answer: "Interior Architects focus on the structural aspects and 'bones' of a room (remodeling, electrical layouts, plumbing placement). Interior Designers focus more on the 'skin' and soul of the space (furniture selection, color theory, soft finishes, and ambiance)."
  },
  {
    question: "Are construction companies listed here also designers?",
    answer: "Many top-tier construction companies in Pakistan offer 'Design-Build' services. This integrated approach means the firm handles both the architectural blueprints and the actual on-site construction, often leading to better budget control and faster execution."
  },
  {
    question: "How do I verify a firm's specialty?",
    answer: "We categorize firms based on their primary output and public business data. You can further verify a firm's specialty by looking at their brand hub on our directory, which highlights their most frequent project types and client reviews specific to those categories."
  },
  {
    question: "What does the 'Urban Planner' specialty involve?",
    answer: "Urban Planners on DesignDirectory typically handle large-scale land development, housing society masterplans, and public infrastructure projects. They focus on zoning, traffic flow, and community sustainability rather than individual building design."
  },
  {
    question: "Why should I hire a specialized Landscape Architect?",
    answer: "Landscape Architects specialize in the integration of outdoor spaces with the environment. In Pakistan's climate, they are essential for creating sustainable gardens, water features, and outdoor living areas that utilize native flora and smart irrigation."
  }
];

export default CategoriesPage;
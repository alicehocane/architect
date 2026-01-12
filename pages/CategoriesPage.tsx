import React, { useEffect } from 'react';
import { CATEGORIES } from '../data';
import FAQAccordion from '../components/FAQAccordion';

interface CategoriesPageProps {
  onCategoryClick: (slug: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onCategoryClick }) => {
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
    script.text = JSON.stringify(listSchema);
    document.head.appendChild(script);
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <div className="mb-20 text-center md:text-left">
        <span className="text-[13px] font-black text-[#0071e3] uppercase tracking-[0.3em] mb-6 block">Service Directory</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.05]">
          Specialties in <br /> <span className="text-[#86868b]">Pakistan Design.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#424245] font-light max-w-[700px] leading-relaxed">
          From high-performance structural engineering to bespoke interior curation, find the exact expertise your project demands.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {CATEGORIES.map((cat) => (
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

      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Categorization FAQ</h2>
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
  }
];

export default CategoriesPage;
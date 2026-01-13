import React, { useState, useMemo, useEffect } from 'react';
import { CITIES } from '../data';
import FAQAccordion from '../components/FAQAccordion';

interface CitiesPageProps {
  onCityClick: (citySlug: string) => void;
}

const PAGE_SIZE = 12;

const CitiesPage: React.FC<CitiesPageProps> = ({ onCityClick }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const displayedCities = useMemo(() => {
    return CITIES.slice(0, visibleCount);
  }, [visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Architectural Hubs in Pakistan",
      "description": "Explore top architects and design firms across all major cities of Pakistan including Lahore, Karachi, Islamabad, and more.",
      "itemListElement": CITIES.map((city, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `Architects in ${city.name}`,
        "url": `https://architectorly.com/city/${city.slug}`
      }))
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

    script.text = JSON.stringify([listSchema, faqSchema]);
    document.head.appendChild(script);
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <div className="mb-20 text-center">
        <span className="text-[13px] font-black text-[#0066cc] uppercase tracking-[0.3em] mb-6 block">Regional Network</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
          Explore Pakistan.
        </h1>
        <p className="text-[20px] sm:text-[26px] text-[#86868b] font-light max-w-[600px] mx-auto">
          From the vibrant hubs of Lahore to the industrial power of Faisalabad, find local expertise in every corner.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {displayedCities.map((city) => (
          <div 
            key={city.slug}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer animate-in fade-in zoom-in-95"
            onClick={() => onCityClick(city.slug)}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="text-right">
                  <span className="block text-[22px] font-bold text-[#1d1d1f]">{city.count}</span>
                  <span className="block text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Practices</span>
                </div>
              </div>
              <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#0066cc]">Explore Directory</span>
              <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < CITIES.length && (
        <div className="flex justify-center mb-32">
          <button 
            onClick={handleLoadMore}
            className="px-12 py-5 rounded-full bg-[#1d1d1f] text-white text-[19px] font-bold hover:bg-[#424245] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
          >
            Load More Cities
            <span className="opacity-50 font-normal text-[14px]">({CITIES.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {/* SEO Regional Content */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">The Importance of Local Expertise</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              In Pakistan, architectural requirements vary significantly from one province to another. A studio based in <strong>Islamabad</strong> is well-versed in CDA regulations, while a firm in <strong>Karachi</strong> understands the unique structural challenges posed by coastal humidity and SBCA bylaws.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              By browsing our city-specific hubs, you ensure that you are connecting with professionals who not only possess design talent but also have the regional footprint to handle local approvals and site management effectively.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Major Design Hubs</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Our directory highlights primary architectural clusters in Pakistan. Lahore and Karachi remain the largest hubs for technical innovation, but emerging markets like <strong>Gujranwala</strong> and <strong>Multan</strong> are seeing a surge in high-performance residential developments.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-[15px] text-[#86868b] font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Lahore (Punjab)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Karachi (Sindh)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Islamabad (ICT)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Peshawar (KPK)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12 text-center md:text-left">Regional Architectural FAQs</h2>
        <FAQAccordion items={cityFaqs} />
      </section>
    </div>
  );
};

const cityFaqs = [
  {
    question: "Which city in Pakistan has the best architects?",
    answer: "Lahore and Karachi are traditionally the hubs for the highest-rated architectural firms in Pakistan. However, Islamabad is known for high-end residential mastery and sustainable planning. Architectorly helps you find elite talent in all major cities by ranking them based on verified branch performance."
  },
  {
    question: "How can I find a local architect for my project?",
    answer: "You can use the city filter on this page to view all verified practices in your specific area. Local architects are often preferred as they have better relationships with local development authorities like LDA, CDA, or DHA for plan approvals."
  },
  {
    question: "Do architects in smaller cities provide the same quality as those in Lahore?",
    answer: "Quality is subjective, but many leading firms from major cities now have active branches in smaller cities like Sialkot, Rahim Yar Khan, and Jhelum. Our directory allows you to check the 'Global Rating' of a firm across all its locations to ensure consistency."
  },
  {
    question: "How does the location of a firm affect my project costs?",
    answer: "Hiring a firm from a different city might incur additional site-visit and mobilization costs. We recommend choosing a firm with a legitimate branch in your city to reduce overheads and ensure better on-site supervision."
  },
  {
    question: "Are there architectural services available in Northern Pakistan?",
    answer: "Yes, we are actively cataloging firms in Peshawar and Abbottabad. These architects specialize in hilly terrain construction and climate-responsive designs suited for colder regions."
  },
  {
    question: "Can I find commercial designers in industrial cities like Faisalabad?",
    answer: "Absolutely. Industrial cities like Faisalabad and Gujranwala have highly specialized firms focused on factory design, commercial warehouses, and industrial urbanism."
  }
];

export default CitiesPage;
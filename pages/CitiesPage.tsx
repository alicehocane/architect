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
    // Dynamic Title
    document.title = "Cities with Top Architects | Architectorly";
    
    // Dynamic Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Browse our list of cities. Find verified architects in Lahore, Karachi, Islamabad, Multan, and more.");

    // JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Cities on Architectorly",
      "itemListElement": CITIES.map((city, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": city.name,
        "url": `https://www.architectorly.com/city/${city.slug}`
      }))
    };

    script.text = JSON.stringify(listSchema);
    document.head.appendChild(script);

    return () => { 
      if (document.head.contains(script)) {
        document.head.removeChild(script); 
      }
    };
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <div className="mb-20 text-center">
        <span className="text-[14px] font-black text-[#0066cc] uppercase tracking-[0.3em] mb-6 block">Locations</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
          Explore Pakistan.
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[600px] mx-auto">
          Find the best designers in your area. We cover every major city.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {displayedCities.map((city) => (
          <div 
            key={city.slug}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-xl transition-all duration-500 cursor-pointer"
            onClick={() => onCityClick(city.slug)}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="text-right">
                  <span className="block text-[22px] font-bold text-[#1d1d1f]">{city.count}</span>
                  <span className="block text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Firms</span>
                </div>
              </div>
              <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#0066cc]">View List</span>
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
            Show More Cities
            <span className="opacity-50 font-normal text-[14px]">({CITIES.length - visibleCount} more)</span>
          </button>
        </div>
      )}

      {/* SEO Regional Content */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Why Location Matters</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Every city in Pakistan has its own building rules. A designer in <strong>Islamabad</strong> knows CDA laws. A designer in <strong>Karachi</strong> knows SBCA laws.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Hiring someone local saves you time. They know how to get your house map approved quickly. They can also visit your construction site easily to check the work.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Major Hubs</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Most of the top architecture firms are in the big cities. But new talent is rising in places like <strong>Gujranwala</strong> and <strong>Multan</strong>.
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
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12 text-center md:text-left">Common Questions</h2>
        <FAQAccordion items={cityFaqs} />
      </section>
    </div>
  );
};

const cityFaqs = [
  {
    question: "Which city has the best architects?",
    answer: "Lahore and Karachi have the most firms because they are big cities. Islamabad also has very modern designers. But you can find great talent in almost every city on our list."
  },
  {
    question: "How do I find an architect near me?",
    answer: "Just click on your city name above. You will see a list of verified professionals in your area. You can see their phone numbers and office addresses."
  },
  {
    question: "Does it cost more to hire someone from another city?",
    answer: "Usually, yes. If an architect has to travel to visit your site, they might charge extra fees. It is often cheaper and easier to hire someone local."
  },
  {
    question: "Do you have architects in small cities?",
    answer: "Yes. We are adding more firms from smaller cities like Sialkot, Jhelum, and Rahim Yar Khan every week. We want to cover all of Pakistan."
  }
];

export default CitiesPage;
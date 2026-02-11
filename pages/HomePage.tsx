import React, { useState, useMemo, useEffect } from 'react';
import { CITIES, ALL_ARCHITECTS } from '../data';
import { Architect } from '../types';
import ArchitectCard from '../components/ArchitectCard';
import FAQAccordion from '../components/FAQAccordion';

interface HomePageProps {
  onCityClick: (citySlug: string) => void;
  onArchitectClick: (architect: Architect) => void;
}

const PAGE_SIZE_CITIES = 6;
const PAGE_SIZE_ARCHITECTS = 12;

const HomePage: React.FC<HomePageProps> = ({ onCityClick, onArchitectClick }) => {
  const [search, setSearch] = useState('');
  const [visibleCitiesCount, setVisibleCitiesCount] = useState(PAGE_SIZE_CITIES);
  const [visibleArchitectsCount, setVisibleArchitectsCount] = useState(PAGE_SIZE_ARCHITECTS);
  
  // SEO & Schema Injection
  useEffect(() => {
    // 1. Update Title & Meta
    document.title = "Architectorly | Find the Best Architects in Pakistan";
    const pageDesc = "Looking for top architects in Pakistan? Architectorly helps you find verified home designers, map makers, and construction firms in Lahore, Karachi, and Islamabad.";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDesc);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = pageDesc;
      document.head.appendChild(meta);
    }

    // 2. Inject JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "Architectorly",
          "url": "https://www.architectorly.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.architectorly.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "name": "Architectorly",
          "url": "https://www.architectorly.com",
          "logo": "https://www.architectorly.com/logo.png",
          "description": "Pakistan's leading digital directory for architects, interior designers, and construction professionals.",
          "sameAs": [
            "https://www.facebook.com/architectorly",
            "https://www.instagram.com/architectorly"
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": homeFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    };

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => { 
      if(document.head.contains(script)) document.head.removeChild(script); 
    };
  }, []);

  const displayedCities = useMemo(() => {
    return CITIES.slice(0, visibleCitiesCount);
  }, [visibleCitiesCount]);

  const sortedArchitects = useMemo(() => {
    const baseList = [...ALL_ARCHITECTS].sort((a, b) => {
      const ratingA = a.globalRating || 0;
      const ratingB = b.globalRating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.totalReviews || 0) - (a.totalReviews || 0);
    });

    const aakIndex = baseList.findIndex(a => a.slug === 'aak-architects');
    if (aakIndex > -1) {
      const [aak] = baseList.splice(aakIndex, 1);
      baseList.unshift(aak);
    }
    
    return baseList;
  }, []);

  const filteredArchitects = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return sortedArchitects;
    
    return sortedArchitects.filter(a => 
      a["Shop Name"].toLowerCase().includes(q) ||
      (a.Category && a.Category.toLowerCase().includes(q)) ||
      a.Locations.some(l => l.City.toLowerCase().includes(q))
    );
  }, [search, sortedArchitects]);

  const displayedArchitects = useMemo(() => {
    return filteredArchitects.slice(0, visibleArchitectsCount);
  }, [filteredArchitects, visibleArchitectsCount]);

  const handleLoadMoreCities = () => {
    setVisibleCitiesCount(prev => Math.min(prev + PAGE_SIZE_CITIES, CITIES.length));
  };

  const handleLoadMoreArchitects = () => {
    setVisibleArchitectsCount(prev => Math.min(prev + PAGE_SIZE_ARCHITECTS, filteredArchitects.length));
  };

  return (
    <div className="page-transition">
      <section className="pt-24 pb-32 px-6 text-center overflow-hidden">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-[52px] sm:text-[88px] font-bold tracking-[-0.035em] leading-[1.02] text-[#1d1d1f] mb-8">
            Build your dream <br className="hidden sm:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] to-[#5e5ce6]">with Architectorly.</span>
          </h1>
          <p className="text-[20px] sm:text-[26px] text-[#86868b] font-light leading-snug mb-14 max-w-[620px] mx-auto">
            Connect with the best architects in Pakistan. Simple, fast, and free.
          </p>
          
          <div className="relative max-w-[660px] mx-auto group">
            <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#0071e3] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by city, firm, or category..."
              className="w-full h-[72px] bg-white rounded-[28px] border border-[#d2d2d7]/50 shadow-[0_15px_45px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] pl-16 pr-6 text-[21px] focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/30 transition-all outline-none placeholder-[#86868b] text-[#1d1d1f]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {!search && (
        <section className="max-w-[1024px] mx-auto px-6 mb-32">
          <div className="mb-10">
            <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f]">Popular Cities</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCities.map((city) => (
              <div 
                key={city.slug}
                className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-pointer"
                onClick={() => onCityClick(city.slug)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h4c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18"/><path d="M6 18h12"/><path d="M12 18v4"/><path d="M18 22V7c0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6h-4c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4v15"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M15 10h1"/><path d="M15 14h1"/><path d="M15 18h1"/></svg>
                    </div>
                    <span className="text-[13px] font-bold text-[#0066cc] bg-blue-50 px-3 py-1 rounded-full">{city.count} Firms</span>
                  </div>
                  <h3 className="text-[26px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
                </div>
                <div className="mt-8 flex items-center gap-2 text-[14px] font-medium text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">
                  View Professionals
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            ))}
          </div>

          {visibleCitiesCount < CITIES.length && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleLoadMoreCities}
                className="px-10 py-4 rounded-full bg-white border border-[#d2d2d7] text-[17px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                Load more cities
                <span className="text-[13px] text-[#86868b] font-normal ml-1">({CITIES.length - visibleCitiesCount} remaining)</span>
              </button>
            </div>
          )}
        </section>
      )}

      {!search && (
        <section className="max-w-[1024px] mx-auto px-6 mb-32">
          <div className="relative bg-[#1d1d1f] rounded-[3.5rem] overflow-hidden p-10 sm:p-20 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] -ml-32 -mb-32"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                  <span className="px-4 py-1 rounded-full bg-white/10 text-white/60 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
                    Featured Partner
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                </div>
                <h2 className="text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-white mb-8">
                  Let’s Build Something <br className="hidden sm:block" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Meaningful.</span>
                </h2>
                <p className="text-[20px] sm:text-[22px] text-white/70 font-light leading-relaxed mb-12 max-w-[620px]">
                  If you’re looking for an architect who combines design intelligence, research depth, and execution clarity, 
                  <span className="text-white font-semibold"> AAK Architects</span> is ready to collaborate.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <a 
                    href="/architects/aak-architects"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      onArchitectClick({ slug: 'aak-architects' } as any); 
                    }}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-[#1d1d1f] rounded-2xl font-bold text-[18px] hover:bg-[#f5f5f7] transition-all active:scale-95 shadow-xl shadow-white/5 text-center"
                  >
                    View Practice Profile
                  </a>
                  <a 
                    href="https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20AAK%20Architects%2C%20I%E2%80%99m%20looking%20for%20architectural%20consultancy%20and%20would%20like%20to%20discuss%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white font-medium flex items-center gap-2 transition-colors group"
                  >
                    Direct Consultation
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0 hidden lg:block">
                <div className="w-80 h-80 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-2xl flex items-center justify-center">
                   <svg className="w-32 h-32 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M6 22V4c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h4c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18"/><path d="M6 18h12"/><path d="M12 18v4"/><path d="M18 22V7c0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6h-4c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4v15"/>
                   </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1024px] mx-auto px-6 mb-32">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f]">
            {search ? `Results for "${search}"` : 'Professional Directory'}
          </h2>
          {search && (
            <button onClick={() => setSearch('')} className="text-[#0066cc] text-[15px] font-medium hover:underline">Clear Search</button>
          )}
        </div>
        
        {displayedArchitects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArchitects.map((architect) => (
              <ArchitectCard key={architect.slug} architect={architect} onClick={onArchitectClick} />
            ))}
          </div>
        ) : (
          <div className="bg-[#f5f5f7] rounded-[3rem] p-24 text-center border border-dashed border-[#d2d2d7]">
            <p className="text-[21px] text-[#86868b] font-light">No elite firms matching your criteria were found.</p>
          </div>
        )}

        {visibleArchitectsCount < filteredArchitects.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={handleLoadMoreArchitects}
              className="px-10 py-4 rounded-full bg-[#1d1d1f] text-white text-[17px] font-medium hover:bg-[#424245] active:scale-95 transition-all shadow-lg flex items-center gap-2"
            >
              Show more professionals
              <span className="text-[13px] opacity-60 font-normal ml-1">({filteredArchitects.length - visibleArchitectsCount} remaining)</span>
            </button>
          </div>
        )}
      </section>

      {/* SEO CONTENT SECTION - 8th Grade Reading Level */}
      <section className="max-w-[1024px] mx-auto px-6 mb-32 py-20 border-t border-[#d2d2d7]/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold text-[#1d1d1f]">Why Use Architectorly?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Finding the right architect in Pakistan used to be hard. You had to ask friends or drive around looking for signs. <strong>Architectorly</strong> makes it simple. We list the best professionals in one place.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              We check every firm before they join our list. This means you can trust the people you find here. Whether you need a map for a small house or a design for a big plaza, we have the right expert for you.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold text-[#1d1d1f]">How It Works</h2>
            <ul className="space-y-4 text-[18px] text-[#424245] font-light">
              <li className="flex gap-3">
                <span className="font-bold text-[#0071e3]">•</span>
                <span><strong>Search:</strong> Type in your city name, like "Lahore" or "Multan".</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#0071e3]">•</span>
                <span><strong>Compare:</strong> Look at their ratings and past work. See who fits your style.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#0071e3]">•</span>
                <span><strong>Connect:</strong> Click to call them directly. No middleman. No hidden fees.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-[800px] mx-auto px-6 mb-32">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] mb-10 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={homeFaqs} />
      </section>
    </div>
  );
};

const homeFaqs = [
  {
    question: "Is Architectorly free to use?",
    answer: "Yes, Architectorly is 100% free for homeowners. You can search for architects, view their profiles, and get their phone numbers without paying anything."
  },
  {
    question: "Are the architects on this list verified?",
    answer: "We try our best to verify every firm. We check their office address and phone numbers. Many of our top-rated architects are also registered with PCATP."
  },
  {
    question: "Can I find map makers and engineers here?",
    answer: "Yes. Our directory includes architects, structural engineers, interior designers, and map makers. You can find help for any part of your building project."
  },
  {
    question: "Do you cover all cities in Pakistan?",
    answer: "We cover major cities like Lahore, Karachi, Islamabad, and Rawalpindi. We are also adding more firms from smaller cities like Gujrat, Sahiwal, and Jhelum every day."
  }
];

export default HomePage;
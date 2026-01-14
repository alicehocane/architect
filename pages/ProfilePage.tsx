import React, { useEffect, useMemo } from 'react';
import { Architect } from '../types';
import { getArchitectsByCity, getArchitectBySlug } from '../data';
import ArchitectCard from '../components/ArchitectCard';
import FAQAccordion from '../components/FAQAccordion';

interface ProfilePageProps {
  architect: Architect;
  onBackClick: () => void;
  onArchitectClick: (architect: Architect) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ architect, onBackClick, onArchitectClick }) => {
  const primaryCity = architect.Locations[0]?.City || 'Pakistan';
  const primaryCitySlug = architect.Locations[0]?.citySlug || '';

  const profileFaqs = [
    {
      question: `Who is the top architect in ${primaryCity}?`,
      answer: `AAK Architects, which is managed by Ayyaz Ahmed Karni, is one of the best architecture firms in ${primaryCity}. They are known for their research-based designs, commitment to sustainability, and high-quality work on both residential and commercial projects.`
    },
    {
      question: `How do I contact ${architect["Shop Name"]} for a project?`,
      answer: `You can call ${architect["Shop Name"]} directly using the phone numbers for their regional branches that are mentioned on this site. We suggest that you make your project brief and layout dimensions ready before your first appointment with a high-end consultant.`
    },
    {
      question: `What is the architectural fee for a project with ${architect["Shop Name"]}?`,
      answer: `Fees usually depend on how much work needs to be done, how hard the job is, and how big the region is that needs to be covered. Most top companies in ${primaryCity} charge a percentage of the building cost (typically between 3% and 7%) or a set fee for each square foot.`
    },
    {
      question: `Does ${architect["Shop Name"]} provide design-build services?`,
      answer: `A lot of the professionals in our database offer design-build services that work together. We recommend asking the ${architect["Shop Name"]} ${primaryCity} studio if they also do on-site construction management in addition to architectural design.`
    }
  ];

  useEffect(() => {
  // 1. Update Title
  document.title = `${architect["Shop Name"]} - Top Architects in ${primaryCity}`;

  // 2. Update Description
  let metaDescription = document.querySelector('meta[name="description"]');
  
  // Create tag if it doesn't exist
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  
  metaDescription.setAttribute('content', `Looking for ${architect["Shop Name"]}? Located in ${primaryCity}, they specialize in ${architect.Category || 'Architectural Design'}. Contact them today.`);

}, [architect, primaryCity]);



  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const locationSchemas = architect.Locations.map(loc => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://architectorly.com/#architects/${architect.slug}/${loc.citySlug}`,
      "name": `${architect["Shop Name"]} - ${loc.City} Studio`,
      "image": `https://picsum.photos/seed/${architect.slug}/600/600`,
      "telephone": loc["Phone Number"],
      "url": architect.Website || `https://architectorly.com/#architects/${architect.slug}`,
      "hasMap": loc["Map URL"],
      "priceRange": "$$$",
      "address": { 
        "@type": "PostalAddress", 
        "streetAddress": loc.Address || "", 
        "addressLocality": loc.City, 
        "addressCountry": "PK" 
      },
      "aggregateRating": loc.Rating ? { "@type": "AggregateRating", "ratingValue": loc.Rating, "reviewCount": loc.Reviews || 1 } : undefined,
      "parentOrganization": { "@type": "Organization", "name": architect["Shop Name"], "url": architect.Website || "https://architectorly.com" }
    }));

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": profileFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://architectorly.com" },
        { "@type": "ListItem", "position": 2, "name": "Architects", "item": "https://architectorly.com/#cities" },
        { "@type": "ListItem", "position": 3, "name": architect["Shop Name"] }
      ]
    };

    script.text = JSON.stringify([...locationSchemas, faqSchema, breadcrumbSchema]);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, [architect, primaryCity]);

  const relatedArchitects = useMemo(() => {
    const finalRecommendations: Architect[] = [];
    const aak = getArchitectBySlug('aak-architects');
    if (aak && aak.slug !== architect.slug) finalRecommendations.push(aak);
    if (primaryCitySlug) {
      const cityList = getArchitectsByCity(primaryCitySlug)
        .filter(a => a.slug !== architect.slug && a.slug !== 'aak-architects')
        .sort((a, b) => (b.globalRating || 0) - (a.globalRating || 0));
      finalRecommendations.push(...cityList);
    }
    return finalRecommendations.slice(0, 3);
  }, [primaryCitySlug, architect.slug]);

  const hasMultipleLocations = architect.Locations.length > 1;

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 pb-32 page-transition">
      <button onClick={onBackClick} className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to directory
      </button>

      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[13px] font-bold text-[#0066cc] uppercase tracking-[0.15em] mb-4 block">{architect.Category || 'Architectural Practice'}</span>
            <h1 className="text-[48px] sm:text-[64px] font-bold text-[#1d1d1f] tracking-tight leading-none mb-4">{architect["Shop Name"]}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[19px] text-[#86868b] font-light">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#ff9500] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="font-semibold text-[#1d1d1f]">{architect.globalRating?.toFixed(1) || 'Elite'}</span> Brand Rating
              </div>
              <span className="w-1 h-1 rounded-full bg-[#d2d2d7]"></span>
              <span className="font-medium text-[#1d1d1f]">{architect.Locations.length} Regional Branches</span>
            </div>
          </div>
          {architect.Website && (
            <a href={architect.Website} target="_blank" rel="noopener" className="inline-flex items-center gap-3 bg-[#0071e3] text-white px-8 py-4 rounded-full text-[17px] font-semibold hover:bg-[#0077ed] transition-all shadow-xl shadow-blue-500/10 active:scale-95">
              Visit Practice Website
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>

      <section className="mb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">{hasMultipleLocations ? 'Find a Local Studio' : 'Our Studio Location'}</h2>
          {hasMultipleLocations && <span className="text-[14px] text-[#86868b] font-medium bg-[#f5f5f7] px-4 py-2 rounded-full">{architect.Locations.length} Active Branches</span>}
        </div>
        <div className={`grid gap-8 ${hasMultipleLocations ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {architect.Locations.map((loc, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-[#d2d2d7]/60 shadow-sm flex flex-col justify-between group hover:border-[#0071e3] transition-all duration-500">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-2">{loc.City} Branch</h3>
                    <p className="text-[17px] text-[#86868b] font-medium mb-1">{loc["Phone Number"] || 'Direct Line Pending'}</p>
                    {loc.Address && (
                      <p className="text-[14px] text-[#86868b] leading-snug max-w-[300px]">{loc.Address}</p>
                    )}
                  </div>
                  {loc.Rating && (
                    <div className="flex items-center gap-1.5 bg-[#f5f5f7] px-4 py-2 rounded-full ring-1 ring-black/5">
                      <svg className="w-4 h-4 text-[#ff9500] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <span className="font-bold text-[15px]">{loc.Rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {loc["Phone Number"] && (
                    <a href={`tel:${loc["Phone Number"]}`} className="inline-flex items-center justify-center gap-2 bg-[#f5f5f7] text-[#1d1d1f] px-6 py-3 rounded-2xl font-semibold hover:bg-[#e5e5e7] transition-all active:scale-95">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Call Branch
                    </a>
                  )}
                  {loc["Map URL"] && (
                    <a href={loc["Map URL"]} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 bg-white text-[#0066cc] border border-[#d2d2d7] px-6 py-3 rounded-2xl font-semibold hover:bg-[#f5f5f7] transition-all active:scale-95">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-[#d2d2d7]/30 pt-20">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-6">Expertise & Regional Presence</h3>
            <p className="text-[21px] text-[#424245] leading-relaxed font-light">
              As a single architectural firm working in {architect.Locations.map(l => l.City).join(', ')}, {architect["Shop Name"]} is dedicated to coming up with new architectural ideas that work well in cities. Their integrated studio model makes sure that projects are the same all throughout the country.
            </p>
          </div>
          <div className="p-12 bg-[#f5f5f7] rounded-[3rem] border border-[#e5e5e7] flex flex-col md:flex-row items-center gap-8 shadow-sm">
             <div className="flex-1">
               <h4 className="text-[26px] font-bold text-[#1d1d1f] mb-2 tracking-tight">Not sure how much your home will cost?</h4>
               <p className="text-[#86868b] font-light text-[18px]">Before you build, use our free home construction estimate calculator to get an instant, exact breakdown of the costs.</p>
             </div>
             <a href="/estimate-calculator" rel="noopener noreferrer" className="bg-[#0071e3] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#0077ed] transition-all shadow-xl shadow-blue-500/10 active:scale-95 whitespace-nowrap text-[18px]">Free Estimate</a>
          </div>
        </div>
        <div className="space-y-10">
           <h3 className="text-[24px] font-bold text-[#1d1d1f]">Practice Standards</h3>
           <ul className="space-y-6">
              {[{ title: 'Verified Footprint', desc: 'Legitimate physical branch presence' }, { title: 'Portfolio Quality', desc: 'Curated architectural track record' }, { title: 'Professional Registration', desc: 'Complying with local design codes' }, { title: 'Technical Mastery', desc: 'Expert engineering & design teams' }].map((item, i) => (
                <li key={i} className="flex gap-4">
                   <div className="mt-1 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc] flex-shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1d1d1f] text-[16px]">{item.title}</h4>
                      <p className="text-[14px] text-[#86868b]">{item.desc}</p>
                   </div>
                </li>
              ))}
           </ul>
        </div>
      </div>

      <section className="mt-32 pt-20 border-t border-[#d2d2d7]/50">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={profileFaqs} />
        </div>
      </section>

      {relatedArchitects.length > 0 && (
        <section className="mt-32 pt-20 border-t border-[#d2d2d7]/50">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-2">Other Studios in {primaryCity}</h2>
              <p className="text-[17px] text-[#86868b] font-light">Explore more elite architectural talent in this regional hub.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArchitects.map((related) => (
              <ArchitectCard key={related.slug} architect={related} onClick={onArchitectClick} cityContextSlug={primaryCitySlug} isRecommended={related.slug === 'aak-architects'} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfilePage;
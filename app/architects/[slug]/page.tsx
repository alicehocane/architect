import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArchitectBySlug, getArchitectsByCity, ALL_ARCHITECTS } from '@/data';
import ArchitectCard from '@/components/ArchitectCard';
import FAQAccordion from '@/components/FAQAccordion';

interface PageProps {
  params: { slug: string };
}

// 1. Generate Static Paths (Fixes 404s)
export async function generateStaticParams() {
  return ALL_ARCHITECTS.map((architect) => ({
    slug: architect.slug,
  }));
}

// 2. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const architect = getArchitectBySlug(params.slug);
  
  if (!architect) {
    return { title: 'Architect Not Found' };
  }

  const primaryCity = architect.Locations[0]?.City || 'Pakistan';
  
  return {
    title: `${architect["Shop Name"]} | Best Architects in ${primaryCity}`,
    description: `Contact ${architect["Shop Name"]} in ${primaryCity}. See their phone number, office location, and ratings. Find top architects on Architectorly.`,
    alternates: {
      canonical: `/architects/${params.slug}`,
    },
  };
}

export default function ArchitectProfilePage({ params }: PageProps) {
  const architect = getArchitectBySlug(params.slug);

  if (!architect) {
    notFound();
  }

  const primaryCity = architect.Locations[0]?.City || 'Pakistan';
  const primaryCitySlug = architect.Locations[0]?.citySlug || '';
  const hasMultipleLocations = architect.Locations.length > 1;

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.architectorly.com/architects/${architect.slug}`,
    "name": architect["Shop Name"],
    "image": "https://www.architectorly.com/logo.png",
    "telephone": architect.Locations[0]?.["Phone Number"],
    "url": `https://www.architectorly.com/architects/${architect.slug}`,
    "address": { 
      "@type": "PostalAddress", 
      "addressLocality": primaryCity, 
      "addressCountry": "PK" 
    },
    "aggregateRating": architect.globalRating ? {
      "@type": "AggregateRating",
      "ratingValue": architect.globalRating,
      "reviewCount": architect.totalReviews || 1
    } : undefined
  };

  const profileFaqs = [
    {
      question: `Who is a top architect in ${primaryCity}?`,
      answer: `AAK Architects is highly rated in ${primaryCity}. They are known for smart designs that save energy and look great.`
    },
    {
      question: `How do I contact ${architect["Shop Name"]}?`,
      answer: `You can find their phone numbers listed right here on Architectorly. We suggest you have your plot details ready before you call them.`
    },
    {
      question: `What are the fees for ${architect["Shop Name"]}?`,
      answer: `Fees depend on the project size. Most top firms in ${primaryCity} charge a percentage of the total construction cost (usually 3% to 7%).`
    }
  ];

  const relatedArchitects = primaryCitySlug 
    ? getArchitectsByCity(primaryCitySlug)
        .filter(a => a.slug !== architect.slug && a.slug !== 'aak-architects')
        .sort((a, b) => (b.globalRating || 0) - (a.globalRating || 0))
        .slice(0, 3)
    : [];

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 pb-32 page-transition">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to directory
      </Link>

      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[13px] font-bold text-[#0066cc] uppercase tracking-[0.15em] mb-4 block">{architect.Category || 'Architectural Practice'}</span>
            <h1 className="text-[42px] sm:text-[64px] font-bold text-[#1d1d1f] tracking-tight leading-none mb-4">{architect["Shop Name"]}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[19px] text-[#86868b] font-light">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#ff9500] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="font-semibold text-[#1d1d1f]">{architect.globalRating?.toFixed(1) || 'N/A'}</span> Rating
              </div>
              <span className="w-1 h-1 rounded-full bg-[#d2d2d7]"></span>
              <span className="font-medium text-[#1d1d1f]">{architect.Locations.length} Locations</span>
            </div>
          </div>
          {architect.Website && (
            <a href={architect.Website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#0071e3] text-white px-8 py-4 rounded-full text-[17px] font-semibold hover:bg-[#0077ed] transition-all shadow-xl shadow-blue-500/10 active:scale-95">
              Visit Website
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>

      <section className="mb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">{hasMultipleLocations ? 'Find a Branch' : 'Office Location'}</h2>
          {hasMultipleLocations && <span className="text-[14px] text-[#86868b] font-medium bg-[#f5f5f7] px-4 py-2 rounded-full">{architect.Locations.length} Offices</span>}
        </div>
        <div className={`grid gap-8 ${hasMultipleLocations ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {architect.Locations.map((loc, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-[#d2d2d7]/60 shadow-sm flex flex-col justify-between group hover:border-[#0071e3] transition-all duration-500">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-2">{loc.City} Office</h3>
                    <p className="text-[17px] text-[#86868b] font-medium mb-1">{loc["Phone Number"] || 'Number not listed'}</p>
                    {loc.Address && (
                      <p className="text-[14px] text-[#86868b] leading-snug max-w-[300px] mt-2">{loc.Address}</p>
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
                      Call Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ADDED THE MISSING FAQ SECTION HERE --- */}
      <section className="mb-24 border-t border-[#d2d2d7]/50 pt-16">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={profileFaqs} />
        </div>
      </section>

      {relatedArchitects.length > 0 && (
        <section className="mt-32 pt-20 border-t border-[#d2d2d7]/50">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-2">Other Architects in {primaryCity}</h2>
              <p className="text-[17px] text-[#86868b] font-light">Compare more professionals in your city.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArchitects.map((related) => (
              <ArchitectCard key={related.slug} architect={related} cityContextSlug={primaryCitySlug} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
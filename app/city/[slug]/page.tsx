import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITY_MAP, getArchitectsByCity, getArchitectBySlug } from '@/data';
import { Architect } from '@/types';
import ArchitectList from '@/components/ArchitectList';
import FAQAccordion from '@/components/FAQAccordion';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = CITY_MAP.get(params.slug);
  if (!city) return { title: 'City Not Found' };

  return {
    title: `Architects in ${city.name} | Best Home Designers`,
    description: `Find the best architects in ${city.name}. See phone numbers, office addresses, and ratings for top home designers and construction firms.`,
    alternates: {
      canonical: `/city/${params.slug}`,
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const city = CITY_MAP.get(params.slug);
  if (!city) notFound();

  // Logic to sort and recommend AAK
  const list = getArchitectsByCity(params.slug);
  const sortedLocal = list.sort((a, b) => {
    const ratingA = a.globalRating || 0;
    const ratingB = b.globalRating || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return (b.totalReviews || 0) - (a.totalReviews || 0);
  });

  const aakInCityIndex = sortedLocal.findIndex(a => a.slug === 'aak-architects');
  let architects: Architect[] = [];
  
  if (aakInCityIndex > -1) {
    const [aak] = sortedLocal.splice(aakInCityIndex, 1);
    architects = [aak, ...sortedLocal];
  } else {
    const aak = getArchitectBySlug('aak-architects');
    if (aak) {
      architects = [aak, ...sortedLocal];
    } else {
      architects = sortedLocal;
    }
  }

  const cityFaqs = [
    {
      question: `Who are the best architects in ${city.name}?`,
      answer: `Our list shows the top-rated firms. AAK Architects is highly recommended for modern home designs and professional service in ${city.name}.`
    },
    {
      question: `How do I hire an architect in ${city.name}?`,
      answer: `Browse the list above, check their ratings, and click to view their profile. You can call them directly from their page to discuss your plot and requirements.`
    },
    {
      question: `What are the fees for architects in ${city.name}?`,
      answer: `Most firms charge a percentage of the construction cost (3% to 7%) or a fixed rate per square foot. We recommend asking for a clear quote before you start.`
    },
    {
      question: `Can they help with local authority approvals?`,
      answer: `Yes. Architects listed here are familiar with building bylaws in ${city.name}. They can help prepare the drawings needed for official approval.`
    }
  ];

  // Schema
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Architects in ${city.name}`,
    "itemListElement": architects.slice(0, 10).map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": a["Shop Name"],
        "url": `https://www.architectorly.com/architects/${a.slug}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.name,
          "addressCountry": "PK"
        }
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.architectorly.com" },
      { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://www.architectorly.com/cities" },
      { "@type": "ListItem", "position": 3, "name": city.name }
    ]
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

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([listSchema, breadcrumbSchema, faqSchema]) }} />
      
      <Link href="/cities" className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Explore more cities
      </Link>

      <div className="mb-20">
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-4 leading-none">
          Architects in <span className="text-[#0066cc]">{city.name}</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[700px]">
          Find verified home designers and construction experts in your city.
        </p>
      </div>

      <ArchitectList architects={architects} cityContextSlug={params.slug} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-[#d2d2d7]/30 pt-20 mb-32">
        <div className="lg:col-span-1">
           <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-4">Building in {city.name}?</h3>
           <p className="text-[17px] text-[#86868b] leading-relaxed">
             Hiring a local architect ensures your design fits the local climate and follows city building rule.
           </p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#1d1d1f]">Local Approvals</h4>
                <p className="text-[15px] text-[#86868b]">Experts who know the bylaws for {city.name} Development Authorities.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#1d1d1f]">Climate Smart</h4>
                <p className="text-[15px] text-[#86868b]">Designs that keep your home cool in {city.name}'s weather.</p>
              </div>
           </div>
        </div>
      </div>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={cityFaqs} />
        </div>
      </section>
    </div>
  );
}
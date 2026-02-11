import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Architectorly | We Connect You With Top Architects",
  description: "Learn about Architectorly. We are Pakistan's #1 free directory for finding verified architects, home designers, and map makers. Simple, fast, and trusted.",
};

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Architectorly",
    "url": "https://www.architectorly.com",
    "logo": "https://www.architectorly.com/logo.png",
    "description": "Pakistan's most trusted platform for connecting homeowners with architects.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.facebook.com/architectorly",
      "https://www.instagram.com/architectorly"
    ]
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-24 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="max-w-[800px]">
        <header className="mb-16">
          <span className="text-[14px] font-bold text-[#0066cc] uppercase tracking-[0.2em] mb-6 block">Who We Are</span>
          <h1 className="text-[42px] sm:text-[64px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.1]">
            Making home design <br /> 
            <span className="text-[#86868b]">simple for everyone.</span>
          </h1>
        </header>
        
        <div className="space-y-10 text-[18px] sm:text-[21px] text-[#424245] font-light leading-relaxed">
          <p>
            Building a house is one of the biggest investments you will ever make. But finding the right architect in Pakistan used to be difficult. You had to rely on word-of-mouth or drive around looking for signboards. 
          </p>
          <p>
            <strong>Architectorly</strong> changes that. We built a simple, free website where you can find the best architects in your city. Whether you are in Lahore, Karachi, or a smaller town like Mandi Bahauddin, we help you connect with the right expert.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-[#d2d2d7]/50 my-12">
            <div>
              <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-3">Verified Experts</h3>
              <p className="text-[16px] text-[#86868b]">We check our list to make sure you find real professionals. We look for active phone numbers and office addresses so you don't waste time.</p>
            </div>
            <div>
              <h3 className="text-[24px] font-bold text-[#1d1d1f] mb-3">100% Free</h3>
              <p className="text-[16px] text-[#86868b]">Homeowners never pay to use Architectorly. You can browse profiles, see ratings, and call architects directly for free.</p>
            </div>
          </div>

          <div>
            <h2 className="text-[32px] font-bold text-[#1d1d1f] mb-6">Our Mission</h2>
            <p>
              We want to improve how Pakistan builds. By connecting you with skilled architects, we help ensure your home is safe, beautiful, and built to last. Good design saves you money on construction and electricity bills in the long run.
            </p>
          </div>

          <div className="pt-8">
            <p className="text-[16px] text-[#86868b] italic">
              Ready to start? Search for an architect in your city today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
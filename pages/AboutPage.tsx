import React, { useEffect } from 'react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    // 1. Dynamic Meta Title
    document.title = "About Architectorly | Pakistan's Premier Architecture Directory";

    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Architectorly Pakistan links clients with big ideas to the best PCATP-licensed architects. Learn about our goal to bring the design scene in Pakistan up to date.");

    // 3. Organization Schema (Crucial for Brand Authority)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Architectorly Pakistan",
      "url": "https://architectorly.com",
      "logo": "https://architectorly.com/logo.png",
      "description": "Pakistan's data-driven directory for finding top architects and estimating construction costs.",
      "foundingDate": "2026",
      "founder": {
        "@type": "Person",
        "name": "Awais Karni"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PK"
      }
    };
    script.text = JSON.stringify(orgSchema);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-32 page-transition">
      <div className="max-w-[800px]">
        <header className="mb-20">
          <span className="text-[14px] font-bold text-[#0066cc] uppercase tracking-[0.3em] mb-8 block">Our Vision</span>
          <h1 className="text-[48px] sm:text-[80px] font-bold tracking-tight text-[#1d1d1f] mb-12 leading-[1.05]">
            Architecting the future <br /> 
            <span className="text-[#86868b]">of a nation.</span>
          </h1>
        </header>
        
        <div className="space-y-12 text-[21px] sm:text-[24px] text-[#424245] font-light leading-relaxed">
          <p>
            Architectorly Pakistan was founded on a single principle: that **high-performance design** should be accessible to everyone. We connect the most innovative PCATP-licensed designers with forward-thinking clients.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-12 border-y border-[#d2d2d7]/50 my-16">
            <div>
              <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-4">Integrity</h3>
              <p className="text-[17px] text-[#86868b]">We verify every profile to ensure they have a legitimate professional footprint and a history of excellence in Pakistan.</p>
            </div>
            <div>
              <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-4">Innovation</h3>
              <p className="text-[17px] text-[#86868b]">We provide AI-powered construction cost calculators and BIM-integrated search to simplify complex building decisions.</p>
            </div>
          </div>

          <p>
            From luxury residences in **DHA and Bahria Town** to commercial landmarks in **Islamabad’s Blue Area**, we provide the data you need to choose the right architect for your legacy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
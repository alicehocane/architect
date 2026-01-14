import React, { useEffect } from 'react';

const TermsPage: React.FC = () => {
  useEffect(() => {
    // 1. DYNAMIC META CONTENT
    document.title = "Terms of Service | Architectorly Pakistan";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Read the Terms of Service for Architectorly Pakistan. Understand the scope of our directory, user responsibilities, and professional engagement guidelines.");

    // 2. SEO ROBOTS SIGNAL
    // We tell Google "index this page so you know it exists, but don't prioritize it."
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'index, follow');

    return () => {};
  }, []);

  return (
    <div className="max-w-[800px] mx-auto px-6 py-32 page-transition">
      <header className="mb-12">
        <span className="text-[14px] font-bold text-[#0066cc] uppercase tracking-widest mb-4 block">Legal Framework</span>
        <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f]">Terms of Service.</h1>
      </header>
      
      <div className="prose prose-lg prose-slate space-y-12">
        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">1. Scope of Service</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            Architectorly provides a specialized digital platform for the discovery and evaluation of architectural professionals in Pakistan. While we facilitate connections, we do not act as a party to any contract, guarantee project outcomes, or manage financial transactions between users and listed professionals.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. User Responsibilities & Due Diligence</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            Users are solely responsible for conducting their own due diligence. This includes, but is not limited to, verifying the current **PCATP licensure**, professional indemnity insurance, and the structural track record of any firm or individual found through our directory.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. Data Integrity</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            Our directory data is curated from public records and verified firm submissions. While Architectorly strives for precision, we are not liable for discrepancies in office locations, phone numbers, or historical brand ratings provided by third parties.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">4. AI Consultant & Estimator Disclaimer</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            The **Construction Cost Estimator** and AI Assistant provide forecasts based on market trends and directory patterns. These outputs are strictly informational and must not be used as a substitute for a formal bill of quantities (BOQ) or professional structural advice.
          </p>
        </section>

        <footer className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b] font-medium">
            Last modified: January 14, 2026. For legal inquiries, please contact the Architectorly team.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage;
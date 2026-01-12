import React from 'react';

const TermsPage: React.FC = () => {
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
            DesignDirectory Pakistan provides a digital platform for the discovery and evaluation of architectural professionals. We facilitate connections but do not guarantee project outcomes or financial transactions between users and professionals.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. User Responsibilities</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            Users are responsible for conducting their own due diligence, including verifying the current licensure, insurance, and professional standing of any architect or firm found through this directory.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. Data Accuracy</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            Directory data is aggregated from public records and verified firm submissions. While we strive for absolute accuracy, DesignDirectory is not liable for errors in office locations, contact details, or historical ratings.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">4. AI Consultant Terms</h2>
          <p className="text-[#424245] leading-relaxed font-light text-[18px]">
            Our AI Assistant provides recommendations based on directory patterns. These suggestions should be treated as informational and not as formal professional advice.
          </p>
        </section>

        <footer className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b] font-medium">
            Last modified: November 20, 2025.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage;
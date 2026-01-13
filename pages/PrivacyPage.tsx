
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-32 page-transition">
      <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] mb-12">Privacy Policy.</h1>
      
      <div className="prose prose-lg prose-slate space-y-12">
        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">1. Information We Collect</h2>
          <p className="text-[#424245] leading-relaxed">
            Architectorly collects information that is publicly available through professional registries and data provided voluntarily by firms. This includes business names, contact details, office locations, and professional specializations.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. How We Use Data</h2>
          <p className="text-[#424245] leading-relaxed">
            The data we collect is used solely to facilitate the connection between users looking for architectural services and the professionals listed in our directory. We use anonymized usage patterns to improve our AI recommendation engine.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. Professional Listings</h2>
          <p className="text-[#424245] leading-relaxed">
            Professionals listed in our directory have the right to request updates, corrections, or removal of their information at any time. We strive for 100% accuracy in our professional profiles.
          </p>
        </section>

        <section className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b]">
            Last updated: November 2025. For privacy inquiries, please contact privacy@architectorly.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;

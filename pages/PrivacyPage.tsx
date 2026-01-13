
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-32 page-transition">
      <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] mb-12">Privacy Policy.</h1>
      
      <div className="prose prose-lg prose-slate space-y-12">
        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">1. Information We Collect</h2>
          <p className="text-[#424245] leading-relaxed">
            Architectorly gathers information that is available to the public through professional registries and data that companies choose to provide. This covers the names of businesses, their contact information, the locations of their offices, and their areas of expertise.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. How We Use Data</h2>
          <p className="text-[#424245] leading-relaxed">
            We only use the information we collect to help people who need architectural services find the professionals listed in our directory. We strengthen our AI recommendation engine by looking at usage patterns without names.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. Professional Listings</h2>
          <p className="text-[#424245] leading-relaxed">
            People who are listed in our directory have the right to ask for changes, updates, or the removal of their information at any time. We want our professional profiles to be 100% correct.
          </p>
        </section>

        <section className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b]">
            Last updated: January 2026. For privacy inquiries, please contact architectorly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;

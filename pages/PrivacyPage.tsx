import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    // 1. DYNAMIC META CONTENT
    document.title = "Privacy Policy | Architectorly Pakistan";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Read the Privacy Policy for Architectorly Pakistan. Learn how we handle professional data and user privacy within our architectural directory.");

    // 2. SEO ROBOTS SIGNAL
    // Usually, we want Privacy pages indexed, but not as a top priority.
    // If you want to keep search results focused on your architects, you can use "noindex, follow"
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'index, follow');

    return () => {
      // Cleanup is not strictly necessary for standard meta, 
      // but good practice if you have unique tags.
    };
  }, []);

  return (
    <div className="max-w-[800px] mx-auto px-6 py-32 page-transition">
      <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] mb-12">Privacy Policy.</h1>
      
      <div className="prose prose-lg prose-slate space-y-12">
        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">1. Information We Collect</h2>
          <p className="text-[#424245] leading-relaxed">
            Architectorly gathers information that is available to the public through professional registries and data that companies choose to provide. This covers business names, contact information, office locations, and professional specialties.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. How We Use Data</h2>
          <p className="text-[#424245] leading-relaxed">
            Data is used exclusively to facilitate connections between architectural service seekers and verified professionals. We utilize anonymized usage patterns to improve our AI-driven recommendation engine and user experience.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. Professional Listings & Rights</h2>
          <p className="text-[#424245] leading-relaxed">
            All listed professionals retain the right to modify, update, or request the removal of their information at any time. We are committed to maintaining 100% accuracy across all professional profiles.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">4. Data Protection</h2>
          <p className="text-[#424245] leading-relaxed">
            We implement standard security measures to protect the integrity of the data stored on our platform. Architectorly does not sell or lease professional data to third-party marketing agencies.
          </p>
        </section>

        <section className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b]">
            Last updated: January 14, 2026. For privacy inquiries, please contact the Architectorly team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
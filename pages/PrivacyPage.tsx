import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    // 1. Dynamic Meta Title
    document.title = "Privacy Policy | Architectorly Pakistan";
    
    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Read the Privacy Policy for Architectorly. We keep your data safe and do not sell your information. Learn more.");

    // 3. SEO Robots
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow'); 

    return () => {
      // Cleanup optional
    };
  }, []);

  return (
    <div className="max-w-[800px] mx-auto px-6 py-32 page-transition">
      <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] mb-12">Privacy Policy.</h1>
      
      <div className="prose prose-lg prose-slate space-y-12 text-[#424245]">
        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">1. Information We Collect</h2>
          <p className="leading-relaxed">
            <strong>Architectorly</strong> collects basic information to help you find architects. This includes the names, phone numbers, and addresses of design firms. Most of this information is already public. We also look at how people use our website to make it run faster.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. How We Use It</h2>
          <p className="leading-relaxed">
            We use data for one reason: to connect homeowners with architects. We do not sell your personal search history or contact details to spam marketing companies. Your privacy is important to us.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. For Architects</h2>
          <p className="leading-relaxed">
            If your firm is listed on Architectorly, you have control over your profile. You can ask us to update your phone number, change your address, or remove your listing at any time. We want our directory to be accurate.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">4. Website Safety</h2>
          <p className="leading-relaxed">
            We use standard security tools to keep our website safe for everyone. We protect our database to ensure that the information remains correct and trustworthy.
          </p>
        </section>

        <section className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b]">
            Last Updated: January 1, 2025.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
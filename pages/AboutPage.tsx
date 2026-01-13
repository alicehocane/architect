
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-[1024px] mx-auto px-6 py-32 page-transition">
      <div className="max-w-[800px]">
        <span className="text-[14px] font-bold text-[#0066cc] uppercase tracking-widest mb-8 block">Our Vision</span>
        <h1 className="text-[48px] sm:text-[80px] font-bold tracking-tight text-[#1d1d1f] mb-12 leading-[1.05]">
          Architecting the future <br /> of a nation.
        </h1>
        
        <div className="space-y-12 text-[21px] sm:text-[24px] text-[#424245] font-light leading-relaxed">
          <p>
            The fundamental idea of Architectorly Pakistan is that great architecture should be easy to find, clear, and recognised. We connect the most creative designers in Pakistan with the people who want to build the future through technology.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-12 border-y border-[#d2d2d7]/50 my-16">
            <div>
              <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-4">Integrity</h3>
              <p className="text-[17px] text-[#86868b]">We only show experts who have real business history and footprints in cities around Pakistan.</p>
            </div>
            <div>
              <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-4">Innovation</h3>
              <p className="text-[17px] text-[#86868b]">Using AI and modern design patterns, we've made a search experience that is as beautiful as the buildings our architects design.</p>
            </div>
          </div>

          <p>
            Our platform gives you the data-driven information you need to make an informed choice, whether you want to build a modern home in DHA, a business complex in Blue Area, or a sustainable industrial site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

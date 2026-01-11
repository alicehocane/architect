
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
            DesignDirectory Pakistan was founded on a simple belief: that architectural excellence should be accessible, transparent, and celebrated. We serve as the digital bridge between Pakistan’s most visionary design minds and the people who want to build the future.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-12 border-y border-[#d2d2d7]/50 my-16">
            <div>
              <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-4">Integrity</h3>
              <p className="text-[17px] text-[#86868b]">We only feature professionals with verified business histories and legitimate footprints across Pakistan’s urban landscapes.</p>
            </div>
            <div>
              <h3 className="text-[28px] font-bold text-[#1d1d1f] mb-4">Innovation</h3>
              <p className="text-[17px] text-[#86868b]">By leveraging AI and modern design patterns, we’ve created a search experience that feels as elegant as the structures our architects design.</p>
            </div>
          </div>

          <p>
            Whether you are planning a modern residence in DHA, a commercial complex in Blue Area, or a sustainable industrial site, our platform provides the data-driven insights you need to make an informed choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

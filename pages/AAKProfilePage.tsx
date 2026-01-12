import React, { useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

interface AAKProfilePageProps {
  onBackClick: () => void;
  onArchitectClick: (architect: any) => void;
}

const AAKProfilePage: React.FC<AAKProfilePageProps> = ({ onBackClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO: Premium Person & Professional Service Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ayyaz Ahmed Karni",
        "jobTitle": "Principal Architect",
        "affiliation": { "@type": "Organization", "name": "AAK Architects" },
        "url": "https://designdirectory.pk/#architects/aak-architects",
        "image": "https://designdirectory.pk/aak-featured.jpg",
        "description": "Elite certified architect in Pakistan with international PhD research from Sapienza Rome.",
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome" },
          { "@type": "CollegeOrUniversity", "name": "Purdue University" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "AAK Architects",
        "description": "High-performance architectural consultancy specializing in luxury residential and urban design.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rawalpindi",
          "addressCountry": "PK"
        }
      }
    ];
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  return (
    <div className="page-transition bg-white min-h-screen pb-32">
      {/* Premium Navigation Header */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-[#f5f5f7] px-6 h-16 flex items-center justify-between">
        <button 
          onClick={onBackClick} 
          className="flex items-center gap-2 text-[#1d1d1f] hover:text-[#0066cc] transition-colors font-medium text-[14px]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Directory
        </button>
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868b]">Portfolio 2024</span>
        <a 
          href="https://api.whatsapp.com/send/?phone=923215201830" 
          className="bg-[#1d1d1f] text-white px-4 py-2 rounded-full text-[12px] font-bold"
        >
          Contact
        </a>
      </nav>

      {/* Hero Section - The Brand Identity */}
      <section className="pt-20 pb-24 px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-3">
             <div className="h-px w-12 bg-[#1d1d1f]"></div>
             <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#1d1d1f]">Design Intelligence</span>
          </div>
          
          <h1 className="text-[52px] sm:text-[100px] lg:text-[130px] font-bold tracking-[-0.05em] leading-[0.9] text-[#1d1d1f]">
            Ayyaz Ahmed <br /> Karni.
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-10">
            <h2 className="text-[24px] sm:text-[36px] font-medium text-[#86868b] max-w-[500px] leading-tight">
              AAK Architects. <br />
              <span className="text-[#1d1d1f]">The Architecture of Research.</span>
            </h2>
            
            <div className="space-y-4 max-w-[400px]">
              <p className="text-[17px] text-[#424245] font-light leading-relaxed">
                Ayyaz Ahmed Karni bridges the gap between global urban science and architectural practice. Currently a PhD researcher at Sapienza Rome and Visiting Scholar at Purdue USA, his work redefines the built environment through engineering-based aesthetics.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-black border-b-2 border-[#0071e3] pb-0.5">PCATP LICENSED A-05898</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Dark Mode Interlude */}
      <section className="bg-[#1d1d1f] py-32 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 100 M0 100 L100 0" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
        
        <div className="max-w-[900px] mx-auto relative z-10 text-center">
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[11px] mb-12 block">The Scientific Method</span>
          <h3 className="text-[32px] sm:text-[56px] text-white font-light leading-tight mb-16 tracking-tight">
            "We don't just design buildings. We calculate <span className="font-bold italic">human experiences</span> within urban systems."
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-white/10 pt-16">
            <div>
              <span className="block text-white font-bold text-[18px] mb-2">Performance</span>
              <p className="text-white/50 text-[14px] leading-relaxed font-light">Every façade is optimized for thermal efficiency and solar geometry.</p>
            </div>
            <div>
              <span className="block text-white font-bold text-[18px] mb-2">Structure</span>
              <p className="text-white/50 text-[14px] leading-relaxed font-light">Integrating advanced engineering logic from day one of concept design.</p>
            </div>
            <div>
              <span className="block text-white font-bold text-[18px] mb-2">Context</span>
              <p className="text-white/50 text-[14px] leading-relaxed font-light">Data-driven urban analysis rooted in Sapienza's research methodology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Folio Typologies - The "Investment" Section */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto">
        <div className="mb-20">
          <h4 className="text-[32px] font-bold tracking-tight mb-4">Core Typologies</h4>
          <p className="text-[19px] text-[#86868b] font-light">Selected sectors of expertise where AAK Architects delivers unparalleled value.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Typology 1 */}
          <div className="group cursor-default">
            <div className="aspect-[16/10] bg-[#f5f5f7] rounded-[2.5rem] mb-8 overflow-hidden flex items-center justify-center border border-[#d2d2d7]/30 transition-all group-hover:border-[#0071e3]/30 group-hover:shadow-2xl group-hover:shadow-blue-500/5">
              <svg className="w-24 h-24 text-[#d2d2d7] group-hover:text-[#0071e3] transition-all duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M3 21h18M3 7v14M21 7v14M2 7h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
              </svg>
            </div>
            <div className="px-4">
              <span className="text-[11px] font-black text-[#0071e3] uppercase tracking-widest block mb-3">Residential</span>
              <h5 className="text-[26px] font-bold text-[#1d1d1f] mb-4">The Performative Villa</h5>
              <p className="text-[16px] text-[#424245] font-light leading-relaxed">
                Bespoke luxury housing that prioritizes thermal comfort and spatial fluidity. We utilize PhD-level spatial modeling to ensure every Marla is maximized for both aesthetic impact and livability.
              </p>
            </div>
          </div>

          {/* Typology 2 */}
          <div className="group cursor-default">
            <div className="aspect-[16/10] bg-[#f5f5f7] rounded-[2.5rem] mb-8 overflow-hidden flex items-center justify-center border border-[#d2d2d7]/30 transition-all group-hover:border-[#0071e3]/30 group-hover:shadow-2xl group-hover:shadow-blue-500/5">
              <svg className="w-24 h-24 text-[#d2d2d7] group-hover:text-[#0071e3] transition-all duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="px-4">
              <span className="text-[11px] font-black text-[#0071e3] uppercase tracking-widest block mb-3">Commercial</span>
              <h5 className="text-[26px] font-bold text-[#1d1d1f] mb-4">Strategic Retail & Office</h5>
              <p className="text-[16px] text-[#424245] font-light leading-relaxed">
                Corporate environments designed to increase productivity and brand value. High-performance façades meet flexible floor plates for a sustainable and profitable investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Academic Journey */}
      <section className="py-32 bg-[#fbfbfd] px-6 border-y border-[#f5f5f7]">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <h4 className="text-[42px] font-bold tracking-tight mb-6 leading-none text-[#1d1d1f]">Global Pedigree.</h4>
            <p className="text-[19px] text-[#86868b] font-light max-w-[600px]">The fusion of Italian design heritage, American engineering methodology, and Pakistani urban reality.</p>
          </div>
          
          <div className="space-y-12">
            {[
              { year: '2023–2026', title: 'PhD Candidate, Engineering Architecture', org: 'Sapienza University of Rome, Italy', detail: 'Focusing on Climate-Responsive Urban Metabolism.' },
              { year: '2023', title: 'Visiting Scholar', org: 'Purdue University, USA', detail: 'Advanced Research in Smart Cities and Civil Systems.' },
              { year: '2020', title: 'MSc Project Management', org: 'Riphah International', detail: 'Specializing in construction lifecycle and efficiency.' }
            ].map((edu, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-16 pb-12 border-b border-[#d2d2d7]/30 last:border-0 group">
                <div className="w-32 text-[14px] font-black text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">{edu.year}</div>
                <div className="flex-1">
                  <h6 className="text-[22px] font-bold mb-2">{edu.title}</h6>
                  <p className="text-[16px] font-medium text-[#1d1d1f] mb-2">{edu.org}</p>
                  <p className="text-[15px] text-[#86868b] font-light">{edu.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Addressing Professional Concerns */}
      <section className="py-32 px-6 max-w-[800px] mx-auto">
        <div className="mb-16">
          <h4 className="text-[32px] font-bold tracking-tight mb-4">Practice FAQ</h4>
          <p className="text-[17px] text-[#86868b] font-light">Essential insights for stakeholders and prospective clients.</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>

      {/* Final CTA - The "Consultancy" approach */}
      <section className="px-6 mb-20">
        <div className="max-w-[1200px] mx-auto p-12 sm:p-24 rounded-[4rem] bg-[#1d1d1f] text-white text-center shadow-3xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-purple-600/20 opacity-40 group-hover:scale-110 transition-transform duration-[3s]"></div>
           <div className="relative z-10">
             <h2 className="text-[44px] sm:text-[84px] font-bold tracking-tight mb-8 leading-[0.95]">Ready for a <br className="sm:hidden" /> Masterpiece?</h2>
             <p className="text-[20px] sm:text-[26px] text-white/70 font-light mb-16 max-w-[700px] mx-auto leading-relaxed">
               Engage with a design team that treats architecture as a precise engineering discipline.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-5">
               <a href="https://api.whatsapp.com/send/?phone=923215201830" className="w-full sm:w-auto px-14 py-6 bg-white text-[#1d1d1f] rounded-[2rem] font-bold hover:bg-[#f5f5f7] transition-all active:scale-95 text-[18px] shadow-lg">
                 Start a Design Review
               </a>
               <button onClick={onBackClick} className="w-full sm:w-auto px-14 py-6 bg-transparent border-2 border-white/20 text-white rounded-[2rem] font-bold hover:bg-white/10 transition-all text-[18px] backdrop-blur-sm">
                 Explore More Firms
               </button>
             </div>
           </div>
        </div>
      </section>

      {/* Mobile Floating Action Dock */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[100]">
        <div className="bg-[#1d1d1f]/90 backdrop-blur-2xl p-2 rounded-[2rem] shadow-2xl flex items-center justify-between border border-white/10">
          <button 
            onClick={onBackClick}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1 text-center">
            <span className="block text-[10px] font-black uppercase tracking-tighter text-white/40">Consultancy</span>
            <span className="text-[14px] font-bold text-white tracking-tight">AAK Architects</span>
          </div>
          <a 
            href="https://api.whatsapp.com/send/?phone=923215201830"
            className="w-12 h-12 rounded-full bg-[#0071e3] flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  { 
    question: "How does the consultancy process begin?", 
    answer: "Our engagement starts with a Contextual Analysis. We evaluate your site's environmental orientation, local urban patterns, and your lifestyle requirements to create a technical project feasibility report." 
  },
  { 
    question: "What makes your design 'Scientific'?", 
    answer: "Unlike typical firms, we use performance simulations to determine wall thicknesses, window placements for natural ventilation, and solar tracking to minimize energy costs. Your building is engineered for a 100-year lifespan." 
  },
  { 
    question: "Do you offer full project execution (Build)?", 
    answer: "We offer turn-key Project Management services. While we focus on design intelligence, our site supervisors ensure that every structural specification from our PhD research is executed with zero compromise on-site." 
  },
  { 
    question: "What technology is used during the design phase?", 
    answer: "We utilize BIM Level 2 (Building Information Modeling). This allows us to provide hyper-accurate bills of quantities and identifies structural clashes before construction begins, saving you up to 15% in potential wastage costs." 
  },
  { 
    question: "Are your services restricted to specific regions?", 
    answer: "We are an internationally networked practice. While our core studio is in Rawalpindi, we currently consult on high-end residential and commercial projects across Lahore, Islamabad, and Karachi via a digitally integrated design workflow." 
  },
  { 
    question: "What are the standard architectural fees?", 
    answer: "Our fees reflect the intensive research and engineering depth we bring to each project. We offer tiered packages: Schematic Design, Detailed Technical Packages, and Executive Project Management. Contact us for a personalized quote." 
  }
];

export default AAKProfilePage;
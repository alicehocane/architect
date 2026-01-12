import React, { useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

interface AAKProfilePageProps {
  onBackClick: () => void;
  onArchitectClick: (architect: any) => void;
}

const AAKProfilePage: React.FC<AAKProfilePageProps> = ({ onBackClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Advanced SEO: Authority & Expert Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ayyaz Ahmed Karni",
      "jobTitle": "Principal Architect & PhD Researcher",
      "description": "Elite certified architect specializing in High-Performance Architecture. PhD Candidate at Sapienza University of Rome and Visiting Scholar at Purdue University, USA.",
      "url": "https://designdirectory.pk/architects/aak-architects",
      "image": "https://designdirectory.pk/aak-featured.jpg",
      "award": "Elite Certified - DesignDirectory Pakistan",
      "knowsAbout": ["High Performance Architecture", "Urban Science", "Climate Responsive Design", "BIM"],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome", "location": "Italy" },
        { "@type": "CollegeOrUniversity", "name": "Purdue University", "location": "USA" }
      ],
      "worksFor": {
        "@type": "ProfessionalService",
        "name": "AAK Architects",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rawalpindi",
          "addressCountry": "PK"
        }
      }
    };
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  return (
    <div className="page-transition bg-white min-h-screen">
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      {/* Floating Header */}
      <nav className="sticky top-0 z-[100] bg-white/70 backdrop-blur-2xl border-b border-[#f5f5f7] px-6 h-16 flex items-center justify-between">
        <button 
          onClick={onBackClick} 
          className="flex items-center gap-2 text-[#1d1d1f] hover:text-[#0066cc] transition-colors font-semibold text-[14px]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span className="hidden sm:inline">Directory Hub</span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1d1d1f]">Portfolio 2024—25</span>
        </div>
        <a 
          href="https://api.whatsapp.com/send/?phone=923215201830" 
          className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-[12px] font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          Inquiry
        </a>
      </nav>

      {/* Hero: Cinematic Branding */}
      <section className="relative pt-20 pb-32 px-6 max-w-[1200px] mx-auto z-10">
        <div className="flex flex-col gap-12">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/50">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0066cc]">Sapienza Rome • Purdue USA</span>
             </div>
             <h1 className="text-[54px] sm:text-[110px] lg:text-[140px] font-bold tracking-[-0.06em] leading-[0.85] text-[#1d1d1f]">
               Ayyaz Ahmed <br /> <span className="text-[#86868b]">Karni.</span>
             </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
               <h2 className="text-[28px] sm:text-[42px] font-medium text-[#1d1d1f] leading-tight mb-8">
                 Architecture as a <span className="italic font-light text-[#86868b]">Calculated Discipline.</span>
               </h2>
               <p className="text-[18px] sm:text-[22px] text-[#424245] font-light leading-relaxed max-w-[600px]">
                 Bridging the gap between international academic research and executive build quality. AAK Architects delivers high-performance environments engineered for the next century.
               </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6">
               <div className="p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-[#d2d2d7]/30">
                 <span className="block text-[11px] font-black uppercase tracking-widest text-[#86868b] mb-4">Registration</span>
                 <p className="text-[20px] font-bold text-[#1d1d1f]">PCATP Licensed A-05898</p>
                 <div className="mt-4 h-1 w-12 bg-[#0071e3]"></div>
               </div>
               <div className="flex items-center gap-4 px-4">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-[#d2d2d7] border-2 border-white"></div>)}
                 </div>
                 <span className="text-[14px] font-medium text-[#86868b]">Consulted by elite residential clients in Lahore & Islamabad.</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Methodology: Scientific Design */}
      <section className="bg-[#1d1d1f] py-32 px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.15]">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="mb-20">
            <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[11px] mb-6 block">The Scientific Method</span>
            <h3 className="text-[36px] sm:text-[64px] text-white font-bold leading-tight tracking-tight">
              Designing for <br /> <span className="text-blue-500">Human Performance.</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-16">
            {[
              { 
                title: 'Thermal Flux', 
                desc: 'Utilizing computational fluid dynamics to calculate natural ventilation paths, reducing HVAC energy costs by up to 35%.',
                icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
              },
              { 
                title: 'Urban Metabolism', 
                desc: 'Applying PhD-level research from Rome to analyze plot-level sustainability within Pakistan’s unique urban heat islands.',
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
              },
              { 
                title: 'BIM Precision', 
                desc: 'Level 2 BIM integration ensures zero-clash structural execution and hyper-accurate material forecasting.',
                icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'
              }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={item.icon}/></svg>
                </div>
                <h4 className="text-[24px] font-bold text-white mb-4">{item.title}</h4>
                <p className="text-white/50 text-[16px] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Folio Grid: Typologies */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>
            <h4 className="text-[42px] font-bold tracking-tight text-[#1d1d1f]">Practice Typologies</h4>
            <p className="text-[19px] text-[#86868b] font-light mt-2">Specialized sectors of architectural investment.</p>
          </div>
          <div className="h-px flex-1 bg-[#f5f5f7] hidden md:block mx-12 mb-6"></div>
          <div className="text-[14px] font-bold text-[#1d1d1f] flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0071e3]"></span>
            Active Commissions 2024
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Typology 1 */}
          <div className="space-y-8 group">
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-[3rem] overflow-hidden relative border border-[#d2d2d7]/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-24 h-24 text-white/20 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                   <path d="M3 21h18M3 7v14M21 7v14M2 7h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
                 </svg>
               </div>
            </div>
            <div className="px-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-md bg-blue-50 text-[#0066cc] text-[10px] font-black uppercase tracking-widest">Luxury Residential</span>
              </div>
              <h5 className="text-[32px] font-bold text-[#1d1d1f] mb-4">The Performative Villa</h5>
              <p className="text-[17px] text-[#424245] font-light leading-relaxed">
                Beyond luxury aesthetics, we focus on spatial logic that maximizes plot yield while maintaining strict environmental comfort standards. Every room is an asset.
              </p>
            </div>
          </div>

          {/* Typology 2 */}
          <div className="space-y-8 group">
            <div className="aspect-[4/3] bg-[#1d1d1f] rounded-[3rem] overflow-hidden relative transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#333_1px,_transparent_1px)] [background-size:20px_20px] opacity-20"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                 </svg>
               </div>
            </div>
            <div className="px-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">Corporate Hubs</span>
              </div>
              <h5 className="text-[32px] font-bold text-[#1d1d1f] mb-4">Strategic Retail & Office</h5>
              <p className="text-[17px] text-[#424245] font-light leading-relaxed">
                Commercial architecture that acts as a business catalyst. We design façades that command attention and interiors that optimize human productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Academic Journey: Authority Section */}
      <section className="py-32 bg-[#fbfbfd] px-6 border-y border-[#f5f5f7]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <h4 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] mb-6">Global Authority.</h4>
            <p className="text-[20px] text-[#86868b] font-light max-w-[700px]">A pedigree spanning the historic studios of Rome to the technological epicenters of the United States.</p>
          </div>
          
          <div className="relative pl-8 sm:pl-0">
            {/* Vertical Line for Timeline */}
            <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-[#d2d2d7]/50 sm:-translate-x-1/2"></div>
            
            <div className="space-y-24">
              {[
                { 
                  year: '2023–2026', 
                  title: 'PhD Candidate', 
                  org: 'Sapienza University of Rome, Italy', 
                  detail: 'Researching Climate-Responsive Urban metabolism and high-performance building skins.',
                  side: 'left'
                },
                { 
                  year: '2023', 
                  title: 'Visiting Scholar', 
                  org: 'Purdue University, USA', 
                  detail: 'Advanced Research in Smart City infrastructure and sustainable civil engineering.',
                  side: 'right'
                },
                { 
                  year: '2018–2020', 
                  title: 'MSc Project Management', 
                  org: 'Riphah International', 
                  detail: 'Mastering the construction lifecycle to ensure project delivery is on-time and on-budget.',
                  side: 'left'
                }
              ].map((edu, i) => (
                <div key={i} className={`relative flex flex-col sm:flex-row items-center gap-12 sm:gap-20 ${edu.side === 'right' ? 'sm:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[-32px] sm:left-1/2 w-4 h-4 rounded-full bg-[#0071e3] border-4 border-white shadow-md sm:-translate-x-1/2 z-20"></div>
                  
                  <div className={`sm:w-1/2 ${edu.side === 'left' ? 'sm:text-right' : 'sm:text-left'}`}>
                    <span className="text-[14px] font-black text-[#0066cc] bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block">{edu.year}</span>
                    <h6 className="text-[26px] font-bold text-[#1d1d1f] mb-2">{edu.title}</h6>
                    <p className="text-[17px] font-medium text-[#1d1d1f] mb-4">{edu.org}</p>
                    <p className="text-[15px] text-[#86868b] font-light leading-relaxed">{edu.detail}</p>
                  </div>
                  <div className="hidden sm:block sm:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: Addressing the Decision Maker */}
      <section className="py-32 px-6 max-w-[850px] mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h4 className="text-[36px] font-bold tracking-tight text-[#1d1d1f] mb-4">Strategic Insights</h4>
          <p className="text-[18px] text-[#86868b] font-light">Addressing technical and commercial concerns for high-tier projects.</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>

      {/* Final CTA: The Visionary Invite */}
      <section className="px-6 mb-24 relative z-10">
        <div className="max-w-[1200px] mx-auto p-12 sm:p-24 rounded-[4.5rem] bg-[#1d1d1f] text-white text-center shadow-3xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/40 via-transparent to-purple-600/30 opacity-60 group-hover:scale-105 transition-transform duration-[4s]"></div>
           <div className="relative z-10">
             <h2 className="text-[48px] sm:text-[90px] font-bold tracking-[-0.04em] mb-10 leading-[0.95]">Ready for a <br className="sm:hidden" /> Masterpiece?</h2>
             <p className="text-[21px] sm:text-[28px] text-white/70 font-light mb-16 max-w-[800px] mx-auto leading-relaxed">
               Engage with a design team that treats architecture as a rigorous engineering discipline. Let's calculate your next success.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
               <a href="https://api.whatsapp.com/send/?phone=923215201830" className="w-full sm:w-auto px-16 py-6 bg-white text-[#1d1d1f] rounded-[2rem] font-bold hover:bg-[#f5f5f7] transition-all active:scale-95 text-[18px] shadow-2xl">
                 Request Project Audit
               </a>
               <button onClick={onBackClick} className="w-full sm:w-auto px-16 py-6 bg-white/10 border border-white/20 text-white rounded-[2rem] font-bold hover:bg-white/20 transition-all text-[18px] backdrop-blur-xl">
                 Explore Directory
               </button>
             </div>
           </div>
        </div>
      </section>

      {/* Mobile Floating Action Dock - Apple Style */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] z-[150]">
        <div className="bg-[#1d1d1f]/95 backdrop-blur-3xl p-3 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex items-center justify-between border border-white/10 ring-1 ring-white/5">
          <button 
            onClick={onBackClick}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1 text-center px-4">
            <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Principal Consultant</span>
            <span className="text-[15px] font-bold text-white tracking-tight">AAK Architects</span>
          </div>
          <a 
            href="https://api.whatsapp.com/send/?phone=923215201830"
            className="w-12 h-12 rounded-full bg-[#0071e3] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
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
    question: "How does your PhD research benefit private clients?", 
    answer: "My research at Sapienza Rome focuses on 'Climate-Responsive Architectures.' For a private client, this translates to a building that is naturally cooler in summer, requires minimal mechanical cooling, and uses materials that age with high aesthetic integrity." 
  },
  { 
    question: "What is your approach to project transparency?", 
    answer: "We utilize advanced Project Management methodologies (MSc level) that provide clients with weekly progress reports, transparent material procurement logs, and BIM-verified technical drawings to prevent on-site wastage." 
  },
  { 
    question: "Do you offer turn-key project delivery?", 
    answer: "Yes. We offer an 'Executive Project Package' where we handle everything from the initial scientific site analysis and PCATP-stamped blueprints to on-site engineering supervision and final material selection." 
  },
  { 
    question: "How do you handle site analysis for high-end projects?", 
    answer: "Every project starts with a Sun-Path and Wind-Tunnel simulation. We determine the exact angle of every window and the thickness of every wall based on environmental data to ensure maximum comfort with zero compromise on luxury." 
  },
  { 
    question: "What is the typical design timeline for a bespoke villa?", 
    answer: "A high-performance villa design package typically takes 8 to 12 weeks. This includes schematic phases, environmental simulations, structural engineering coordination, and detailed interior technical packages." 
  }
];

export default AAKProfilePage;
import React, { useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

interface AAKProfilePageProps {
  onBackClick: () => void;
  onArchitectClick: (architect: any) => void;
}

const AAKProfilePage: React.FC<AAKProfilePageProps> = ({ onBackClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // ADVANCED SEO: Expert Authority & Business Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ayyaz Ahmed Karni",
      "jobTitle": "Principal Architect & PhD Researcher",
      "description": "Founder of AAK Architects. Licensed PCATP architect specializing in high-performance, research-driven architecture. PhD Candidate at Sapienza University of Rome and Visiting Scholar at Purdue University.",
      "url": "https://designdirectory.pk/architects/aak-architects",
      "image": "https://designdirectory.pk/aak-featured.jpg",
      "brand": {
        "@type": "Brand",
        "name": "AAK Architects"
      },
      "award": "Elite Tier Professional - DesignDirectory Pakistan",
      "knowsAbout": ["Sustainable Design", "Agritecture", "Urban Metabolism", "BIM Level 2", "Climate-Responsive Architecture"],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome", "location": "Italy" },
        { "@type": "CollegeOrUniversity", "name": "Purdue University", "location": "USA" },
        { "@type": "CollegeOrUniversity", "name": "Riphah International University" },
        { "@type": "CollegeOrUniversity", "name": "COMSATS University Islamabad" }
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://designdirectory.pk/architects/aak-architects"
      }
    };
    
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer }
      }))
    };

    script.text = JSON.stringify([schema, faqSchema]);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  const whatsappInquiry = "https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20Ayyaz%2C%20I%20saw%20your%20Master%20Folio.%20I'm%20interested%20in%20a%20Scientific%20Design%20Review%20for%20my%20project.";

  return (
    <div className="page-transition bg-white min-h-screen text-[#1d1d1f]">
      {/* 1. SCROLL-STOPPER: COMMAND HEADER */}
      <div className="bg-[#1d1d1f] text-white py-3 px-6 sticky top-0 z-[160] overflow-hidden border-b border-white/5">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Currently Reviewing Q1 2025 Commissions
          </div>
          <div className="hidden lg:flex gap-10 opacity-60">
            <span>Rome Studio Integrated</span>
            <span>PCATP Licensed A-05898</span>
            <span>Purdue Scholar</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION OVERLAY */}
      <nav className="sticky top-[41px] z-[150] bg-white/80 backdrop-blur-3xl border-b border-[#f5f5f7] px-6 h-20 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBackClick} 
          className="group flex items-center gap-3 text-[#1d1d1f] hover:text-[#0066cc] transition-all font-bold text-[13px] uppercase tracking-widest"
        >
          <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          Directory
        </button>
        
        <div className="flex items-center gap-4">
          <a 
            href={whatsappInquiry}
            className="bg-[#0071e3] text-white px-6 sm:px-10 py-3.5 rounded-full text-[13px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-[#0077ed] hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Start Project Audit
          </a>
        </div>
      </nav>

      {/* 3. HERO: ARCHITECTURAL MASTERCLASS */}
      <section className="relative pt-24 pb-32 px-6 max-w-[1200px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
             <div className="inline-flex items-center gap-4 mb-10">
                <div className="h-[2px] w-20 bg-[#0071e3]"></div>
                <span className="text-[12px] font-black uppercase tracking-[0.6em] text-[#0071e3]">Ayyaz Ahmed Karni</span>
             </div>
             <h1 className="text-[60px] sm:text-[110px] lg:text-[140px] font-bold tracking-[-0.07em] leading-[0.82] mb-12">
               Precision <br /> over <span className="text-[#86868b] italic font-light">Ego.</span>
             </h1>
             <div className="max-w-[650px] space-y-10">
                <p className="text-[24px] sm:text-[32px] text-[#424245] font-light leading-snug">
                  Architecture built on **Research, Precision & Trust**. We design future-ready environments for Pakistan's most demanding investors.
                </p>
                <div className="flex flex-wrap gap-12 items-center pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[38px] font-bold tracking-tighter">PhD (c)</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">Sapienza Rome</span>
                  </div>
                  <div className="h-12 w-px bg-[#d2d2d7]"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[38px] font-bold tracking-tighter">Licensed</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">PCATP A-05898</span>
                  </div>
                  <div className="h-12 w-px bg-[#d2d2d7]"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[38px] font-bold tracking-tighter">ROI</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">Asset-First Logic</span>
                  </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-40">
             <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[4rem] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-[#f5f5f7] rounded-[3.5rem] p-12 border border-[#d2d2d7]/50 shadow-3xl">
                   <div className="flex items-center gap-3 mb-10">
                     <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                     <h3 className="text-[16px] font-black uppercase tracking-widest text-[#1d1d1f]">Private Desk</h3>
                   </div>
                   <p className="text-[17px] text-[#424245] leading-relaxed mb-10 font-light italic">
                     "We don't treat architecture as decoration—it is a rigorous, calculated investment decision."
                   </p>
                   <div className="space-y-6 mb-12">
                     {['Sustainable Strategy Audit', 'PhD-Led Technical Review', 'BIM Construction Mapping'].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 text-[14px] font-bold text-[#1d1d1f]">
                         <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0071e3] shadow-sm">
                           <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                         </div>
                         {item}
                       </div>
                     ))}
                   </div>
                   <a 
                     href={whatsappInquiry}
                     className="block w-full text-center bg-[#1d1d1f] text-white py-5 rounded-2xl font-bold text-[18px] hover:bg-black transition-all shadow-xl active:scale-95 group/btn"
                   >
                     Book High-End Consultation
                     <svg className="inline-block ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CLIENTS TRUST US: SCIENTIFIC VALUE */}
      <section className="py-32 bg-[#1d1d1f] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div>
        
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="mb-24">
            <span className="text-blue-400 font-black uppercase tracking-[0.5em] text-[12px] mb-6 block">Design Intelligence</span>
            <h2 className="text-[42px] sm:text-[72px] font-bold tracking-tight mb-8 leading-[1.1]">Protecting your <br /> <span className="text-blue-500">Long-term Investment.</span></h2>
            <p className="text-[20px] sm:text-[24px] text-white/50 font-light max-w-[700px]">
              Every square foot we design is calculated to appreciate in value and minimize running costs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Research-Backed', desc: 'Planning derived from PhD simulations at Sapienza Rome.', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { title: 'Cost-Aware', desc: 'Strategic material mapping to prevent on-site budget leakage.', icon: 'M2 20h20M12 4v16M7 15l5-5 5 5' },
              { title: 'Climate-Responsive', desc: 'Engineered for thermal flux, reducing energy overheads by 35%.', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
              { title: 'Execution Clarity', desc: 'BIM Level 2 ensuring zero-clash structural precision.', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-blue-600 transition-all duration-700">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={feature.icon}/></svg>
                </div>
                <h4 className="text-[22px] font-bold mb-4">{feature.title}</h4>
                <p className="text-white/40 group-hover:text-white/80 text-[15px] leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GLOBAL RESEARCH: THE AGRITECTURE VISION */}
      <section className="py-32 bg-[#fbfbfd] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
              <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[12px] font-black uppercase tracking-widest">Innovation Lab</span>
              <h2 className="text-[44px] sm:text-[64px] font-bold tracking-tight text-[#1d1d1f] leading-[1.05]">Global Research. <br /> <span className="text-[#86868b]">Local Execution.</span></h2>
              <div className="prose prose-xl text-[#424245] font-light max-w-none">
                <p>
                  As a PhD researcher at **Sapienza University of Rome** and Visiting Scholar at **Purdue University**, Ayyaz Ahmed Karni’s work aligns with the UN 2030 Agenda.
                </p>
                <p className="text-[#1d1d1f] font-semibold border-l-4 border-[#0071e3] pl-6 py-2 bg-blue-50/50 rounded-r-2xl">
                  Research Focus: "Fostering Agritecture — A Sustainable Approach to Overcome Housing Shortage and Food Insecurity in Pakistan."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h5 className="text-[18px] font-bold mb-2">Urban Metabolism</h5>
                  <p className="text-[14px] text-[#86868b]">Smarter land utilization and resource-efficient urban modeling.</p>
                </div>
                <div>
                  <h5 className="text-[18px] font-bold mb-2">Climate-Adaptive</h5>
                  <p className="text-[14px] text-[#86868b]">Sustainable material strategies tailored for Pakistan's heat index.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-[500px]">
               <div className="aspect-[4/5] bg-[#1d1d1f] rounded-[4rem] relative overflow-hidden shadow-3xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-black/60 z-10"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-12 z-20">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">International Scholar</span>
                     <h4 className="text-[32px] font-bold text-white mb-6">Purdue University <br /> & Sapienza.</h4>
                     <p className="text-white/60 text-[16px] font-light leading-relaxed mb-8">
                       Translating global research into buildable, high-yield solutions for DHA, Bahria Town, and emerging urban markets.
                     </p>
                     <a href={whatsappInquiry} className="text-white font-bold flex items-center gap-3 hover:gap-5 transition-all">
                       Discuss Research Integration
                       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                     </a>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-12 right-12 w-20 h-20 rounded-full border border-white/20 z-10 flex items-center justify-center backdrop-blur-xl">
                     <svg className="w-8 h-8 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE DELIVERABLES: SERVICE SPECTRUM */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto border-t border-[#f5f5f7]">
        <div className="mb-20">
          <h2 className="text-[44px] sm:text-[64px] font-bold tracking-tight text-[#1d1d1f]">Service Spectrum.</h2>
          <p className="text-[20px] text-[#86868b] font-light mt-4">Design leadership across residential and commercial verticals.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'The Performative Villa', label: 'Residential', desc: 'Bespoke high-end housing prioritizing thermal comfort and spatial fluidity.' },
            { title: 'Sustainable Infrastructure', label: 'Agritecture', desc: 'Integrating urban farming and resource efficiency into modern habitats.' },
            { title: 'Urban Planning', label: 'Master Planning', desc: 'Large-scale residential and commercial development modeling.' },
            { title: 'Technical Audits', label: 'Consultancy', desc: 'Independent review of design quality, cost-efficiency, and structural logic.' },
            { title: 'Executive Project Hub', label: 'Management', desc: 'End-to-end oversight ensuring execution aligns with PhD-level specs.' },
            { title: 'BIM Twin Models', label: 'Technology', desc: 'Digital twins for accurate material forecasting and zero-waste construction.' }
          ].map((service, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white border border-[#d2d2d7]/50 hover:border-[#0071e3] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 group">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0071e3] mb-6 block">{service.label}</span>
              <h4 className="text-[26px] font-bold mb-6 group-hover:text-[#0071e3] transition-colors">{service.title}</h4>
              <p className="text-[16px] text-[#424245] font-light leading-relaxed mb-8">{service.desc}</p>
              <a href={whatsappInquiry} className="text-[14px] font-black text-[#1d1d1f] flex items-center gap-2 group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                Start Review
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CREDENTIALS TIMELINE */}
      <section className="py-32 bg-[#fbfbfd] px-6 border-y border-[#f5f5f7]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[48px] font-bold tracking-tight text-[#1d1d1f]">Professional Pedigree.</h2>
            <p className="text-[19px] text-[#86868b] font-light mt-4">A legacy of continuous research and registration.</p>
          </div>
          
          <div className="space-y-16">
            {[
              { year: '2023 – Ongoing', role: 'PhD Candidate, Engineering-Based Architecture', org: 'Sapienza University of Rome, Italy', detail: 'DICEA Department research on Climate-Responsive urban shortage.' },
              { year: '2023', role: 'Visiting Scholar', org: 'Purdue University, USA', detail: 'Global collaboration on sustainable urban planning best practices.' },
              { year: 'Permanent', role: 'Licensed Architect', org: 'Pakistan Council of Architects & Town Planners (PCATP)', detail: 'Full professional registration ensuring legal accountability for all designs.' },
              { year: '2020', role: 'MSc Project Management', org: 'Riphah International University', detail: 'Mastering the constructability cycle to ensure zero delays and zero waste.' },
              { year: '2018', role: 'Bachelor of Architecture', org: 'COMSATS University Islamabad', detail: 'Foundational studio excellence and honors graduate.' }
            ].map((edu, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-8 sm:gap-20 group">
                <div className="sm:w-48 pt-1">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[12px] font-black tracking-widest uppercase">{edu.year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-[24px] font-bold mb-2 group-hover:text-[#0071e3] transition-colors">{edu.role}</h4>
                  <p className="text-[19px] font-medium text-[#1d1d1f] mb-4">{edu.org}</p>
                  <p className="text-[16px] text-[#86868b] leading-relaxed font-light">{edu.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. STOP THE SCROLL: FINAL CTA */}
      <section className="px-6 py-32">
        <div className="max-w-[1200px] mx-auto p-12 sm:p-28 rounded-[5rem] bg-[#1d1d1f] text-white text-center shadow-3xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/40 via-transparent to-purple-600/30 opacity-60 group-hover:scale-105 transition-transform duration-[6s]"></div>
           <div className="relative z-10">
             <h2 className="text-[54px] sm:text-[100px] font-bold tracking-[-0.06em] mb-12 leading-[0.9]">Ready for a <br className="sm:hidden" /> Masterpiece?</h2>
             <p className="text-[22px] sm:text-[34px] text-white/70 font-light mb-20 max-w-[900px] mx-auto leading-relaxed">
               If you’re looking for an architect who combines design intelligence, research depth, and execution clarity, let’s begin a conversation.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
               <a 
                 href={whatsappInquiry}
                 className="w-full sm:w-auto px-16 py-7 bg-white text-[#1d1d1f] rounded-[2.5rem] font-bold hover:bg-[#f5f5f7] transition-all active:scale-95 text-[20px] shadow-2xl"
               >
                 Request Official Quote
               </a>
               <button 
                 onClick={onBackClick}
                 className="w-full sm:w-auto px-16 py-7 bg-transparent border-2 border-white/20 text-white rounded-[2.5rem] font-bold hover:bg-white/10 transition-all text-[20px] backdrop-blur-md"
               >
                 Return to Directory
               </button>
             </div>
             <p className="mt-16 text-[14px] text-white/30 font-black uppercase tracking-[0.5em]">Licensed PCATP • PhD Researcher • Purdue Scholar</p>
           </div>
        </div>
      </section>

      {/* 9. SEO FAQs */}
      <section className="py-32 px-6 max-w-[850px] mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h4 className="text-[36px] font-bold tracking-tight text-[#1d1d1f] mb-6">Strategic Insights</h4>
          <p className="text-[19px] text-[#86868b] font-light">Crucial information for elite architectural stakeholders and investors.</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>

      {/* MOBILE ACTION DOCK - APPLE STYLE */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[200]">
        <div className="bg-[#1d1d1f]/95 backdrop-blur-3xl p-3 rounded-[3rem] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)] flex items-center justify-between border border-white/10 ring-1 ring-white/5">
          <button 
            onClick={onBackClick}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1 text-center px-4">
            <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-0.5">Principal Hub</span>
            <span className="text-[15px] font-bold text-white tracking-tight leading-none uppercase">AAK Architects</span>
          </div>
          <a 
            href={whatsappInquiry}
            className="w-12 h-12 rounded-full bg-[#0071e3] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  { 
    question: "Who is the founder of AAK Architects?", 
    answer: "AAK Architects is founded by Ayyaz Ahmed Karni, a PCATP-licensed architect, PhD researcher at Sapienza University of Rome, and visiting scholar at Purdue University (USA). His multidisciplinary background ensures projects are technically sound and academically rigorous." 
  },
  { 
    question: "What type of projects does AAK Architects specialize in?", 
    answer: "We specialize in bespoke residential housing, sustainable climate-responsive architecture, urban planning, and large-scale master planning. Our expertise is particularly focused on high-performance environments that offer long-term operational savings." 
  },
  { 
    question: "Is AAK Architects suitable for long-term investment projects?", 
    answer: "Yes. Every project is treated as an asset. By integrating climate-responsive strategies and BIM Level 2 accuracy, we reduce lifecycle costs and increase the market value of your property through superior technical performance." 
  },
  { 
    question: "Does AAK Architects provide project audits or design reviews?", 
    answer: "Yes. We offer independent architectural audits. This involves a rigorous review of design quality, material efficiency, cost-benefit analysis, and structural constructability to ensure your project is built with precision." 
  },
  { 
    question: "Can I get a free estimate?", 
    answer: "Yes. AAK Architects offers a free, no-obligation project estimate. Each estimate is personally reviewed by our lead design team to provide initial clarity on scope, feasibility, and technical requirements." 
  }
];

export default AAKProfilePage;
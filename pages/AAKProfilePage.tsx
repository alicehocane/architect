import React, { useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

interface AAKProfilePageProps {
  onBackClick: () => void;
  onArchitectClick: (architect: any) => void;
}

const AAKProfilePage: React.FC<AAKProfilePageProps> = ({ onBackClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ayyaz Ahmed Karni",
      "jobTitle": "Principal Architect & Sustainable Design Strategist",
      "description": "Founder of AAK Architects. Licensed PCATP architect specializing in high-performance architecture, Agritecture, and sustainable urban planning. PhD Candidate at Sapienza University of Rome and Visiting Scholar at Purdue University.",
      "url": "https://designdirectory.pk/architects/aak-architects",
      "image": "https://designdirectory.pk/aak-featured.jpg",
      "knowsAbout": ["Sustainable Design", "Agritecture", "Urban Metabolism", "BIM Level 2", "Climate-Responsive Architecture"],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome" },
        { "@type": "CollegeOrUniversity", "name": "Purdue University" }
      ]
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
    script.text = JSON.stringify([personSchema, faqSchema]);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  const whatsappInquiry = "https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20Ayyaz%2C%20I%20saw%20your%20Master%20Folio.%20I'm%20looking%20for%20a%20Scientific%20Design%20Review%20for%20my%20upcoming%20project.";

  return (
    <div className="page-transition bg-white min-h-screen text-[#1d1d1f] pb-24 lg:pb-0">
      {/* 1. ELITE STATUS HEADER */}
      <div className="bg-[#1d1d1f] text-white py-2.5 sm:py-3.5 px-6 sticky top-0 z-[160] overflow-hidden border-b border-white/5">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">
          <div className="flex items-center gap-2 sm:gap-3">
             <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></span>
             Q1 2025 Commissions Open
          </div>
          <div className="hidden md:flex gap-6 lg:gap-10 opacity-60">
            <span>Rome Studio Integrated</span>
            <span>PCATP A-05898</span>
            <span>Purdue Scholar</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION OVERLAY */}
      <nav className="sticky top-[38px] sm:top-[45px] z-[150] bg-white/80 backdrop-blur-3xl border-b border-[#f5f5f7] px-6 h-16 sm:h-20 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBackClick} 
          className="group flex items-center gap-2 sm:gap-3 text-[#1d1d1f] hover:text-[#0066cc] transition-all font-bold text-[11px] sm:text-[13px] uppercase tracking-widest"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="hidden xs:inline">Directory</span>
        </button>
        
        <div className="flex items-center gap-4">
          <a 
            href={whatsappInquiry}
            className="bg-[#0071e3] text-white px-5 sm:px-10 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[13px] font-black uppercase tracking-widest shadow-xl hover:bg-[#0077ed] transition-all active:scale-95"
          >
            Project Audit
          </a>
        </div>
      </nav>

      {/* 3. HERO */}
      <section className="relative pt-12 sm:pt-24 pb-16 sm:pb-32 px-6 max-w-[1200px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
             <div className="inline-flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <div className="h-[2px] w-12 sm:w-20 bg-[#0071e3]"></div>
                <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#0071e3]">Ayyaz Ahmed Karni</span>
             </div>
             <h1 className="text-[44px] sm:text-[90px] lg:text-[145px] font-bold tracking-[-0.07em] leading-[0.85] sm:leading-[0.82] mb-8 sm:mb-12">
               Precision <br /> over <span className="text-[#86868b] italic font-light">Ego.</span>
             </h1>
             <div className="max-w-[650px] space-y-6 sm:space-y-10">
                <p className="text-[19px] sm:text-[28px] lg:text-[34px] text-[#424245] font-light leading-snug">
                  Architecture built on **Research, Precision & Trust**. Designing future-ready environments for Pakistan’s most discerning investors.
                </p>
                
                {/* Stats Row - Responsive Grid */}
                <div className="grid grid-cols-2 lg:flex lg:flex-row gap-6 sm:gap-10 lg:gap-12 items-center pt-8 border-t border-[#f5f5f7]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[28px] sm:text-[38px] font-bold tracking-tighter">PhD (c)</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#86868b]">Sapienza Rome</span>
                  </div>
                  <div className="hidden lg:block h-12 w-px bg-[#d2d2d7]"></div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[28px] sm:text-[38px] font-bold tracking-tighter">Licensed</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#86868b]">PCATP Pakistan</span>
                  </div>
                  <div className="hidden lg:block h-12 w-px bg-[#d2d2d7]"></div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[28px] sm:text-[38px] font-bold tracking-tighter">BIM L2</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#86868b]">Construction</span>
                  </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-40 mt-8 lg:mt-0">
             <div className="relative group">
                <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] sm:rounded-[4rem] opacity-5 blur-2xl sm:blur-3xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative bg-[#f5f5f7] rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 border border-[#d2d2d7]/50 shadow-2xl">
                   <div className="flex items-center gap-3 mb-8 sm:mb-10">
                     <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                     <h3 className="text-[14px] sm:text-[16px] font-black uppercase tracking-widest text-[#1d1d1f]">Private Desk</h3>
                   </div>
                   <p className="text-[16px] sm:text-[17px] text-[#424245] leading-relaxed mb-8 sm:mb-10 font-light italic">
                     "We don't treat architecture as decoration—it is a rigorous, calculated investment decision."
                   </p>
                   <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
                     {['Sustainable Strategy Audit', 'PhD-Led Technical Review', 'BIM Construction Mapping'].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 sm:gap-4 text-[13px] sm:text-[14px] font-bold text-[#1d1d1f]">
                         <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center text-[#0071e3] shadow-sm flex-shrink-0">
                           <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                         </div>
                         {item}
                       </div>
                     ))}
                   </div>
                   <a 
                     href={whatsappInquiry}
                     className="block w-full text-center bg-[#1d1d1f] text-white py-4 sm:py-5 rounded-2xl font-bold text-[16px] sm:text-[18px] hover:bg-black transition-all shadow-xl active:scale-95 group/btn"
                   >
                     Book Audit
                     <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. THE TRUST PROTOCOL */}
      <section className="py-16 sm:py-32 bg-[#1d1d1f] text-white overflow-hidden relative rounded-t-[3rem] sm:rounded-t-none">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div>
        
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="mb-12 sm:mb-24 text-center md:text-left">
            <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] sm:text-[12px] mb-4 sm:mb-6 block underline underline-offset-8 decoration-blue-500/50">Design Intelligence</span>
            <h2 className="text-[34px] sm:text-[56px] lg:text-[76px] font-bold tracking-tight mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.05]">Protecting your <br /> <span className="text-blue-500">Long-term Asset.</span></h2>
            <p className="text-[17px] sm:text-[22px] lg:text-[26px] text-white/50 font-light max-w-[700px]">
              Every square foot is engineered to perform. We bridge global PhD research with local construction mastery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: 'Research-Backed', desc: 'Planning derived from PhD simulations at Sapienza Rome & Purdue USA.', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { title: 'Cost-Aware', desc: 'Strategic material mapping to prevent on-site budget leakage.', icon: 'M2 20h20M12 4v16M7 15l5-5 5 5' },
              { title: 'Climate-Ready', desc: 'Engineered for thermal flux, reducing energy overheads by up to 35%.', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
              { title: 'BIM Execution', desc: 'BIM Level 2 ensuring zero-clash structural precision across all trades.', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }
            ].map((feature, i) => (
              <div key={i} className="group p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 border border-white/10 hover:bg-blue-600 transition-all duration-500">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-white group-hover:text-blue-600 transition-all">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={feature.icon}/></svg>
                </div>
                <h4 className="text-[20px] sm:text-[24px] font-bold mb-3 sm:mb-4">{feature.title}</h4>
                <p className="text-white/40 group-hover:text-white/80 text-[14px] sm:text-[16px] leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GLOBAL RESEARCH */}
      <section className="py-16 sm:py-32 bg-[#fbfbfd] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 space-y-8 sm:space-y-12 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] sm:text-[12px] font-black uppercase tracking-widest">Global Laboratory</span>
              <h2 className="text-[34px] sm:text-[52px] lg:text-[68px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] sm:leading-[1.05]">World-Class Research. <br className="hidden sm:block" /> <span className="text-[#86868b]">Local Mastery.</span></h2>
              <div className="text-[17px] sm:text-[21px] text-[#424245] font-light max-w-none space-y-6">
                <p>
                  As a PhD researcher at **Sapienza University of Rome** and Visiting Scholar at **Purdue University**, Ayyaz Ahmed Karni translates international urban science into buildable solutions for Pakistan.
                </p>
                <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-[#d2d2d7]/50 shadow-sm mt-8 sm:mt-10 relative overflow-hidden group/box text-left">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-bl-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover/box:scale-110 transition-transform"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4 italic">Core Publication Focus</span>
                  <h4 className="text-[20px] sm:text-[26px] font-bold text-[#1d1d1f] leading-tight mb-4 sm:mb-6">"Fostering Agritecture: A Sustainable Approach to Overcome Housing Shortage and Food Insecurity in Pakistan."</h4>
                  <p className="text-[14px] sm:text-[16px] text-[#86868b]">Exploring the integration of architecture and edible infrastructure to create resilient, future-proof environments.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-[520px]">
               <div className="aspect-[4/5] bg-[#1d1d1f] rounded-[3rem] sm:rounded-[4.5rem] relative overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-black/80 z-10"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 z-20">
                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 sm:mb-6 block">International Scholar</span>
                     <h4 className="text-[28px] sm:text-[42px] font-bold text-white mb-6 sm:mb-8 leading-tight">Bridging the Global <br className="hidden sm:block" /> Design Divide.</h4>
                     <p className="text-white/60 text-[14px] sm:text-[17px] font-light leading-relaxed mb-8 sm:mb-10">
                       Translating PhD research into buildable, high-yield architectural assets for private clients and developers across Pakistan.
                     </p>
                     <a href={whatsappInquiry} className="text-white font-bold flex items-center gap-4 hover:gap-6 transition-all group/link text-[15px] sm:text-base">
                       Research Integration
                       <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover/link:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                     </a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CREDENTIALS TIMELINE */}
      <section className="py-16 sm:py-32 bg-white px-6 border-t border-[#f5f5f7]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-[#1d1d1f]">Professional Pedigree.</h2>
            <p className="text-[17px] sm:text-[20px] text-[#86868b] font-light mt-4 italic">"True architecture is continuous learning and legal accountability."</p>
          </div>
          
          <div className="space-y-12 sm:space-y-16">
            {[
              { year: '2023 – Ongoing', role: 'PhD Candidate, Engineering Architecture', org: 'Sapienza University of Rome, Italy', detail: 'Advanced research in Sustainable Urban Planning & Metabolism.' },
              { year: '2023', role: 'Visiting Scholar', org: 'Purdue University, USA', detail: 'Collaborative work on resource-efficient design strategies.' },
              { year: 'Permanent', role: 'Licensed Architect', org: 'PCATP Pakistan', detail: 'A-05898: Ensuring full professional accountability for every structure.' },
              { year: '2020', role: 'MSc Project Management', org: 'Riphah International University', detail: 'Mastering the constructability lifecycle to eliminate site waste.' },
              { year: '2018', role: 'Bachelor of Architecture', org: 'COMSATS Islamabad', detail: 'Foundational studio excellence with global design methodology.' }
            ].map((edu, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-24 group">
                <div className="sm:w-48 pt-1">
                  <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 bg-blue-50 text-blue-600 rounded-full text-[11px] sm:text-[13px] font-black tracking-widest uppercase border border-blue-100 shadow-sm">{edu.year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-[20px] sm:text-[26px] font-bold mb-2 group-hover:text-[#0071e3] transition-colors leading-tight">{edu.role}</h4>
                  <p className="text-[16px] sm:text-[19px] font-medium text-[#1d1d1f] mb-3">{edu.org}</p>
                  <p className="text-[14px] sm:text-[17px] text-[#86868b] leading-relaxed font-light">{edu.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-6 py-16 sm:py-32">
        <div className="max-w-[1200px] mx-auto p-10 sm:p-24 lg:p-32 rounded-[3rem] sm:rounded-[5.5rem] bg-[#1d1d1f] text-white text-center shadow-3xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/40 via-transparent to-purple-600/30 opacity-60 group-hover:scale-105 transition-transform duration-[8s]"></div>
           <div className="relative z-10">
             <h2 className="text-[38px] sm:text-[80px] lg:text-[110px] font-bold tracking-[-0.06em] mb-8 sm:mb-12 leading-[1] sm:leading-[0.92]">Build with <br /> <span className="italic font-light text-white/50">Calculated Confidence.</span></h2>
             <p className="text-[18px] sm:text-[28px] lg:text-[34px] text-white/70 font-light mb-12 sm:mb-20 max-w-[900px] mx-auto leading-relaxed">
               Engage with a design lead who treats architecture as a rigorous engineering discipline. Let’s begin your legacy.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
               <a 
                 href={whatsappInquiry}
                 className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-8 bg-white text-[#1d1d1f] rounded-[1.5rem] sm:rounded-[2.5rem] font-bold hover:bg-[#f5f5f7] transition-all active:scale-95 text-[17px] sm:text-[20px] shadow-2xl"
               >
                 Request Quote
               </a>
               <button 
                 onClick={onBackClick}
                 className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-8 bg-transparent border-2 border-white/20 text-white rounded-[1.5rem] sm:rounded-[2.5rem] font-bold hover:bg-white/10 transition-all text-[17px] sm:text-[20px] backdrop-blur-md"
               >
                 Back to Directory
               </button>
             </div>
             <p className="mt-12 sm:mt-16 text-[10px] sm:text-[12px] text-white/30 font-black uppercase tracking-[0.4em] sm:tracking-[0.5em]">Licensed PCATP • PhD (c) Rome • Purdue Scholar</p>
           </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-16 sm:py-32 px-6 max-w-[850px] mx-auto">
        <div className="mb-12 sm:mb-20 text-center">
          <h4 className="text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1d1d1f] mb-4 sm:mb-6">Strategic Insights.</h4>
          <p className="text-[17px] sm:text-[19px] text-[#86868b] font-light italic">"Informed clients make better architectural investments."</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>

      {/* MOBILE ACTION DOCK */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[200]">
        <div className="bg-[#1d1d1f]/95 backdrop-blur-2xl p-2.5 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-white/10">
          <button 
            onClick={onBackClick}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1 text-center px-4">
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Principal Hub</span>
            <span className="text-[13px] font-bold text-white tracking-tight leading-none uppercase">AAK Architects</span>
          </div>
          <a 
            href={whatsappInquiry}
            className="w-10 h-10 rounded-full bg-[#0071e3] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
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
    question: "Who is the founder of AAK Architects?", 
    answer: "AAK Architects is founded by Ayyaz Ahmed Karni, a PCATP-licensed architect, PhD researcher at Sapienza University of Rome, and visiting scholar at Purdue University (USA). His approach focuses on translating global research into buildable, high-performance environments." 
  },
  { 
    question: "What type of projects does AAK Architects specialize in?", 
    answer: "We specialize in high-end residential housing, sustainable urban planning, and research-driven architectural consultancy. Our focus is on projects that require technical precision, climate-responsive strategies, and long-term investment security." 
  },
  { 
    question: "Is AAK Architects suitable for long-term investment projects?", 
    answer: "Absolutely. We treat architecture as a financial decision. By integrating BIM Level 2 and scientific thermal modeling, we reduce operational costs and increase the market valuation of your property through superior technical design." 
  },
  { 
    question: "Does AAK Architects provide project audits?", 
    answer: "Yes. We offer independent architectural audits. This involves a PhD-led review of design integrity, material efficiency, cost-benefit analysis, and structural constructability for projects already in development." 
  },
  { 
    question: "Can I get a free estimate?", 
    answer: "Yes. AAK Architects offers a preliminary free estimate and technical review. This session is designed to give you initial clarity on scope, feasibility, and technical challenges before you commit to a full commission." 
  }
];

export default AAKProfilePage;
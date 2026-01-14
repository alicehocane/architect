import React, { useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

interface AAKProfilePageProps {
  onBackClick: () => void;
  onArchitectClick: (architect: any) => void;
}

const AAKProfilePage: React.FC<AAKProfilePageProps> = ({ onBackClick }) => {

  useEffect(() => {
  document.title = "Ayyaz Ahmed Karni | Principal Architect & Sustainable Design Strategist";
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', "Ayyaz Ahmed Karni's official portfolio. Licensed PCATP architect, PhD student at Sapienza University of Rome, and Purdue Scholar with a focus on Agritecture and high-performance design.");

  // OpenGraph for LinkedIn/WhatsApp Sharing
  const ogTitle = document.createElement('meta');
  ogTitle.setAttribute('property', 'og:title');
  ogTitle.content = "Ayyaz Ahmed Karni | Principal Architect & Sustainable Design Strategist";
  document.head.appendChild(ogTitle);
}, []);




  useEffect(() => {
    window.scrollTo(0, 0);
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ayyaz Ahmed Karni",
      "jobTitle": "Principal Architect & Sustainable Design Strategist",
      "description": "The person who started AAK Architects. A licensed PCATP architect who focusses on high-performance architecture, Agritecture, and building cities in a way that is good for the environment. PhD student at Sapienza University of Rome and a visiting scholar at Purdue University.",
      "url": "https://architectorly.com/architects/aak-architects",
      "image": "https://architectorly.com/aak-featured.png",
      "knowsAbout": ["Sustainable Design", "Agritecture", "Urban Metabolism", "BIM Level 2", "Climate-Responsive Architecture"],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome" },
        { "@type": "CollegeOrUniversity", "name": "Purdue University" },
        { "@type": "CollegeOrUniversity", "name": "Riphah International University" },
        { "@type": "CollegeOrUniversity", "name": "COMSATS University Islamabad" }
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

  const testimonials = [
    { name: "Sikandar Malik", role: "CEO, Private Client", quote: "Ayyaz doesn't just design structures; he also builds things that are valuable. His PhD-backed method for improving thermal efficiency saved us millions of dollars in HVAC costs." },
    { name: "Arshad Khan", role: "Lead Developer, Private Client", quote: "AAK Architects offers a level of BIM accuracy that has never been seen before in Pakistan. There were no problems on site, thus there were no delays throughout execution." },
    { name: "Fatima Jamil", role: "Private Estate Owner", quote: "Complex, simple, and based on a lot of study. A real international studio experience right here in Pakistan. My home works better than I thought it would. Nice Expereince overall." }
  ];


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

             <span className="sr-only">
                Ayyaz Ahmed Karni is a leading architect in Pakistan specializing in 
                scientific design review, BIM Level 2, and sustainable Agritecture.
              </span>
             <h1 className="text-[44px] sm:text-[90px] lg:text-[145px] font-bold tracking-[-0.07em] leading-[0.85] sm:leading-[0.82] mb-8 sm:mb-12">
                {/* Wrap 'Precision' in a semantic tag but keep your current font weight */}
                <strong className="font-bold">Precision</strong> <br /> 
                over <span className="text-[#86868b] italic font-light">Ego.</span>
              </h1>
             <div className="max-w-[650px] space-y-6 sm:space-y-10">
                <p className="text-[19px] sm:text-[28px] lg:text-[34px] text-[#424245] font-light leading-snug">
                  Architecture is based on Research, Precision, and Trust. Creating spaces that are ready for the future for Pakistan's most picky investors.
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
                     "We don't think of architecture as decoration; it's a serious, well-thought-out investment choice."
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


      {/* 5. CLIENT FEEDBACK - THE BOARDROOM */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20 sm:mb-32">
            <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.4em] mb-6 block">The Boardroom</span>
            <h2 className="text-[36px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f]">Client Feedback.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16">
            {testimonials.map((t, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="text-[80px] sm:text-[120px] font-serif text-[#f5f5f7] absolute -top-12 sm:-top-20 z-0 select-none group-hover:text-blue-50 transition-colors">“</div>
                <div className="relative z-10 pt-10">
                  <p className="text-[19px] sm:text-[22px] text-[#424245] font-light leading-relaxed italic mb-10">
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-1px bg-blue-600 mb-6"></div>
                    <h4 className="text-[16px] font-bold text-[#1d1d1f] uppercase tracking-widest">{t.name}</h4>
                    <span className="text-[12px] font-bold text-[#86868b] uppercase tracking-widest mt-1">{t.role}</span>
                  </div>
                </div>
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
              <h2 className="text-[34px] sm:text-[52px] lg:text-[68px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] sm:leading-[1.05]">Intelligence <br className="hidden sm:block" /> <span className="text-[#86868b]">Excellence.</span></h2>
              <div className="text-[17px] sm:text-[21px] text-[#424245] font-light max-w-none space-y-6">
                <p>
                  Ayyaz Ahmed Karni is a PhD researcher at Sapienza University of Rome and a Visiting Scholar at Purdue University. He turns worldwide urban science into solutions that may be built in Pakistan.
                </p>
                <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-[#d2d2d7]/50 shadow-sm mt-8 sm:mt-10 relative overflow-hidden group/box text-left">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-bl-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover/box:scale-110 transition-transform"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4 italic">Core Publication Focus</span>
                  <h4 className="text-[20px] sm:text-[26px] font-bold text-[#1d1d1f] leading-tight mb-4 sm:mb-6">"Agritecture: A Long-Term Solution to Pakistan's Housing Shortage and Food Insecurity."</h4>
                  <p className="text-[14px] sm:text-[16px] text-[#86868b]">Looking into how design and edible infrastructure can work together to make environments that are strong and ready for the future.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-[520px]">
               <div className="aspect-[4/5] bg-[#1d1d1f] rounded-[3rem] sm:rounded-[4.5rem] relative overflow-hidden shadow-2xl group">

                  <img 
                    src="/ayyaz-karni-sapienza-research.jpg"
                    alt="Ayyaz Ahmed Karni conducting PhD research on Sustainable Urban Planning at Sapienza University of Rome" 
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-black/80 z-10"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 z-20">
                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 sm:mb-6 block">International Scholar</span>
                     <h4 className="text-[28px] sm:text-[42px] font-bold text-white mb-6 sm:mb-8 leading-tight">Bridging the Global <br className="hidden sm:block" /> Design Gap.</h4>
                     <p className="text-white/60 text-[14px] sm:text-[17px] font-light leading-relaxed mb-8 sm:mb-10">
                       Turning PhD research into buildable, high-yield architectural assets for private clients and developers all around Pakistan.
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
            <h2 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-[#1d1d1f]">Professional Background.</h2>
            <p className="text-[17px] sm:text-[20px] text-[#86868b] font-light mt-4 italic">"Real architecture is about always learning and being responsible for what you do."</p>
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

      {/* 7. REDESIGNED CTA - MORE COMPACT */}
      <section className="px-6 py-12 sm:py-24">
        <div className="max-w-[1200px] mx-auto p-10 sm:p-16 lg:p-24 rounded-[3.5rem] bg-[#1d1d1f] text-white text-center shadow-3xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/40 via-transparent to-purple-600/30 opacity-60"></div>
           <div className="relative z-10">
             <h2 className="text-[36px] sm:text-[64px] font-bold tracking-tight mb-6 leading-none">Calculated <span className="italic font-light text-white/50">Confidence.</span></h2>
             <p className="text-[17px] sm:text-[22px] text-white/70 font-light mb-10 max-w-[700px] mx-auto leading-relaxed">
               Engage with a design lead who treats architecture as a rigorous engineering discipline. Let's begin your legacy.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
               <a 
                 href={whatsappInquiry}
                 className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-6 bg-white text-[#1d1d1f] rounded-[1.25rem] font-bold hover:bg-[#f5f5f7] transition-all active:scale-95 text-[16px] sm:text-[18px] shadow-2xl"
               >
                 Request Audit
               </a>
               <button 
                 onClick={onBackClick}
                 className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-6 bg-transparent border-2 border-white/20 text-white rounded-[1.25rem] font-bold hover:bg-white/10 transition-all text-[16px] sm:text-[18px] backdrop-blur-md"
               >
                 Back to Directory
               </button>
             </div>
             <p className="mt-10 text-[10px] sm:text-[11px] text-white/30 font-black uppercase tracking-[0.4em] sm:tracking-[0.5em]">Licensed PCATP • PhD (c) Rome • Purdue Scholar</p>
           </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-16 sm:py-32 px-6 max-w-[850px] mx-auto">
        <div className="mb-12 sm:mb-20 text-center">
          <h4 className="text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1d1d1f] mb-4 sm:mb-6">Strategic Insights.</h4>
          <p className="text-[17px] sm:text-[19px] text-[#86868b] font-light italic">"Clients who know more about architecture make better decisions."</p>
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
    answer: "Ayyaz Ahmed Karni, a PCATP-licensed architect, a PhD researcher at Sapienza University of Rome, and a visiting scholar at Purdue University in the US, started AAK Architects. His method is to turn studies from around the world into surroundings that can be built and work well." 
  },
  { 
    question: "What kinds of projects does AAK Architects work on?", 
    answer: "We focus on high-end homes, eco-friendly city planning, and architectural consulting based on research. We focus on projects that need accurate technical work, tactics that work with the climate, and investments that will be safe for a long time." 
  },
  { 
    question: "How does your PhD research benefit private capital investments?", 
    answer: "My research at Sapienza University focuses on 'Urban Metabolism'—optimizing energy and resource flows. We apply these scientific models to reduce electricity overheads by up to 35% through thermal flux mapping and passive climate synthesis." 
  },
  { 
    question: "Is AAK Architects a good choice for long-term investment projects??", 
    answer: "Yes, for sure. We think of architecture as a business choice. By combining BIM Level 2 with scientific thermal modelling, we improve the technical design of your property, which lowers operating costs and raises its market value." 
  },
  { 
    question: "Does AAK Architects provide project audits?", 
    answer: "Yes. We do impartial audits of buildings. This includes an evaluation of design integrity, material efficiency, cost-benefit analysis, and structural constructability for projects that are already in the works by a PhD." 
  },
  { 
    question: "Can I get a free estimate?", 
    answer: "Yes. AAK Architects will give you a free initial estimate and technical review. Before you agree to a full commission, this session is meant to help you understand the scope, practicality, and technical problems that may arise." 
  },
  { 
    question: "Do you handle site execution and construction?", 
    answer: "We offer \"Executive Supervision\". Even though we work with top contractors, our studio is still in charge of the technical side of things on site to make sure that every measurement and material specification is met with no room for error." 
  },
  { 
    question: "What is your approach to luxury in the Pakistani market?", 
    answer: "Technical accuracy leads to luxury. We care more about soundproofing, high-performance thermal envelopes, and flawless spatial logic than we do about pretty decorations. The best luxury is a well-built building." 
  },
  { 
    question: "Can you review plans designed by another architect?", 
    answer: "Yes, we can look over blueprints made by other architects. We are mostly concerned with making sure that everything is technically accurate, lasts a long time, and works well. We give you extensive feedback and suggestions on how to make the design more effective and possible." 
  }
];

export default AAKProfilePage;
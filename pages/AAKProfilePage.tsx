import React, { useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

interface AAKProfilePageProps {
  onBackClick: () => void;
  onArchitectClick: (architect: any) => void;
}

const AAKProfilePage: React.FC<AAKProfilePageProps> = ({ onBackClick }) => {
  useEffect(() => {
    // SEO: Schema.org Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "Organization"],
      "name": "AAK Architects",
      "legalName": "AAK Architects",
      "url": "https://designdirectory.pk/#architects/aak-architects",
      "logo": "https://designdirectory.pk/logo.png",
      "description": "Design-led, research-driven architecture practice specializing in sustainable and context-responsive design solutions.",
      "founder": {
        "@type": "Person",
        "name": "Ayyaz Ahmed Karni",
        "jobTitle": "Principal Architect & Founder",
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome" },
          { "@type": "CollegeOrUniversity", "name": "Purdue University" },
          { "@type": "CollegeOrUniversity", "name": "Riphah International University" },
          { "@type": "CollegeOrUniversity", "name": "COMSATS University Islamabad" }
        ]
      },
      "knowsAbout": ["Sustainable Architecture", "Agritecture", "Urban Planning", "Climate Responsive Design", "Civil Engineering"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rawalpindi",
        "addressCountry": "PK"
      },
      "telephone": "+923215201830"
    };

    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const faqItems = [
    {
      question: "Who is the founder of AAK Architects?",
      answer: "AAK Architects is founded and led by Ayyaz Ahmed Karni, a licensed architect (PCATP), PhD researcher in Engineering-Based Architecture and Urban Planning at Sapienza University of Rome, and visiting scholar at Purdue University, USA."
    },
    {
      question: "What services does AAK Architects provide?",
      answer: "AAK Architects offers comprehensive architectural services including residential and housing design, sustainable and climate-responsive architecture, urban planning, concept design, master planning, and architectural consultancy."
    },
    {
      question: "Is AAK Architects a licensed architecture firm?",
      answer: "Yes. AAK Architects is led by a PCATP-licensed architect, ensuring all architectural services meet professional and regulatory standards."
    },
    {
      question: "Does AAK Architects work on residential projects?",
      answer: "Yes. AAK Architects specializes in residential and housing projects, offering design solutions that are functional, sustainable, and tailored to client needs and site context."
    },
    {
      question: "Does AAK Architects offer sustainable or green architecture?",
      answer: "Absolutely. Sustainability is a core focus of AAK Architects, with expertise in climate-responsive design, efficient land use, resource optimization, and environmentally responsible architecture."
    },
    {
      question: "What makes AAK Architects different from other architecture firms?",
      answer: "AAK Architects combines research-driven design, global academic exposure, and real-world construction expertise, delivering architecture that is innovative, buildable, and future-ready."
    },
    {
      question: "Does AAK Architects work internationally?",
      answer: "Yes. With academic and professional experience across Pakistan, Europe, and the United States, AAK Architects collaborates with both local and international clients."
    },
    {
      question: "Can I request a free project estimate from AAK Architects?",
      answer: "Yes. AAK Architects offers a free, no-obligation project estimate, including an expert-led architectural review to help clients understand scope, feasibility, and next steps."
    },
    {
      question: "How do I start a project with AAK Architects?",
      answer: "You can start by requesting an architectural consultation or free project estimate through the website or WhatsApp to discuss your project requirements directly with the design team."
    },
    {
      question: "Does AAK Architects handle projects from concept to construction?",
      answer: "Yes. AAK Architects supports projects from initial concept design through technical development and construction coordination, ensuring clarity and continuity throughout the process."
    },
    {
      question: "Is AAK Architects involved in research-based or academic projects?",
      answer: "Yes. AAK Architects actively engages in research-driven and academic projects, particularly in areas related to sustainable development, housing, and urban planning."
    },
    {
      question: "Which regions does AAK Architects primarily serve?",
      answer: "AAK Architects primarily serves clients in Pakistan, while also collaborating on international projects depending on scope and requirements."
    }
  ];

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 pb-32 page-transition">
      <button 
        onClick={onBackClick}
        className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to directory
      </button>

      {/* Hero Header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#f5f5f7] text-[#86868b] text-[12px] font-bold uppercase tracking-widest">
                Principal Profile
              </span>
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#ff9500] uppercase tracking-widest">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                Elite Certified
              </div>
            </div>
            <h1 className="text-[56px] sm:text-[80px] font-bold tracking-tight text-[#1d1d1f] leading-[1.02] mb-6">
              Ayyaz Ahmed <br className="hidden sm:block" /> Karni
            </h1>
            <p className="text-[24px] sm:text-[32px] text-[#424245] font-light leading-snug mb-8">
              Founder & Principal Architect – <span className="font-semibold text-[#1d1d1f]">AAK Architects</span>
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[#86868b] text-[16px] font-medium">
              <span className="flex items-center gap-2">Architect</span>
              <span className="text-[#d2d2d7] hidden sm:block">•</span>
              <span className="flex items-center gap-2">Researcher</span>
              <span className="text-[#d2d2d7] hidden sm:block">•</span>
              <span className="flex items-center gap-2 text-[#1d1d1f]">Sustainable Design Strategist</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a 
              href="https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20AAK%20Architects%2C%20I%E2%80%99m%20looking%20for%20architectural%20consultancy%20and%20would%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0071e3] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#0077ed] transition-all text-center shadow-xl shadow-blue-500/10 active:scale-95 flex items-center justify-center gap-3 text-[18px]"
            >
              Consult with Ayyaz
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <p className="text-[#86868b] text-[13px] text-center font-medium">Visiting Scholar at Purdue University (USA)</p>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-20">
          
          {/* Biography */}
          <section>
            <h2 className="text-[14px] font-bold text-[#86868b] uppercase tracking-widest mb-6">Profile Overview</h2>
            <div className="text-[20px] sm:text-[22px] text-[#1d1d1f] leading-relaxed space-y-6 font-light">
              <p>
                Ayyaz Ahmed Karni is the Founder and Principal Architect of AAK Architects, a research-driven architecture and design practice delivering sustainable, context-responsive, and buildable design solutions for residential, urban, and development projects.
              </p>
              <p className="text-[#424245]">
                Currently a visiting scholar at <span className="font-semibold text-[#1d1d1f]">Purdue University (USA)</span> and a PhD researcher at <span className="font-semibold text-[#1d1d1f]">Sapienza University of Rome</span>, Ayyaz integrates high-level engineering logic with architectural aesthetics. His multidisciplinary expertise in architecture, civil engineering, and project management ensures that projects are not only visionary but technically feasible and economically sound.
              </p>
            </div>
          </section>

          {/* Deliverables Section */}
          <section>
            <h2 className="text-[32px] font-bold text-[#1d1d1f] mb-10 tracking-tight">What AAK Architects Delivers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: 'Residential & Housing', desc: 'Crafting living spaces that balance luxury with functional clarity.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { title: 'Sustainable Design', desc: 'Climate-responsive solutions that perform environmentally and socially.', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
                { title: 'Urban Planning', desc: 'Master planning informed by doctoral-level urban research.', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
                { title: 'Consultancy', desc: 'Concept design and master planning for high-stakes developments.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
              ].map((s, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white border border-[#d2d2d7]/50 shadow-sm hover:border-[#0071e3] transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#0066cc] mb-6 group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={s.icon}/></svg>
                  </div>
                  <h4 className="text-[20px] font-bold text-[#1d1d1f] mb-3">{s.title}</h4>
                  <p className="text-[16px] text-[#86868b] leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Research Section */}
          <section className="bg-[#1d1d1f] rounded-[3.5rem] p-10 sm:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px]"></div>
            <div className="relative z-10">
              <h2 className="text-[13px] font-bold text-blue-400 uppercase tracking-widest mb-8">The Research Advantage</h2>
              <h3 className="text-[28px] sm:text-[34px] font-bold leading-tight mb-8">
                Fostering Agritecture: <br className="hidden sm:block" />
                <span className="text-white/60 font-light">Sustainable Urban Models for Pakistan</span>
              </h3>
              <p className="text-[18px] sm:text-[20px] text-white/80 font-light leading-relaxed mb-12">
                Ayyaz's work addresses the United Nations Agenda 2030, exploring how integrated architecture and agriculture can solve housing shortages and preserve arable land in rapidly urbanizing regions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <h4 className="text-[15px] font-bold mb-2">Housing Density</h4>
                  <p className="text-[14px] text-white/50">Solving density issues without sacrificing resource efficiency.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold mb-2">Food Security</h4>
                  <p className="text-[14px] text-white/50">Preserving agricultural land through innovative spatial planning.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Global Perspective */}
          <section>
            <h2 className="text-[32px] font-bold text-[#1d1d1f] mb-8 tracking-tight">Global Perspective, Local Expertise</h2>
            <p className="text-[19px] text-[#424245] font-light leading-relaxed mb-10">
              Having worked across Europe, the USA, and Pakistan, Ayyaz brings a global design perspective adapted to local climatic, cultural, and regulatory contexts. This makes the studio a trusted partner for:
            </p>
            <div className="flex flex-wrap gap-3 mb-20">
              {['Private Clients', 'Developers & Investors', 'NGOs', 'Development Organizations', 'Research Initiatives'].map((item, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/50 text-[15px] font-semibold text-[#1d1d1f]">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-20">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Frequently Asked Questions (FAQs)</h2>
            <FAQAccordion items={faqItems} />
          </section>
        </div>

        {/* Sidebar - Credentials */}
        <aside className="space-y-12">
          <div className="p-8 bg-white rounded-[2.5rem] border border-[#d2d2d7]/60 shadow-sm">
            <h3 className="text-[22px] font-bold text-[#1d1d1f] mb-8 tracking-tight">Professional Path</h3>
            <div className="space-y-10 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#f5f5f7]"></div>
              
              {[
                { date: '2023 – Present', title: 'PhD Candidate', org: 'Sapienza University of Rome, Italy' },
                { date: 'Current', title: 'Visiting Scholar', org: 'Purdue University, USA' },
                { date: '2020', title: 'MSc Project Management', org: 'Riphah International University' },
                { date: '2018', title: 'Bachelor of Architecture', org: 'COMSATS University Islamabad' },
                { date: '2012', title: 'DAE Civil Engineering', org: 'Swedish Institute of Technology' }
              ].map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm ${i === 0 ? 'bg-[#0071e3]' : 'bg-[#d2d2d7]'}`}></div>
                  <span className="block text-[11px] font-bold text-[#86868b] uppercase tracking-wider mb-1">{item.date}</span>
                  <h4 className="text-[16px] font-bold text-[#1d1d1f] leading-tight mb-0.5">{item.title}</h4>
                  <p className="text-[14px] text-[#86868b] font-light leading-tight">{item.org}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-[#f5f5f7] rounded-[2.5rem] border border-black/5">
            <h3 className="text-[20px] font-bold text-[#1d1d1f] mb-6">Certifications</h3>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-black/5">
              <div className="w-12 h-12 rounded-full bg-[#ff9500] flex items-center justify-center text-white text-[11px] font-black shadow-md">PCATP</div>
              <div>
                <h4 className="text-[15px] font-bold leading-tight">Licensed Architect</h4>
                <p className="text-[12px] text-[#86868b] mt-1">Council of Architects & Town Planners</p>
              </div>
            </div>
          </div>

          <div className="p-10 bg-[#0071e3] rounded-[2.5rem] text-white shadow-2xl shadow-blue-500/20">
            <h3 className="text-[26px] font-bold mb-4 tracking-tight leading-tight">Build with intelligence.</h3>
            <p className="text-white/80 font-light text-[17px] leading-relaxed mb-8">
              Bridge the gap between design vision and construction reality with research-informed outcomes.
            </p>
            <a 
              href="https://api.whatsapp.com/send/?phone=923215201830"
              className="block w-full text-center bg-white text-[#0071e3] py-5 rounded-2xl font-bold hover:bg-[#f5f5f7] transition-all active:scale-95 text-[17px]"
            >
              Request Free Estimate
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AAKProfilePage;

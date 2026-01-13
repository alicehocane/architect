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
      "url": "https://architectorly.com/architects/aak-architects",
      "image": "https://architectorly.com/aak-featured.jpg",
      "knowsAbout": ["Sustainable Design", "Agritecture", "Urban Metabolism", "BIM Level 2", "Climate-Responsive Architecture"],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Sapienza University of Rome" },
        { "@type": "CollegeOrUniversity", "name": "Purdue University" }
      ]
    };
    script.text = JSON.stringify(personSchema);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  const whatsappInquiry = "https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20Ayyaz%2C%20I%20saw%20your%20Master%20Folio.%20I'm%20looking%20for%20a%20Scientific%20Design%20Review%20for%20my%20upcoming%20project.";

  const portfolio = [
    { title: "Global Food Horizon HQ", category: "Corporate Campus", location: "Industrial Hub", area: "120,000 Sqft", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" },
    { title: "The Geometric Villa", category: "Modern Residential", location: "DHA Phase VIII", area: "2 Kanal", img: "https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=1000" },
    { title: "Gloria Residency", category: "Mixed-Use Luxury", location: "Urban Core", area: "450,000 Sqft", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000" },
    { title: "The Grand Estate", category: "Transitional Villa", location: "Lahore", area: "4 Kanal", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000" },
    { title: "Bake & Brew Atelier", category: "Boutique Interior", location: "Gulberg", area: "3,500 Sqft", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" },
    { title: "Brick & Louver House", category: "Contemporary Residential", location: "Islamabad", area: "1 Kanal", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" }
  ];

  const testimonials = [
    { name: "Sikandar Malik", role: "CEO, Global Food Horizon", quote: "Ayyaz doesn't just design buildings; he engineers assets. His PhD-backed approach to thermal efficiency saved us millions in long-term HVAC costs." },
    { name: "Arshad Khan", role: "Lead Developer, Gloria Residency", quote: "The level of BIM precision provided by AAK Architects is unprecedented in the Pakistani market. Zero clash on site meant zero delays during execution." },
    { name: "Fatima Jamil", role: "Private Client", quote: "Sophisticated, minimalist, and deeply research-oriented. A truly international studio experience right here in Pakistan. My home performs better than I ever expected." }
  ];

  return (
    <div className="page-transition bg-white min-h-screen text-[#1d1d1f] pb-24 lg:pb-0">
      {/* ELITE STATUS HEADER */}
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
            Request Audit
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-24 pb-16 sm:pb-32 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
             <div className="inline-flex items-center gap-4 mb-10">
                <div className="h-[2px] w-12 sm:w-20 bg-[#0071e3]"></div>
                <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#0071e3]">Ayyaz Ahmed Karni</span>
             </div>
             <h1 className="text-[44px] sm:text-[90px] lg:text-[145px] font-bold tracking-[-0.07em] leading-[0.85] sm:leading-[0.82] mb-8 sm:mb-12">
               Precision <br /> over <span className="text-[#86868b] italic font-light">Ego.</span>
             </h1>
             <div className="max-w-[650px] space-y-6 sm:space-y-10">
                <p className="text-[19px] sm:text-[28px] lg:text-[34px] text-[#424245] font-light leading-snug">
                  Architecture built on **Research, BIM & Logic**. We eliminate the uncertainty of construction through PhD-led design review.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GALLERY */}
      <section className="py-24 sm:py-32 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-8">
            <div>
              <span className="text-[12px] font-black text-[#0066cc] uppercase tracking-[0.4em] mb-4 block">Master Folio</span>
              <h2 className="text-[36px] sm:text-[64px] font-bold tracking-tight text-[#1d1d1f]">Featured Commissions.</h2>
            </div>
            <p className="text-[17px] sm:text-[20px] text-[#86868b] font-light max-w-[400px]">
              A selection of high-yield architectural assets engineered for private and institutional clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {portfolio.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-[#d2d2d7] rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative mb-8 shadow-xl shadow-black/5">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 sm:p-12">
                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">{project.area}</span>
                    <h4 className="text-white text-[24px] font-bold">{project.title}</h4>
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-black text-[#0071e3] uppercase tracking-widest">{project.category}</span>
                    <div className="w-1 h-1 rounded-full bg-[#d2d2d7]"></div>
                    <span className="text-[11px] font-bold text-[#86868b]">{project.location}</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT FEEDBACK */}
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

      {/* CASE STUDY HIGHLIGHT */}
      <section className="py-24 sm:py-48 bg-[#1d1d1f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <span className="text-blue-400 font-black uppercase tracking-[0.5em] text-[11px] mb-8 block">Scientific Integration</span>
                 <h2 className="text-[44px] sm:text-[68px] font-bold tracking-tighter leading-none mb-10">Agritecture: <br /><span className="text-blue-500">The Future of Value.</span></h2>
                 <p className="text-[20px] sm:text-[24px] text-white/60 font-light leading-relaxed mb-12">
                   Translating Ayyaz's PhD research from Rome into practical housing solutions that integrate food security and structural efficiency. We don't just build homes; we build biological life-support systems.
                 </p>
                 <a href={whatsappInquiry} className="inline-flex items-center gap-4 text-white font-bold text-[18px] hover:text-blue-400 transition-colors group">
                    Explore Research Papers
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                 </a>
              </div>
              <div className="aspect-square bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-3xl p-12 flex flex-col justify-center">
                 <div className="space-y-10">
                    {[
                      { l: 'Energy Load Reduction', v: '-35%' },
                      { l: 'Material Waste Elimination', v: '98%' },
                      { l: 'Project Lifecycle Accuracy', v: '100%' }
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-white/10 pb-6">
                         <span className="text-white/40 text-[14px] font-black uppercase tracking-widest">{stat.l}</span>
                         <span className="text-[44px] font-bold text-blue-500 tracking-tighter leading-none">{stat.v}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-6 py-24 sm:py-48">
        <div className="max-w-[1200px] mx-auto p-12 sm:p-32 rounded-[3.5rem] sm:rounded-[6rem] bg-[#f5f5f7] text-center shadow-3xl overflow-hidden relative group">
           <div className="relative z-10">
             <h2 className="text-[42px] sm:text-[90px] font-bold tracking-[-0.06em] mb-10 sm:mb-16 leading-[0.92]">Secure your <br /> <span className="italic font-light text-[#86868b]">Design Integrity.</span></h2>
             <p className="text-[18px] sm:text-[28px] text-[#424245] font-light mb-16 sm:mb-24 max-w-[800px] mx-auto">
               Architecture is a massive financial commitment. Do not leave it to chance. Book a technical audit with a PhD-led studio today.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
               <a 
                 href={whatsappInquiry}
                 className="w-full sm:w-auto px-12 sm:px-20 py-6 sm:py-8 bg-[#1d1d1f] text-white rounded-[1.5rem] sm:rounded-[2.5rem] font-bold hover:bg-black transition-all active:scale-95 text-[18px] sm:text-[21px] shadow-2xl"
               >
                 Inquire Private Desk
               </a>
             </div>
           </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 sm:py-32 px-6 max-w-[850px] mx-auto">
        <div className="mb-20 text-center">
          <h4 className="text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1d1d1f] mb-6">Strategic Insights.</h4>
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
  { question: "How does your PhD research benefit my residential project?", answer: "My research at Sapienza University focuses on 'Urban Metabolism'—analyzing how energy, water, and food flow through buildings. We apply these scientific models to your home to reduce electricity bills by up to 35% through passive cooling and smart material selection." },
  { question: "What is BIM Level 2 and why is it mandatory for your studio?", answer: "Building Information Modeling (BIM) Level 2 creates a 100% accurate digital twin of your building before ground is even broken. This allows us to detect structural 'clashes' with plumbing or electrical lines in the virtual world, preventing expensive re-work and delays on site." },
  { question: "Can you review plans designed by another architect?", answer: "Yes. We offer 'Scientific Design Reviews' as an independent consultancy. We audit your existing blueprints for structural efficiency, sunlight optimization, and constructability, often finding ways to save 10-15% on total material costs." },
  { question: "What is your approach to modern luxury in Pakistan?", answer: "Luxury is not about expensive marble; it is about thermal comfort, acoustic privacy, and seamless spatial flow. We prioritize high-performance windows, refined louver systems for privacy, and layouts that evolve with your family's needs over decades." },
  { question: "Do you handle construction as well?", answer: "We provide 'Executive Supervision.' While we partner with top-tier contractors, our studio remains the technical lead on-site to ensure that every measurement and material specification is executed with zero compromise." }
];

export default AAKProfilePage;
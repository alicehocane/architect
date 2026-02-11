import React from 'react';
import Link from 'next/link';
import { CITIES, ALL_ARCHITECTS } from '../data';
import ArchitectList from '../components/ArchitectList';
import FAQAccordion from '../components/FAQAccordion';

export const metadata = {
  title: "Architectorly | Find the Best Architects in Pakistan",
  description: "Looking for top architects in Pakistan? Architectorly helps you find verified home designers, map makers, and construction firms in Lahore, Karachi, and Islamabad.",
};

const homeFaqs = [
  {
    question: "Is Architectorly free to use?",
    answer: "Yes, Architectorly is 100% free for homeowners. You can search for architects, view their profiles, and get their phone numbers without paying anything."
  },
  {
    question: "Are the architects on this list verified?",
    answer: "We try our best to verify every firm. We check their office address and phone numbers. Many of our top-rated architects are also registered with PCATP."
  },
  {
    question: "Can I find map makers and engineers here?",
    answer: "Yes. Our directory includes architects, structural engineers, interior designers, and map makers. You can find help for any part of your building project."
  },
  {
    question: "Do you cover all cities in Pakistan?",
    answer: "We cover major cities like Lahore, Karachi, Islamabad, and Rawalpindi. We are also adding more firms from smaller cities like Gujrat, Sahiwal, and Jhelum every day."
  }
];

export default function HomePage() {
  const displayedCities = CITIES.slice(0, 6);
  
  // Logic to put recommended architect at top
  const sortedArchitects = [...ALL_ARCHITECTS].sort((a, b) => {
    const ratingA = a.globalRating || 0;
    const ratingB = b.globalRating || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return (b.totalReviews || 0) - (a.totalReviews || 0);
  });

  const aakIndex = sortedArchitects.findIndex(a => a.slug === 'aak-architects');
  if (aakIndex > -1) {
    const [aak] = sortedArchitects.splice(aakIndex, 1);
    sortedArchitects.unshift(aak);
  }

  // Pass full list to ArchitectList component which handles pagination on client side
  // but we render initial list on server for SEO
  const initialArchitects = sortedArchitects; 

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 text-center overflow-hidden">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-[52px] sm:text-[88px] font-bold tracking-[-0.035em] leading-[1.02] text-[#1d1d1f] mb-8">
            Build your dream <br className="hidden sm:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] to-[#5e5ce6]">with Architectorly.</span>
          </h1>
          <p className="text-[20px] sm:text-[26px] text-[#86868b] font-light leading-snug mb-14 max-w-[620px] mx-auto">
            Connect with the best architects in Pakistan. Simple, fast, and free.
          </p>
          
          <div className="relative max-w-[660px] mx-auto group">
            <Link href="/cities" className="block w-full h-[72px] bg-white rounded-[28px] border border-[#d2d2d7]/50 shadow-[0_15px_45px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center px-8 text-[21px] text-[#86868b] transition-all">
              <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Search by city, firm, or category...
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="max-w-[1024px] mx-auto px-6 mb-32">
        <div className="mb-10">
          <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f]">Popular Cities</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCities.map((city) => (
            <Link 
              key={city.slug}
              href={`/city/${city.slug}`}
              className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h4c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18"/><path d="M6 18h12"/><path d="M12 18v4"/><path d="M18 22V7c0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6h-4c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4v15"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M15 10h1"/><path d="M15 14h1"/><path d="M15 18h1"/></svg>
                  </div>
                  <span className="text-[13px] font-bold text-[#0066cc] bg-blue-50 px-3 py-1 rounded-full">{city.count} Firms</span>
                </div>
                <h3 className="text-[26px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{city.name}</h3>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[14px] font-medium text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">
                View Professionals
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Partner */}
      <section className="max-w-[1024px] mx-auto px-6 mb-32">
        <div className="relative bg-[#1d1d1f] rounded-[3.5rem] overflow-hidden p-10 sm:p-20 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] -ml-32 -mb-32"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <span className="px-4 py-1 rounded-full bg-white/10 text-white/60 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
                  Featured Partner
                </span>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
              <h2 className="text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-white mb-8">
                Let’s Build Something <br className="hidden sm:block" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Meaningful.</span>
              </h2>
              <p className="text-[20px] sm:text-[22px] text-white/70 font-light leading-relaxed mb-12 max-w-[620px]">
                If you’re looking for an architect who combines design intelligence, research depth, and execution clarity, 
                <span className="text-white font-semibold"> AAK Architects</span> is ready to collaborate.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link 
                  href="/architects/aak-architects"
                  className="w-full sm:w-auto px-10 py-5 bg-white text-[#1d1d1f] rounded-2xl font-bold text-[18px] hover:bg-[#f5f5f7] transition-all active:scale-95 shadow-xl shadow-white/5 text-center"
                >
                  View Practice Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Section - Use Client Component for Pagination */}
      <section className="max-w-[1024px] mx-auto px-6 mb-32">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[34px] font-bold tracking-tight text-[#1d1d1f]">
            Professional Directory
          </h2>
        </div>
        
        <ArchitectList architects={initialArchitects} />
      </section>

      {/* FAQ Section */}
      <section className="max-w-[800px] mx-auto px-6 mb-32">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] mb-10 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={homeFaqs} />
      </section>
    </div>
  );
}
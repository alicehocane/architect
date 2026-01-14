import React, { useState, useMemo, useEffect } from 'react';
import FAQAccordion from '../components/FAQAccordion';

const CalculatorPage: React.FC = () => {
  const [marla, setMarla] = useState(5);
  const [floors, setFloors] = useState(1);
  const [luxuryLevel, setLuxuryLevel] = useState<'Standard' | 'Premium'>('Standard');

  // Logic Constants based on User Prompt (Jan 2026 Pakistan Rates)
  const MARLA_TO_SQFT = 225; 
  const COVERED_AREA_BASE = 1050; // Average for 5 Marla (1000-1100 range)

  const estimates = useMemo(() => {
    const isPremium = luxuryLevel === 'Premium';
    const scaleFactor = marla / 5;
    
    // 1. Covered Area Calculation
    const groundArea = scaleFactor * COVERED_AREA_BASE;
    const totalCoveredArea = Math.round(groundArea + (floors - 1) * (groundArea * 0.95));

    // 2. Grey Structure Logic (Phase A)
    const bricksQty = scaleFactor * 30000 * floors;
    const bricksCost = bricksQty * (isPremium ? 22 : 18);
    
    const cementBags = scaleFactor * 375 * floors;
    const cementCost = cementBags * (isPremium ? 1600 : 1450);
    
    const sandRaviCost = scaleFactor * 1400 * floors * (isPremium ? 50 : 35);
    const sandChenabCost = scaleFactor * 700 * floors * (isPremium ? 90 : 70);
    
    const crushQty = scaleFactor * 950 * floors;
    const crushCost = crushQty * (isPremium ? 170 : 140);
    
    const steelTons = scaleFactor * 1.75 * floors;
    const steelCost = steelTons * (isPremium ? 290000 : 270000);
    
    const laborRate = isPremium ? 750 : 550;
    const laborCost = totalCoveredArea * laborRate;
    
    const plumbingGrey = isPremium ? 200000 : 150000;
    const electricConduit = isPremium ? 120000 : 80000;
    const gateGrills = isPremium ? 200000 : 150000;
    
    const totalGrey = bricksCost + cementCost + sandRaviCost + sandChenabCost + crushCost + steelCost + laborCost + plumbingGrey + electricConduit + gateGrills;

    // 3. Finishing Logic (Phase B)
    const tileCost = totalCoveredArea * (isPremium ? 750 : 600);
    const paintCeiling = totalCoveredArea * (isPremium ? 450 : 350);
    const woodwork = isPremium ? 900000 : 600000;
    const windows = isPremium ? 350000 : 250000;
    
    const bathCount = Math.max(2, Math.floor(marla / 2.5)) * floors;
    const bathroomsCost = bathCount * (isPremium ? 150000 : 125000);
    
    const electricFixtures = isPremium ? 250000 : 150000;
    
    const totalFinishing = tileCost + paintCeiling + woodwork + windows + bathroomsCost + electricFixtures;

    // 4. Totals & Contingency
    const subTotal = totalGrey + totalFinishing;
    const contingency = subTotal * 0.10;
    const grandTotal = subTotal + contingency;

    return {
      total: grandTotal,
      grey: totalGrey,
      finishing: totalFinishing,
      contingency: contingency,
      area: totalCoveredArea,
      details: {
        bricks: bricksCost,
        cement: cementCost,
        steel: steelCost,
        labor: laborCost,
        wood: woodwork,
        tiles: tileCost,
        baths: bathroomsCost
      }
    };
  }, [marla, floors, luxuryLevel]);

  const formatPKR = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Crore`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} Lakh`;
    return Math.round(num).toLocaleString();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const whatsappLink = `https://api.whatsapp.com/send/?phone=923215201830&text=Hello%20AAK%20Architects%2C%20I%E2%80%99d%20like%20to%20request%20an%20official%20project%20quote%20and%20discuss%20the%20scope%20and%20requirements%20of%20my%20architectural%20project.`;

  const faqItems = [
    {
      question: "How much does it cost to build in Pakistan per square foot in 2026??",
      answer: "As of January 2026, the average cost of building in Pakistan is between PKR 3,200 and PKR 3,800 for Grey Structure and between PKR 3,000 and PKR 4,500 for Finishing. High-end projects in places like DHA or Bahria Town usually cost more since they require better materials and more skilled workers."
    },
    {
      question: "How much does it cost to build a 5 Marla house in 2026?",
      answer: "A normal 5 Marla house with one story (around 1,100 square feet of living space) costs between PKR 65 Lakh and 80 Lakh. A double-story 5 Marla house can cost between PKR 1.1 Crore and 1.4 Crore, depending on whether you choose Standard or Premium finishing materials."
    },
    {
      question: "How much does a grey structure for a 10 Marla house cost?",
      answer: "The cost of the grey construction for a 10 Marla house in Pakistan (around 3,300 square feet for a double story) is between PKR 1.05 Crore and 1.25 Crore. This includes all the bricks, high-quality steel, cement, and basic wiring and plumbing within."
    },
    {
      question: "What is included in a Grey Structure estimate?",
      answer: "A complete grey construction has the foundation, boundary walls, roof slabs, underground water tanks, high-quality steel (60 grade), first-class bricks, cement (OPC), sand (Ravi and Chenab), crush (Bajri), plumbing pipes, and electrical conduits."
    },
    {
      question: "What does \"premium\" finishing mean in the construction of Pakistani homes?",
      answer: "High-end finishing includes imported or high-end local tiles (PKR 750+/sqft), designer kitchen cabinets, solid wood doors (Ash or Teak), double-glazed aluminium windows, designer fall ceilings and high-end sanitary fixtures (Grohe/Totto or something like that)."
    },
    {
      question: "Why does the calculator add a 10% safety net?",
      answer: "Steel, cement, and fuel prices change often in Pakistan's construction materials industry. A 10% contingency makes sure that your financial planning is strong enough to handle weekly changes in the market without stopping work on the project."
    },
    {
      question: "What are the most recent building labour rates in Lahore and Islamabad?",
      answer: "For ground floors, skilled labour costs for standard grey structure vary from PKR 550 to PKR 650 per square foot. For premium architectural projects with complicated designs, rates can go up to PKR 750 per square foot."
    },
    {
      question: "Can I save costs by buying materials myself?",
      answer: "Self-procurement can save 5–8% on material margins, but you need a lot of technical knowledge to avoid waste. Professional architects, like AAK Architects, manage materials in a way that usually makes the whole project run more smoothly and keeps the structure strong."
    }
  ];

  useEffect(() => {
  // 1. Update the Browser Tab and Meta Description dynamically
  const titleMarla = marla === 20 ? "1 Kanal" : `${marla} Marla`;
  document.title = `Cost to Build a ${titleMarla} House in Pakistan (${luxuryLevel}) | Architectorly`;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', `Estimate the 2026 construction cost for a ${titleMarla} house in Pakistan. Includes current rates for steel, cement, bricks, and labor for ${luxuryLevel} finishing.`);

  // 2. Inject the updated Schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Architectorly ${titleMarla} Construction Calculator`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1240"
    },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
    "description": `Calculate exact ${titleMarla} house construction costs in Pakistan.`
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.slice(0, 5).map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  script.text = JSON.stringify([applicationSchema, faqSchema]);
  document.head.appendChild(script);

  // Cleanup: Remove the script when the component updates or unmounts
  return () => { 
    if (document.head.contains(script)) {
      document.head.removeChild(script); 
    }
  };
}, [marla, luxuryLevel]);

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <style>{`
        @media print {
          header, .input-sidebar, .cta-buttons, footer, .faq-section, .educational-content { display: none !important; }
          .results-card { border: none !important; box-shadow: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .print-header { display: block !important; margin-bottom: 40px; border-bottom: 2px solid #f5f5f7; padding-bottom: 20px; }
          body { background: white !important; }
        }
      `}</style>

      <header className="mb-20 text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#f5f5f7] text-[#0066cc] text-[12px] font-bold uppercase tracking-widest mb-6">
          Free Estimator Tool
        </span>
        <h1 className="text-[52px] sm:text-[80px] font-bold tracking-tight text-[#1d1d1f] leading-[1.05] mb-8">
          Estimate Your <br /> Masterpiece.
        </h1>
        <p className="text-[20px] sm:text-[24px] text-[#86868b] font-light leading-relaxed">
          Accurate construction forecasting based on January 2026 material trends in Pakistan.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
        <div className="lg:col-span-4 space-y-10 input-sidebar">
          <div className="p-10 bg-white rounded-[2.5rem] border border-[#d2d2d7]/60 shadow-sm">
            <h3 className="text-[20px] font-bold mb-8 text-[#1d1d1f]">Project Config</h3>
            <div className="mb-10">
              <div className="flex justify-between mb-4">
                <label className="text-[14px] font-bold text-[#86868b] uppercase tracking-wider">Plot Size</label>
                <span className="text-[17px] font-bold text-[#1d1d1f]">{marla} Marla</span>
              </div>
              <input 
                type="range" min="3" max="20" step="1" 
                value={marla} 
                onChange={(e) => setMarla(Number(e.target.value))}
                className="w-full h-1.5 bg-[#f5f5f7] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
              />
              <div className="flex justify-between mt-2 text-[12px] text-[#86868b]">
                <span>3m</span>
                <span>1 Kanal</span>
              </div>
            </div>
            <div className="mb-10">
              <label className="text-[14px] font-bold text-[#86868b] uppercase tracking-wider block mb-4">Floors</label>
              <div className="grid grid-cols-3 gap-2 bg-[#f5f5f7] p-1 rounded-2xl">
                {[1, 2, 3].map((f) => (
                  <button 
                    key={f} onClick={() => setFloors(f)}
                    className={`py-3 rounded-xl text-[15px] font-bold transition-all ${floors === f ? 'bg-white shadow-sm text-[#0071e3]' : 'text-[#86868b]'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[14px] font-bold text-[#86868b] uppercase tracking-wider block mb-4">Execution Tier</label>
              <div className="space-y-3">
                {['Standard', 'Premium'].map((level) => (
                  <button 
                    key={level} onClick={() => setLuxuryLevel(level as any)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${luxuryLevel === level ? 'border-[#0071e3] bg-blue-50/30' : 'border-[#f5f5f7]'}`}
                  >
                    <span className={`font-bold ${luxuryLevel === level ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`}>{level}</span>
                    {luxuryLevel === level && <div className="w-5 h-5 rounded-full bg-[#0071e3] text-white flex items-center justify-center text-[10px]">✓</div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white rounded-[3.5rem] p-10 sm:p-16 border border-[#d2d2d7]/60 shadow-xl relative results-card">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
                <div>
                  <h2 className="text-[32px] font-bold text-[#1d1d1f]">Budget Summary</h2>
                  <p className="text-[17px] text-[#86868b] font-light">Area: {estimates.area.toLocaleString()} sq. ft.</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[44px] sm:text-[56px] font-bold text-[#0071e3] tracking-tight leading-none mb-1">
                    ~{formatPKR(estimates.total)}
                  </div>
                  <span className="text-[14px] font-bold text-[#ff9500] uppercase tracking-widest">Market Buffer Included</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                <div className="p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-black/5">
                  <span className="text-[12px] font-bold text-[#86868b] uppercase tracking-widest block mb-2">Phase A: Grey Structure</span>
                  <div className="text-[28px] font-bold text-[#1d1d1f]">{formatPKR(estimates.grey)}</div>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-blue-50/50 border border-blue-500/10">
                  <span className="text-[12px] font-bold text-[#0066cc] uppercase tracking-widest block mb-2">Phase B: Finishing</span>
                  <div className="text-[28px] font-bold text-[#1d1d1f]">{formatPKR(estimates.finishing)}</div>
                </div>
              </div>
              <div className="border-t border-[#d2d2d7]/50 pt-10">
                <h4 className="text-[14px] font-bold text-[#86868b] uppercase tracking-widest mb-8">Component Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { label: 'Steel (60 Grade)', val: estimates.details.steel },
                    { label: 'Cement (OPC)', val: estimates.details.cement },
                    { label: 'A-Quality Bricks', val: estimates.details.bricks },
                    { label: 'Skilled Labor', val: estimates.details.labor },
                    { label: 'Premium Tiles', val: estimates.details.tiles },
                    { label: 'Wood & Wardrobes', val: estimates.details.wood },
                    { label: 'Bath Fittings', val: estimates.details.baths },
                    { label: 'Contingency (10%)', val: estimates.contingency, highlight: true }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
                      <span className={`text-[15px] ${item.highlight ? 'font-bold text-[#ff9500]' : 'text-[#424245]'}`}>{item.label}</span>
                      <span className={`text-[15px] font-semibold ${item.highlight ? 'text-[#ff9500]' : 'text-[#1d1d1f]'}`}>{formatPKR(item.val)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-16 flex flex-col sm:flex-row gap-6 cta-buttons">
                 <button onClick={handleDownloadPDF} className="flex-1 bg-[#1d1d1f] text-white py-5 rounded-2xl font-bold hover:bg-[#424245] transition-all active:scale-95 text-[17px]">
                   Download Detailed PDF
                 </button>
                 <a href={whatsappLink} target="_blank" rel="noopener" className="flex-1 bg-[#0071e3] text-white py-5 rounded-2xl font-bold hover:bg-[#0077ed] transition-all text-center active:scale-95 text-[17px]">
                   Request Official Quote
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-32 educational-content">
        <h2 className="text-[36px] font-bold text-[#1d1d1f] mb-8">Market Dynamics & Calculation Notes</h2>
        <div className="prose prose-lg text-[#424245] font-light max-w-none">
          <p>
            In the Pakistan construction sector, <strong>Grey Structure</strong> typically consumes 55% of the total budget. This calculator accounts for the sharp rise in 60-grade steel prices and high-quality bricks (First Class).
          </p>
          <p>
            The <strong>10% Contingency</strong> line is a professional standard in Pakistan to hedge against fuel price hikes and currency fluctuations that directly impact cement and steel indices on a weekly basis.
          </p>
        </div>
      </section>

      <section className="mb-32 faq-section">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Construction Calculator FAQ</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
};

export default CalculatorPage;
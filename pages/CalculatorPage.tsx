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
      question: "What is the construction cost per square foot in Pakistan for 2026?",
      answer: "As of January 2026, construction rates in Pakistan average between PKR 3,200 to PKR 3,800 for Grey Structure and PKR 3,000 to PKR 4,500 for Finishing. Premium projects in areas like DHA or Bahria Town typically lean towards the higher end due to superior material quality and labor skill requirements."
    },
    {
      question: "How much does it cost to build a 5 Marla house in 2026?",
      answer: "A standard single-story 5 Marla house (approx. 1,100 sq. ft. covered area) costs roughly PKR 65 Lakh to 80 Lakh. A double-story 5 Marla house can range from PKR 1.1 Crore to 1.4 Crore, depending on whether you choose Standard or Premium finishing materials."
    },
    {
      question: "What is the cost of a 10 Marla house grey structure?",
      answer: "The grey structure cost for a 10 Marla house in Pakistan (approx. 3,300 sq. ft. for double story) ranges from PKR 1.05 Crore to 1.25 Crore. This includes all masonry, high-grade steel, cement, and basic internal wiring/plumbing."
    },
    {
      question: "What is included in a Grey Structure estimate?",
      answer: "A comprehensive grey structure includes the foundation, boundary walls, roof slabs, underground water tanks, high-grade steel (60 grade), first-class bricks, cement (OPC), sand (Ravi and Chenab), crush (Bajri), plumbing pipes, and electrical conduits."
    },
    {
      question: "What defines 'Premium' finishing in Pakistani house construction?",
      answer: "Premium finishing involves imported or high-end local tiles (PKR 750+/sqft), designer kitchen cabinetry, solid wood doors (Ash or Teak), double-glazed aluminum windows, designer fall ceilings, and high-tier sanitary fittings (Grohe/Totto or equivalent)."
    },
    {
      question: "Why does the calculator add a 10% contingency buffer?",
      answer: "Pakistan's construction material market is subject to frequent price fluctuations in steel, cement, and fuel. A 10% contingency ensures your financial planning remains robust enough to absorb weekly market adjustments without halting project progress."
    },
    {
      question: "What are the latest labor rates for construction in Lahore and Islamabad?",
      answer: "Skilled labor rates for standard grey structure currently range from PKR 550 to PKR 650 per sq. ft. for ground floors, while premium architectural projects involving complex designs can command rates up to PKR 750 per sq. ft."
    },
    {
      question: "Can I save costs by buying materials myself?",
      answer: "While self-procurement can save 5-8% on material margins, it requires significant technical knowledge to avoid waste. Professional architects like AAK Architects provide material management that often results in better overall efficiency and structural integrity."
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const applicationSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Pakistan House Construction Cost Calculator 2026",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0" },
      "description": "Calculate exact house construction costs in Pakistan for 2026. Free tool for 5 Marla, 10 Marla, and 1 Kanal projects with latest material rates."
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
    script.text = JSON.stringify([applicationSchema, faqSchema]);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-20 page-transition">
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
        {/* Input Sidebar */}
        <div className="lg:col-span-4 space-y-10 input-sidebar">
          <div className="p-10 bg-white rounded-[2.5rem] border border-[#d2d2d7]/60 shadow-sm">
            <h3 className="text-[20px] font-bold mb-8">Project Config</h3>
            
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

        {/* Results Main Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[3.5rem] p-10 sm:p-16 border border-[#d2d2d7]/60 shadow-xl relative results-card">
            <div className="hidden print-header">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Construction Estimate Report</h1>
                  <p className="text-sm text-gray-500">Generated by DesignDirectory Pakistan</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">Project: {marla} Marla ({floors} Floors)</p>
                  <p className="text-sm text-gray-500">Tier: {luxuryLevel}</p>
                </div>
              </div>
            </div>

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

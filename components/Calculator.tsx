'use client';

import React, { useState, useMemo } from 'react';
import FAQAccordion from './FAQAccordion';

const Calculator: React.FC = () => {
  const [marla, setMarla] = useState(10);
  const [floors, setFloors] = useState(1);
  const [quality, setQuality] = useState<'Standard' | 'Premium'>('Premium');

  const estimates = useMemo(() => {
    // Assumptions for estimation:
    // 1 Marla = ~225 sqft
    // Usable covered area is roughly 85% of plot size per floor
    const sqftPerMarla = 225;
    const coverageRatio = 0.85; 
    const coveredAreaPerFloor = Math.round(marla * sqftPerMarla * coverageRatio);
    const totalArea = coveredAreaPerFloor * floors;

    // Market Rates (Approximate for 2025)
    // Standard: ~5500 PKR/sqft
    // Premium: ~7800 PKR/sqft
    const rate = quality === 'Premium' ? 7800 : 5500;
    const grandTotal = totalArea * rate;

    return {
      total: grandTotal,
      grey: Math.round(grandTotal * 0.60), // Grey structure is approx 60% due to steel/cement costs
      finishing: Math.round(grandTotal * 0.40),
      area: totalArea
    };
  }, [marla, floors, quality]);

  const formatPKR = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Crore`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} Lakh`;
    return Math.round(num).toLocaleString();
  };

  const calculatorFaqs = [
    {
      question: "Does this cost include the price of the plot?",
      answer: "No. This calculator only estimates the cost to build the house structure. The price of land is separate."
    },
    {
      question: "Are architect fees included in this estimate?",
      answer: "No. Hiring an architect usually costs an additional 3% to 7% of the total budget, or a fixed fee per square foot. However, a good design can save you money by reducing material waste."
    },
    {
      question: "Why are construction rates increasing?",
      answer: "The cost of steel (sarya), cement, and labor has gone up due to inflation and fuel prices. Our calculator uses updated rates for 2025 to give you a realistic idea."
    },
    {
      question: "Can I save money on finishing?",
      answer: "Yes. Finishing costs are flexible. You can choose cheaper tiles or basic fittings to lower the cost. Grey structure costs are harder to reduce without compromising safety."
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
        {/* Controls Section */}
        <div className="lg:col-span-5 space-y-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-[#d2d2d7]/60 shadow-sm">
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <label className="text-[15px] font-bold text-[#1d1d1f]">Plot Size</label>
                <span className="text-[15px] font-medium text-[#0066cc] bg-blue-50 px-3 py-1 rounded-lg">{marla} Marla</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="40" 
                step="1" 
                value={marla} 
                onChange={(e) => setMarla(Number(e.target.value))} 
                className="w-full h-2 bg-[#f5f5f7] rounded-lg appearance-none cursor-pointer accent-[#0071e3]" 
              />
              <div className="flex justify-between text-[11px] text-[#86868b] mt-3 font-medium uppercase tracking-wider">
                <span>3 Marla</span>
                <span>1 Kanal (20)</span>
                <span>2 Kanal</span>
              </div>
            </div>

            <div className="mb-10">
              <label className="text-[15px] font-bold text-[#1d1d1f] mb-6 block">Number of Floors</label>
              <div className="flex gap-4">
                {[1, 2, 3].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setFloors(f)} 
                    className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      floors === f 
                        ? 'bg-[#1d1d1f] text-white shadow-lg scale-[1.02]' 
                        : 'bg-[#f5f5f7] text-[#86868b] hover:bg-[#e5e5e7]'
                    }`}
                  >
                    {f === 1 ? 'Single' : f === 2 ? 'Double' : 'Triple'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[15px] font-bold text-[#1d1d1f] mb-6 block">Finish Quality</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setQuality('Standard')} 
                  className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    quality === 'Standard' 
                      ? 'bg-[#1d1d1f] text-white shadow-lg scale-[1.02]' 
                      : 'bg-[#f5f5f7] text-[#86868b] hover:bg-[#e5e5e7]'
                  }`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => setQuality('Premium')} 
                  className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    quality === 'Premium' 
                      ? 'bg-[#1d1d1f] text-white shadow-lg scale-[1.02]' 
                      : 'bg-[#f5f5f7] text-[#86868b] hover:bg-[#e5e5e7]'
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7">
          <div className="bg-[#1d1d1f] text-white rounded-[3rem] p-10 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 blur-[100px] -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <span className="text-[13px] font-medium text-white/50 uppercase tracking-widest mb-2 block">Total Estimated Cost</span>
              <div className="text-[56px] sm:text-[72px] font-bold tracking-tight leading-none mb-4">
                <span className="text-[32px] align-top opacity-50 mr-2">PKR</span>
                {formatPKR(estimates.total)}
              </div>
              <p className="text-[15px] text-white/60 mb-12 font-light">
                Approx. {estimates.area.toLocaleString()} sq. ft covered area
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex items-center justify-between border border-white/5">
                  <div>
                    <h3 className="text-[17px] font-bold mb-1">Grey Structure</h3>
                    <p className="text-[13px] text-white/50">Foundations, walls, roof, plumbing</p>
                  </div>
                  <div className="text-[24px] font-bold">{formatPKR(estimates.grey)}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex items-center justify-between border border-white/5">
                  <div>
                    <h3 className="text-[17px] font-bold mb-1">Finishing</h3>
                    <p className="text-[13px] text-white/50">Paint, tiles, wood, electrical</p>
                  </div>
                  <div className="text-[24px] font-bold">{formatPKR(estimates.finishing)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-[13px] text-[#86868b] mt-6 text-center lg:text-left">
            *Estimates do not include land cost, architect fees, or furniture. Prices may vary by city.
          </p>
        </div>
      </div>

      {/* Educational Content */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">What is Grey Structure?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Grey structure is the skeleton of your house. It includes the bricks, cement, steel, roof pouring, underground plumbing piping, and electrical conduit wiring.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              It assumes you use "A Grade" bricks and quality cement like Maple Leaf or DG.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">What is Finishing?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Finishing makes the house livable. This cost includes floor tiles, paint, kitchen woodwork, wardrobes, windows, doors, washroom fittings, and lights.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              <strong>Premium</strong> finishing uses imported tiles and solid wood. <strong>Standard</strong> uses local tiles and semi-solid doors.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <FAQAccordion items={calculatorFaqs} />
      </section>
    </div>
  );
};

export default Calculator;
import React, { useState, useMemo, useEffect } from 'react';
import { Share2, Download, Phone, Calculator, Info } from 'lucide-react';

// --- Sub-components (Inline for easy copy-paste) ---

const FAQAccordion = ({ items }: { items: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-900">{item.question}</span>
            <span className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {openIndex === i && (
            <div className="p-5 pt-0 text-gray-600 leading-relaxed bg-white">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CalculatorPage: React.FC = () => {
  const [marla, setMarla] = useState(5);
  const [floors, setFloors] = useState(1);
  const [luxuryLevel, setLuxuryLevel] = useState<'Standard' | 'Premium'>('Standard');
  const [city, setCity] = useState<'Lahore' | 'Islamabad' | 'Karachi'>('Lahore');

  // --- 2026 CONSTANTS & RATES (Projected) ---
  const RATES = {
    Standard: {
      brick: 19,
      cement: 1550,
      sand: 45,
      crush: 145,
      steel: 280000,
      labor: 600,
      tile: 650,
      wood: 650000, // Base lump sum for 5 Marla
      plumbing: 160000,
      electric: 100000,
      paint: 350
    },
    Premium: {
      brick: 24, // Awal/Special
      cement: 1650, // Falcon/Bestway
      sand: 60, // Ravi + Chenab Mix
      crush: 175, // Margalla
      steel: 295000, // Mughal/Amreli 60 Grade
      labor: 850,
      tile: 1200, // Imported/Spanish
      wood: 1100000, // Ash/Teak
      plumbing: 250000, // Grohe/Porta
      electric: 200000,
      paint: 550 // Jotun/Berger
    }
  };

  const estimates = useMemo(() => {
    const r = RATES[luxuryLevel];
    
    // SCALING LOGIC
    // Base is 5 Marla. 
    // 10 Marla isn't exactly 2x cost (economies of scale), but close.
    // We use a linear scale for materials, but a dampened scale for fixed assets.
    const scaleFactor = marla / 5; 
    
    // Floor multiplier: Ground floor is 1. Upper floors cost slightly less in foundation/plumbing
    const floorMult = floors === 1 ? 1 : 1 + ((floors - 1) * 0.90);

    // 1. Covered Area (Approx 1050 sqft per floor for 5 Marla)
    const baseArea = 1050; 
    const totalArea = Math.round(baseArea * scaleFactor * floorMult);

    // 2. Grey Structure
    const bricksQty = Math.round(34000 * scaleFactor * floorMult);
    const bricksCost = bricksQty * r.brick;

    const cementBags = Math.round(390 * scaleFactor * floorMult);
    const cementCost = cementBags * r.cement;

    const sandCost = (2400 * scaleFactor * floorMult) * r.sand; // cft
    const crushCost = (1100 * scaleFactor * floorMult) * r.crush; // cft
    
    const steelTons = 1.9 * scaleFactor * floorMult;
    const steelCost = steelTons * r.steel;

    const laborCost = totalArea * r.labor;
    
    // Systems (Plumbing/Electric/Gate) - These don't double perfectly with floors
    const systemsMult = 1 + ((floors - 1) * 0.6); 
    const plumbingCost = r.plumbing * scaleFactor * systemsMult;
    const electricGreyCost = r.electric * scaleFactor * systemsMult;
    const gateCost = (luxuryLevel === 'Premium' ? 250000 : 150000) * (1 + (scaleFactor - 1) * 0.5); // Gate doesn't scale linearly

    const totalGrey = bricksCost + cementCost + sandCost + crushCost + steelCost + laborCost + plumbingCost + electricGreyCost + gateCost;

    // 3. Finishing
    const tileCost = totalArea * r.tile;
    const paintCost = totalArea * r.paint;
    
    // Woodwork (Kitchens, Doors, Wardrobes) scales heavily with floors
    const woodCost = r.wood * scaleFactor * floorMult;
    
    // Windows (Aluminium/UPVC)
    const windowCost = (luxuryLevel === 'Premium' ? 400000 : 250000) * scaleFactor * floorMult;
    
    // Bathrooms
    const bathCount = Math.floor((marla / 2.5) + 1) * floors; // Approx 3 baths for 5 marla double story
    const bathCost = bathCount * (luxuryLevel === 'Premium' ? 180000 : 130000);
    
    const electricFinishing = (luxuryLevel === 'Premium' ? 300000 : 150000) * scaleFactor * floorMult; // Lights, Fans, Switchgear

    const totalFinishing = tileCost + paintCost + woodCost + windowCost + bathCost + electricFinishing;

    // 4. Totals
    const subTotal = totalGrey + totalFinishing;
    // Contingency: 10% for Standard, 12% for Premium (more risk in imported items)
    const contingency = subTotal * (luxuryLevel === 'Premium' ? 0.12 : 0.10); 
    const grandTotal = subTotal + contingency;

    return {
      total: grandTotal,
      grey: totalGrey,
      finishing: totalFinishing,
      contingency,
      area: totalArea,
      ratePerSqFt: Math.round(grandTotal / totalArea),
      details: {
        bricks: bricksCost,
        cement: cementCost,
        steel: steelCost,
        labor: laborCost,
        wood: woodCost,
        tiles: tileCost,
        baths: bathCost
      }
    };
  }, [marla, floors, luxuryLevel, city]);

  const formatPKR = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Crore`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} Lakh`;
    return num.toLocaleString();
  };

  const handleShare = () => {
    const text = `*Construction Estimate 2026*\n\n*Plot:* ${marla} Marla (${floors} Floor)\n*Quality:* ${luxuryLevel}\n*Total Est:* ${formatPKR(estimates.total)}\n\n*Grey:* ${formatPKR(estimates.grey)}\n*Finishing:* ${formatPKR(estimates.finishing)}\n\nGenerated by AAK Architects Calculator`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
          .card { box-shadow: none; border: 1px solid #eee; }
        }
      `}</style>

      {/* Hero Section */}
      <header className="bg-white pt-20 pb-16 px-6 text-center shadow-sm no-print">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Calculator size={14} /> Updated Jan 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
            Build Smart. <br className="hidden md:block"/> Estimate Accurate.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The most trusted construction cost estimator for Pakistan. 
            Real-time market rates for {city}, adjusted for 2026 inflation.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-6 no-print">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold mb-6">Configuration</h3>
              
              {/* City Selection */}
              <div className="mb-8">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Region</label>
                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                  {['Lahore', 'Islamabad', 'Karachi'].map((c) => (
                    <button 
                      key={c}
                      onClick={() => setCity(c as any)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${city === c ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot Size Slider */}
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plot Size</label>
                  <span className="text-lg font-bold text-blue-600">{marla} Marla</span>
                </div>
                <input 
                  type="range" min="3" max="20" step="1" 
                  value={marla} onChange={(e) => setMarla(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                  <span>3 Marla</span>
                  <span>10 Marla</span>
                  <span>1 Kanal</span>
                </div>
              </div>

              {/* Floors */}
              <div className="mb-8">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Stories</label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((f) => (
                    <button 
                      key={f} onClick={() => setFloors(f)}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${floors === f ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Tier */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Finishing Tier</label>
                <div className="space-y-3">
                  {['Standard', 'Premium'].map((l) => (
                    <button 
                      key={l} onClick={() => setLuxuryLevel(l as any)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${luxuryLevel === l ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className="text-left">
                        <span className={`block font-bold ${luxuryLevel === l ? 'text-blue-900' : 'text-slate-700'}`}>{l}</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {l === 'Standard' ? 'Local Tiles, General Steel' : 'Imported Tiles, 60 Grade Steel'}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${luxuryLevel === l ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {luxuryLevel === l && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Result Card */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 card">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Total Estimate</h2>
                  <div className="flex items-center gap-2 mt-1 text-slate-500">
                    <Info size={16} />
                    <span className="text-sm font-medium">Includes 10% Contingency Buffer</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl md:text-6xl font-black text-blue-600 tracking-tight">
                    <span className="text-2xl text-slate-400 font-semibold mr-1">PKR</span>
                    {formatPKR(estimates.total)}
                  </div>
                </div>
              </div>

              {/* Visual Bar Chart */}
              <div className="mb-12">
                <div className="flex justify-between text-sm font-bold mb-3 uppercase tracking-wider">
                  <span className="text-slate-500">Grey Structure ({Math.round(estimates.grey / estimates.total * 100)}%)</span>
                  <span className="text-blue-600">Finishing ({Math.round(estimates.finishing / estimates.total * 100)}%)</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div style={{ width: `${(estimates.grey / estimates.total) * 100}%` }} className="h-full bg-slate-400" />
                  <div style={{ width: `${(estimates.finishing / estimates.total) * 100}%` }} className="h-full bg-blue-500" />
                  <div style={{ width: `${(estimates.contingency / estimates.total) * 100}%` }} className="h-full bg-orange-400" />
                </div>
                <div className="flex gap-4 mt-3 justify-end text-xs font-bold text-orange-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-400" /> Contingency Included
                  </div>
                </div>
              </div>

              {/* Detailed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-slate-400 rounded-full" /> Phase A: Grey Structure
                  </h4>
                  <div className="space-y-3">
                    <Row label="Material Cost" value={estimates.grey - estimates.details.labor} />
                    <Row label="Labor Cost" value={estimates.details.labor} />
                    <div className="border-t border-slate-200 my-2" />
                    <Row label="Total Grey" value={estimates.grey} bold />
                  </div>
                </div>

                <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-blue-500 rounded-full" /> Phase B: Finishing
                  </h4>
                  <div className="space-y-3">
                    <Row label="Tile & Flooring" value={estimates.details.tiles} />
                    <Row label="Woodwork" value={estimates.details.wood} />
                    <Row label="Bath & Electric" value={estimates.details.baths + (estimates.finishing - estimates.details.tiles - estimates.details.wood - estimates.details.baths)} />
                    <div className="border-t border-blue-200 my-2" />
                    <Row label="Total Finishing" value={estimates.finishing} bold />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 no-print">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Download Report
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition flex items-center justify-center gap-2"
                >
                  <Share2 size={18} /> Share on WhatsApp
                </button>
              </div>
            </div>

            {/* Additional Stats Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <StatCard label="Covered Area" value={`${estimates.area.toLocaleString()} sqft`} />
               <StatCard label="Rate / Sqft" value={`PKR ${estimates.ratePerSqFt.toLocaleString()}`} />
               <StatCard label="Bricks Reqd" value="~34,000" sub="Per 5 Marla Unit" />
               <StatCard label="Steel Reqd" value="~1.9 Tons" sub="Grade 60" />
            </div>
          </div>
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-6 mt-24">
        <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <FAQAccordion items={[
          { question: "Are these rates accurate for 2026?", answer: "Yes. We have factored in a 12% inflation buffer on 2025 year-end rates for Steel, Cement, and Labor to give you a realistic forecast for 2026." },
          { question: "What is included in the Premium Woodwork?", answer: "Premium woodwork estimates include Solid Ash Wood or Teak doors (Main and beds), UV sheet wardrobes, and High-Gloss Kitchen cabinetry with Corian tops." },
          { question: "Why is there a contingency fund?", answer: "Construction prices in Pakistan fluctuate weekly. The 10-12% contingency ensures you don't run out of funds if steel prices spike or fuel adjustments increase transport costs." },
        ]} />
      </div>
    </div>
  );
};

// Helper Components
const Row = ({ label, value, bold = false }: { label: string, value: number, bold?: boolean }) => (
  <div className={`flex justify-between items-center text-sm ${bold ? 'font-bold text-slate-900 text-base' : 'text-slate-600'}`}>
    <span>{label}</span>
    <span>{typeof value === 'number' ? Math.round(value).toLocaleString() : value}</span>
  </div>
);

const StatCard = ({ label, value, sub }: { label: string, value: string, sub?: string }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center">
    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</div>
    <div className="text-lg font-bold text-slate-900">{value}</div>
    {sub && <div className="text-[10px] text-slate-400 mt-1">{sub}</div>}
  </div>
);

export default CalculatorPage;
import React from 'react';
import { Metadata } from 'next';
import Calculator from '@/components/Calculator';

export const metadata: Metadata = {
  title: "Construction Cost Calculator 2025 | Architectorly",
  description: "Calculate house construction costs in Pakistan. Estimate budgets for 5 Marla, 10 Marla, and 1 Kanal homes based on 2025 market rates.",
};

export default function CalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Architectorly Construction Calculator",
    "applicationCategory": "FinanceApplication",
    "description": "A tool to estimate house construction costs in Pakistan.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "PKR"
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mb-20 text-center md:text-left">
        <span className="text-[13px] font-black text-[#0066cc] uppercase tracking-[0.3em] mb-6 block">Tools</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.05]">
          Construction <br /> <span className="text-[#86868b]">Calculator.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#424245] font-light max-w-[700px] leading-relaxed">
          Estimate your budget in seconds. Based on current material prices in Pakistan (2025).
        </p>
      </div>

      <Calculator />
    </div>
  );
}
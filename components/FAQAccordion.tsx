'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="border-b border-[#e5e5e7]/60 pb-4"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center text-left py-4 group"
          >
            <span className="text-[19px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-tight">
              {item.question}
            </span>
            <svg 
              className={`w-5 h-5 text-[#86868b] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-[17px] text-[#424245] leading-relaxed font-light pb-4">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
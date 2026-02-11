import React from 'react';
import { Metadata } from 'next';
import { CATEGORIES } from '@/data';
import CategoryList from '@/components/CategoryList';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: "Design Services & Categories | Architectorly",
  description: "Browse design services in Pakistan. Find Architects, Interior Designers, Construction Companies, and Map Makers.",
};

export default function CategoriesPage() {
  const categoryFaqs = [
    {
      question: "What is the difference between an Architect and an Interior Designer?",
      answer: "An Architect plans the building structure, rooms, and exterior. An Interior Designer focuses on the inside look, furniture, colors, and lighting."
    },
    {
      question: "Do I need a Structural Engineer?",
      answer: "Yes, if you are building a multi-story house. A Structural Engineer ensures your building is strong and safe against earthquakes."
    },
    {
      question: "Can construction companies also design houses?",
      answer: "Yes. Many construction companies have their own architects. This is called a 'Design-Build' service, where they handle everything from the map to the final keys."
    },
    {
      question: "What is a Landscape Architect?",
      answer: "A Landscape Architect designs outdoor spaces like gardens, parks, and lawns. They know which plants grow best in your city's climate."
    }
  ];

  // Schema
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Design Services",
    "description": "Browse professional design services including Architecture, Interior Design, and Construction.",
    "itemListElement": CATEGORIES.map((cat, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": cat.name,
      "url": `https://www.architectorly.com/category/${cat.slug}`
    }))
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className="mb-20 text-center md:text-left">
        <span className="text-[13px] font-black text-[#0071e3] uppercase tracking-[0.3em] mb-6 block">Services</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.05]">
          Design <br /> <span className="text-[#86868b]">Categories.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#424245] font-light max-w-[700px] leading-relaxed">
          Find the right expert for your project. From home maps to interior decoration, we have professionals for every need.
        </p>
      </div>

      <CategoryList categories={CATEGORIES} />

      {/* SEO Content Section */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Why Choose a Specialist?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Every project is different. An <strong>Architecture Firm</strong> is best for designing the structure and layout of your house. An <strong>Interior Designer</strong> is best for decorating rooms and choosing furniture.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Using the right expert saves you time. If you need a house map for approval, look for an Architect. If you want to renovate your kitchen, look for an Interior Designer.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Design & Build</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Some companies offer "Design and Build" services. This means one company designs your map and also constructs the house.
            </p>
            <ul className="space-y-3 text-[16px] text-[#86868b] font-medium">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Easier to manage</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Faster completion</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Clear budget estimates</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <FAQAccordion items={categoryFaqs} />
      </section>
    </div>
  );
}
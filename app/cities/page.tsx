import React from 'react';
import { Metadata } from 'next';
import { CITIES } from '@/data';
import CityList from '@/components/CityList';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: "Cities with Top Architects | Architectorly",
  description: "Browse our list of cities. Find verified architects in Lahore, Karachi, Islamabad, Multan, and more.",
};

export default function CitiesPage() {
  const cityFaqs = [
    {
      question: "Which city has the best architects?",
      answer: "Lahore and Karachi have the most firms because they are big cities. Islamabad also has very modern designers. But you can find great talent in almost every city on our list."
    },
    {
      question: "How do I find an architect near me?",
      answer: "Just click on your city name above. You will see a list of verified professionals in your area. You can see their phone numbers and office addresses."
    },
    {
      question: "Does it cost more to hire someone from another city?",
      answer: "Usually, yes. If an architect has to travel to visit your site, they might charge extra fees. It is often cheaper and easier to hire someone local."
    },
    {
      question: "Do you have architects in small cities?",
      answer: "Yes. We are adding more firms from smaller cities like Sialkot, Jhelum, and Rahim Yar Khan every week. We want to cover all of Pakistan."
    }
  ];

  // Schema
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cities on Architectorly",
    "itemListElement": CITIES.map((city, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": city.name,
      "url": `https://www.architectorly.com/city/${city.slug}`
    }))
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className="mb-20 text-center">
        <span className="text-[14px] font-black text-[#0066cc] uppercase tracking-[0.3em] mb-6 block">Locations</span>
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
          Explore Pakistan.
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[600px] mx-auto">
          Find the best designers in your area. We cover every major city.
        </p>
      </div>

      <CityList cities={CITIES} />

      {/* SEO Regional Content */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Why Location Matters</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Every city in Pakistan has its own building rules. A designer in <strong>Islamabad</strong> knows CDA laws. A designer in <strong>Karachi</strong> knows SBCA laws.
            </p>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Hiring someone local saves you time. They know how to get your house map approved quickly. They can also visit your construction site easily to check the work.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Major Hubs</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed">
              Most of the top architecture firms are in the big cities. But new talent is rising in places like <strong>Gujranwala</strong> and <strong>Multan</strong>.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-[15px] text-[#86868b] font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Lahore (Punjab)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Karachi (Sindh)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Islamabad (ICT)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]"></div> Peshawar (KPK)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12 text-center md:text-left">Common Questions</h2>
        <FAQAccordion items={cityFaqs} />
      </section>
    </div>
  );
}
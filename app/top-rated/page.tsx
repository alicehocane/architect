import React from 'react';
import { Metadata } from 'next';
import { ALL_ARCHITECTS } from '@/data';
import ArchitectList from '@/components/ArchitectList';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: "Top Rated Architects in Pakistan | Architectorly",
  description: "See the list of the best architects in Pakistan. We ranked top firms based on client reviews, quality of work, and professional standing.",
  alternates: {
    canonical: '/top-rated',
  },
};

export default function TopRatedPage() {
  const topRated = [...ALL_ARCHITECTS]
    .filter(a => (a.globalRating || 0) >= 4.0)
    .sort((a, b) => {
      const ratingA = a.globalRating || 0;
      const ratingB = b.globalRating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.totalReviews || 0) - (a.totalReviews || 0);
    });
  
  const aakIndex = topRated.findIndex(a => a.slug === 'aak-architects');
  if (aakIndex > -1) {
    const [aak] = topRated.splice(aakIndex, 1);
    topRated.unshift(aak);
  }

  const faqItems = [
    {
      question: "Who are the best architects in Pakistan right now?",
      answer: "AAK Architects, Amer Adnan Associates, and Nayyar Ali Dada & Associates are some of the most respected names. They are known for high-quality work and professional service."
    },
    {
      question: "How do I know if an architect is good?",
      answer: "Check their rating on Architectorly. Also, ask to see their past projects. A top-rated architect will always be happy to show you their work."
    },
    {
      question: "Do top architects charge very high fees?",
      answer: "They charge for their expertise, but it varies. Fees are usually 3% to 7% of the building cost, or a fixed rate per square foot (PKR 100 to PKR 350+). Good design often pays for itself by preventing costly mistakes."
    },
    {
      question: "Can an architect help me save money on construction?",
      answer: "Yes. Expert architects use precise planning to reduce material waste. They also design homes that use less energy, saving you money on bills for years."
    },
    {
      question: "Are these architects registered with PCATP?",
      answer: "We verify listings to the best of our ability. Many of our top-rated firms are registered with the Pakistan Council of Architects and Town Planners (PCATP). We recommend asking for their registration number during your first meeting."
    }
  ];

  // Schema
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Rated Architects in Pakistan",
    "description": "A list of the best-rated architects and designers in Pakistan.",
    "itemListElement": topRated.slice(0, 15).map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": a["Shop Name"],
        "url": `https://www.architectorly.com/architects/${a.slug}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": a.globalRating || 5.0,
          "reviewCount": a.totalReviews || 1
        }
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-20 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([listSchema, faqSchema]) }} />

      <div className="mb-20">
        <span className="text-[14px] font-black text-[#ff9500] uppercase tracking-[0.3em] mb-6 block">Best In Class</span>
        <h1 className="text-[48px] sm:text-[84px] font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.02]">
          Top Architects in <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9500] to-[#ff5e00]">Pakistan.</span>
        </h1>
        <div className="max-w-[720px] space-y-6">
          <p className="text-[21px] sm:text-[26px] text-[#424245] font-light leading-snug">
            We looked at ratings, reviews, and past projects to find the most trusted design firms in the country.
          </p>
          <p className="text-[17px] text-[#86868b] leading-relaxed">
            These professionals are known for great work. Whether you are building a modern house in Lahore or a commercial plaza in Karachi, these are the experts you can trust.
          </p>
        </div>
      </div>

      <ArchitectList architects={topRated} />

      {/* SEO CONTENT SECTION */}
      <section className="mb-32 py-20 border-t border-[#d2d2d7]/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">How We Choose</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              To be on our "Top Rated" list, an architect must show they are reliable. We look for three main things:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Verification:</strong> We check if they have a real office and valid phone numbers.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>High Ratings:</strong> Firms must have a rating of 4.0 or higher from people who hired them.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Experience:</strong> They must have a history of completing projects in Pakistani cities.</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-8">Why Hire the Best?</h2>
            <p className="text-[18px] text-[#424245] font-light leading-relaxed mb-6">
              Hiring a top architect costs a bit more upfront, but it saves you money later. Here is why:
            </p>
            <ul className="space-y-4 text-[16px] text-[#86868b]">
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Smart Design:</strong> They plan homes that stay cool in summer, lowering your electric bill.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Less Waste:</strong> Exact drawings mean builders don't waste expensive materials like cement and steel.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1d1d1f]">•</span>
                <span><strong>Resale Value:</strong> A well-designed house sells for a higher price.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="mb-32">
        <div className="mb-12">
          <h2 className="text-[36px] font-bold tracking-tight text-[#1d1d1f] mb-4">Common Questions</h2>
          <p className="text-[19px] text-[#86868b] font-light italic">Helpful answers about hiring top architects.</p>
        </div>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
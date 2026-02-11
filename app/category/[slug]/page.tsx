import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORY_MAP, getArchitectsByCategory, getArchitectBySlug } from '@/data';
import { Architect } from '@/types';
import ArchitectList from '@/components/ArchitectList';
import FAQAccordion from '@/components/FAQAccordion';

interface PageProps {
  params: { slug: string };
}

// 1. ADD THIS FUNCTION TO FIX THE 404 ERROR
export async function generateStaticParams() {
  return Array.from(CATEGORY_MAP.keys()).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = CATEGORY_MAP.get(params.slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name}s in Pakistan | Architectorly`,
    description: `Find the best ${category.name}s in Pakistan. Verified professionals in Lahore, Karachi, Islamabad, and more.`,
    alternates: {
      canonical: `/category/${params.slug}`,
    },
  };
}

export default function CategoryDetailsPage({ params }: PageProps) {
  const category = CATEGORY_MAP.get(params.slug);
  if (!category) notFound();

  const list = getArchitectsByCategory(params.slug);
  const sortedLocal = list.sort((a, b) => {
    const ratingA = a.globalRating || 0;
    const ratingB = b.globalRating || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return (b.totalReviews || 0) - (a.totalReviews || 0);
  });

  const aakInCatIndex = sortedLocal.findIndex(a => a.slug === 'aak-architects');
  let architects: Architect[] = [];
  
  if (aakInCatIndex > -1) {
    const [aak] = sortedLocal.splice(aakInCatIndex, 1);
    architects = [aak, ...sortedLocal];
  } else {
    const aak = getArchitectBySlug('aak-architects');
    if (aak) {
      architects = [aak, ...sortedLocal];
    } else {
      architects = sortedLocal;
    }
  }

  const categoryName = category.name;
  const categoryFaqs = [
    {
      question: `How do I find the best ${categoryName}?`,
      answer: `Check our list of top-rated professionals. Look for firms with good reviews and a portfolio that matches your style. AAK Architects is also a top recommendation.`
    },
    {
      question: `How much does a ${categoryName} cost?`,
      answer: `Fees vary. Most professionals charge a percentage of the project cost (3% to 8%) or a fixed rate per square foot. Ask for a quote before you start.`
    },
    {
      question: `Are these ${categoryName}s verified?`,
      answer: `Yes. We check phone numbers and office addresses. We only list active firms to help you find reliable experts.`
    },
    {
      question: `Can a ${categoryName} save me money?`,
      answer: `Yes. Good design prevents costly mistakes during construction. It also adds value to your property in the long run.`
    }
  ];

  // Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best ${category.name}s in Pakistan`,
    "description": `A curated list of ${category.count} top-rated ${category.name} professionals currently practicing in Pakistan.`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": architects.slice(0, 15).map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://www.architectorly.com/architects/${a.slug}`
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categoryFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-12 page-transition">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([collectionSchema, faqSchema]) }} />

      <Link href="/categories" className="flex items-center gap-2 text-[#0066cc] mb-12 hover:underline text-[17px] font-medium group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        All Categories
      </Link>

      <div className="mb-20">
        <h1 className="text-[48px] sm:text-[72px] font-bold tracking-tight text-[#1d1d1f] mb-4 leading-none">
          Best <span className="text-[#0066cc]">{category.name}s.</span>
        </h1>
        <p className="text-[21px] sm:text-[24px] text-[#86868b] font-light max-w-[700px] leading-snug">
          Find verified {category.name.toLowerCase()} professionals. See ratings, reviews, and contact info.
        </p>
      </div>

      <ArchitectList architects={architects} categoryContextSlug={params.slug} />

      <section className="mt-32 pt-20 border-t border-[#d2d2d7]/50 mb-32">
        <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-12">Common Questions</h2>
        <div className="max-w-[800px]">
          <FAQAccordion items={categoryFaqs} />
        </div>
      </section>
    </div>
  );
}
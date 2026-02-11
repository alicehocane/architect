import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | Architectorly Pakistan",
  description: "Read the Terms of Service for Architectorly. Understand the rules for using Pakistan's leading architectural directory.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-32 page-transition">
      <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] mb-12">Terms of Service.</h1>
      
      <div className="prose prose-lg prose-slate space-y-12 text-[#424245]">
        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing and using <strong>Architectorly</strong> (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">2. Accuracy of Information</h2>
          <p className="leading-relaxed">
            While we strive to keep our directory up to date, Architectorly does not guarantee the accuracy, completeness, or usefulness of any information on the site. Professional details (phone numbers, addresses) are gathered from public sources and user submissions. We recommend verifying details directly with the firm before visiting.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">3. Professional Relationship</h2>
          <p className="leading-relaxed">
            Architectorly is a directory service, not a contracting agency. We do not employ the architects listed here. Any agreement, contract, or transaction you enter into with a professional listed on this site is strictly between you and that professional. We are not liable for any disputes, damages, or losses resulting from such dealings.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">4. Intellectual Property</h2>
          <p className="leading-relaxed">
            The content, layout, design, data, databases, and graphics on this website are protected by intellectual property laws. You may not copy, reproduce, republish, download, post, broadcast, or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Architectorly.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-[#1d1d1f] mb-4">5. Modifications</h2>
          <p className="leading-relaxed">
            We reserve the right to change these terms at any time. Your continued use of the site after changes are posted constitutes your acceptance of this agreement as modified.
          </p>
        </section>

        <section className="pt-12 border-t border-[#d2d2d7]/50">
          <p className="text-[14px] text-[#86868b]">
            Effective Date: January 1, 2025.
          </p>
        </section>
      </div>
    </div>
  );
}
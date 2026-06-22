'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Partners2025() {
  return (
    <main className="partners-page">
      <section className="partners-hero">
        <div className="partners-container">
          <span className="partners-badge">PARTNERS 2025</span>
          <h1>Our Strategic Partners 2025</h1>
          <p>
            Showcasing the partners who are helping us create a stronger, future-ready leadership
            platform for technology and business excellence.
          </p>
        </div>
      </section>

      <section className="partners-section">
        <div className="partners-container">
          <h2 className="partner-category-title">Premium Partners</h2>

          <div className="partners-grid premium-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/freshworks.webp" alt="Freshworks" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/juniper-Redington.webp" alt="Juniper Redington" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Lenovo.webp" alt="Lenovo" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Associate Partners</h2>

          <div className="partners-grid associate-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/Adaptive.webp" alt="Adaptive Tattva" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Archon.webp" alt="Archon" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Barracuda.webp" alt="Barracuda" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/CITALDEL-BIO-Key.webp" alt="Citadel Bio-Key" />
            </div>
          </div>
        </div>
      </section>

      <section className="partners-cta">
        <div className="partners-container partners-cta-box">
          <h2>Partner With LeaderNext</h2>
          <p>Be part of a premium platform celebrating technology leadership and innovation.</p>
          <Link href="/contact" className="partners-btn">
            Contact Us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Partners2024() {
  return (
    <main className="partners-page">
      <section className="partners-hero">
        <div className="partners-container">
          <span className="partners-badge">PARTNERS 2024</span>
          <h1>Our Strategic Partners 2024</h1>
          <p>
            Honouring the partners who contributed to strengthening the 2024 edition with their
            support, credibility, and industry leadership.
          </p>
        </div>
      </section>

      <section className="partners-section">
        <div className="partners-container">
          <h2 className="partner-category-title">Premium Partner</h2>

          <div className="partners-grid premium-grid single-partner-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/Tata-Communications.webp" alt="Tata Communications" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Associate Partner</h2>

          <div className="partners-grid associate-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/Archon.webp" alt="Archon" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Associate_partners_5.png" alt="IceWarp" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/IndusNet.webp" alt="INT" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Syndrome-New-Edge.webp" alt="Synersome Newedge" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Partner</h2>

          <div className="partners-grid associate-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/Cloud-9.webp" alt="Cloud 9 Infosystems" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Harjai.webp" alt="Harjai" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/iSecureNet.webp" alt="iSecureNet" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Dynamic-Vishva-2.webp" alt="Dynamic Vishva" />
            </div>
          </div>
        </div>
      </section>

      <section className="partners-cta">
        <div className="partners-container partners-cta-box">
          <h2>Become a Partner</h2>
          <p>Collaborate with us to shape the next generation of digital leadership.</p>
          <Link href="/contact" className="partners-btn">
            Contact Us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

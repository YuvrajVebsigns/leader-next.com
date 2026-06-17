'use client';

import Link from 'next/link';
import { ArrowUpRight, Handshake, Sparkles, Trophy } from 'lucide-react';

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
        <div className="partners-container partners-grid">
          <div className="partners-card">
            <Handshake size={38} />
            <h2>Powerful Partnerships</h2>
            <p>Building meaningful collaborations with leading organizations and innovators.</p>
          </div>

          <div className="partners-card">
            <Sparkles size={38} />
            <h2>Future-Ready Vision</h2>
            <p>Supporting leaders who are shaping the future of enterprise technology.</p>
          </div>

          <div className="partners-card">
            <Trophy size={38} />
            <h2>Leadership Impact</h2>
            <p>Recognizing partnership excellence and shared commitment to industry growth.</p>
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

// 'use client';

// import Link from 'next/link';
// import { ArrowUpRight, Handshake, Sparkles, Trophy } from 'lucide-react';

// export default function Partners2023() {
//   return (
//     <main className="partners-page">
//       <section className="partners-hero">
//         <div className="partners-container">
//           <span className="partners-badge">PARTNERS 2023</span>
//           <h1>Our Strategic Partners 2023</h1>
//           <p>
//             Celebrating the organizations and collaborators who supported our vision and helped make
//             the 2023 edition impactful.
//           </p>
//         </div>
//       </section>

//       <section className="partners-section">
//         <div className="partners-container partners-grid">
//           <div className="partners-card">
//             <Handshake size={38} />
//             <h2>Trusted Collaborations</h2>
//             <p>Partners who joined hands to support innovation, leadership, and excellence.</p>
//           </div>

//           <div className="partners-card">
//             <Sparkles size={38} />
//             <h2>Shared Vision</h2>
//             <p>Working together to build a powerful platform for future technology leaders.</p>
//           </div>

//           <div className="partners-card">
//             <Trophy size={38} />
//             <h2>Impactful Journey</h2>
//             <p>Recognizing the contribution of partners in making the 2023 edition successful.</p>
//           </div>
//         </div>
//       </section>

//       <section className="partners-cta">
//         <div className="partners-container partners-cta-box">
//           <h2>Partner With Us</h2>
//           <p>Join us in building a stronger leadership and technology ecosystem.</p>
//           <Link href="/contact" className="partners-btn">
//             Contact Us <ArrowUpRight size={18} />
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Partners2023() {
  return (
    <main className="partners-page">
      <section className="partners-hero">
        <div className="partners-container">
          <span className="partners-badge">PARTNERS 2023</span>
          <h1>Our Strategic Partners 2023</h1>
          <p>
            Celebrating the organizations and collaborators who supported our vision and helped make
            the 2023 edition impactful.
          </p>
        </div>
      </section>

      <section className="partners-section">
        <div className="partners-container">
          <h2 className="partner-category-title">Presenting Partner</h2>

          <div className="partners-grid presenting-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/Google-Cloud-200x73.webp" alt="Google Cloud" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Premium Partners</h2>

          <div className="partners-grid premium-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/symphony-ai.webp" alt="SymphonyAI Summit" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Tata-Communications.Webp" alt="Tata Communications" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Associate Partners</h2>

          <div className="partners-grid associate-grid">
            <div className="partner-logo-card">
              <img src="/assets/partner/Archon.webp" alt="Archon" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/Rubrik-200x73.webp" alt="Rubrik" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partner/SigmaByte-1-100x73.webp" alt="Sigma Byte" />
            </div>
          </div>
        </div>
      </section>

      <section className="partners-cta">
        <div className="partners-container partners-cta-box">
          <h2>Partner With Us</h2>
          <p>Join us in building a stronger leadership and technology ecosystem.</p>

          <Link href="/contact" className="partners-btn">
            Contact Us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

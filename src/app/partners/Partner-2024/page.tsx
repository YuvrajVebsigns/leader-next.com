// 'use client';

// import Link from 'next/link';
// import { ArrowUpRight, Handshake, Sparkles, Trophy } from 'lucide-react';

// export default function Partners2024() {
//   return (
//     <main className="partners-page">
//       <section className="partners-hero">
//         <div className="partners-container">
//           <span className="partners-badge">PARTNERS 2024</span>
//           <h1>Our Strategic Partners 2024</h1>
//           <p>
//             Honouring the partners who contributed to strengthening the 2024 edition with their
//             support, credibility, and industry leadership.
//           </p>
//         </div>
//       </section>

//       <section className="partners-section">
//         <div className="partners-container partners-grid">
//           <div className="partners-card">
//             <Handshake size={38} />
//             <h2>Industry Support</h2>
//             <p>Collaborations that helped elevate the platform and expand its reach.</p>
//           </div>

//           <div className="partners-card">
//             <Sparkles size={38} />
//             <h2>Innovation Network</h2>
//             <p>Partners who enabled meaningful conversations around technology leadership.</p>
//           </div>

//           <div className="partners-card">
//             <Trophy size={38} />
//             <h2>Successful Edition</h2>
//             <p>Acknowledging the organizations that helped make the 2024 edition memorable.</p>
//           </div>
//         </div>
//       </section>

//       <section className="partners-cta">
//         <div className="partners-container partners-cta-box">
//           <h2>Become a Partner</h2>
//           <p>Collaborate with us to shape the next generation of digital leadership.</p>
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
              <img src="/assets/partners/2024/tata-communications.png" alt="Tata Communications" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Associate Partner</h2>

          <div className="partners-grid associate-grid">
            <div className="partner-logo-card">
              <img src="/assets/partners/2024/archon.png" alt="Archon" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partners/2024/icewarp.png" alt="IceWarp" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partners/2024/int.png" alt="INT" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partners/2024/synersome-newedge.png" alt="Synersome Newedge" />
            </div>
          </div>

          <h2 className="partner-category-title associate-title">Partner</h2>

          <div className="partners-grid associate-grid">
            <div className="partner-logo-card">
              <img src="/assets/partners/2024/cloud-9-infosystems.png" alt="Cloud 9 Infosystems" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partners/2024/harjai.png" alt="Harjai" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partners/2024/isecurenet.png" alt="iSecureNet" />
            </div>

            <div className="partner-logo-card">
              <img src="/assets/partners/2024/dynamic-vishva.png" alt="Dynamic Vishva" />
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

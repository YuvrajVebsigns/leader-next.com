// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// // import { useRef } from 'react';
// import { ArrowUpRight } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// export default function FoundersMessage() {
//   const sectionRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-up',
//     initialTransform: 'translateY(40px)',
//   });

//   return (
//     <section ref={sectionRef} className="founder-message-section">
//       <div className="founder-message-container">
//         {/* LEFT SIDE IMAGE */}
//         <div className="founder-image-wrapper">
//           <div className="founder-image-frame">
//             <Image
//               src="/assets/team/Anoop-Mathur.png"
//               alt="Anoop Mathur - Founder"
//               width={500}
//               height={500}
//               className="founder-image"
//               priority
//             />
//           </div>
//         </div>

//         {/* RIGHT SIDE CONTENT */}
//         <div className="founder-content">
//           {/* LABEL */}
//           <div className="founder-label">
//             <span className="founder-label-icon">♟</span>
//             <span className="founder-label-text">Founder’s Message</span>
//           </div>

//           {/* TITLE */}
//           <h2 className="founder-title">
//             Building Connections in a<br />
//             <span>Digital World.</span>
//           </h2>

//           {/* DESCRIPTION */}
//           <p className="founder-description">
//             For 13 years, CORE Media has innovated at the intersection of ICT and marketing. We
//             don’t just deliver messages; we build bespoke ecosystems that drive impactful results
//             for India’s leading stakeholders.
//           </p>

//           {/* QUOTE */}
//           <blockquote className="founder-quote">
//             <p>
//               “We innovate to build relationships that deliver exceptional results, every single
//               time.”
//             </p>
//           </blockquote>

//           {/* AUTHOR */}
//           <div className="founder-author">
//             <h3>Anoop Mathur</h3>
//             <span>Founder, CORE MEDIA</span>
//           </div>

//           {/* BUTTON */}
//           <Link href="/#contact-section" className="founder-btn">
//             <span>Partner With Us</span>
//             <div className="founder-btn-icon">
//               <ArrowUpRight size={22} />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FoundersMessage() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(32px)',
  });

  return (
    <section ref={sectionRef} className="founder-message-section">
      <div className="founder-message-container">
        <div className="founder-content">
          <span className="founder-eyebrow">Founder’s Message</span>

          {/* <h2 className="founder-title">
            Building connections in a <span>digital world.</span>
          </h2> */}

          <p className="founder-description">
            The future technology leaders are poised to revolutionize the business world like never
            before. With their visionary approach and deep understanding of the evolving technology
            landscape, they will be the architects of transformative change. Hand in hand with
            technologies like AI, IoT, Virtual reality, etc., they are all set to disrupt
            traditional business models and drive innovation across industries.
          </p>

          <div className="founder-readmore-wrap">
            <Link href="/foundermessage" className="founder-readmore-btn">
              Read more
            </Link>
          </div>

          {/* <div className="founder-quote">
            <Quote size={24} />
            <p>
              We innovate to build relationships that deliver exceptional results, every single
              time.
            </p>
          </div> */}

          <div className="founder-author">
            <div>
              <h3>Anoop Mathur</h3>
              <span>Founder, CORE MEDIA</span>
            </div>

            <Link href="/#contact-section" className="founder-btn">
              Partner With Us
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <div className="founder-image-wrapper">
          <div className="founder-image-frame">
            <Image
              src="/assets/team/AnoopMathur.png"
              alt="Anoop Mathur - Founder"
              width={520}
              height={620}
              className="founder-image"
              priority
            />
          </div>

          {/* <div className="founder-experience-card">
            <strong>13+</strong>
            <span>Years of Impact</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}

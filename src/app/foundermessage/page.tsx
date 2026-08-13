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
          <p className="founder-description">
            By identifying and nurturing these talents early on, organisations have the opportunity
            to offer a spiral growth to these potential leaders ensuring a seamless succession
            planning and transition into CXO positions, thereby fostering continuity and stability.
            Additionally, I believe that encouraging these future leaders will imbibe a culture of
            innovation and adaptability, positioning businesses for sustained growth in the
            long-term.
          </p>
          <p className="founder-description">
            Keeping this spirit of growth in mind, we are thrilled to announce the 4th season of
            LeaderNext 2026 – Rising Leaders of the ICT Sector to be held on 15th May 2026, Mumbai.
          </p>
          <p className="founder-description">
            As an innovative platform designed to accelerate the professional growth of senior IT &
            digital executives, LeaderNext empowers them with the knowledge and insights of top CXO
            leaders from various industries. This one-of-a-kind platform goes beyond traditional
            boundaries, offering exposure to aspiring technology executives through interactive
            workshops, engaging discussions, and immersive learning experiences.
          </p>
          <p className="founder-description">
            Together, let’s embrace the challenges and opportunities that lie ahead, as we lay the
            foundation for a future where innovation and excellence coincide to deliver business
            growth.
          </p>
          <p className="founder-description">
            I look forward to YOUR participation and presence at LeaderNext 2026 – Rising Leaders of
            the ICT Sector.
          </p>

          {/* <div className="founder-readmore-wrap">
            <Link href="/foundermessage" className="founder-readmore-btn">
              Read more
            </Link>
          </div> */}

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

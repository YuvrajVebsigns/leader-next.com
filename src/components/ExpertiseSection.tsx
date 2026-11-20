'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

export default function AboutUsSection() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  const items = [
    {
      image: '/assets/aboutus/recognized.png',
      description:
        '100+ Attendees join us in commemorating and raising a toast to the trailblazing technology leaders at LeaderNext',
    },
    {
      image: '/assets/aboutus/technology-dark.png',
      hoverImage: '/assets/aboutus/leader-next-hover.png',
      description: 'Jury panel consisting of esteemed technology and business leaders',
    },
    {
      image: '/assets/aboutus/winner.png',
      description: 'Winners chosen basis defined process and jury selection',
    },
    {
      image: '/assets/aboutus/leadership.png',
      description: 'Exclusive invitation to specially curated workshops and insightful sessions',
    },
    {
      image: '/assets/aboutus/learn.png',
      description: 'Opportunity to learn, engage, and collaborate with industry peers',
    },
  ];

  return (
    <section ref={sectionRef} className="leadernext-about">
      <div className="leadernext-about-bg" />

      <div className="leadernext-about-container">
        <div className="leadernext-about-header">
          <span className="leadernext-eyebrow">ABOUT</span>
          {/* <h2>
            LeaderNext 2026
            <span>Future Leaders of Technology</span>
          </h2> */}
        </div>

        <div className="leadernext-content-card">
          <p>
            LeaderNext envisages fostering innovation, mentoring, and continuous learning for senior
            ICT & digital executives who have the potential to progress to the C-Suite. This
            platform is carefully designed to recognize the immense potential within these
            executives, paving the way for accelerated career growth and unlocking new possibilities
            of success for them. LeaderNext serves as a powerful catalyst to enhance their networks,
            forging invaluable connections that transcend boundaries and promote collaboration.
          </p>

          <p>
            With informative workshops and interactive sessions, this program equips future leaders
            with the tools and insights they can leverage to excel in the fast-paced world of
            technology leadership. LeaderNext empowers these executives to make a lasting impact on
            their organizations and the industry as a whole.
          </p>

          <p className="leadernext-highlight">
            Join us in recognising and raising a toast to the promising future leaders of the
            technology world at LeaderNext 2026!
          </p>
        </div>

        <div className="leadernext-feature-grid">
          {items.map((item) => (
            <div className="leadernext-feature-card" key={item.description}>
              {/* <div className="leadernext-feature-number">
                {String(index + 1).padStart(2, '0')}
              </div> */}

              <div
                className={`leadernext-icon-box ${
                  item.hoverImage ? 'leadernext-icon-box-hover-image' : ''
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  width={48}
                  height={48}
                  className={`leadernext-feature-icon ${
                    item.hoverImage ? 'leadernext-feature-icon-primary' : ''
                  }`}
                />
                {item.hoverImage && (
                  <Image
                    src={item.hoverImage}
                    alt=""
                    width={48}
                    height={48}
                    className="leadernext-feature-icon leadernext-feature-icon-hover"
                  />
                )}
              </div>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import Image from 'next/image';

// export default function AboutUsSection() {
//   const sectionRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-up',
//     initialTransform: 'translateY(40px)',
//   });

//   const cardRef1 = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-28px)',
//     threshold: 0.12,
//   });

//   const cardRef2 = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-28px)',
//     threshold: 0.12,
//   });

//   const cardRef3 = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-28px)',
//     threshold: 0.12,
//   });

//   const cardRef4 = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-28px)',
//     threshold: 0.12,
//   });

//   const cardRef5 = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-28px)',
//     threshold: 0.12,
//   });

//   const cards = [
//     {
//       image: '/assets/aboutus/recognized.png',
//       hoverImage: '/assets/aboutus/recognized-dark.png',
//       title: '130+ CIO Leaders',
//       description:
//         'Recognising influential CIOs and ICT leaders driving innovation and business transformation across industries.',
//     },
//     {
//       image: '/assets/aboutus/technology-dark.png',
//       hoverImage: '/assets/aboutus/technology.png',
//       title: 'Data-Driven Selection',
//       description:
//         'Winners are chosen through a transparent algorithm-based evaluation process with no jury involvement.',
//     },
//     {
//       image: '/assets/aboutus/winner.png',
//       hoverImage: '/assets/aboutus/winner-dark.png',
//       title: 'Industry Impact',
//       description:
//         'Celebrating leaders creating measurable technology and business impact through strategic initiatives.',
//     },
//     {
//       image: '/assets/aboutus/leadership.png',
//       hoverImage: '/assets/aboutus/leadership-dark.png',
//       title: 'Leadership Forum',
//       description:
//         'A prestigious platform for networking, knowledge sharing, recognition, and industry collaboration.',
//     },
//     {
//       image: '/assets/aboutus/learn.png',
//       hoverImage: '/assets/aboutus/learn-dark.png',
//       title: 'Learn & Connect',
//       description:
//         'Engage with peers, gain valuable insights, and celebrate excellence in technology leadership.',
//     },
//   ];

//   const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4, cardRef5];

//   return (
//     <section ref={sectionRef} className="aboutus-section">
//       <div className="aboutus-container">
//         <div className="aboutus-heading">
//           <div className="aboutus-label">
//             <Image
//               src="/assets/icon.png"
//               alt="CIO Power List"
//               width={20}
//               height={20}
//               className="aboutus-label-icon"
//             />

//             <span className="aboutus-label-text">ABOUT THE INITIATIVE</span>
//           </div>

//           <h2 className="aboutus-title">
//             About Us &
//             <br />
//             <span>Driving the Future of Enterprise Technology</span>
//           </h2>

//           {/* <p className="aboutus-intro">
//             CIO Power List celebrates visionary CIOs and ICT leaders driving innovation, transformation, business growth across India.
//           </p> */}
//         </div>

//         <div className="aboutus-grid">
//           {cards.map((card, index) => (
//             <div
//               key={card.title}
//               ref={cardRefs[index]}
//               className={`aboutus-card aboutus-stagger-${index + 1}`}
//             >
//               <div className="aboutus-image-wrapper">
//                 <img src={card.image} alt={card.title} className="aboutus-image" />
//               </div>

//               <h3 className="aboutus-card-title">{card.title}</h3>

//               <p className="aboutus-card-description">{card.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

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
      title: '100+ Attendees',
      description:
        'Join us in commemorating and raising a toast to the trailblazing technology leaders at LeaderNext.',
    },
    {
      image: '/assets/aboutus/technology-dark.png',
      title: 'Esteemed Jury Panel',
      description: 'Jury panel consisting of esteemed technology and business leaders.',
    },
    {
      image: '/assets/aboutus/winner.png',
      title: 'Winners Selection',
      description: 'Winners chosen basis defined process and jury selection.',
    },
    {
      image: '/assets/aboutus/leadership.png',
      title: 'Curated Workshops',
      description: 'Exclusive invitation to specially curated workshops and insightful sessions.',
    },
    {
      image: '/assets/aboutus/learn.png',
      title: 'Learn & Collaborate',
      description: 'Opportunity to learn, engage, and collaborate with industry peers.',
    },
  ];

  return (
    <section ref={sectionRef} className="leadernext-about">
      <div className="leadernext-about-bg" />

      <div className="leadernext-about-container">
        <div className="leadernext-about-header">
          <span className="leadernext-eyebrow">ABOUT</span>
          <h2>
            LeaderNext 2026
            <span>Future Leaders of Technology</span>
          </h2>
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
            <div className="leadernext-feature-card" key={item.title}>
              {/* <div className="leadernext-feature-number">
                {String(index + 1).padStart(2, '0')}
              </div> */}

              <div className="leadernext-icon-box">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="leadernext-feature-icon"
                />
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

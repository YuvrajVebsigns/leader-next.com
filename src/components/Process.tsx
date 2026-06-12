// 'use client';

// import {
//   Newspaper,
//   Trophy,
//   Users,
//   Share2,
//   Vote,
//   Briefcase,
//   UserCheck,
//   Cpu,
//   Award,
// } from 'lucide-react';

// const dataSources = [
//   {
//     icon: Newspaper,
//     title: 'Media Reputation',
//     text: 'Reputation across mainline, online, print, business, and technology publications.',
//   },
//   {
//     icon: Trophy,
//     title: 'Awards & Recognition',
//     text: 'Combined data on awards, honours, recognitions, and professional achievements.',
//   },
//   {
//     icon: Users,
//     title: 'Industry Associations',
//     text: 'Involvement in associations, industry groups, and professional technology communities.',
//   },
//   {
//     icon: Share2,
//     title: 'Social Media Engagement',
//     text: 'Random sampling and analysis of social media engagements and digital visibility.',
//   },
//   {
//     icon: Vote,
//     title: 'Peer CIO Sentiments',
//     text: 'National survey where CIOs vote for their peers based on reputation and impact.',
//   },
//   {
//     icon: Briefcase,
//     title: 'Vendor Nominations',
//     text: 'Nominations and inputs received from technology vendors and industry partners.',
//   },
//   {
//     icon: UserCheck,
//     title: 'Self Achievements',
//     text: 'Inputs from CIOs on key achievements and milestones from the last 12 months.',
//   },
// ];

// export default function CIOPowerListProcess() {
//   return (
//     <section className="cio-process-section">
//       <div className="cio-process-container">
//         <div className="cio-process-heading">
//           <span className="cio-process-label">Process</span>
//           <h2>
//             Technology <span>at Work.</span>
//           </h2>
//           <p>
//             CIO Power List, scheduled on June 18 &amp; 19, 2026, is a unique and
//             powerful platform honouring our country&apos;s most distinguished CIOs.
//           </p>
//         </div>

//         <div className="cio-process-intro-card">
//           <div className="cio-process-intro-icon">
//             <Award size={34} />
//           </div>

//           <div>
//             <h3>360-Degree Selection Process</h3>
//             <p>
//               The selection process is based on several business and technology
//               criteria. A proprietary algorithm decides the &apos;Who&apos;s Who&apos; in
//               CIO Power List using multiple data parameters collected from verified
//               channels.
//             </p>
//           </div>
//         </div>

//         <div className="cio-process-flow">
//           <div className="cio-process-flow-card">
//             <span>01</span>
//             <h4>Data Collection</h4>
//             <p>Inputs are gathered from multiple media, industry, and community sources.</p>
//           </div>

//           <div className="cio-process-arrow">→</div>

//           <div className="cio-process-flow-card active">
//             <span>02</span>
//             <h4>Algorithm Evaluation</h4>
//             <p>Business and technology parameters are processed through the algorithm.</p>
//           </div>

//           <div className="cio-process-arrow">→</div>

//           <div className="cio-process-flow-card">
//             <span>03</span>
//             <h4>Final Recognition</h4>
//             <p>The most impactful CIO leaders are featured in the CIO Power List.</p>
//           </div>
//         </div>

//         <div className="cio-algorithm-box">
//           <div className="cio-algorithm-icon">
//             <Cpu size={42} />
//           </div>
//           <h3>CIO Power List Algorithm</h3>
//           <p>
//             Developed using a wide range of CIO data collected from multiple channels,
//             making the entire recognition process unique, credible, and data-driven.
//           </p>
//         </div>

//         <div className="cio-data-heading">
//           <h3>Data Sources Include</h3>
//           <p>Each parameter contributes to a comprehensive leadership evaluation.</p>
//         </div>

//         <div className="cio-data-grid">
//           {dataSources.map((item) => {
//             const Icon = item.icon;

//             return (
//               <article className="cio-data-card" key={item.title}>
//                 <div className="cio-data-icon">
//                   <Icon size={26} />
//                 </div>
//                 <h4>{item.title}</h4>
//                 <p>{item.text}</p>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { Newspaper, Trophy, Vote, Briefcase, Award } from 'lucide-react';

const dataSources = [
  {
    icon: Newspaper,
    title: 'Media Reputation',
    text: 'Reputation across mainline, online, print, business, and technology publications.',
  },
  {
    icon: Trophy,
    title: 'Awards & Recognition',
    text: 'Awards, honours, recognitions, and professional achievements.',
  },
  //   {
  //     icon: Users,
  //     title: 'Industry Associations',
  //     text: 'Involvement in associations, industry groups, and CIO communities.',
  //   },
  //   {
  //     icon: Share2,
  //     title: 'Social Engagement',
  //     text: 'Random sampling of social media engagements and digital visibility.',
  //   },
  {
    icon: Vote,
    title: 'Peer CIO Sentiments',
    text: 'National peer survey where CIOs vote for fellow CIO leaders.',
  },
  {
    icon: Briefcase,
    title: 'Vendor Nominations',
    text: 'Nominations received from vendors and industry partners.',
  },
  //   {
  //     icon: UserCheck,
  //     title: 'Self Achievements',
  //     text: 'Inputs from CIOs on key achievements from the last 12 months.',
  //   },
];

export default function CIOPowerListProcess() {
  return (
    <section className="cio-process-section">
      <div className="cio-process-container">
        <div className="cio-process-main">
          <div className="cio-process-content">
            <span className="cio-process-label">Process</span>

            <h2>
              How the <span>Process Works.</span>
            </h2>

            <p>
              The CIO Power List is a prestigious recognition platform that celebrates India’s most
              influential and forward-thinking Chief Information Officers. <br /> It honours
              technology leaders who have demonstrated exceptional vision, innovation, and
              leadership in driving business transformation through technology.
            </p>

            <div className="cio-process-note">
              <Award size={30} />
              <div>
                <h3>360-Degree Selection Process</h3>
                <p>
                  The selection process is based on a comprehensive evaluation framework that
                  examines multiple business and technology parameters.
                </p>

                {/* <p>
        Developed using a wide range of CIO data collected from multiple channels,
        the algorithm ensures a transparent, objective, and data-driven approach to
        recognizing technology leaders who have delivered exceptional results over
        the past year.
      </p> */}
              </div>
            </div>
          </div>

          <div className="cio-process-sources-card">
            <div className="cio-process-sources-header">
              <h3>Data Sources</h3>
              <p>Multiple verified channels contribute to the CIO Power List evaluation process.</p>
            </div>

            <div className="cio-process-sources-grid">
              {dataSources.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="cio-process-source-item" key={item.title}>
                    <div className="cio-process-source-icon">
                      <Icon size={20} />
                    </div>

                    <div className="cio-process-source-content">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

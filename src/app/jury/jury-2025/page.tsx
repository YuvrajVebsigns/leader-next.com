// 'use client';

// export default function Jury2025() {
//   const juryMembers = [
//     {
//       id: 1,
//       name: 'Jury Member 1',
//       title: 'Position Title',
//       company: 'Company Name',
//       image: '/assets/team/Anoop-Mathur.png',
//       linkedIn: 'https://linkedin.com',
//     },
//     {
//       id: 2,
//       name: 'Jury Member 2',
//       title: 'Position Title',
//       company: 'Company Name',
//       image: '/assets/team/Anoop-Mathur.png',
//       linkedIn: 'https://linkedin.com',
//     },
//     {
//       id: 3,
//       name: 'Jury Member 3',
//       title: 'Position Title',
//       company: 'Company Name',
//       image: '/assets/team/Anoop-Mathur.png',
//       linkedIn: 'https://linkedin.com',
//     },
//     {
//       id: 4,
//       name: 'Jury Member 4',
//       title: 'Position Title',
//       company: 'Company Name',
//       image: '/assets/team/Anoop-Mathur.png',
//       linkedIn: 'https://linkedin.com',
//     },
//     // {
//     //   id: 5,
//     //   name: 'Jury Member 5',
//     //   title: 'Position Title',
//     //   company: 'Company Name',
//     //   image: '/assets/team/Anoop-Mathur.png',
//     //   linkedIn: 'https://linkedin.com',
//     // },
//   ];

//   return (
//     <div className="jury-page">
//       <div className="jury-container">
//         <h1 className="jury-title">JURY 2025</h1>
//         <div className="jury-grid">
//           {juryMembers.map((member) => (
//             <div key={member.id} className="jury-card">
//               <div className="jury-hexagon">
//                 <img src={member.image} alt={member.name} className="jury-image" />
//               </div>
//               <div className="jury-info">
//                 <h3 className="jury-name">{member.name}</h3>
//                 <p className="jury-position">{member.title}</p>
//                 <p className="jury-company">{member.company}</p>
//                 <a
//                   href={member.linkedIn}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="jury-linkedin"
//                 >
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchWebsitePageBySlug } from '@/services/pages.service';

type JuryMember = {
  author: string;
  role: string;
  quote: string;
  avatar?: string;
};

export default function Jury2025() {
  const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);
  const [pageTitle, setPageTitle] = useState('JURY 2025');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallbackImage = '/assets/team/Anoop-Mathur.png';

  useEffect(() => {
    async function loadJuryData() {
      try {
        setLoading(true);

        const response = await fetchWebsitePageBySlug('jury-2025');

        if (!response?.success || !response?.data) {
          throw new Error('Unable to fetch jury data');
        }

        setPageTitle(response.data.title || 'JURY 2025');

        const testimonialsSection = response.data.sections?.find(
          (section) => section.type === 'TESTIMONIALS',
        );

        const testimonials =
          (testimonialsSection?.data?.testimonials as JuryMember[]) ||
          (response.data.content?.blocks?.find((block) => block.type === 'testimonialsSection')
            ?.data?.testimonials as JuryMember[]) ||
          [];

        setJuryMembers(testimonials);
      } catch (err) {
        // console.error(err);
        setError('Failed to load jury members.');
      } finally {
        setLoading(false);
      }
    }

    loadJuryData();
  }, []);

  const hasMembers = useMemo(() => juryMembers.length > 0, [juryMembers]);

  return (
    <main className="jury-page">
      <section className="jury-hero">
        <div className="jury-container">
          <span className="jury-badge">LeaderNext</span>
          <h1 className="jury-title">{pageTitle}</h1>
          <p className="jury-subtitle">
            Meet the esteemed technology and business leaders guiding the LeaderNext selection
            process.
          </p>
        </div>
      </section>

      <section className="jury-section">
        <div className="jury-container">
          {loading && <p className="jury-message">Loading jury members...</p>}

          {!loading && error && <p className="jury-message error">{error}</p>}

          {!loading && !error && !hasMembers && (
            <p className="jury-message">No jury members available.</p>
          )}

          {!loading && !error && hasMembers && (
            <div className="jury-grid">
              {juryMembers.map((member, index) => (
                <article key={`${member.author}-${index}`} className="jury-card">
                  <div className="jury-image-wrap">
                    <img
                      src={member.avatar || fallbackImage}
                      alt={member.author}
                      className="jury-image"
                    />
                  </div>

                  <div className="jury-info">
                    <h3 className="jury-name">{member.author}</h3>
                    <p className="jury-position">{member.role}</p>
                    <p className="jury-company">{member.quote}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

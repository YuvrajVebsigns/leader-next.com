// src/app/partners/past-key-partner/page.tsx

// export default function PastKeyPartnerPage() {
//   return (
//     <main>
//       <section className="past-key-partner-section">
//         <div className="past-key-partner-container">
//           <h1>Past Key Partners</h1>
//           <p>Our valued partners who have supported us over the years.</p>
//         </div>
//       </section>
//     </main>
//   );
// }

export default function PastKeyPartnerPage() {
  const partners = [
    '/assets/partners/client1.png',
    '/assets/partners/client2.png',
    '/assets/partners/client3.png',
    '/assets/partners/client4.png',
    '/assets/partners/client5.png',
    '/assets/partners/client6.png',
    '/assets/partners/client7.png',
    '/assets/partners/client8.png',
    '/assets/partners/client9.png',
    '/assets/partners/client10.png',
  ];

  return (
    <main>
      <section className="past-partners-section">
        <div className="past-partners-container">
          <div className="past-partners-heading">
            <span className="past-partners-label1">PAST KEY PARTNERS</span>

            <h1 className="past-partners-title">
              Our Trusted <span>Past Key Partners</span>
            </h1>

            <p className="past-partners-description">
              We are proud to have collaborated with leading organizations and technology innovators
              who have contributed to the success of our platforms and initiatives over the years.
            </p>
          </div>

          <div className="past-partners-grid">
            {partners.map((logo, index) => (
              <div key={index} className="past-partner-card">
                <img src={logo} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

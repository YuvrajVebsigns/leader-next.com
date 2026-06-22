'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="footer-section">
      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* COLUMN 1 */}
            <div className="footer-widget footer-brand">
              <Link href="/" className="footer-logo">
                <Image
                  src="/assets/logo/leader-next-logo.png"
                  alt="Core Media"
                  width={180}
                  height={70}
                  priority
                />
              </Link>

              <p className="footer-description">
                Developing personalized customer journeys to increase customer satisfaction,
                engagement, and long-term loyalty for business growth.
              </p>
            </div>

            {/* COLUMN 2 */}
            <div className="footer-widget">
              <h4 className="footer-title">Services</h4>

              <ul className="footer-links">
                <li>
                  <Link href="/register">Registration</Link>
                </li>

                <li>
                  <Link href="/process">Process</Link>
                </li>
                <li>
                  <Link href="/partners/partner-2025">Partners</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                {/* <li>
                  <Link href="/nominate">Nominate</Link>
                </li> */}
              </ul>
            </div>

            {/* COLUMN 3 */}
            <div className="footer-widget">
              <h4 className="footer-title">Resources</h4>

              <ul className="footer-links">
                <li>
                  <Link href="/blog">Blog</Link>
                </li>

                <li>
                  <Link href="/events">Event</Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 4 */}
            <div className="footer-widget">
              <h4 className="footer-title">Subscribe</h4>

              <form className="footer-subscribe">
                <input type="email" placeholder="Enter your email" className="footer-input" />

                <button type="submit" className="footer-submit" aria-label="Subscribe">
                  <Send size={18} />
                </button>
              </form>
              <br />
              <h4>Our Office</h4>
              <p className="footer-description">
                Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali Studio,
                Andheri (East), Mumbai – 400072, INDIA
              </p>

              {/* <label className="footer-checkbox">
                <input type="checkbox" />

                <span>
                  I agree to the{' '}
                  <Link href="/" className="footer-terms">
                    Terms & Conditions
                  </Link>
                </span>
              </label> */}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-wrapper">
          {/* CONTACT */}
          <div className="footer-contact">
            <a href="tel:+917506035537" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Phone size={15} />
              </span>

              <span className="footer-contact-text">+91 7506035537</span>
            </a>

            <a href="mailto:info@coremedia.com" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Mail size={15} />
              </span>

              <span className="footer-contact-text">contact@core-mediagroup.com</span>
            </a>
          </div>

          {/* SOCIAL */}
          <div className="footer-socials">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://www.instagram.com/" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="https://x.com/" aria-label="Twitter">
              <FaXTwitter />
            </a>

            <a href="https://www.linkedin.com/" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>

          {/* COPYRIGHT */}
          <div className="footer-copy">© 2026 Core Media. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { Phone, Mail, Send } from 'lucide-react';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

// export default function Footer() {
//   return (
//     <footer className="footer-section">
//       <div className="footer-main">
//         <div className="footer-container">
//           <div className="footer-grid">
//             <div className="footer-widget footer-brand">
//               <Link href="/" className="footer-logo">
//                 <Image
//                   src="/assets/logo/leader-next-logo.png"
//                   alt="Leader Next"
//                   width={180}
//                   height={70}
//                   priority
//                 />
//               </Link>

//               <p className="footer-description">
//                 LeaderNext is a premier platform recognizing emerging technology leaders and
//                 empowering future-ready digital executives through networking, collaboration,
//                 innovation, and leadership excellence.
//               </p>
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Quick Links</h4>

//               <ul className="footer-links">
//                 <li><Link href="/">Home</Link></li>
//                 <li><Link href="/register">Registration</Link></li>
//                 <li><Link href="/process">Process</Link></li>
//                 <li><Link href="/blog">Blog</Link></li>
//                 <li><Link href="/events">Events</Link></li>
//                 <li><Link href="/#contact-section">Contact</Link></li>
//               </ul>
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Partners & Winners</h4>

//               <ul className="footer-links">
//                 <li><Link href="/partners/partner-2025">Partners 2025</Link></li>
//                 <li><Link href="/partners/Partner-2024">Partners 2024</Link></li>
//                 <li><Link href="/partners/Partner-2023">Partners 2023</Link></li>
//                 <li><Link href="/winners/winner-2025">Winners 2025</Link></li>
//                 <li><Link href="/winners/winner-2024">Winners 2024</Link></li>
//                 <li><Link href="/winners/winner-2023">Winners 2023</Link></li>
//               </ul>
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Jury & Speakers</h4>

//               <ul className="footer-links">
//                 <li><Link href="/jury/jury-2025">Jury 2025</Link></li>
//                 <li><Link href="/jury/jury-2024">Jury 2024</Link></li>
//                 <li><Link href="/jury/jury-2023">Jury 2023</Link></li>
//                 <li><Link href="/speakers/speaker-2025">Speakers 2025</Link></li>
//                 <li><Link href="/speakers/speaker-2024">Speakers 2024</Link></li>
//                 <li><Link href="/speakers/speaker-2023">Speakers 2023</Link></li>
//               </ul>
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Subscribe</h4>

//               <form className="footer-subscribe">
//                 <input type="email" placeholder="Enter your email" className="footer-input" />

//                 <button type="submit" className="footer-submit" aria-label="Subscribe">
//                   <Send size={18} />
//                 </button>
//               </form>

//               <div className="footer-office">
//                 <h4 className="footer-title">Our Office</h4>

//                 <p className="footer-description">
//                   Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali
//                   Studio, Andheri (East), Mumbai – 400072, INDIA
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <div className="footer-container footer-bottom-wrapper">
//           <div className="footer-contact">
//             <a href="tel:+917506035537" className="footer-contact-item">
//               <span className="footer-contact-icon">
//                 <Phone size={15} />
//               </span>
//               <span className="footer-contact-text">+91 7506035537</span>
//             </a>

//             <a href="mailto:contact@core-mediagroup.com" className="footer-contact-item">
//               <span className="footer-contact-icon">
//                 <Mail size={15} />
//               </span>
//               <span className="footer-contact-text">contact@core-mediagroup.com</span>
//             </a>
//           </div>

//           <div className="footer-socials">
//             <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
//               <FaFacebookF />
//             </a>

//             <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
//               <FaInstagram />
//             </a>

//             <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
//               <FaXTwitter />
//             </a>

//             <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//               <FaLinkedinIn />
//             </a>
//           </div>

//           <div className="footer-copy">© 2026 LeaderNext. All Rights Reserved.</div>
//         </div>
//       </div>
//     </footer>
//   );
// }

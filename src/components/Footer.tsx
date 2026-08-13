'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

import { subscribeWebsiteEmail } from '@/services/subscribes.service';

export default function Footer() {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [subscribePopupMessage, setSubscribePopupMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = subscribeEmail.trim();

    // Required validation
    if (!email) {
      setSubscribePopupMessage('Please enter your email address.');
      setShowSubscribePopup(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSubscribePopupMessage('Please enter a valid email address.');
      setShowSubscribePopup(true);
      return;
    }

    setIsSubscribing(true);

    try {
      await subscribeWebsiteEmail(email);

      // Success popup
      setSubscribePopupMessage('Operation successful');
      setShowSubscribePopup(true);

      // Clear email after successful subscription
      setSubscribeEmail('');
    } catch (error: unknown) {
      setSubscribePopupMessage(
        error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
      );

      setShowSubscribePopup(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  const closeSubscribePopup = () => {
    setShowSubscribePopup(false);
    setSubscribePopupMessage('');
  };

  return (
    <footer className="footer-section">
      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* =========================================
                COLUMN 1 - BRAND
            ========================================= */}

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

              {/* <p className="footer-description">
                Developing personalized customer journeys to increase customer satisfaction,
                engagement, and long-term loyalty for business growth.
              </p> */}
            </div>

            {/* =========================================
                COLUMN 2 - SERVICES
            ========================================= */}

            <div className="footer-widget">
              <h4 className="footer-title">Services</h4>

              <ul className="footer-links">
                <li>
                  <Link href="/register">Registration</Link>
                </li>

                {/* <li>
                  <Link href="/process">Process</Link>
                </li> */}

                <li>
                  <Link href="/partners/partner-2025">Partners</Link>
                </li>

                {/* <li>
                  <Link href="/contact">Contact</Link>
                </li> */}

                {/*
                <li>
                  <Link href="/nominate">Nominate</Link>
                </li>
                */}
              </ul>
            </div>

            {/* =========================================
                COLUMN 3 - RESOURCES
            ========================================= */}

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

            {/* =========================================
                COLUMN 4 - SUBSCRIBE
            ========================================= */}

            <div className="footer-widget">
              <h4 className="footer-title">Subscribe</h4>

              <form className="footer-subscribe" onSubmit={handleSubscribe} noValidate>
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="footer-input"
                  disabled={isSubscribing}
                  aria-label="Email address"
                  autoComplete="email"
                />

                <button
                  type="submit"
                  className="footer-submit"
                  aria-label="Subscribe"
                  disabled={isSubscribing}
                >
                  <Send size={18} />
                </button>
              </form>

              {/* =========================================
                  SUBSCRIBE TOAST
              ========================================= */}

              {showSubscribePopup && (
                <div className="subscribe-toast" role="alert" aria-live="polite">
                  <span className="subscribe-toast-dot" />

                  <p className="subscribe-toast-message">{subscribePopupMessage}</p>

                  <button
                    type="button"
                    className="subscribe-toast-close"
                    onClick={closeSubscribePopup}
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </div>
              )}

              <br />

              {/* =========================================
                  OFFICE
              ========================================= */}

              <h2 className="footer-description1">Office Address</h2>

              <p className="footer-description">
                Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali Studio,
                Andheri (East), Mumbai – 400072, INDIA
              </p>

              {/*
              <label className="footer-checkbox">
                <input type="checkbox" />

                <span>
                  I agree to the{' '}
                  <Link href="/" className="footer-terms">
                    Terms & Conditions
                  </Link>
                </span>
              </label>
              */}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          FOOTER BOTTOM
      ========================================= */}

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-wrapper">
          {/* =========================================
              CONTACT
          ========================================= */}

          <div className="footer-contact">
            <a href="tel:+917506035537" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Phone size={15} />
              </span>

              <span className="footer-contact-text">+91 7506035537</span>
            </a>

            <a href="mailto:contact@core-mediagroup.com" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Mail size={15} />
              </span>

              <span className="footer-contact-text">contact@core-mediagroup.com</span>
            </a>
          </div>

          {/* =========================================
              SOCIAL
          ========================================= */}

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a href="https://x.com/" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* =========================================
              COPYRIGHT
          ========================================= */}

          <div className="footer-copy">© 2026 Core Media. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

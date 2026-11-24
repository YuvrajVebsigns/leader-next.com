import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Building2, Handshake, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | LeaderNext',
  description: 'Contact CORE Media Group for LeaderNext partnership and general enquiries.',
};

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="contact-info-card">
      <div className="contact-info-card-heading">
        <span className="contact-info-icon" aria-hidden="true">
          {icon}
        </span>
        <h2>{title}</h2>
      </div>
      {children}
    </article>
  );
}

export default function ContactUsPage() {
  return (
    <main className="contact-info-page">
      <h1>Contact Us</h1>

      <div className="contact-info-grid">
        <ContactCard icon={<Handshake size={18} />} title="For Partnership Opportunities Contact">
          <div className="contact-partners">
            <div className="contact-person">
              <strong>Sudhir Kamath</strong>
              <a href="mailto:sudhir@core-mediagroup.com">
                <Mail size={14} aria-hidden="true" />
                <span>sudhir@core-mediagroup.com</span>
              </a>
            </div>

            <div className="contact-person">
              <strong>Sadanand Manda</strong>
              <a href="tel:+917506035537">
                <Phone size={14} aria-hidden="true" />
                <span>+ 91 – 75060 35537</span>
              </a>
              <a href="mailto:sadanand.manda@core-mediagroup.com">
                <Mail size={14} aria-hidden="true" />
                <span>sadanand.manda@core-mediagroup.com</span>
              </a>
            </div>
          </div>
        </ContactCard>

        <ContactCard icon={<Building2 size={18} />} title="Produced By">
          <div className="contact-producer">
            <Image
              src="/assets/logo/corelogo.png"
              alt="CORE Centre of Recognition & Excellence"
              width={220}
              height={90}
              className="contact-producer-logo"
            />
            <a
              className="contact-info-link"
              href="https://www.core-mediagroup.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>www.core-mediagroup.com</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </ContactCard>

        <ContactCard icon={<Mail size={18} />} title="For Sales Enquiries">
          <a className="contact-info-link" href="mailto:sales@core-mediagroup.com">
            <span>sales@core-mediagroup.com</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </ContactCard>

        <ContactCard icon={<Mail size={18} />} title="For Any Query, Email Us At">
          <a className="contact-info-link" href="mailto:contact@core-mediagroup.com">
            <span>contact@core-mediagroup.com</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </ContactCard>
      </div>

      {/* <p className="contact-info-visit">
        To know more visit{' '}
        <a href="https://www.core-mediagroup.com/" target="_blank" rel="noopener noreferrer">
          www.core-mediagroup.com
        </a>
      </p> */}
    </main>
  );
}

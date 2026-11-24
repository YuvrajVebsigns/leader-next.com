import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | LeaderNext',
  description: 'Terms and conditions for the LeaderNext platform.',
};

const terms = [
  'LeaderNext 2023 is the exclusive platform and sole property of CORE Media Group.',
  'CORE Media Group retains the complete authority to modify, cancel, suspend, or conclude the LeaderNext program at any juncture. Additionally, the company holds the right to exercise its complete discretion in either accepting or rejecting any or all submissions, without prior notice or explanation.',
  'Decisions rendered by LeaderNext related to the Awards, eligibility criteria, program administration, regulations, etc., will be definitive and binding upon all applicants and participants.',
  'Formal consent to information verification and evaluation as per the platform’s norms. The company may use the applicant’s name and organization information on social media platforms, editorial material on the website as and when necessary.',
  'CORE Media Group, at any stage, will not reveal the ranking or placement of applicants, or their scores in the LeaderNext selection process.',
  'LeaderNext does not endorse, oppose or edit any opinions, recommendations or predictions posted by the participants or other members, except that LeaderNext may remove or delete what appears to be potentially unlawful content or content otherwise prohibited under these Terms and Conditions.',
];

export default function TermsAndConditionsPage() {
  return (
    <main className="cookie-policy-page terms-page">
      <section className="cookie-policy-hero">
        <div className="cookie-policy-header">
          <p className="cookie-policy-kicker">Terms and Conditions</p>
          <h1>Terms and Conditions</h1>
        </div>
      </section>

      <section className="cookie-policy-content">
        <div className="cookie-policy-section">
          <ul className="terms-and-conditions-list">
            {terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>

        <div className="cookie-policy-actions">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

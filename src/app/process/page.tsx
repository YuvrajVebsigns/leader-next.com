'use client';

import { CheckCircle, Award, Search } from 'lucide-react';
import PageHeroCard from '@/components/PageHeroCard';

const processSteps = [
  'Combining Data on achievements till date.',
  'Analyzing involvement in Associations and Industry groups.',
  'Random sampling of Social Media Engagement.',
  'Inputs from the executives themselves on the key achievements in the last 12 months.',
  'Undertaking leadership assessment to analyze interpersonal skills, emotional intelligence, and more.',
  'Shortlisted senior IT and digital executives will be interviewed by the panel of jurors to prepare a list of winners.',
];

const eligibility = [
  'A resident of India at the time of application.',
  'Applicants reporting directly to the CIO/CDO/ICT Leader/Senior Most ICT Decision Maker of the organization can apply.',
  'A minimum of 10 years of full-time work experience.',
  'Application only once per applicant permissible.',
  'Currently employed within a company or organization (self-employment is not eligible).',
  'Valid documentation of current work experience and personal details.',
  'Required permissions from current employer organization to be a part of LeaderNext 2026.',
];

export default function ProcessPage() {
  return (
    <main className="process-page">
      <PageHeroCard
        kicker="Process"
        title="LeaderNext Award Selection Process"
        description="LeaderNext is a transformative and influential platform dedicated to honouring the brightest technology minds of our nation who are poised to take on CXOs role in the future."
      />

      <section className="process-section">
        <div className="process-container process-grid">
          <div className="process-card large-card">
            <Award className="process-icon" size={38} />
            <h2>About LeaderNext</h2>
            <p>
              India’s leading CIOs and Business Leaders play the lead role in the selection of the
              LeaderNext award winners. The LeaderNext jury members cumulatively represent rich
              leadership experience backed with technical and digital expertise and are entrusted to
              define the award selection criteria, interview candidates, and approve the list of
              winners.
            </p>
            <p>
              The jury evaluates and appraises candidates based on their career achievements,
              professional expertise, and leadership potential to join the C-Suite.
            </p>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="process-container">
          <div className="section-heading">
            <span>How It Works</span>
            <h2>Complete Evaluation Process</h2>
          </div>

          <div className="timeline">
            {processSteps.map((step, index) => (
              <div className="timeline-item" key={step}>
                <div className="timeline-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="timeline-content">
                  <Search size={22} />
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section eligibility-section">
        <div className="process-container">
          <div className="section-heading">
            <span>Eligibility Criteria</span>
            <h2>LeaderNext 2026 Applicants</h2>
          </div>

          <div className="eligibility-grid">
            {eligibility.map((item) => (
              <div className="eligibility-card" key={item}>
                <CheckCircle size={22} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

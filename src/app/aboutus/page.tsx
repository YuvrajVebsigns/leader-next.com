'use client';

import Link from 'next/link';

export default function AboutUsPage() {
  // heroContentRef removed (not used)

  return (
    <>
      <section className="social-media-section" style={{ padding: '40px 24px' }}>
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              {/* ABOUT LEADERNEXT */}
              <h2>About LeaderNext</h2>

              <p className="social-media-highlight">
                <strong>LeaderNext</strong> is a transformative platform designed to recognize,
                mentor, and empower senior ICT and digital executives who have the potential to
                progress into future C-Suite leaders.
              </p>

              <p>
                The platform focuses on fostering innovation, continuous learning, leadership
                development, and meaningful networking. LeaderNext provides aspiring technology
                leaders with opportunities to learn from experienced industry leaders, strengthen
                their professional networks, and develop the skills required to make a lasting
                impact.
              </p>

              <p>
                Through carefully curated workshops, interactive sessions, and industry engagements,
                LeaderNext enables future leaders to gain valuable insights into technology
                leadership while building meaningful connections with peers and senior executives.
              </p>

              <p>
                <strong>LeaderNext 2026</strong> brings together promising technology leaders to
                celebrate their achievements, exchange knowledge, and prepare for the next stage of
                their leadership journey.
              </p>

              <ul>
                <li>
                  <strong>100+ attendees</strong> join us to celebrate and raise a toast to
                  trailblazing technology leaders.
                </li>

                <li>
                  <strong>Esteemed Jury Panel</strong> consisting of technology and business
                  leaders.
                </li>

                <li>
                  <strong>Winners selected</strong> through a defined evaluation process and jury
                  selection.
                </li>

                <li>
                  <strong>Exclusive workshops</strong> and insightful sessions curated for future
                  technology leaders.
                </li>

                <li>
                  <strong>Networking opportunities</strong> to learn, engage, and collaborate with
                  industry peers.
                </li>
              </ul>

              <p>
                LeaderNext is dedicated to identifying and honouring India&apos;s brightest
                technology professionals who demonstrate the potential to take on future CXO roles.
              </p>

              <p>
                India&apos;s leading CIOs and business leaders play an important role in selecting
                the LeaderNext award winners. The jury brings extensive leadership, technical, and
                digital expertise and is responsible for defining the evaluation criteria,
                interviewing candidates, and approving the final list of winners.
              </p>

              <p>
                Candidates are evaluated based on their career achievements, professional expertise,
                leadership capabilities, and potential to progress into the C-Suite.
              </p>

              <p>The complete evaluation process includes:</p>

              <ul>
                <li>Reviewing achievements and professional accomplishments to date.</li>

                <li>Analysing participation in professional associations and industry groups.</li>

                <li>Reviewing relevant social media engagement through random sampling.</li>

                <li>
                  Gathering inputs from executives regarding their key achievements during the
                  previous 12 months.
                </li>

                <li>
                  Conducting leadership assessments covering interpersonal skills, emotional
                  intelligence, and other leadership capabilities.
                </li>

                <li>
                  Interviewing shortlisted senior IT and digital executives with the jury panel to
                  determine the final list of winners.
                </li>
              </ul>

              <p>
                The eligibility criteria for applicants of
                <strong> LeaderNext 2026</strong> are:
              </p>

              <ul>
                <li>Must be a resident of India at the time of application.</li>

                <li>
                  Applicants must report directly to the CIO, CDO, ICT Leader, or senior-most ICT
                  decision maker of their organisation.
                </li>

                <li>
                  Minimum <strong>10 years of full-time work experience</strong>.
                </li>

                <li>Only one application is permitted per applicant.</li>

                <li>
                  Applicants must currently be employed by a company or organisation. Self-employed
                  applicants are not eligible.
                </li>

                <li>
                  Applicants must provide valid documentation confirming current employment and
                  personal details.
                </li>

                <li>
                  Required permission must be obtained from the applicant&apos;s current employer to
                  participate in LeaderNext 2026.
                </li>
              </ul>

              <p>
                LeaderNext brings together some of India&apos;s most promising senior IT and digital
                executives for an enriching leadership development experience.
              </p>

              <p>
                The platform provides a unique opportunity for the C-Suite to support and develop
                their aspiring team members while helping them build stronger leadership
                capabilities and prepare for future technology leadership roles.
              </p>

              <p>
                Participants get the opportunity to learn from India&apos;s leading IT leaders,
                develop their leadership style, and build meaningful relationships with influential
                industry stakeholders.
              </p>

              <p>
                By partnering with LeaderNext, organisations gain access to an exclusive gathering
                of <strong>150+ ICT decision-makers</strong>
                representing diverse industry verticals. The platform creates an environment that
                encourages dialogue, knowledge sharing, engagement, and long-term collaboration.
              </p>

              <p>
                Through thoughtfully curated workshops and interactive sessions, LeaderNext creates
                meaningful engagement and opportunities to build enduring professional
                relationships.
              </p>

              <p>
                <strong>
                  Join us in creating a positive brand impact and building connections that last a
                  lifetime.
                </strong>
              </p>

              {/* BACK BUTTON */}
              <div className="social-media-back">
                <Link href="/" className="social-media-back-btn">
                  ← Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-media-section">
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              <img
                src="/assets/aboutus/about-core.png"
                alt="Explore CIO Choice"
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  marginBottom: '30px',
                  objectFit: 'cover',
                }}
              />

              <h2>Explore CORE Media</h2>

              <div className="social-media-back">
                <a
                  href="https://website.uatcoremedia.vebsigns.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-media-back-btn"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

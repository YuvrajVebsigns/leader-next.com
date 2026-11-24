import Image from 'next/image';

const partnerBenefits = [
  {
    title: 'Gain Exposure',
    description: 'Position your brand, solutions, and innovations to business and tech leaders',
    image: '/assets/partners-home/1 red.png',
    hoverImage: '/assets/partners-home/1 white.png',
  },
  {
    title: 'Direct access',
    description: 'Meet and learn from the industry’s top leaders and decision-makers',
    image: '/assets/partners-home/2nd red.png',
    hoverImage: '/assets/partners-home/2nd white.png',
  },
  {
    title: 'Lead Generation',
    description: 'Network with potential new clients and explore new business opportunities',
    image: '/assets/partners-home/3rd red.png',
    hoverImage: '/assets/partners-home/3 white.png',
  },
  {
    title: 'Strengthen business relationships',
    description: 'Reconnect with existing and prospective customers in a relaxed setting',
    image: '/assets/partners-home/4th red.png',
    hoverImage: '/assets/partners-home/4th white.png',
  },
  {
    title: 'Discover actionable insights',
    description:
      'Participate and experience informative sessions on the latest trends and top industry priorities.',
    image: '/assets/partners-home/5th red.png',
    hoverImage: '/assets/partners-home/5th white',
  },
];

export default function PartnerSection() {
  return (
    <section className="partners-section" aria-labelledby="partner-heading">
      <div className="partners-container leadernext-about-container">
        <div className="leadernext-about-header">
          <span className="leadernext-eyebrow">PARTNER</span>
        </div>

        <div className="leadernext-content-card">
          <h2 id="partner-heading">Why Partner?</h2>
          <p>
            LeaderNext is the quintessential platform that unites the most esteemed senior IT &
            digital executives in the country for an enriching and immersive program.
          </p>

          <p>
            As a pivotal event for the technology leadership landscape, LeaderNext presents a unique
            opportunity for the C-Suite to provide maximum exposure and enhance the leadership
            skills of their aspiring team members. LeaderNext will enable these senior IT & digital
            executives to learn from the nation’s top IT leaders and to develop a distinguished
            leadership style for their future endeavours.
          </p>

          <p>
            Our platform provides them with a unique chance to forge meaningful connections with key
            industry stakeholders in an environment designed to foster engagement – the hallmark of
            CORE Media.
          </p>

          <p>
            By partnering with us, you’ll have access to an exclusive gathering of India’s top 150+
            ICT decision-makers from diverse industry verticals. Together, we will create an
            impactful experience that cultivates dialogue and opens doors to powerful future
            business leaders.
          </p>

          <p>
            Through thoughtfully curated sessions and workshops, LeaderNext drives deep engagement,
            setting the stage for enduring connections and transformative collaborations.
          </p>

          <p className="leadernext-highlight">
            Join forces with us to make a positive brand impact and build connections that last a
            lifetime!
          </p>
        </div>

        <div className="leadernext-feature-grid">
          {partnerBenefits.map(({ title, description, image, hoverImage }) => (
            <article className="leadernext-feature-card" key={title}>
              <div className="leadernext-icon-box">
                <Image
                  src={image}
                  alt=""
                  width={100}
                  height={100}
                  className="leadernext-feature-icon leadernext-feature-icon-primary"
                />
                <Image
                  src={hoverImage}
                  alt=""
                  width={100}
                  height={100}
                  className="leadernext-feature-icon leadernext-feature-icon-hover"
                />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

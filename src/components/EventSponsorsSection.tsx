'use client';

import Image from 'next/image';
import type { WebsiteSponsor } from '@/services/sponsors.service';

type EventSponsorsSectionProps = {
  sponsors: WebsiteSponsor[];
};

function getTierClass(tier?: string) {
  if (!tier) return 'event-sponsor-tier-default';
  return `event-sponsor-tier-${tier.toLowerCase()}`;
}

export default function EventSponsorsSection({ sponsors }: EventSponsorsSectionProps) {
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="event-sponsors-section" aria-labelledby="event-sponsors-heading">
      <div className="event-details-sidebar-card event-sponsors-card">
        <h3 id="event-sponsors-heading">Event Sponsors</h3>
        <p>Our partners supporting this event.</p>

        <div className="event-sponsors-grid">
          {sponsors.map((sponsor) => (
            <article key={sponsor.id} className="event-sponsor-card">
              {sponsor.logoUrl ? (
                <div className="event-sponsor-logo-wrap">
                  <Image
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    width={160}
                    height={56}
                    className="event-sponsor-logo"
                    unoptimized={sponsor.logoUrl.startsWith('http')}
                  />
                </div>
              ) : null}

              <div className="event-sponsor-meta">
                <strong className="event-sponsor-name">{sponsor.name}</strong>
                {sponsor.tier ? (
                  <span className={`event-sponsor-tier ${getTierClass(sponsor.tier)}`}>
                    {sponsor.tier}
                  </span>
                ) : null}
                {sponsor.description ? (
                  <p className="event-sponsor-description">{sponsor.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

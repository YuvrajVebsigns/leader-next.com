import Link from 'next/link';
import { speakerEntries } from './speakerData';
import PageHeroCard from '@/components/PageHeroCard';

export default function SpeakersPage() {
  return (
    <main className="speakers-page">
      <PageHeroCard
        kicker="Speakers"
        title="Speakers by Year"
        description="Browse the speaker archive from 2016 through 2025 using the navbar dropdown or these direct route cards."
      />

      <section className="speakers-grid">
        {speakerEntries.map((speaker) => (
          <Link key={speaker.slug} href={speaker.route} className="speaker-card">
            <span className="speaker-card-label">{speaker.label}</span>
            <strong>{speaker.label}</strong>
            <p>{speaker.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

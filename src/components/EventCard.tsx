import Image from 'next/image';
import Link from 'next/link';

type EventCardProps = {
  title: string;
  category: string;
  image: string;
  href: string;
};

export default function EventCard({ title, category, image, href }: EventCardProps) {
  return (
    <Link href={href} className="event-card-link" aria-label={`View ${title}`}>
      <article className="event-card">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="event-card-image"
          unoptimized={image.startsWith('http')}
        />
        <div className="event-card-overlay">
          <span className="event-card-category">{category}</span>
          <h3 className="event-card-title">{title}</h3>
        </div>
      </article>
    </Link>
  );
}

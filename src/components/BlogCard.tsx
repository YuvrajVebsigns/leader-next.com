import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type BlogCardProps = {
  title: string;
  authorName?: string;
  excerpt?: string;
  image: string;
  imageAlt?: string;
  href: string;
  footerContent?: ReactNode;
  onImageError?: () => void;
};

export default function BlogCard({
  title,
  authorName,
  excerpt,
  image,
  imageAlt,
  href,
  footerContent,
  onImageError,
}: BlogCardProps) {
  return (
    <article className="blog-design-card">
      <div className="blog-design-image-wrapper">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
          className="blog-design-image"
          unoptimized
          onError={onImageError}
        />
      </div>

      <div className="blog-design-content">
        <h2 className="blog-design-title">{title}</h2>
        {authorName ? (
          <p className="blog-design-author">
            By <strong>{authorName}</strong>
          </p>
        ) : null}
        {excerpt ? <p className="blog-design-excerpt">{excerpt}</p> : null}

        <div className="blog-design-footer">
          <Link href={href} className="blog-design-read-more">
            <span>Read More</span>
            <span className="blog-design-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          {footerContent}
        </div>
      </div>
    </article>
  );
}

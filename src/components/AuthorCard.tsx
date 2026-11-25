import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import styles from './AuthorCard.module.css';

export type AuthorCardArticle = {
  title: string;
  href: string;
  publishedAt?: string;
};

export type AuthorCardProfile = {
  name: string;
  imageUrl?: string;
  designation?: string;
  company?: string;
  linkedInUrl?: string;
};

type AuthorCardProps = {
  author: AuthorCardProfile;
  articles: AuthorCardArticle[];
  allPostsHref: string;
  isLoadingArticles: boolean;
  onClose: () => void;
};

export default function AuthorCard({
  author,
  articles,
  allPostsHref,
  isLoadingArticles,
  onClose,
}: AuthorCardProps) {
  const name = author.name.trim() || 'Author';

  return (
    <aside
      id="blog-author-card"
      className={`${styles.card} ${styles.detail}`}
      aria-label={`${name} author profile`}
    >
      <span className={styles.detailDecoration} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.portrait}>
          <span className={styles.portraitAccent} aria-hidden="true" />
          {author.imageUrl ? (
            <Image
              className={styles.avatar}
              src={author.imageUrl}
              alt={name}
              width={88}
              height={88}
            />
          ) : (
            <span className={styles.initials} aria-hidden="true">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className={styles.identity}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.meta}>
            <p>
              {author.designation && author.company ? (
                <>
                  {author.designation} at{' '}
                  <strong className={styles.company}>{author.company}</strong>
                </>
              ) : (
                author.designation || author.company || 'Contributor'
              )}
            </p>
            {author.linkedInUrl ? (
              <a
                className={styles.linkedin}
                href={author.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name} on LinkedIn`}
              >
                <span className={styles.linkedinIcon} aria-hidden="true">
                  in
                </span>
              </a>
            ) : null}
          </div>
        </div>

        <button type="button" className={styles.close} onClick={onClose} aria-label="Close profile">
          <X size={16} aria-hidden="true" />
        </button>
      </header>

      <section className={styles.articles} aria-labelledby="author-card-articles">
        <h3 id="author-card-articles" className={styles.articlesTitle}>
          Latest insights
        </h3>

        {isLoadingArticles ? (
          <p className={styles.emptyMessage}>Loading articles…</p>
        ) : articles.length > 0 ? (
          <ul className={styles.articleList}>
            {articles.map((article) => (
              <li key={article.href}>
                <Link className={styles.post} href={article.href}>
                  <span className={styles.postContent}>
                    <strong className={styles.articleName}>{article.title}</strong>
                    {article.publishedAt ? (
                      <time className={styles.articleDate}>{article.publishedAt}</time>
                    ) : null}
                  </span>
                  <span className={styles.postArrow} aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>No articles available yet.</p>
        )}

        <Link className={styles.allPosts} href={allPostsHref}>
          View all posts <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    </aside>
  );
}

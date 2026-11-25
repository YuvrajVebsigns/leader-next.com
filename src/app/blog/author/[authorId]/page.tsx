'use client';

import BlogCard from '@/components/BlogCard';
import { createBlogAuthorSlug } from '@/lib/blog-author';
import {
  fetchWebsiteBlogs,
  getWebsiteBlogImage,
  submitWebsiteBlogLike,
  type WebsiteBlogItem,
} from '@/services/blogs.service';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import styles from './AuthorArchive.module.css';

function getAuthorName(blog: WebsiteBlogItem): string {
  return blog.author?.name?.trim() || blog.author?.fullName?.trim() || '';
}

function getBlogDescription(blog: WebsiteBlogItem): string {
  return blog.excerpt || blog.seo?.metaDescription || '';
}

const LIKED_BLOGS_KEY = 'likedBlogs';

function readLikedBlogIds(): Set<string> {
  try {
    const raw = window.localStorage.getItem(LIKED_BLOGS_KEY);
    if (!raw) return new Set();

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.map(String)) : new Set();
  } catch {
    return new Set();
  }
}

function saveBlogLikeState(blogId: string, liked: boolean): boolean {
  try {
    const likedIds = readLikedBlogIds();
    if (liked) {
      likedIds.add(blogId);
    } else {
      likedIds.delete(blogId);
    }

    window.localStorage.setItem(LIKED_BLOGS_KEY, JSON.stringify(Array.from(likedIds)));
    return true;
  } catch {
    return false;
  }
}

function AuthorArchiveBlogCard({
  blog,
  authorName,
}: {
  blog: WebsiteBlogItem;
  authorName: string;
}) {
  const initialLikes =
    typeof blog.engagement?.likes === 'number' && blog.engagement.likes > 0
      ? blog.engagement.likes
      : 0;
  const comments =
    typeof blog.engagement?.commentsCount === 'number' ? blog.engagement.commentsCount : 0;
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmittingLike, setIsSubmittingLike] = useState(false);
  const [likeError, setLikeError] = useState('');

  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(readLikedBlogIds().has(String(blog.id)));
  }, [blog.id, initialLikes]);

  async function handleLikeClick() {
    if (isSubmittingLike) return;

    setLikeError('');

    if (isLiked) {
      setIsLiked(false);
      setLikes((count) => Math.max(0, count - 1));
      if (!saveBlogLikeState(String(blog.id), false)) {
        setLikeError('Your like preference could not be saved on this device.');
      }
      return;
    }

    setIsLiked(true);
    setLikes((count) => count + 1);
    setIsSubmittingLike(true);

    try {
      await submitWebsiteBlogLike(blog.id);
      if (!saveBlogLikeState(String(blog.id), true)) {
        setLikeError('Your like was saved, but this device could not remember it.');
      }
    } catch (likeRequestError) {
      setIsLiked(false);
      setLikes((count) => Math.max(0, count - 1));
      saveBlogLikeState(String(blog.id), false);
      setLikeError(
        likeRequestError instanceof Error ? likeRequestError.message : 'Could not save your like.',
      );
    } finally {
      setIsSubmittingLike(false);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <BlogCard
        title={blog.title}
        authorName={getAuthorName(blog) || authorName}
        excerpt={getBlogDescription(blog)}
        image={getWebsiteBlogImage(blog)}
        imageAlt={blog.title}
        href={`/blog/${blog.slug}`}
        footerContent={
          <span className={`${styles.engagement} blog-design-footer-extra`}>
            <button
              type="button"
              className={`${styles.engagementItem} ${styles.likeButton} ${isLiked ? styles.liked : ''}`}
              aria-label={isLiked ? `Unlike blog, ${likes} likes` : `Like blog, ${likes} likes`}
              aria-pressed={isLiked}
              disabled={isSubmittingLike}
              onClick={(event) => {
                event.stopPropagation();
                void handleLikeClick();
              }}
            >
              <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
              {likes}
            </button>
            <span className={styles.engagementItem} aria-label={`${comments} comments`}>
              <MessageCircle size={13} aria-hidden="true" />
              {comments}
            </span>
          </span>
        }
      />
      {likeError ? (
        <p className={styles.likeError} role="status">
          {likeError}
        </p>
      ) : null}
    </div>
  );
}

export default function AuthorArchivePage() {
  const params = useParams<{ authorId: string }>();
  const authorSlug = params.authorId;
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWebsiteBlogs(1, 100);
        if (isMounted) {
          setBlogs(response.data?.data ?? []);
        }
      } catch (fetchError) {
        if (isMounted) {
          setBlogs([]);
          setError(
            fetchError instanceof Error ? fetchError.message : 'Failed to load author posts.',
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const authorBlogs = useMemo(
    () => blogs.filter((blog) => createBlogAuthorSlug(getAuthorName(blog)) === authorSlug),
    [authorSlug, blogs],
  );
  const authorName = authorBlogs[0] ? getAuthorName(authorBlogs[0]) : '';
  const filteredBlogs = useMemo(() => {
    const query = appliedSearch.toLowerCase();
    if (!query) return authorBlogs;

    return authorBlogs.filter((blog) =>
      [blog.title, getBlogDescription(blog), getAuthorName(blog), blog.tags?.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [appliedSearch, authorBlogs]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedSearch(searchValue.trim());
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          More insights from{' '}
          {authorName ||
            authorSlug
              .split('-')
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' ')}
        </h1>

        <div className={styles.toolbar}>
          <Link className={styles.back} href="/blog">
            <ArrowLeft size={15} aria-hidden="true" />
            Back
          </Link>

          <form className={styles.search} onSubmit={handleSearch} role="search">
            <input
              aria-label="Search this author's posts"
              type="search"
              placeholder="Search blogs, topics or authors"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className={styles.grid}>
          {isLoading ? <p className={styles.status}>Loading posts...</p> : null}
          {!isLoading && error ? <p className={styles.status}>{error}</p> : null}
          {!isLoading && !error && filteredBlogs.length === 0 ? (
            <p className={styles.status}>No posts found for this author.</p>
          ) : null}
          {!isLoading && !error
            ? filteredBlogs.map((blog) => (
                <AuthorArchiveBlogCard key={blog.id} blog={blog} authorName={authorName} />
              ))
            : null}
        </div>
      </div>
    </main>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUpLeft, ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLink, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import BlogCommentsPanel from '@/components/BlogCommentsPanel';
import AuthorCard from '@/components/AuthorCard';
import { createBlogAuthorSlug } from '@/lib/blog-author';
import {
  getWebsiteBlogImage,
  fetchWebsiteBlogBySlug,
  fetchWebsiteBlogs,
  type WebsiteBlogContentBlock,
  type WebsiteBlogDetailItem,
  type WebsiteBlogItem,
} from '@/services/blogs.service';
import shareStyles from '@/components/ShareFeedback.module.css';

function AnimatedBlock({
  children,
  className = '',
  animationClass = 'animate-fade-in',
  initialTransform = 'translateY(24px)',
}: {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  initialTransform?: string;
}) {
  const ref = useScrollAnimation<HTMLDivElement>({ animationClass, initialTransform });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function formatPublishedDate(value?: string) {
  if (!value) return '';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getBlogContentBlocks(blog?: WebsiteBlogDetailItem | null) {
  return Array.isArray(blog?.content?.blocks) ? blog.content.blocks : [];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function renderBlock(block: WebsiteBlogContentBlock | null | undefined, index: number) {
  if (!isObject(block)) return null;

  const key = typeof block.id === 'string' ? block.id : `${String(block.type ?? 'block')}-${index}`;
  const type = typeof block.type === 'string' ? block.type.toLowerCase() : '';
  const data = isObject(block.data) ? block.data : undefined;

  if (type === 'header') {
    const level = typeof data?.level === 'number' ? data.level : 2;
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    if (level <= 2) {
      return (
        <h2 key={key} className="blog-content-heading">
          {text}
        </h2>
      );
    }

    return (
      <h3 key={key} className="blog-content-subheading">
        {text}
      </h3>
    );
  }

  if (type === 'paragraph') {
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    return (
      <p key={key} className="blog-content-paragraph" dangerouslySetInnerHTML={{ __html: text }} />
    );
  }

  if (type === 'list') {
    const items = Array.isArray(data?.items)
      ? data.items.filter((item): item is string => typeof item === 'string')
      : [];

    if (!items.length) return null;

    return (
      <ul key={key} className="overview-list">
        {items.map((item) => (
          <li key={item}>
            <strong>{item}</strong>
          </li>
        ))}
      </ul>
    );
  }

  if (type === 'image') {
    const file = isObject(data?.file) ? data.file : undefined;
    const url = typeof file?.url === 'string' ? file.url : '';
    if (!url) return null;

    return (
      <div key={key} className="blog-content-image-wrap">
        <Image
          src={url}
          alt={typeof data?.caption === 'string' ? data.caption : 'Blog image'}
          width={1200}
          height={675}
          className="blog-content-image"
          unoptimized
        />
      </div>
    );
  }

  if (type === 'quote') {
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    return (
      <blockquote key={key} className="blog-content-quote">
        {text}
      </blockquote>
    );
  }

  if (type === 'delimiter') {
    return <hr key={key} style={{ margin: '24px 0' }} />;
  }

  return null;
}

export default function BlogDetailsPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');

  const [blog, setBlog] = useState<WebsiteBlogDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copyLinkStatus, setCopyLinkStatus] = useState<'copied' | 'error' | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isAuthorCardOpen, setIsAuthorCardOpen] = useState(false);
  const [latestAuthorBlogs, setLatestAuthorBlogs] = useState<WebsiteBlogItem[]>([]);
  const [isLoadingAuthorBlogs, setIsLoadingAuthorBlogs] = useState(false);
  const copyLinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAuthorCardOpen) return;

    function closeAuthorCardOnOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (
        !(target instanceof Element) ||
        !target.closest('#blog-author-card, .blog-author-trigger')
      ) {
        setIsAuthorCardOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeAuthorCardOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeAuthorCardOnOutsideClick);
  }, [isAuthorCardOpen]);

  useEffect(() => {
    if (!isCommentsOpen) return;

    function closeCommentsOnOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (
        !(target instanceof Element) ||
        !target.closest('#blog-comments-popover, .blog-comments-toggle')
      ) {
        setIsCommentsOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeCommentsOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeCommentsOnOutsideClick);
  }, [isCommentsOpen]);

  useEffect(
    () => () => {
      if (copyLinkTimeoutRef.current) {
        clearTimeout(copyLinkTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadBlog() {
      if (!slug) {
        if (isMounted) {
          setError('Blog slug is missing.');
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWebsiteBlogBySlug(slug);

        if (isMounted) {
          setBlog(response);
          setError(response ? null : 'Blog not found.');
        }
      } catch (fetchError) {
        if (isMounted) {
          setBlog(null);
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load blog');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!isAuthorCardOpen) return;

    let isMounted = true;

    async function loadAuthorBlogs() {
      setIsLoadingAuthorBlogs(true);

      try {
        const response = await fetchWebsiteBlogs(1, 10);
        const blogs = response.data?.data ?? [];
        const otherBlogs = blogs.filter((item) => item.slug !== slug);
        const sameAuthorBlogs = blog?.author?.id
          ? otherBlogs.filter((item) => item.author?.id === blog.author?.id)
          : [];

        if (isMounted) {
          setLatestAuthorBlogs((sameAuthorBlogs.length ? sameAuthorBlogs : otherBlogs).slice(0, 3));
        }
      } catch {
        if (isMounted) {
          setLatestAuthorBlogs([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingAuthorBlogs(false);
        }
      }
    }

    loadAuthorBlogs();

    return () => {
      isMounted = false;
    };
  }, [blog?.author?.id, isAuthorCardOpen, slug]);

  if (isLoading) {
    return (
      <main className="blog-detail-page">
        <p style={{ padding: '80px 20px', textAlign: 'center' }}>Loading blog...</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="not-found-page">
        <Image src="/assets/404.png" alt="Blog Not Found" width={700} height={500} />

        <h1>Blog Not Found</h1>

        <p>
          The article you&apos;re looking for may have been moved, removed, or is no longer
          available. Discover our latest blogs and stay informed with fresh insights.
        </p>

        <Link href="/blog" className="backbutton">
          <div className="backbutton-icon">
            <ArrowUpLeft size={18} />
          </div>

          <span>Back to Blog</span>
        </Link>
      </main>
    );
  }

  const displayTitle = blog.title;
  const displayExcerpt = blog.excerpt?.trim() || blog.seo?.metaDescription?.trim() || '';
  const displayDate = formatPublishedDate(blog.publishedAt);
  const authorName = blog.author?.name ?? blog.author?.fullName;
  const displayAuthor = typeof authorName === 'string' ? authorName.trim() : '';
  const authorSlug = createBlogAuthorSlug(displayAuthor);
  const isAnoopMathur = displayAuthor.toLowerCase() === 'anoop mathur';
  const authorProfile = {
    name: displayAuthor,
    imageUrl: isAnoopMathur ? '/assets/team/Anoop-Mathur.png' : undefined,
    designation: isAnoopMathur ? 'Founder' : undefined,
    company: isAnoopMathur ? 'CORE MEDIA' : undefined,
    linkedInUrl: isAnoopMathur ? 'https://www.linkedin.com/in/mathuranoop/' : undefined,
  };
  const authorArticles = latestAuthorBlogs.map((item) => ({
    title: item.title,
    href: `/blog/${item.slug}`,
    publishedAt: formatPublishedDate(item.publishedAt),
  }));
  const displayImage = getWebsiteBlogImage(blog);
  const contentBlocks = getBlogContentBlocks(blog);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';

  function openExternal(url: string) {
    try {
      window.open(url, '_blank', 'noopener');
    } catch (_) {
      // ignore
    }
  }
  async function handleShareWhatsApp() {
    const waUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;
    openExternal(waUrl);
    setShowShareOptions(false);
  }

  async function handleShareFacebook() {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    openExternal(fbUrl);
    setShowShareOptions(false);
  }

  async function handleShareTwitter() {
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(displayTitle || '')}&url=${encodeURIComponent(shareUrl)}`;
    openExternal(twUrl);
    setShowShareOptions(false);
  }

  async function handleShareInstagram() {
    const igWeb = `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`;
    openExternal(igWeb);
    setShowShareOptions(false);
  }

  // minimal helpers kept; unused icon components removed to satisfy linter

  async function copyLinkToClipboard() {
    if (copyLinkTimeoutRef.current) {
      clearTimeout(copyLinkTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyLinkStatus('copied');
    } catch (_) {
      setCopyLinkStatus('error');
    }

    copyLinkTimeoutRef.current = setTimeout(() => setCopyLinkStatus(null), 2200);
  }

  return (
    <main className="blog-detail-page">
      <article className="blogpage-card blogpage-stacked">
        <AnimatedBlock
          className="blogpage-media"
          animationClass="animate-fade-in"
          initialTransform="translateY(28px)"
        >
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            priority
            className="blogpage-media-image"
            unoptimized
          />
        </AnimatedBlock>

        <div className="blogpage-body blog-detail-layout">
          <AnimatedBlock
            className="blogpage-content"
            animationClass="animate-fade-in-left"
            initialTransform="translateX(-24px)"
          >
            <div className="blogpage-title-row">
              <h1 className="blogpage-title">{displayTitle}</h1>

              <div className="blog-comments-widget">
                <button
                  type="button"
                  className="blog-comments-toggle"
                  onClick={() => setIsCommentsOpen((isOpen) => !isOpen)}
                  aria-label={isCommentsOpen ? 'Close comments' : 'Open comments'}
                  aria-expanded={isCommentsOpen}
                  aria-controls={isCommentsOpen ? 'blog-comments-popover' : undefined}
                >
                  <Image
                    src="/assets/blogs/comment.png"
                    alt=""
                    width={55}
                    height={55}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {displayExcerpt ? <p className="blogpage-intro">{displayExcerpt}</p> : null}

            {displayDate || displayAuthor ? (
              <div className="blogpage-published-info">
                {displayDate ? <p className="blogpage-meta">Published on {displayDate}</p> : null}
                {displayAuthor ? (
                  <p className="blogpage-meta">
                    By{' '}
                    <button
                      type="button"
                      className="blog-author-trigger"
                      onClick={() => setIsAuthorCardOpen((isOpen) => !isOpen)}
                      aria-expanded={isAuthorCardOpen}
                      aria-controls={isAuthorCardOpen ? 'blog-author-card' : undefined}
                    >
                      {displayAuthor}
                    </button>
                  </p>
                ) : null}
              </div>
            ) : null}

            {isCommentsOpen ? (
              <aside
                id="blog-comments-popover"
                className="blog-comments-popover"
                aria-label="Comments"
              >
                <header className="blog-comments-popover-header">
                  <div>
                    <h2>Comments</h2>
                    {/* <p>Join the conversation</p> */}
                  </div>
                  <button
                    type="button"
                    className="blog-comments-popover-close"
                    onClick={() => setIsCommentsOpen(false)}
                    aria-label="Close comments"
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </header>

                {blog.id ? (
                  <BlogCommentsPanel blogId={String(blog.id)} />
                ) : (
                  <p className="blog-comments-panel-status">No comments available.</p>
                )}
              </aside>
            ) : null}

            {isAuthorCardOpen ? (
              <AuthorCard
                author={authorProfile}
                articles={authorArticles}
                allPostsHref={authorSlug ? `/blog/author/${authorSlug}` : '/blog'}
                isLoadingArticles={isLoadingAuthorBlogs}
                onClose={() => setIsAuthorCardOpen(false)}
              />
            ) : null}

            <div className="blog-content-blocks">
              {contentBlocks.map((block, index) => renderBlock(block, index))}
            </div>
            <div className="blog-author-card-clear" aria-hidden="true" />

            <div className="blog-detail-actions">
              <AnimatedBlock
                className="blog-back-link"
                animationClass="animate-fade-in"
                initialTransform="translateY(18px)"
              >
                <Link href="/blog" className="backbutton">
                  <div className="backbutton-icon">
                    <ArrowUpLeft size={18} />
                  </div>

                  <span>Back to Blog</span>
                </Link>
              </AnimatedBlock>

              <AnimatedBlock
                className="blog-back-link"
                animationClass="animate-fade-in"
                initialTransform="translateY(18px)"
              >
                <div className="share-container">
                  <button
                    type="button"
                    className="talk-btn"
                    onClick={() => setShowShareOptions((s) => !s)}
                    aria-expanded={showShareOptions}
                    aria-haspopup="menu"
                    id="share-button"
                  >
                    <span>Share Blog</span>
                    <div className="talk-btn-icon">
                      <ArrowUpRight size={18} />
                    </div>
                  </button>

                  {showShareOptions ? (
                    <div className="share-popup" role="menu" aria-labelledby="share-button">
                      <button
                        type="button"
                        onClick={handleShareWhatsApp}
                        className="share-option whatsapp"
                        role="menuitem"
                        aria-label="Share on WhatsApp"
                        title="WhatsApp"
                      >
                        <FaWhatsapp aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleShareFacebook}
                        className="share-option facebook"
                        role="menuitem"
                        aria-label="Share on Facebook"
                        title="Facebook"
                      >
                        <FaFacebookF aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleShareTwitter}
                        className="share-option twitter"
                        role="menuitem"
                        aria-label="Share on X"
                        title="X"
                      >
                        <FaXTwitter aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleShareInstagram}
                        className="share-option instagram"
                        role="menuitem"
                        aria-label="Share on Instagram"
                        title="Instagram"
                      >
                        <FaInstagram aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={copyLinkToClipboard}
                        className={`share-option copy ${shareStyles.copyButton}`}
                        role="menuitem"
                        aria-label="Copy blog link"
                        title="Copy link"
                      >
                        <FaLink aria-hidden="true" />
                        {copyLinkStatus ? (
                          <span
                            id="share-copy-feedback"
                            className={`${shareStyles.feedback} ${
                              copyLinkStatus === 'error' ? shareStyles.feedbackError : ''
                            }`}
                            role="status"
                          >
                            {copyLinkStatus === 'copied' ? 'Link copied' : 'Could not copy link'}
                          </span>
                        ) : null}
                      </button>
                    </div>
                  ) : null}
                </div>
              </AnimatedBlock>
            </div>
          </AnimatedBlock>
        </div>
      </article>
    </main>
  );
}

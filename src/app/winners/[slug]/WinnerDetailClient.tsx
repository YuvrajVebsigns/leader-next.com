'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.service';

type WinnerDetailClientProps = {
  slug: string;
  kicker?: string;
};

type TestimonialSection = {
  title: string;
  testimonials: unknown[];
};

/* =========================================
   FALLBACK IMAGE
========================================= */

const FALLBACK_WINNER_IMAGE = '/assets/logo/leader-next-logo.png';

/* =========================================
   WINNER CARD
========================================= */

function WinnerCard({
  testimonial,
  sectionTitle,
  index,
}: {
  testimonial: unknown;
  sectionTitle: string;
  index: number;
}) {
  const entry = testimonial as Record<string, unknown>;

  const winnerName =
    typeof entry.author === 'string' && entry.author.trim() ? entry.author.trim() : 'Winner Name';

  const winnerImage =
    typeof entry.avatar === 'string' && entry.avatar.trim()
      ? entry.avatar.trim()
      : FALLBACK_WINNER_IMAGE;

  const role = typeof entry.role === 'string' && entry.role.trim() ? entry.role.trim() : 'Winner';

  const quote = typeof entry.quote === 'string' && entry.quote.trim() ? entry.quote.trim() : '';

  return (
    <article
      key={`${sectionTitle}-${index}`}
      className="winner-profile-card winner-profile-card--red"
    >
      {/* =================================
          WINNER IMAGE
      ================================= */}

      <div className="winner-profile-media">
        <img
          src={winnerImage}
          alt={winnerName}
          className="winner-profile-image"
          onError={(event) => {
            const image = event.currentTarget;

            /*
             * If API image fails,
             * replace it with fallback image.
             */
            if (!image.src.endsWith(FALLBACK_WINNER_IMAGE)) {
              image.src = FALLBACK_WINNER_IMAGE;
            }
          }}
        />
      </div>

      {/* =================================
          WINNER INFORMATION
      ================================= */}

      <div className="winner-profile-body">
        <h3>{winnerName}</h3>

        <p className="winner-profile-category">{role}</p>

        {quote ? <p className="winner-profile-company">&quot;{quote}&quot;</p> : null}
      </div>
    </article>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function WinnerDetailClient({ slug, kicker }: WinnerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================================
     LOAD PAGE
  ========================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWebsitePageBySlug(slug);

        if (!isMounted) return;

        if (response?.success && response.data) {
          setPage(response.data);
          return;
        }

        setError(response?.message ?? 'Unable to load winner page.');
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Unable to load winner page. Please try again.',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* =========================================
     LOADING
  ========================================= */

  if (isLoading) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Loading winner...</p>

          <p>Fetching page data for {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load winner</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  /* =========================================
     PAGE NOT FOUND
  ========================================= */

  if (!page) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Winner not found</p>

          <p>No winner page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================
     PAGE SECTIONS
  ========================================= */

  const pageSections: unknown[] = Array.isArray(page.sections) ? page.sections : [];

  const pageBlocks: unknown[] = Array.isArray(page.content?.blocks) ? page.content.blocks : [];

  /* =========================================
     GET ITEMS FROM SECTION
  ========================================= */

  const getSectionItems = (section: unknown): unknown[] => {
    if (Array.isArray(section)) {
      return section;
    }

    if (typeof section !== 'object' || section === null) {
      return [];
    }

    const sectionRecord = section as Record<string, unknown>;

    const data =
      sectionRecord.data && typeof sectionRecord.data === 'object'
        ? (sectionRecord.data as Record<string, unknown>)
        : undefined;

    const candidates: unknown[] = [];

    if (data) {
      candidates.push(
        data.testimonials,
        data.items,
        data.members,
        data.winners,
        data.rows,
        data.blocks,
        data.values,
      );
    }

    candidates.push(
      sectionRecord.testimonials,
      sectionRecord.items,
      sectionRecord.members,
      sectionRecord.winners,
      sectionRecord.rows,
      sectionRecord.blocks,
      sectionRecord.values,
    );

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }

    return [];
  };

  /* =========================================
     BUILD SECTIONS
  ========================================= */

  const buildSections = (items: unknown[]): TestimonialSection[] =>
    items
      .map((section) => {
        if (typeof section !== 'object' || section === null) {
          return null;
        }

        const sectionRecord = section as Record<string, unknown>;

        const sectionData =
          sectionRecord.data && typeof sectionRecord.data === 'object'
            ? (sectionRecord.data as Record<string, unknown>)
            : undefined;

        const testimonials = getSectionItems(section);

        const title =
          typeof sectionData?.sectionTitle === 'string'
            ? sectionData.sectionTitle
            : typeof sectionData?.title === 'string'
              ? sectionData.title
              : typeof sectionRecord.title === 'string'
                ? sectionRecord.title
                : typeof sectionRecord.type === 'string'
                  ? sectionRecord.type
                  : (page.title ?? 'Winner Profiles');

        return {
          title,
          testimonials,
        };
      })
      .filter(
        (section): section is TestimonialSection =>
          section !== null && section.testimonials.length > 0,
      );

  /* =========================================
     BUILD TESTIMONIAL SECTIONS
  ========================================= */

  let testimonialSections = buildSections(pageSections);

  if (testimonialSections.length === 0 && pageBlocks.length > 0) {
    testimonialSections = buildSections(pageBlocks);
  }

  /* =========================================
     TECHNOLOGY ICONS
     
     Business Icons intentionally removed.
  ========================================= */

  const allTestimonials = testimonialSections.flatMap((section) => section.testimonials);

  const technologyIcons = allTestimonials.filter((item) => {
    if (typeof item !== 'object' || item === null) {
      return false;
    }

    const entry = item as Record<string, unknown>;

    const category = String(
      entry.category ?? entry.type ?? entry.group ?? entry.awardCategory ?? '',
    ).toLowerCase();

    return category.includes('technology');
  });

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="winners-detail-page">
      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="winners-detail-card">
        <p className="winners-kicker">{kicker ?? 'Winners'}</p>

        <h1>{page.title}</h1>

        <p>
          Showcasing exceptional leaders who are driving digital transformation, business growth,
          and innovation across industries.
        </p>

        {page.shortDescription ? (
          <p className="winners-detail-summary">{page.shortDescription}</p>
        ) : null}
      </section>

      {/* =====================================
          TECHNOLOGY ICONS
      ===================================== */}

      {technologyIcons.length > 0 ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Winner Profiles</p>

            <h2>TECHNOLOGY ICONS</h2>

            <span>{technologyIcons.length} Members</span>
          </div>

          <div className="winner-section-grid">
            {technologyIcons.map((testimonial, index) => (
              <WinnerCard
                key={`technology-${index}`}
                testimonial={testimonial}
                sectionTitle="TECHNOLOGY ICONS"
                index={index}
              />
            ))}
          </div>
        </section>
      ) : testimonialSections.length > 0 ? (
        /* =====================================
           NORMAL WINNER SECTIONS
        ===================================== */

        testimonialSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="winner-section-block">
            <div className="winner-section-header winner-section-header--centered">
              <p className="winner-section-kicker">Winner Profiles</p>

              <h2>{section.title || 'Winner Profiles'}</h2>

              <span>{section.testimonials.length} Members</span>
            </div>

            <div className="winner-section-grid">
              {section.testimonials.map((testimonial, index) => (
                <WinnerCard
                  key={`${section.title}-${index}`}
                  testimonial={testimonial}
                  sectionTitle={section.title}
                  index={index}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        /* =====================================
           NO WINNERS
        ===================================== */

        <section className="winner-section-block">
          <p>No winner cards were found for this page.</p>
        </section>
      )}
    </main>
  );
}

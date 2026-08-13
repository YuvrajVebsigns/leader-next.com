'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.service';

type SpeakerDetailClientProps = {
  slug: string;
};

const FALLBACK_SPEAKER_IMAGE = '/assets/logo/leader-next-logo.png';

export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        setError(response?.message ?? 'Unable to load speaker page.');
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Unable to load speaker page. Please try again.',
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
          <p className="winners-kicker">Loading speaker...</p>
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
          <p className="winners-kicker">Unable to load speaker</p>
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
          <p className="winners-kicker">Speaker not found</p>
          <p>No speaker page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================
     GET PAGE SECTIONS
  ========================================= */

  const pageSections: unknown[] = Array.isArray(page.sections)
    ? page.sections
    : Array.isArray(page.content?.blocks)
      ? page.content.blocks
      : [];

  /* =========================================
     GET ITEMS FROM SECTION
  ========================================= */

  const getSectionItems = (section: unknown): unknown[] => {
    if (Array.isArray(section)) {
      return section;
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
        data.speakers,
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
      sectionRecord.speakers,
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
     BUILD SPEAKER SECTIONS
  ========================================= */

  const speakerSections = pageSections
    .map((section) => {
      const sectionRecord = section as Record<string, unknown>;

      const sectionData =
        sectionRecord.data && typeof sectionRecord.data === 'object'
          ? (sectionRecord.data as Record<string, unknown>)
          : undefined;

      const speakers = getSectionItems(section);

      return {
        title:
          typeof sectionData?.sectionTitle === 'string'
            ? sectionData.sectionTitle
            : typeof sectionData?.title === 'string'
              ? sectionData.title
              : typeof sectionRecord.title === 'string'
                ? sectionRecord.title
                : typeof sectionRecord.type === 'string'
                  ? sectionRecord.type
                  : (page.title ?? 'Speakers'),

        speakers,
      };
    })
    .filter((section) => section.speakers.length > 0);

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="winners-detail-page">
      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="winners-detail-card">
        <p className="winners-kicker">Speaker Profile</p>

        <h1>{page.title}</h1>

        {page.shortDescription ? (
          <p className="winners-detail-summary">{page.shortDescription}</p>
        ) : null}
      </section>

      {/* =====================================
          SPEAKER SECTIONS
      ===================================== */}

      {speakerSections.length > 0 ? (
        speakerSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="winner-section-block">
            {/* SECTION HEADER */}

            <div className="winner-section-header winner-section-header--centered">
              <p className="winner-section-kicker">{section.title || 'Speaker Profiles'}</p>

              <h2>{section.title || 'Speaker Profiles'}</h2>

              <span>{section.speakers.length} members</span>
            </div>

            {/* SPEAKER GRID */}

            <div className="winner-section-grid">
              {section.speakers.map((speakerItem, index) => {
                const entry = speakerItem as Record<string, unknown>;

                const speakerName =
                  typeof entry.author === 'string' && entry.author.trim()
                    ? entry.author.trim()
                    : 'Speaker Name';

                const speakerAvatar =
                  typeof entry.avatar === 'string' && entry.avatar.trim()
                    ? entry.avatar.trim()
                    : FALLBACK_SPEAKER_IMAGE;

                const speakerRole =
                  typeof entry.role === 'string' && entry.role.trim() ? entry.role.trim() : '';

                const speakerQuote =
                  typeof entry.quote === 'string' && entry.quote.trim() ? entry.quote.trim() : '';

                return (
                  <article
                    key={`${section.title}-${index}`}
                    className="winner-profile-card winner-profile-card--red"
                  >
                    {/* =================================
                          SPEAKER IMAGE
                      ================================= */}

                    <div className="winner-profile-media">
                      <img
                        src={speakerAvatar}
                        alt={speakerName}
                        className="winner-profile-image"
                        onError={(event) => {
                          const image = event.currentTarget;

                          /*
                           * If API image fails,
                           * replace it with fallback.
                           */

                          if (!image.src.endsWith(FALLBACK_SPEAKER_IMAGE)) {
                            image.src = FALLBACK_SPEAKER_IMAGE;
                          }
                        }}
                      />
                    </div>

                    {/* =================================
                          SPEAKER INFORMATION
                      ================================= */}

                    <div className="winner-profile-body">
                      <h3>{speakerName}</h3>

                      <p className="winner-profile-category">
                        {speakerRole ? `Company: ${speakerRole}` : 'Company info unavailable'}
                      </p>

                      {speakerQuote ? (
                        <p className="winner-profile-company">&quot;{speakerQuote}&quot;</p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        /* =====================================
           NO SPEAKERS
        ===================================== */

        <section className="winner-section-block">
          <p>No speaker cards were found for this page.</p>
        </section>
      )}
    </main>
  );
}

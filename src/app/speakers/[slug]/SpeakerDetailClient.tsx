'use client';

import { useEffect, useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { getLinkedInProfileUrl, removeLinkedInUrls } from '@/lib/social-links';
import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.service';

type SpeakerDetailClientProps = {
  slug: string;
};

const FALLBACK_SPEAKER_IMAGE = '/assets/logo/leader-next-logo.png';

type SpeakerSection = {
  title: string;
  speakers: unknown[];
  isPartner: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorStatus(error: unknown): number | undefined {
  if (!isRecord(error) || !('statusCode' in error)) return undefined;
  const statusCode = error.statusCode;
  return typeof statusCode === 'number' ? statusCode : Number(statusCode);
}

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

function getPageSections(page: WebsitePage): unknown[] {
  if (Array.isArray(page.sections)) return page.sections;
  if (Array.isArray(page.content?.blocks)) return page.content.blocks;
  return [];
}

function getSectionItems(section: unknown): unknown[] {
  if (Array.isArray(section)) return section;
  if (!isRecord(section)) return [];

  const data = isRecord(section.data) ? section.data : undefined;
  const candidates = [
    data?.testimonials,
    data?.items,
    data?.members,
    data?.speakers,
    data?.winners,
    data?.rows,
    data?.blocks,
    data?.values,
    section.testimonials,
    section.items,
    section.members,
    section.speakers,
    section.winners,
    section.rows,
    section.blocks,
    section.values,
  ];

  return candidates.find(Array.isArray) ?? [];
}

function getSpeakerSections(page: WebsitePage, isPartner: boolean): SpeakerSection[] {
  return getPageSections(page)
    .map((section) => {
      if (Array.isArray(section)) {
        return {
          title: isPartner ? 'PARTNER SPEAKER' : page.title || 'Speakers',
          speakers: section,
          isPartner,
        };
      }

      if (!isRecord(section)) return null;

      const sectionData = isRecord(section.data) ? section.data : undefined;

      return {
        title:
          (typeof sectionData?.sectionTitle === 'string' && sectionData.sectionTitle) ||
          (typeof sectionData?.title === 'string' && sectionData.title) ||
          (typeof section.title === 'string' && section.title) ||
          (typeof section.type === 'string' && section.type) ||
          (isPartner ? 'PARTNER SPEAKER' : page.title || 'Speakers'),
        speakers: getSectionItems(section),
        isPartner,
      };
    })
    .filter(
      (section): section is SpeakerSection => section !== null && section.speakers.length > 0,
    );
}

export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [partnerPage, setPartnerPage] = useState<WebsitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partnerError, setPartnerError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      setIsLoading(true);
      setError(null);
      setPartnerError(null);
      setPartnerPage(null);

      try {
        const response = await fetchWebsitePageBySlug(slug);

        if (!isMounted) return;

        if (response?.success && response.data) {
          setPage(response.data);
        } else {
          setError(response?.message ?? 'Unable to load speaker page.');
          return;
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Unable to load speaker page. Please try again.',
        );
        return;
      } finally {
        if (isMounted) setIsLoading(false);
      }

      const year = /^speaker-(\d{4})$/.exec(slug)?.[1];
      if (!year) return;

      try {
        const partnerResponse = await fetchWebsitePageBySlug(`partner-speaker-${year}`);
        if (!isMounted) return;

        if (partnerResponse?.success && partnerResponse.data) {
          setPartnerPage(partnerResponse.data);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        if (getErrorStatus(err) === 404) return;

        setPartnerError(getErrorMessage(err, 'Unable to load partner speakers. Please try again.'));
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

  const speakerSections = [
    ...getSpeakerSections(page, false),
    ...(partnerPage ? getSpeakerSections(partnerPage, true) : []),
  ];

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
              <h2>{section.isPartner ? 'PARTNER SPEAKER' : 'SPEAKERS'}</h2>

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

                const rawSpeakerRole =
                  typeof entry.role === 'string' && entry.role.trim() ? entry.role.trim() : '';

                const rawSpeakerQuote =
                  typeof entry.quote === 'string' && entry.quote.trim() ? entry.quote.trim() : '';
                const linkedInUrl = getLinkedInProfileUrl(entry, [rawSpeakerRole, rawSpeakerQuote]);
                const speakerRole = removeLinkedInUrls(rawSpeakerRole);
                const speakerQuote = removeLinkedInUrls(rawSpeakerQuote);

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

                    <div className="winner-profile-body speaker-profile-body">
                      <h3>{speakerName}</h3>

                      <p className="winner-profile-category">
                        {speakerRole ? `Company: ${speakerRole}` : 'Company info unavailable'}
                      </p>

                      {speakerQuote ? (
                        <p className="winner-profile-company">&quot;{speakerQuote}&quot;</p>
                      ) : null}

                      {linkedInUrl ? (
                        <a
                          href={linkedInUrl}
                          className="profile-linkedin"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${speakerName}'s LinkedIn profile`}
                        >
                          <FaLinkedinIn aria-hidden="true" size={16} />
                        </a>
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

      {partnerError ? (
        <section className="winner-section-block">
          <p>Unable to load partner speakers: {partnerError}</p>
        </section>
      ) : null}
    </main>
  );
}

const LINKEDIN_URL_PATTERN = /(?:https?:\/\/)?(?:[\w-]+\.)*linkedin\.com(?:\/[^\s"'<>]*)?/gi;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getLinkedInUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  const rawUrl = value.match(LINKEDIN_URL_PATTERN)?.[0]?.replace(/[.,;!?)}\]]+$/, '');
  if (!rawUrl) return undefined;

  const urlToParse = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

  try {
    const url = new URL(urlToParse);
    const isLinkedInHost =
      url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com');

    return isLinkedInHost && (url.protocol === 'http:' || url.protocol === 'https:')
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function getLinkedInProfileUrl(
  profile: unknown,
  fallbackValues: unknown[] = [],
): string | undefined {
  const socialLinks =
    isRecord(profile) && isRecord(profile.socialLinks) ? profile.socialLinks : undefined;
  const fields = isRecord(profile)
    ? [
        profile.linkedin,
        profile.linkedIn,
        profile.linkedinUrl,
        profile.linkedInUrl,
        profile.linkedin_url,
        socialLinks?.linkedin,
        socialLinks?.linkedIn,
      ]
    : [];

  return [...fields, ...fallbackValues]
    .map(getLinkedInUrl)
    .find((url): url is string => Boolean(url));
}

export function removeLinkedInUrls(value: string): string {
  return value
    .replace(LINKEDIN_URL_PATTERN, '')
    .replace(/\b(?:linkedin|linked\s*in)\s*:?\s*/gi, '')
    .replace(/\s*[|,;]\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

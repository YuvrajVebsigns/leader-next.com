import { apiFetch } from '@/services/apiFetch';
import { ensureWebsiteAuth, buildWebsiteAuthHeaders } from '@/lib/website-auth';

export type WebsiteAnalyticsConsentType = 'accepted' | 'essential';

export interface WebsiteAnalyticsTrackRequest {
  eventType: string;
  pageUrl: string;
  pageTitle: string;
  referrer: string;
  userAgent: string;
  visitorId: string;
  sessionId: string;
  metadata?: Record<string, unknown>;
}

export interface WebsiteAnalyticsTrackPayload extends Omit<
  WebsiteAnalyticsTrackRequest,
  'visitorId' | 'sessionId'
> {}

export interface WebsiteAnalyticsTrackResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

function generateId(): string {
  if (typeof window !== 'undefined' && typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function getVisitorId(): string {
  if (typeof window === 'undefined') return generateId();

  const storageKey = 'websiteVisitorId';
  let visitorId = window.localStorage.getItem(storageKey);
  if (!visitorId) {
    visitorId = generateId();
    window.localStorage.setItem(storageKey, visitorId);
  }
  return visitorId;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return generateId();

  const storageKey = 'websiteSessionId';
  let sessionId = window.sessionStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId = generateId();
    window.sessionStorage.setItem(storageKey, sessionId);
  }
  return sessionId;
}

export async function trackWebsiteAnalytics(
  payload: WebsiteAnalyticsTrackPayload,
): Promise<WebsiteAnalyticsTrackResponse> {
  const auth = await ensureWebsiteAuth();
  const headers = buildWebsiteAuthHeaders(auth);

  const body: WebsiteAnalyticsTrackRequest = {
    ...payload,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
  };

  return apiFetch<WebsiteAnalyticsTrackResponse>('/api/v1/website/analytics/track', {
    method: 'POST',
    requireAuth: false,
    headers,
    body: JSON.stringify(body),
  });
}

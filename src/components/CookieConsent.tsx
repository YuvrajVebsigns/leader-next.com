'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trackWebsiteAnalytics, WebsiteAnalyticsConsentType } from '@/services/analytics.service';

const COOKIE_STORAGE_KEY = 'cookie_consent_preferences';

function readConsentFromStorage() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as { analytics: boolean; status: 'accepted' | 'essential' };
  } catch {
    return null;
  }
}

function writeConsentToStorage(analytics: boolean, status: 'accepted' | 'essential') {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    COOKIE_STORAGE_KEY,
    JSON.stringify({ analytics, status, updatedAt: new Date().toISOString() }),
  );
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const storedConsent = readConsentFromStorage();

    if (storedConsent) {
      setAnalyticsEnabled(Boolean(storedConsent.analytics));
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
  }, []);

  async function trackConsent(consent: WebsiteAnalyticsConsentType) {
    const payload = {
      eventType: 'cookie_consent',
      pageUrl: window.location.pathname + window.location.search,
      pageTitle: document.title,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
      metadata: {
        consent,
      },
    };

    try {
      await trackWebsiteAnalytics(payload);
    } catch {
      // Ignore tracking failures so cookie consent still works.
    }
  }

  async function acceptAll() {
    writeConsentToStorage(true, 'accepted');
    setAnalyticsEnabled(true);
    await trackConsent('accepted');
    setShowPreferences(false);
    setIsVisible(false);
  }

  async function acceptEssentialOnly() {
    writeConsentToStorage(false, 'essential');
    setAnalyticsEnabled(false);
    await trackConsent('essential');
    setShowPreferences(false);
    setIsVisible(false);
  }

  async function savePreferences() {
    const status = analyticsEnabled ? 'accepted' : 'essential';
    writeConsentToStorage(analyticsEnabled, status);
    await trackConsent(status);
    setShowPreferences(false);
    setIsVisible(false);
  }

  function openPreferences() {
    setShowPreferences(true);
  }

  function closePreferences() {
    setShowPreferences(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {!showPreferences ? (
        <section className="cookie-banner" aria-label="Cookie consent banner">
          <div className="cookie-banner-body">
            <div className="cookie-banner-text">
              <p className="cookie-banner-description">
                We use cookies to enhance your browsing experience, personalize your content, and
                understand site performance.
              </p>
              <p className="cookie-banner-description">
                Click <strong>Accept all</strong> to agree to cookies that help us deliver better
                content and a smoother browsing experience. View our{' '}
                <Link href="/cookie-policy" className="cookie-banner-link">
                  Cookie Policy
                </Link>{' '}
                to update or disable preferences anytime.
              </p>
            </div>

            <div className="cookie-banner-actions">
              <button
                type="button"
                className="btn btn-primary cookie-banner-action"
                onClick={acceptAll}
              >
                Accept all
              </button>
              <button
                type="button"
                className="btn btn-secondary cookie-banner-action"
                onClick={acceptEssentialOnly}
              >
                Essential only
              </button>
              <button
                type="button"
                className="btn btn-ghost cookie-banner-action"
                onClick={openPreferences}
              >
                Customize
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div
          className="cookie-preferences-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
        >
          <div className="cookie-preferences-panel">
            <div className="cookie-preferences-header">
              <div>
                <p className="cookie-preferences-subtitle">COOKIE PREFERENCES</p>
                <h2 id="cookie-preferences-title">Manage your cookie settings</h2>
              </div>
            </div>

            <div className="cookie-preferences-copy">
              <p>
                Choose the cookies you want to allow for this website. Essential cookies are always
                active.
              </p>
            </div>

            <div className="cookie-preferences-list">
              <div className="cookie-preferences-item">
                <div>
                  <p className="cookie-preferences-item-title">Essential Cookies</p>
                  <p className="cookie-preferences-item-description">
                    Required for the website to function properly.
                  </p>
                </div>
                <span className="cookie-preferences-tag">Always Active</span>
              </div>

              <div className="cookie-preferences-item">
                <div>
                  <p className="cookie-preferences-item-title">Analytics & Performance Cookies</p>
                  <p className="cookie-preferences-item-description">
                    Help us understand visitor usage and optimize site performance.
                  </p>
                </div>
                <label className="cookie-preferences-toggle">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  />
                  <span className="cookie-preferences-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-preferences-footer">
              <button
                type="button"
                className="btn btn-ghost cookie-preferences-button"
                onClick={closePreferences}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary cookie-preferences-button"
                onClick={savePreferences}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

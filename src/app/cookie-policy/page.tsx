import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <main className="cookie-policy-page">
      <section className="cookie-policy-hero">
        <div className="cookie-policy-header">
          <p className="cookie-policy-kicker">Cookie Policy</p>
          <h1>How we use cookies on this website</h1>
          <p>
            This website uses cookies to deliver a better browsing experience, personalize content,
            and help us understand how visitors use our site.
          </p>
        </div>
      </section>

      <section className="cookie-policy-content">
        <div className="cookie-policy-section">
          <h2>Essential Cookies</h2>
          <p>
            These cookies are necessary for the website to function properly and cannot be disabled.
          </p>
        </div>

        <div className="cookie-policy-section">
          <h2>Analytics & Performance Cookies</h2>
          <p>
            These cookies help us understand visitor usage and optimize site performance. They are
            optional and controlled through the cookie preferences panel.
          </p>
        </div>

        <div className="cookie-policy-section">
          <h2>Manage your preferences</h2>
          <p>
            Use the <strong>Customize</strong> button from the cookie banner to allow or disable
            analytics cookies at any time.
          </p>
        </div>

        <div className="cookie-policy-actions">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

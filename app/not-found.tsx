import Link from 'next/link';

export default function NotFound() {
  return <main id="main" className="harvest-page h-interior">
    <section className="page-heading"><div className="wrap">
      <div className="eyebrow">404 · Page not found</div>
      <h1>We couldn’t find that page.</h1>
      <p>The link may be out of date, or the address may have been mistyped. You can start again from the homepage or use the menu above.</p>
      <Link className="h-button" href="/">Back to the homepage <span aria-hidden="true">↗</span></Link>
    </div></section>
  </main>;
}

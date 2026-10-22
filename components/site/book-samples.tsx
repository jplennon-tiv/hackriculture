import Link from 'next/link';
import type { BookSample } from '@/lib/book-launch';

export function BookSamples({samples, compact = false}: {samples:BookSample[]; compact?:boolean}) {
  return <div className={`h-samples${compact ? ' h-samples-compact' : ''}`}>
    {samples.map(sample => <article key={sample.id} id={`sample-${sample.id}`}>
      <Link className="h-spread" href={`/book/preview/#page=${sample.previewFolio}`} aria-label={`Read ${sample.caption} in the book preview`}>
        {sample.pages.map(page => <img key={page.src} {...page} loading="lazy"/>)}
        <span className="h-enlarge" aria-hidden="true">Read in the book preview ↗</span>
      </Link>
      <h3>{sample.heading}</h3><p className="h-sample-caption">{sample.caption}</p>
      {!compact && <p>{sample.description}</p>}
      <Link className="h-text-link" href={`/book/preview/#page=${sample.previewFolio}`}>Read from these pages ↗</Link>
    </article>)}
  </div>;
}

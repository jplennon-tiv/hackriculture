import type { BookSample } from '@/lib/book-launch';
import { BookSampleEnlargement } from './book-sample-enlargement';

export function BookSamples({samples, compact = false}: {samples:BookSample[]; compact?:boolean}) {
  return <div className={`h-samples${compact ? ' h-samples-compact' : ''}`}>
    {samples.map(sample => <article key={sample.id} id={`sample-${sample.id}`}>
      <BookSampleEnlargement sample={sample}/>
      {!compact && <>
      <h3>{sample.heading}</h3><p className="h-sample-caption">{sample.caption}</p>
      <p>{sample.description}</p>
      </>}
    </article>)}
  </div>;
}

import Link from 'next/link';
import { book } from '@/lib/book-launch';
import { getPreviewSpread, previewPageCount } from '@/lib/book-preview';
import { BookSampleEnlargement } from './book-sample-enlargement';

export function BookSectionPreviews() {
  return <section className="h-book-samples" id="samples" aria-labelledby="samples-title">
    <div className="h-section-heading"><h2 id="samples-title">Open the book.</h2><span>{previewPageCount} real pages to explore</span></div>
    <p className="h-section-intro">{book.book.previewIntroduction}</p>
    <div className="h-book-section-previews">
      {book.book.contents.map((part, index) => {
        const sample = getPreviewSpread(part.preview.spreadId);
        return <section className={`h-book-section-preview h-book-section-${part.id}`} id={`sample-${part.id}`} aria-labelledby={`sample-${part.id}-title`} key={part.id}>
          <figure className="h-section-spread">
            <BookSampleEnlargement sample={sample}/>
            <figcaption><strong>{sample.caption}</strong><span>Click the pages to enlarge <span aria-hidden="true">↗</span></span></figcaption>
          </figure>
          <div className="h-section-preview-copy">
            <div className="h-eyebrow">Inside the book · Part {index + 1}</div>
            <h3 id={`sample-${part.id}-title`}>{part.heading}</h3>
            <img className="h-section-preview-art" {...part.preview.illustration} loading="lazy" decoding="async"/>
            <p className="h-section-preview-lead">{part.preview.lead}</p>
            {part.preview.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>;
      })}
    </div>
    <div className="h-book-preview-action">
      <p className="h-proof-note">{book.sampleNote}</p>
      <Link className="h-button" href="/book/preview/">Open the book preview <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}

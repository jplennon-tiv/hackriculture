import Link from 'next/link';
import site from '@shared/website/site.json';
import { book } from '@/lib/book-launch';
import { BookSamples } from './book-samples';

export function HomeBookDetails() {
  return <section className="h-book-details" aria-labelledby="home-samples-title">
    <div className="h-book-paper" aria-hidden="true">
      <div className="h-book-paper-print"><img {...book.samples[0].pages[0]} alt="" loading="lazy"/></div>
      <div className="h-book-spiral"/>
    </div>
    <header className="h-book-details-heading"><h2 id="home-samples-title">A closer look at {book.title}</h2><span className="h-book-details-status">{book.availability.label}</span><Link className="h-button h-preview-entry" href="/book/preview/#page=1">Browse the book preview ↗</Link></header>
    <div className="h-book-details-columns">
      <div className="h-book-details-preview">
        <p className="h-section-intro">Explore the real book: the opening pages, five complete vegetable guides and selected pages from later chapters. Select any spread for a closer look.</p>
        <BookSamples samples={book.samples} compact/>
      </div>
      <section className="h-book-author" aria-labelledby="book-author-title">
        <h3 id="book-author-title">{book.home.bookAuthor.heading}</h3>
        <div className="h-book-author-portrait">
          <img src={site.aboutImage} alt="John beside his vegetables at the allotment" width="450" height="640" loading="lazy"/>
          <div><strong>{book.author}</strong><span>Author of {book.title}</span></div>
        </div>
        <blockquote className="h-book-author-quote">{book.home.bookAuthor.paragraphs.map((paragraph,index) => <p key={paragraph}>{index === 0 && '“'}{paragraph}{index === book.home.bookAuthor.paragraphs.length-1 && '”'}</p>)}</blockquote>
      </section>
    </div>
    <dl className="h-book-details-facts" aria-label="Book details">
      {book.book.format.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
    </dl>
    <p className="h-proof-note">{book.sampleNote}</p>
  </section>;
}

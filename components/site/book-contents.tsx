import { book } from '@/lib/book-launch';
import { getPreviewSpread } from '@/lib/book-preview';
import { BookSampleEnlargement } from './book-sample-enlargement';

// Decorative section artwork; the wording and selected proof pages stay in shared data.
const illustrations = ['growing', 'troubles', 'techniques'];

export function BookContents() {
  const sample = getPreviewSpread('contents');

  return <section className="h-book-contents" id="contents" aria-labelledby="contents-title">
    <div className="h-intro-row">
      <div><div className="h-eyebrow">The Vegetable Guru</div><h2 id="contents-title">{book.book.intro.heading}</h2></div>
      <p>{book.book.intro.text}</p>
    </div>
    <div className="h-contents-layout">
      <figure className="h-contents-spread">
        <BookSampleEnlargement sample={sample}/>
        <figcaption><strong>{sample.caption}</strong><span>Click the pages to enlarge <span aria-hidden="true">↗</span></span></figcaption>
      </figure>
      <div className="h-contents-sections">
        {book.book.contents.map((part, index) => <article key={part.heading}>
          <img className="h-contents-art" src={`/images/book/sections/${illustrations[index]}-v1.webp`} alt="" width="360" height="270" loading="lazy" decoding="async"/>
          <div>
            <h3><a className="h-contents-title-link" href={`#sample-${part.id}`}>{part.heading}</a></h3>
            <ul>{part.subjects.map(subject => <li key={subject}>{subject}</li>)}</ul>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

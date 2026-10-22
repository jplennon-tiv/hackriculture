import type { Metadata } from 'next';
import Link from 'next/link';
import { previewPageCount } from '@/lib/book-preview';
import { book } from '@/lib/book-launch';
import { BookSamples } from '@/components/site/book-samples';
import { AuthorNote, BookFeature, EditionLine, LaunchClosing, LaunchSignup, SectionHeading } from '@/components/site/book-launch';

export const metadata: Metadata = {title:'The Vegetable Guru — look inside the book',description:book.description,openGraph:{title:book.title,description:book.description,type:'website'}};
export default function BookPage() {
  return <main id="main" className="harvest-page h-book-page"><div className="h-wrap">
    <EditionLine/>
    <div className="h-book-top"><BookFeature bookPage/><aside className="h-book-status" aria-label="Book availability"><div className="h-eyebrow">On its way</div><h2>A new chapter<br/> for Hackriculture.</h2><p>{book.availability.text}</p><dl className="h-format">{book.book.format.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><a className="h-text-link" href="#launch">Follow the launch ↗</a></aside></div>
    <nav className="h-book-jumps" aria-label="On this book page"><span>In this page</span><a href="#contents">What’s inside</a><a href="#samples">Read sample pages</a><a href="#buying-questions">Buying questions</a><a href="#launch">Launch updates</a></nav>
    <section className="h-book-contents" id="contents" aria-labelledby="contents-title"><div className="h-intro-row"><div><div className="h-eyebrow">The Vegetable Guru</div><h2 id="contents-title">{book.book.intro.heading}</h2></div><p>{book.book.intro.text}</p></div><div className="h-contents-grid">{book.book.contents.map((part,index) => <article key={part.heading}><span className="h-part">0{index+1}</span><h3>{part.heading}</h3><p>{part.text}</p><ul>{part.subjects.map(subject => <li key={subject}>{subject}</li>)}</ul></article>)}</div></section>
    <section className="h-book-samples" id="samples" aria-labelledby="samples-title"><div className="h-section-heading"><h2 id="samples-title">Open the book.</h2><span>{previewPageCount} real pages to explore</span></div><p className="h-section-intro">Browse the opening pages and the first 24 crop guides, with selected Troubles and Techniques pages from later in the book. Turn the pages, choose a subject or zoom in to read.</p><Link className="h-button h-preview-entry" href="/book/preview/">Open the book preview <span aria-hidden="true">↗</span></Link><BookSamples samples={book.samples}/><p className="h-proof-note">{book.sampleNote}</p></section>
    <section className="h-how-to" aria-labelledby="how-title"><div className="h-section-heading"><h2 id="how-title">A reference to return to.</h2></div><ol>{book.book.steps.map((step,index) => <li key={step.heading}><span aria-hidden="true">{index+1}</span><div><h3>{step.heading}</h3><p>{step.text}</p></div></li>)}</ol></section>
    <div className="h-book-story"><section className="h-audience" aria-labelledby="audience-title"><div className="h-eyebrow">The garden, the channel & the book</div><h2 id="audience-title">{book.book.audience.heading}</h2><p>{book.book.audience.text}</p><Link className="h-text-link" href="/videos/">Explore the Hackriculture videos ↗</Link></section><AuthorNote/></div>
    <section className="h-faqs" id="buying-questions" aria-labelledby="faq-title"><SectionHeading title="Before you buy"/><h2 id="faq-title" className="sr-only">Buying questions</h2><div>{book.book.faqs.map((faq,index) => <details key={faq.question} open={index===0}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    <LaunchSignup/><LaunchClosing/>
  </div></main>;
}

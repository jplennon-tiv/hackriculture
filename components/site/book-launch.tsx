import Link from 'next/link';
import site from '@shared/website/site.json';
import { book } from '@/lib/book-launch';
import type { Video } from './video-card';
import { LaunchForm } from './launch-form';
import { BookAnnouncement } from './book-announcement';

function PaperbackCover() {
  return <div className="h-paperback-stage"><div className="h-paperback">
    <div className="h-paperback-pages" aria-hidden="true"/>
    <div className="h-paperback-bottom" aria-hidden="true"/>
    <img className="h-paperback-front" {...book.cover} fetchPriority="high"/>
  </div></div>;
}

export function EditionLine() { return <div className="h-edition"><strong>Self-sufficiency in an urban setting</strong><span>{site.location} · Home, garden & everyday life</span></div>; }
export function BookFeature({ bookPage = false, announcement = false }: { bookPage?: boolean; announcement?: boolean }) {
  return <section className={`h-book-feature${bookPage ? ' h-book-feature-detail' : ''}${announcement ? ' h-book-feature-announced' : ''}`} aria-labelledby="book-title">{announcement && <BookAnnouncement author={book.author} status={book.availability.label}/>}<div className="h-feature-copy">{!announcement && <div className="h-book-label"><span>A new book from {book.author}</span><span className="h-status">{book.availability.label}</span></div>}<h1 id="book-title">{book.title}</h1><p className="h-subtitle">{book.subtitle}</p><p className="h-feature-description">{book.featureText}</p><div className="h-facts">{book.facts.map(fact => <span key={fact.label}><b>{fact.value}</b>{fact.label}</span>)}</div><Link className="h-button" href="/book/preview/#page=1">Take a look inside <span aria-hidden="true">↗</span></Link></div><figure className="h-feature-cover"><PaperbackCover/><figcaption>By {book.author}</figcaption></figure></section>;
}
export function LaunchSignup({ home = false }: { home?: boolean }) {
  const heading = <><div className="h-eyebrow">{book.title} · {book.availability.label}</div><h2 id="launch-heading">{book.signup.heading}</h2></>;
  return <section className={`h-signup${home ? ' h-signup-home' : ''}`} id="launch" aria-labelledby="launch-heading">{home && <header className="h-signup-heading">{heading}</header>}<div className="h-signup-copy">{!home && heading}<p>{book.signup.text}</p><p className="h-signup-note">{book.signup.note}</p></div><div className="h-signup-form-content"><LaunchForm formId={book.signup.formId} scriptUrl={book.signup.scriptUrl}><details className="h-signup-privacy"><summary>Privacy</summary><p>{book.signup.privacy} <a href="https://emailoctopus.com/legal/privacy" target="_blank" rel="noopener noreferrer">EmailOctopus privacy policy</a>. Contact <a href="mailto:john@hackriculture.com">john@hackriculture.com</a> with questions.</p></details></LaunchForm></div></section>;
}
export function LaunchVideo({ video }: { video: Video }) {
  return <article className="h-video"><a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube (opens in a new tab)`}><div className="h-video-image"><img src={video.image} alt="" width="640" height="360" loading="lazy"/><span className="h-duration">{video.duration}</span><span className="h-play" aria-hidden="true">▶</span></div><div><div className="h-video-topic">{site.categories.find(category => category.id === video.category)?.label}</div><h3>{video.title}</h3></div></a></article>;
}
export function SectionHeading({ title, href, linkText }: { title: string; href?: string; linkText?: string }) {return <div className="h-section-heading"><h2>{title}</h2>{href && <Link href={href}>{linkText || 'Browse the videos'} <span aria-hidden="true">↗</span></Link>}</div>;}
export function AuthorNote({ compact = false }: { compact?: boolean }) {
  return <section className={`h-author${compact ? ' h-author-compact' : ''}`} aria-labelledby="author-heading"><SectionHeading title="A word from John"/><div className="h-author-portrait"><img src={site.aboutImage} alt="John beside his vegetables at the allotment" width="450" height="640" loading="lazy"/><div><strong>{book.author}</strong><span>Gardener, maker<br/> & curious experimenter</span></div></div><div className="h-author-copy"><h3 id="author-heading">{book.home.authorHeading}</h3>{book.home.authorParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<Link className="h-text-link" href="/about/">Meet John ↗</Link></div></section>;
}
export function LaunchClosing() { return <div className="h-closing"><div><strong>{book.title} is on its way.</strong><span>Follow the launch and find out when you can order your copy.</span></div><Link className="h-button" href="/book/#launch">Book launch updates <span aria-hidden="true">↗</span></Link></div>; }

import type { Metadata } from 'next';
import Link from 'next/link';
import { BookReader } from '@/components/site/book-reader';
import { preview } from '@/lib/book-preview';
import './preview.css';

export const metadata:Metadata = {title:'Read the book preview — The Vegetable Guru',description:'Browse 59 real pages from The Vegetable Guru: the opening and first 24 crop guides, with selected Troubles, rotation and greenhouse pages. No sign-up needed.'};

export default function BookPreviewPage() {
  return <main id="main" className="harvest-page h-preview-page"><div className="h-wrap">
    <div className="h-preview-breadcrumb"><Link href="/book/">← About The Vegetable Guru</Link><span>{preview.edition}</span></div>
    <header className="h-preview-intro"><h1>{preview.heading}</h1><p>{preview.introduction}</p></header>
    <BookReader preview={preview}/>
    <noscript><div className="h-preview-noscript"><h2>Read the selected pages</h2><p>Turn on JavaScript for the page-turning reader, or open a page directly below.</p>{preview.frames.map(frame => <p key={frame.id}><strong>{frame.title}: </strong>{frame.pages.map(page => <a key={page.folio} href={page.large}>Page {page.folio} ↗ </a>)}</p>)}</div></noscript>
    <p className="h-preview-proof-note">{preview.note}</p>
    <aside className="h-preview-closing"><div><div className="h-eyebrow">The Vegetable Guru · John Lennon</div><h2>A companion for your own growing.</h2><p>The first printed copy is on its way. Leave your email on the book page to hear when it’s ready to order.</p></div><Link className="h-button" href="/book/#launch">Email me at launch ↗</Link><Link className="h-text-link" href="/book/">Back to the book</Link></aside>
  </div></main>;
}

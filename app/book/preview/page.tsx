import type { Metadata } from 'next';
import { BookReader } from '@/components/site/book-reader';
import { preview, previewPageCount } from '@/lib/book-preview';
import './preview.css';

export const metadata:Metadata = {title:'Read the book preview — The Vegetable Guru',description:`Browse ${previewPageCount} real pages from The Vegetable Guru: opening pages and five complete vegetable guides, with selected Troubles, rotation and greenhouse pages. No sign-up needed.`};

export default function BookPreviewPage() {
  return <main id="main" className="harvest-page h-preview-page">
    <BookReader preview={preview}/>
    <noscript><div className="h-preview-noscript"><h2>Read the selected pages</h2><p>Scroll through the pages above, or open a full-size page below.</p>{preview.frames.map(frame => <p key={frame.id}><strong>{frame.title}: </strong>{frame.pages.map(page => <a key={page.folio} href={page.large}>Page {page.folio} ↗ </a>)}</p>)}</div></noscript>
  </main>;
}

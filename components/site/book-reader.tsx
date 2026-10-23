"use client";

import { useEffect, useRef, useState } from 'react';
import type { BookPreview } from '@/lib/book-preview';
import { findPreviewPage } from '@/lib/book-preview-navigation.mjs';

export function BookReader({preview}: {preview:BookPreview}) {
  const [currentFolio, setCurrentFolio] = useState(preview.defaultFolio);
  const [enlargedFolio, setEnlargedFolio] = useState<number | null>(null);
  const contents = useRef<HTMLDialogElement>(null);
  const enlargement = useRef<HTMLDialogElement>(null);
  const pages = useRef(new Map<number, HTMLElement>());
  const zoomScroll = useRef<HTMLDivElement>(null);
  const allPages = preview.frames.flatMap(frame => frame.pages);
  const current = allPages.find(page => page.folio === currentFolio) ?? allPages[0];
  const enlarged = allPages.find(page => page.folio === enlargedFolio);

  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#page=(\d+)$/);
      const folio = match ? Number(match[1]) : preview.defaultFolio;
      if (!findPreviewPage(preview.frames, folio)) return;
      pages.current.get(folio)?.scrollIntoView({block:'start'});
      setCurrentFolio(folio);
    };
    // Apply the deep link after browser/router scroll restoration has painted.
    let restoreFrame = 0;
    const restoreAfterLayout = () => {
      cancelAnimationFrame(restoreFrame);
      restoreFrame = requestAnimationFrame(() => {
        restoreFrame = requestAnimationFrame(fromHash);
      });
    };
    restoreAfterLayout();
    window.addEventListener('hashchange', fromHash);
    window.addEventListener('pageshow', restoreAfterLayout);
    window.addEventListener('popstate', restoreAfterLayout);
    // Track a band below the header, including the lower part of tall pages.
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
      if (visible[0]) setCurrentFolio(Number((visible[0].target as HTMLElement).dataset.folio));
    }, {rootMargin:'-76px 0px -65% 0px',threshold:0});
    for (const page of pages.current.values()) observer.observe(page);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      window.removeEventListener('pageshow', restoreAfterLayout);
      window.removeEventListener('popstate', restoreAfterLayout);
      cancelAnimationFrame(restoreFrame);
      observer.disconnect();
    };
  }, [preview]);

  useEffect(() => {
    if (enlargedFolio === null) {enlargement.current?.close();return;}
    enlargement.current?.showModal();
    zoomScroll.current?.scrollTo(0,0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previousOverflow;};
  }, [enlargedFolio]);

  function jump(folio:number) {
    contents.current?.close();
    const page = pages.current.get(folio);
    window.history.pushState(null,'',`#page=${folio}`);
    page?.scrollIntoView({block:'start'});
    page?.focus({preventScroll:true});
    setCurrentFolio(folio);
  }

  return <section className="h-reader" aria-label="Book preview reader">
    <header className="h-reader-bar">
      <a className="h-reader-back" href="/book/" aria-label="Back to the book"><span aria-hidden="true">←</span><span>Back to book</span></a>
      <h1>{preview.heading}</h1>
      <span className="h-reader-location">Page {currentFolio}</span>
      <button className="h-reader-contents-button" type="button" onClick={() => contents.current?.showModal()} aria-haspopup="dialog" aria-controls="preview-contents"><span aria-hidden="true">☰</span> Contents</button>
    </header>
    <div className="h-reader-paper-column">
      {preview.frames.map((frame,index) => {
        const previous = preview.frames[index-1];
        const first = frame.pages[0].folio;
        const lastBefore = previous?.pages[previous.pages.length-1].folio;
        const skipped = lastBefore !== undefined && first > lastBefore+1;
        return <div className="h-reader-sequence" key={frame.id}>
          {skipped && <p className="h-reader-gap">{first-lastBefore === 2 ? `Page ${lastBefore+1} is` : `Pages ${lastBefore+1}–${first-1} are`} not included in this sample.</p>}
          {frame.pages.map(page => <figure className="h-reader-page" id={`page=${page.folio}`} data-folio={page.folio} key={page.folio} tabIndex={-1} ref={element => {if (element) pages.current.set(page.folio,element);else pages.current.delete(page.folio);}}>
            <button type="button" onClick={() => setEnlargedFolio(page.folio)} aria-label={`Enlarge page ${page.folio}: ${frame.title}`}>
              <img src={page.src} srcSet={`${page.src} 900w, ${page.large} 1800w`} sizes="(max-width:760px) calc(100vw - 28px), 720px" width={page.width} height={page.height} alt={`${frame.title}, printed page ${page.folio} of The Vegetable Guru`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async"/>
            </button>
          </figure>)}
        </div>;
      })}
      <footer className="h-reader-end"><h2>There’s more in the book.</h2><p>You’ve reached the end of this sample.</p><a className="h-button" href="/book/#launch">Hear when it’s ready ↗</a><p className="h-reader-proof-note">{preview.note}</p></footer>
    </div>
    <dialog className="h-reader-contents" id="preview-contents" ref={contents} aria-labelledby="preview-contents-title" onClick={event => {if(event.target === event.currentTarget) contents.current?.close();}}>
      <div className="h-reader-dialog-heading"><h2 id="preview-contents-title">Contents</h2><button type="button" onClick={() => contents.current?.close()} aria-label="Close contents">×</button></div>
      <p className="h-reader-contents-note">{allPages.length} selected pages · No sign-up needed</p>
      <nav aria-label="Choose a book section">{preview.groups.map(group => <div className="h-reader-group" key={group.id}>
        <h3>{group.title}</h3>
        {preview.frames.filter(frame=>frame.group===group.id).map(frame=><a href={`#page=${frame.pages[0].folio}`} key={frame.id} aria-current={frame.pages.some(page=>page.folio===currentFolio) ? 'page' : undefined} onClick={event=>{event.preventDefault();jump(frame.pages[0].folio);}}><span>{frame.title}</span><span>{frame.pages[0].folio}</span></a>)}
      </div>)}</nav>
      <a className="h-reader-text-link" href={current.text} target="_blank" rel="noopener noreferrer">Read page {currentFolio} as text ↗</a>
    </dialog>
    <dialog className="h-reader-enlargement" ref={enlargement} aria-label={`Enlarged page ${enlargedFolio ?? ''}`} onClose={() => setEnlargedFolio(null)} onClick={event => {if(event.target === event.currentTarget) setEnlargedFolio(null);}}>
      <button className="h-reader-enlargement-close" type="button" autoFocus onClick={() => setEnlargedFolio(null)} aria-label="Close enlarged page">Close ×</button>
      <div ref={zoomScroll} className="h-reader-enlargement-scroll" tabIndex={0} aria-label="Enlarged book page; scroll to read">{enlarged && <img src={enlarged.large} width="1800" height="2335" alt={`The Vegetable Guru, printed page ${enlarged.folio}`} />}</div>
    </dialog>
  </section>;
}

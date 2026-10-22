"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { BookPreview } from '@/lib/book-preview';
import { findPreviewPage, movePreview } from '@/lib/book-preview-navigation.mjs';

type Position = {frame:number; side:number};

export function BookReader({preview}: {preview:BookPreview}) {
  const frames = preview.frames;
  const pageCount = frames.reduce((total, frame) => total + frame.pages.length, 0);
  const initial = findPreviewPage(frames, preview.defaultFolio)!;
  const [position, setPosition] = useState<Position>(initial);
  const [single, setSingle] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [zoomPage, setZoomPage] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [textOpen, setTextOpen] = useState(false);
  const [pageText, setPageText] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const readerHeading = useRef<HTMLHeadingElement>(null);
  const zoomScroll = useRef<HTMLDivElement>(null);
  const contentsNav = useRef<HTMLElement>(null);
  const current = frames[position.frame];
  const group = preview.groups.find(item => item.id === current.group)!;
  const shownPages = single ? [current.pages[position.side]] : current.pages;
  const previous = movePreview(frames, position, single, -1);
  const next = movePreview(frames, position, single, 1);
  const atStart = previous.frame === position.frame && previous.side === position.side;
  const atEnd = next.frame === position.frame && next.side === position.side;
  const pageLabel = (frame:typeof current) => frame.pages.length === 1 ? `Page ${frame.pages[0].folio}` : `Pages ${frame.pages[0].folio}–${frame.pages[1].folio}`;
  const currentLabel = single ? `Page ${shownPages[0].folio}` : pageLabel(current);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 700px)');
    const resize = () => setSingle(media.matches);
    const fromHash = () => {
      const match = window.location.hash.match(/^#page=(\d+)$/);
      const found = match ? findPreviewPage(frames, Number(match[1])) : null;
      if (found) setPosition(found);
    };
    resize(); fromHash();
    media.addEventListener('change', resize);
    window.addEventListener('hashchange', fromHash);
    return () => {media.removeEventListener('change', resize); window.removeEventListener('hashchange', fromHash);};
  }, [frames]);

  useEffect(() => {
    if (zoomPage === null) {dialog.current?.close(); return;}
    if (!dialog.current?.open) dialog.current?.showModal();
    zoomScroll.current?.scrollTo(0,0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previousOverflow;};
  }, [zoomPage]);

  useEffect(() => {
    const nav = contentsNav.current;
    const selected = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !selected || nav.clientHeight === 0) return;
    const offset = selected.getBoundingClientRect().top - nav.getBoundingClientRect().top;
    if (offset < 0 || offset + selected.offsetHeight > nav.clientHeight) nav.scrollTop += offset - 12;
  }, [position.frame, contentsOpen]);

  useEffect(() => {
    if (!textOpen) return;
    const controller = new AbortController();
    setPageText('Loading page text…');
    const pages = single ? [frames[position.frame].pages[position.side]] : frames[position.frame].pages;
    Promise.all(pages.map(async page => {
      const response = await fetch(page.text, {signal:controller.signal});
      if (!response.ok) throw new Error('Page text unavailable');
      return `PAGE ${page.folio}\n\n${await response.text()}`;
    })).then(texts => setPageText(texts.join('\n\n──────────\n\n'))).catch(error => {
      if (error.name !== 'AbortError') setPageText('Page text could not load. Please try again, or enlarge the printed page.');
    });
    return () => controller.abort();
  }, [textOpen, single, position, frames]);

  function select(nextPosition:Position, focusHeading = false) {
    setPosition(nextPosition);
    setContentsOpen(false);
    window.history.replaceState(null, '', `#page=${frames[nextPosition.frame].pages[nextPosition.side].folio}`);
    if (focusHeading) readerHeading.current?.focus({preventScroll:true});
  }
  function enlarge(folio:number) {setZoom(1); setZoomPage(folio);}
  const zoomPosition = zoomPage === null ? null : findPreviewPage(frames, zoomPage);
  const enlarged = zoomPosition ? frames[zoomPosition.frame].pages[zoomPosition.side] : null;

  return <section className="h-reader" aria-label="Book preview reader">
    <div className="h-reader-topline"><span><b>{pageCount} pages</b> to explore · No sign-up needed</span><button type="button" onClick={() => select({frame:0,side:0},true)}>Read from page 1 ↗</button></div>
    <div className="h-reader-layout">
      <aside className={`h-reader-contents${contentsOpen ? ' is-open' : ''}`} id="preview-contents" aria-label="Preview contents">
        <div className="h-reader-contents-title"><strong>In this preview</strong><button type="button" onClick={() => {setContentsOpen(false);readerHeading.current?.focus();}} aria-label="Close preview contents">Close ×</button></div>
        <nav ref={contentsNav} aria-label="Choose a book spread">{preview.groups.map(section => <div className="h-reader-group" key={section.id}><h3>{section.title}</h3>{frames.map((frame,index) => frame.group !== section.id ? null : <button key={frame.id} type="button" onClick={() => select({frame:index,side:0},true)} aria-current={index === position.frame ? 'page' : undefined}><img src={frame.pages[0].thumb} alt="" width="200" height="259" loading="lazy"/><span>{frame.title}<small>{pageLabel(frame)}</small></span></button>)}</div>)}</nav>
      </aside>
      <div className="h-reader-main" onKeyDown={event => {
        if (event.target instanceof HTMLElement && ['INPUT','SELECT','TEXTAREA','BUTTON','A','SUMMARY'].includes(event.target.tagName)) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {event.preventDefault();select(event.key === 'ArrowRight' ? next : previous);}
      }}>
        <div className="h-reader-heading"><div><div className="h-eyebrow">{group.title}</div><h2 ref={readerHeading} tabIndex={-1}>{current.title}</h2></div><span className="h-reader-folio" aria-live="polite" aria-atomic="true">{currentLabel}</span></div>
        <div className="h-reader-toolbar">
          <button className="h-reader-contents-toggle" type="button" aria-expanded={contentsOpen} aria-controls="preview-contents" onClick={() => setContentsOpen(!contentsOpen)}>Contents {contentsOpen ? '−' : '+'}</button>
          <div className="h-reader-mode" aria-label="Page layout"><button type="button" aria-pressed={!single} onClick={() => setSingle(false)}>Spread</button><button type="button" aria-pressed={single} onClick={() => setSingle(true)}>Single page</button></div>
          <span className="h-reader-hint">Select a page to zoom in</span>
          <div className="h-reader-turn"><button type="button" disabled={atStart} onClick={() => select(previous)} aria-label="Previous preview page">← <span>Previous</span></button><button type="button" disabled={atEnd} onClick={() => select(next)} aria-label="Next preview page"><span>Next</span> →</button></div>
        </div>
        <div className={`h-reader-desk${shownPages.length === 1 ? ' is-single' : ''}`} tabIndex={0} aria-label="Printed book pages. Use left and right arrow keys to turn pages.">
          <div className="h-reader-spread" key={`${current.id}-${single ? position.side : 'spread'}`}>
            {shownPages.map(page => <figure key={page.folio}><button type="button" onClick={() => enlarge(page.folio)} aria-label={`Enlarge page ${page.folio}: ${current.title}`}><img src={page.src} srcSet={`${page.src} 900w, ${page.large} 1800w`} sizes={single ? '(max-width: 700px) 90vw, 600px' : '(max-width: 1100px) 40vw, 500px'} width={page.width} height={page.height} alt={`${current.title}, printed page ${page.folio} of The Vegetable Guru`} fetchPriority="high"/></button><figcaption><span>Page {page.folio}</span><button type="button" onClick={() => enlarge(page.folio)}>Enlarge ↗</button></figcaption></figure>)}
          </div>
        </div>
        <div className="h-reader-bottom"><button type="button" disabled={atStart} onClick={() => select(previous)}>← Previous</button><span>{position.frame + 1} of {frames.length} selections</span><button type="button" disabled={atEnd} onClick={() => select(next)}>Next →</button></div>
        <progress className="h-reader-progress" value={position.frame+1} max={frames.length} aria-label="Progress through preview selections"/>
        {current.group === 'later' && <p className="h-reader-selection-note">Selected from later in the book. The printed page numbers are retained.</p>}
        {atEnd && <div className="h-reader-end"><h3>There’s more growing in the book.</h3><p>You’ve reached the end of this preview. The full book brings together all 44 crop guides, 14 Troubles guides and the Growing Techniques section.</p><Link className="h-button" href="/book/#launch">Let me know when it’s ready ↗</Link><button className="h-text-link" onClick={() => select({frame:0,side:0},true)} type="button">Read from the beginning</button></div>}
        <details className="h-reader-text" open={textOpen} onToggle={event => setTextOpen(event.currentTarget.open)}><summary>Read the text from {single ? 'this page' : 'these pages'}</summary><p>Extracted from the PDF. Diagrams, tables and decorative headings are best viewed on the printed page.</p><pre>{textOpen ? pageText : ''}</pre></details>
      </div>
    </div>
    <dialog className="h-reader-zoom" ref={dialog} aria-labelledby="preview-zoom-title" onClose={() => setZoomPage(null)} onClick={event => {if (event.target === event.currentTarget) setZoomPage(null);}}>
      <div className="h-reader-zoom-bar"><h2 id="preview-zoom-title">Page {zoomPage}</h2><div className="h-reader-zoom-tools"><button type="button" aria-label="Zoom out" disabled={zoom<=1} onClick={() => setZoom(Math.max(1,zoom-.5))}>−</button><span aria-live="polite">{Math.round(zoom*100)}%</span><button type="button" aria-label="Zoom in" disabled={zoom>=3} onClick={() => setZoom(Math.min(3,zoom+.5))}>+</button><button type="button" onClick={() => {setZoom(1);zoomScroll.current?.scrollTo(0,0);}}>Fit width</button></div><button type="button" autoFocus onClick={() => setZoomPage(null)} aria-label="Close enlarged page">Close ×</button></div>
      <p className="h-reader-zoom-note">Use + to enlarge, then scroll to read. On a phone you can also pinch to zoom.</p>
      <div className="h-reader-zoom-scroll" ref={zoomScroll}>{enlarged && <img src={enlarged.large} width="1800" height="2335" alt={`Enlarged printed page ${enlarged.folio}`} style={{width:`${zoom*100}%`}}/>}</div>
    </dialog>
  </section>;
}

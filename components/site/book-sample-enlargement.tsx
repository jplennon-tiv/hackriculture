"use client";

import { useEffect, useRef, useState } from 'react';
import type { BookSample } from '@/lib/book-launch';
import { previewAsset, previewImageUrl } from '@/lib/book-preview-navigation.mjs';

type BookSpread = Pick<BookSample, 'caption' | 'previewFolio' | 'pages'>;

function OpenSpread({sample, enlarged = false}: {sample:BookSpread; enlarged?:boolean}) {
  return <span className="h-open-book">{sample.pages.map((page, index) => <span className={`h-open-page h-open-page-${index === 0 ? 'left' : 'right'}`} key={page.src}>
    {enlarged ? <img src={previewImageUrl(sample.previewFolio + index, 'large')} alt={page.alt} width="1800" height="2335" decoding="async"/> : <img {...page} src={page.src === previewAsset(sample.previewFolio + index) ? previewImageUrl(sample.previewFolio + index) : page.src} loading="lazy"/>}
  </span>)}</span>;
}

export function BookSampleEnlargement({sample}: {sample:BookSpread}) {
  const [open, setOpen] = useState(false);
  const [large, setLarge] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const pages = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {dialog.current?.close(); return;}
    dialog.current?.showModal();
    pages.current?.scrollTo(0, 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previousOverflow;};
  }, [open]);

  return <>
    <button className="h-spread h-spread-open" type="button" aria-label={`Enlarge ${sample.caption}`} aria-haspopup="dialog" onClick={() => {setLarge(false); setOpen(true);}}>
      <OpenSpread sample={sample}/>
    </button>
    <dialog className="h-sample-dialog" ref={dialog} aria-label={`${sample.caption} — enlarged image`} onClose={() => setOpen(false)} onClick={event => {if (event.target === event.currentTarget) setOpen(false);}}>
      <button className="h-dialog-close" type="button" autoFocus aria-label="Close enlarged spread" onClick={() => setOpen(false)}>Close ×</button>
      <div className="h-dialog-scroll" ref={pages} tabIndex={0} aria-label="Enlarged book image; scroll to look around when zoomed in">
        {open && <button className={`h-dialog-image${large ? ' is-large' : ''}`} type="button" aria-label={`${large ? 'Zoom out of' : 'Zoom into'} ${sample.caption}`} aria-pressed={large} onClick={() => {setLarge(!large); pages.current?.scrollTo(0, 0);}}><OpenSpread sample={sample} enlarged/></button>}
      </div>
    </dialog>
  </>;
}

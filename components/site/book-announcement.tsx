"use client";
import {useEffect, useState} from 'react';

type Treatment = 'ribbon' | 'band' | 'stamp';

export function BookAnnouncement({author, status}: {author:string; status:string}) {
  const [treatment, setTreatment] = useState<Treatment>('band');
  useEffect(() => {
    // Local design comparisons only. The production homepage uses the selected band.
    if (process.env.NODE_ENV !== 'development') return;
    const requested = new URLSearchParams(window.location.search).get('announcement');
    if (requested === 'ribbon' || requested === 'band' || requested === 'stamp') setTreatment(requested);
  }, []);
  return <div className={`h-announcement h-announcement-${treatment}`}>
    <div className="h-announcement-author"><span>A new book from</span><strong>{author}</strong></div>
    <span className="h-announcement-status">{status}</span>
  </div>;
}

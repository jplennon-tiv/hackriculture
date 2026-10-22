'use client';

import { useEffect, useState, type ReactNode } from 'react';

type Connection = 'separate' | 'arrow' | 'joined';

export function HomeBookLaunch({ feature, signup }: { feature: ReactNode; signup: ReactNode }) {
  const [connection, setConnection] = useState<Connection>('joined');
  useEffect(() => {
    // The joined panel is selected; keep the alternative for local comparison only.
    if (process.env.NODE_ENV !== 'development') return;
    const requested = new URLSearchParams(window.location.search).get('launch');
    if (requested === 'arrow' || requested === 'joined') setConnection(requested);
  }, []);

  return <div className={`h-home-book-launch h-launch-${connection}`}>
    {feature}
    <div className="h-launch-connector" aria-hidden="true">
      {connection === 'arrow' && <svg viewBox="0 0 190 140" fill="none" focusable="false">
        <path d="M164 12C176 43 155 67 110 68C65 69 30 79 33 126"/>
        <path d="M19 111L33 128L46 110"/>
      </svg>}
    </div>
    {signup}
  </div>;
}

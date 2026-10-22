'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Use EmailOctopus's public embed, which owns validation, consent and submission.
// No account credential or API key is included in the browser bundle.
export function LaunchForm({ formId, scriptUrl, children }: { formId: string; scriptUrl: string; children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [footerHost, setFooterHost] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    setStatus('loading');
    setFooterHost(null);
    const observer = new MutationObserver(() => {
      if (container.querySelector('form, iframe')) setStatus('ready');
      const footer = container.querySelector('.mastfoot')?.parentElement ?? null;
      footer?.classList.add('h-signup-footer');
      setFooterHost(footer);
    });
    observer.observe(container, { childList: true, subtree: true });
    const script = document.createElement('script');
    script.async = true;
    // Refresh the provider's four-hour cached embed after the checkbox removal.
    // Keep this revision stable; change it only when deploying a revised form.
    const embedUrl = new URL(scriptUrl);
    embedUrl.searchParams.set('v', '2026-10-22');
    script.src = embedUrl.href;
    script.dataset.form = formId;
    script.onerror = () => setStatus('error');
    container.appendChild(script);
    const timer = window.setTimeout(() => {
      if (!container.querySelector('form, iframe')) setStatus('error');
    }, 15000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      script.onerror = null;
      container.replaceChildren();
    };
  }, [formId, scriptUrl]);

  return <div className="h-launch-form">
    <div ref={host} />
    {status === 'loading' && <p role="status">Loading the sign-up form…</p>}
    {status === 'error' && <p role="status">The sign-up form could not load. Please try refreshing the page, or follow Hackriculture on YouTube for launch news.</p>}
    <noscript>Please enable JavaScript to use the email sign-up form, or follow Hackriculture on YouTube for launch news.</noscript>
    {footerHost ? createPortal(children, footerHost) : children}
  </div>;
}

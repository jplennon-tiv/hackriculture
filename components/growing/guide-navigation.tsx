'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Item = { id: string; title: string };
export function GuideNavigation({ items }: { items: Item[] }) {
  const [active, setActive] = useState('calendar');
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = items[0].id;
        for (const item of items) {
          const section = document.getElementById(item.id);
          if (section && section.getBoundingClientRect().top <= 160) current = item.id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, [items]);
  return <aside className="guide-nav">
    <nav aria-label="On this page">
      <div className="guide-nav-heading">On this page</div>
      <button className="guide-nav-toggle" aria-expanded={expanded} aria-controls="guide-contents" onClick={() => setExpanded(!expanded)}>
        <span><small>On this page</small>{items.find(item => item.id === active)?.title}</span><ChevronDown size={20} aria-hidden="true" />
      </button>
      <ol id="guide-contents" className={expanded ? 'is-expanded' : ''}>
        {items.map((item, index) => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setExpanded(false)}><span className="guide-nav-number" aria-hidden="true">{index === 0 ? '—' : index === items.length - 1 ? '↗' : String(index).padStart(2, '0')}</span>{item.title}</a></li>)}
      </ol>
    </nav>
  </aside>;
}

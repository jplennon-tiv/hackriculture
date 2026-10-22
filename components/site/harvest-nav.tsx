"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const links = [['/', 'Home'], ['/book/', 'The Vegetable Guru'], ['/videos/', 'Videos & projects'], ['/growing/', 'Growing guides'], ['/calendar/', 'Calendar'], ['/about/', 'About John']];
export function HarvestNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = (href: string) => href === '/' ? pathname === '/' : pathname?.replace(/\/$/, '') === href.replace(/\/$/, '');
  return <><button className="h-menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>Menu {open ? '−' : '+'}</button><nav className="h-nav" id="site-navigation" aria-label="Main navigation" data-open={open}>{links.map(([href, label]) => <Link key={href} href={href} className={href === '/book/' ? 'h-nav-book' : undefined} aria-current={current(href) ? 'page' : undefined} onClick={() => setOpen(false)}>{href === '/book/' ? <><span className="h-nav-label">{label}</span><span className="h-nav-new">NEW!</span></> : label}</Link>)}<Link className="h-nav-cta" href="/book/#launch" onClick={() => setOpen(false)}>Book launch updates <span aria-hidden="true">↗</span></Link></nav></>;
}

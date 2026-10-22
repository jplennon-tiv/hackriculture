import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { calendar, calendarReadingSources } from '@/lib/calendar';
import { CalendarYear } from '@/components/site/self-sufficiency-calendar';

export const metadata: Metadata = { title: calendar.title, description: calendar.description };
export default function CalendarPage() {
  const reading = calendarReadingSources.filter((source, index, list) => list.findIndex(other => other.href === source.href) === index);
  return <main id="main" className="harvest-page cal-page"><div className="h-wrap">
    <div className="cal-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Self-sufficiency calendar</span></div>
    <header className="cal-intro"><div><span className="h-eyebrow">The Hackriculture almanac</span><h1>{calendar.title}</h1><p>{calendar.introduction}</p></div><div className="cal-year-stamp" aria-hidden="true"><CalendarDays size={32} strokeWidth={1.2}/><strong>12</strong><span>months of<br/>practical jobs</span></div></header>
    <p className="cal-climate-note">{calendar.timingNote}</p>
    <CalendarYear/>
    <noscript><p>Choose a month above. February’s extra day applies only in leap years.</p></noscript>
    <section className="cal-how" id="calendar-how" aria-labelledby="cal-how-title"><div><span className="h-eyebrow">Make it work for your plot</span><h2 id="cal-how-title">A rhythm for the year.</h2><p>{calendar.weekNote}</p><p>Watering, ventilation and picking may need attention every day in summer. Each slot has at least two reminders, with more sowing and planting jobs in the busy weeks. Choose those that suit your plot.</p></div><div><h3>Follow the job through</h3><p>The growing guides explain the individual crops. John’s videos show the work in his own garden and home. For solar and stove care, use the instructions for your own equipment and keep a record of maintenance dates.</p><Link className="h-text-link" href="/book/">More growing advice in The Vegetable Guru ↗</Link></div></section>
    <details className="cal-sources"><summary>Sources and seasonal notes</summary><p>Crop timings and care come from the canonical Hackriculture growing records, with John’s manuscript and local video transcripts as supporting sources. The growing-guide links below are further reading, not the source used to set the calendar. Weekly placement is a practical suggestion, not a claim that every garden follows the same dates. Home-maintenance references checked on 21 October 2026.</p><div>{(['master', 'john'] as const).map(tier => <section key={tier}><h3>{tier === 'master' ? 'Crops covered' : 'From John’s channel'}</h3><ul>{reading.filter(source => source.tier === tier).map(source => <li key={source.id}><a href={source.href} {...(source.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{source.title} ↗</a></li>)}</ul></section>)}</div></details>
  </div></main>;
}

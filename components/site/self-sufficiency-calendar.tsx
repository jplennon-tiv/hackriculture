'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, House, Leaf, Sprout, Sun, Snowflake, Wheat } from 'lucide-react';
import { calendar, calendarSources, type CalendarTask, type CalendarMonth } from '@/lib/calendar';
import { monthWeeks, monthYear, rollingMonths, ukCalendarDate } from '@/lib/calendar-date.mjs';

type Today = ReturnType<typeof ukCalendarDate>;
const categoryIcons = { grow: Sprout, harvest: Wheat, home: House };
const seasonIcons = { winter: Snowflake, spring: Sprout, summer: Sun, autumn: Leaf };
const monthId = (month: number) => `month-${month}`;

function useCalendarDate() {
  // Static exports stay timeless; the browser selects today after hydration.
  const [today, setToday] = useState<Today | null>(null);
  useEffect(() => {
    const update = () => {
      const next = ukCalendarDate();
      setToday(previous => previous?.key === next.key ? previous : next);
    };
    update();
    const timer = window.setInterval(update, 30_000);
    document.addEventListener('visibilitychange', update);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', update); };
  }, []);
  return today;
}

function Category({ category }: { category: CalendarTask['category'] }) {
  const Icon = categoryIcons[category];
  return <span className={`cal-category cal-${category}`}><Icon size={13} aria-hidden="true"/>{calendar.categories.find(item => item.id === category)?.label}</span>;
}

function Task({ task, heading = false }: { task: CalendarTask; heading?: boolean }) {
  const source = task.link ? calendarSources[task.link] : undefined;
  return <li className={`cal-task${task.illustration ? ' cal-task-illustrated' : ''}`}>
    <Category category={task.category}/><div className="cal-task-title">
    {task.illustration && <img className="cal-task-art" src={task.illustration.src} alt={task.illustration.alt} width={task.illustration.width} height={task.illustration.height} loading="lazy" decoding="async"/>}
    {heading ? <h3>{task.title}</h3> : <strong>{task.title}</strong>}</div><p className="cal-task-note">{task.text}</p>{source && <a className="cal-task-link" href={source.href} {...(source.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{source.tier === 'master' ? 'Growing guide' : 'Watch John'}<ArrowUpRight size={12} aria-hidden="true"/><span className="sr-only">: {source.title}</span></a>}
  </li>;
}

function Month({ month, today }: { month: CalendarMonth; today: Today | null }) {
  const current = today?.month === month.number;
  const Icon = seasonIcons[month.season];
  const slots = monthWeeks(month.number, monthYear(month.number, today));
  return <article className={`cal-month cal-season-${month.season}${current ? ' cal-current' : ''}`} id={monthId(month.number)} aria-labelledby={`title-${month.number}`}>
    <header className="cal-month-head"><div><div className="cal-month-meta"><span>{month.season}</span>{current && <span className="cal-now">You are here</span>}</div><h2 id={`title-${month.number}`}>{month.name}{today && <small>{monthYear(month.number, today)}</small>}</h2><p>{month.focus}</p></div><Icon className="cal-season-icon" size={35} strokeWidth={1.25} aria-hidden="true"/></header>
    <div className="cal-weeks" data-week-count={slots.length}>{slots.map(slot => {
      const active = current && today.week === slot.number;
      const tasks = month.weeks.find(week => week.number === slot.number)!.tasks;
      return <section className={`cal-week${active ? ' cal-active-week' : ''}`} id={`${monthId(month.number)}-week-${slot.number}`} key={slot.number} aria-label={`${slot.start}–${slot.end} ${month.name}${active ? ', this week' : ''}`}>
        <div className="cal-week-heading"><span>{`Week ${slot.number}${slot.number === 4 ? '+' : ''}`}</span><strong>{slot.start}–{slot.end} <span>{month.name.slice(0, 3)}</span></strong>{active && <em>This week</em>}</div>
        <ul>{tasks.map(task => <Task key={task.id} task={task}/>)}</ul>
      </section>;
    })}</div>
  </article>;
}

export function CalendarYear() {
  const today = useCalendarDate();
  const ordered = rollingMonths(today?.month ?? 1).map(number => calendar.months.find(month => month.number === number)!);
  return <>
    <div className="cal-toolbar"><p><CalendarDays size={17} aria-hidden="true"/>{today ? `${today.day} ${ordered[0].name} ${today.year} · Current month first` : 'A whole year at a glance'}</p></div>
    <nav className="cal-month-nav" aria-label="Jump to a month">{calendar.months.map(month => <a key={month.number} href={`#${monthId(month.number)}`} aria-current={today?.month === month.number ? 'date' : undefined} className={`cal-season-${month.season}`}>{month.name.slice(0, 3)}</a>)}</nav>
    <div className="cal-legend">{calendar.categories.map(item => <Category key={item.id} category={item.id}/>)}<a href="#calendar-how">How to use this calendar ↓</a></div>
    <div className="cal-year">{ordered.map(month => <Month key={month.number} month={month} today={today}/>)}</div>
  </>;
}

export function CalendarWidget() {
  const today = useCalendarDate();
  const month = today && calendar.months.find(item => item.number === today.month)!;
  const week = month && month.weeks.find(item => item.number === today!.week)!;
  const dates = today && monthWeeks(today.month, today.year)[today.week - 1];
  const href = today ? `/calendar/#month-${today.month}-week-${today.week}` : '/calendar/';
  return <section className="cal-widget" id="calendar-summary" aria-labelledby="cal-widget-title">
    <div className="cal-widget-intro"><span className="h-eyebrow"><CalendarDays size={15} aria-hidden="true"/>Self-sufficiency calendar</span><h2 id="cal-widget-title">{month && dates ? `${dates.start === dates.end ? dates.start : `${dates.start}–${dates.end}`} ${month.name} | This week’s jobs` : 'A little, at the right time.'}</h2>{!today && <p>Growing, harvests and home care through the year.</p>}<Link href={href}>See the full calendar <ArrowUpRight size={15} aria-hidden="true"/></Link></div>
    {week ? <ul className="cal-widget-tasks" data-columns={Math.min(4, week.tasks.length <= 4 ? week.tasks.length : Math.ceil(week.tasks.length / 2))}>{week.tasks.map(task => <Task key={task.id} task={task} heading/>)}</ul> : <p className="cal-widget-fallback">Browse all twelve months for practical jobs on the plot and around the home. Your current week appears here when the page loads.</p>}
  </section>;
}

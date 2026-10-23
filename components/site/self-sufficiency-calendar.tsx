'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, House, Leaf, Pause, Play, Sprout, Sun, Snowflake, Wheat } from 'lucide-react';
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
  useEffect(() => {
    if (!today) return;
    // The export starts in January. Restore a deep link after hydration moves
    // the current month to the top, rather than leaving the old scroll position.
    const restoreAnchor = () => {
      const id = window.location.hash.slice(1);
      if (/^(month-(?:[1-9]|1[0-2])(?:-week-[1-4])?|calendar-how)$/.test(id)) {
        document.getElementById(id)?.scrollIntoView({block:'start',behavior:'instant'});
      }
    };
    const frame = window.requestAnimationFrame(restoreAnchor);
    window.addEventListener('load', restoreAnchor, {once:true});
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('load', restoreAnchor);
    };
  }, [today?.month, today?.year]);
  return <>
    <div className="cal-toolbar"><p><CalendarDays size={17} aria-hidden="true"/>{today ? `${today.day} ${ordered[0].name} ${today.year} · Current month first` : 'A whole year at a glance'}</p></div>
    <nav className="cal-month-nav" aria-label="Jump to a month">{calendar.months.map(month => <a key={month.number} href={`#${monthId(month.number)}`} aria-current={today?.month === month.number ? 'date' : undefined} className={`cal-season-${month.season}`}>{month.name.slice(0, 3)}</a>)}</nav>
    <div className="cal-legend">{calendar.categories.map(item => <Category key={item.id} category={item.id}/>)}<a href="#calendar-how">How to use this calendar ↓</a></div>
    <div className="cal-year">{ordered.map(month => <Month key={month.number} month={month} today={today}/>)}</div>
  </>;
}

function CalendarSlides({ tasks, href }: { tasks: CalendarTask[]; href: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const playing = tasks.length > 1 && !paused && !hovered && inView && visible;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectMotion = () => { if (motion.matches) setPaused(true); };
    const checkVisibility = () => setVisible(!document.hidden);
    respectMotion();
    checkVisibility();
    motion.addEventListener('change', respectMotion);
    document.addEventListener('visibilitychange', checkVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => {
      motion.removeEventListener('change', respectMotion);
      document.removeEventListener('visibilitychange', checkVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % tasks.length), 4_000);
    return () => window.clearTimeout(timer);
  }, [playing, index, tasks.length]);

  const select = (next: number) => {
    setIndex((next + tasks.length) % tasks.length);
    setPaused(true);
  };

  return <div ref={root} className="cal-carousel" role="group" aria-roledescription="carousel" aria-label="This week’s jobs"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={event => {
      // Keep the selected advice still for keyboard readers until they press Play.
      if (!(event.target as HTMLElement).closest('[data-rotation-control]')) setPaused(true);
    }}>
    <div className="cal-widget-slides" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
      {tasks.map((task, position) => <div key={task.id} id={`calendar-slide-${task.id}`} className={`cal-widget-slide${position === index ? ' is-active' : ''}`}
        role="group" aria-roledescription="slide" aria-label={`${position + 1} of ${tasks.length}`} aria-hidden={position !== index} inert={position !== index}>
        <span className="cal-widget-count" aria-hidden="true">{position + 1} / {tasks.length}</span>
        <ul><Task task={task} heading/></ul>
      </div>)}
    </div>
    <Link className="cal-widget-more" href={href}>See the full calendar <ArrowUpRight size={14} aria-hidden="true"/></Link>
    <div className="cal-widget-controls" aria-label="Choose a weekly job">
      <button type="button" className="cal-widget-step" onClick={() => select(index - 1)} aria-label="Previous job"><ChevronLeft size={17} aria-hidden="true"/></button>
      <div className="cal-widget-segments">{tasks.map((task, position) => <button key={task.id} type="button"
        className={`cal-widget-segment${position === index ? ' is-current' : ''}${position === index && playing ? ' is-playing' : ''}`}
        aria-label={`Show job ${position + 1} of ${tasks.length}: ${task.title}`} aria-current={position === index ? 'true' : undefined}
        aria-controls={`calendar-slide-${task.id}`} title={task.title} onClick={() => select(position)}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault(); select(index + (event.key === 'ArrowRight' ? 1 : -1));
          }
        }}><span aria-hidden="true"/></button>)}</div>
      <button type="button" className="cal-widget-step" onClick={() => select(index + 1)} aria-label="Next job"><ChevronRight size={17} aria-hidden="true"/></button>
      <button type="button" className="cal-widget-step cal-widget-rotation" data-rotation-control onClick={() => setPaused(current => !current)}
        aria-label={paused ? 'Play automatic rotation' : 'Pause automatic rotation'} title={paused ? 'Play — a new job every 4 seconds' : 'Pause automatic rotation'}>
        {paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}
      </button>
    </div>
  </div>;
}

export function CalendarWidget() {
  const today = useCalendarDate();
  const month = today && calendar.months.find(item => item.number === today.month)!;
  const week = month && month.weeks.find(item => item.number === today!.week)!;
  const monthPart = today && (today.week <= 2 ? 'early' : today.week === 3 ? 'mid' : 'late');
  const href = today ? `/calendar/#month-${today.month}-week-${today.week}` : '/calendar/';
  return <section className="cal-widget" id="calendar-summary" aria-labelledby="cal-widget-title">
    <div className="cal-widget-intro"><span className="h-eyebrow"><CalendarDays size={15} aria-hidden="true"/>Self-sufficiency calendar</span><h2 id="cal-widget-title">{month && monthPart ? `Jobs for ${monthPart} ${month.name}` : 'This week’s jobs'}</h2></div>
    {week ? <CalendarSlides key={`${today!.year}-${month!.number}-${week.number}`} tasks={week.tasks} href={href}/> : <div className="cal-widget-fallback"><p>Browse all twelve months for practical jobs on the plot and around the home. Your current week appears here when the page loads.</p><Link className="cal-widget-more" href={href}>See the full calendar <ArrowUpRight size={14} aria-hidden="true"/></Link></div>}
  </section>;
}

import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Sprout } from 'lucide-react';
import { guides } from '@/lib/growing-guides';
import { GuideNavigation } from '@/components/growing/guide-navigation';
import { PrintGuide } from '@/components/growing/print-guide';
import './guide.css';
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
type Props = {params:Promise<{slug:string}>};
export function generateStaticParams() { return guides.map(g => ({slug:g.slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug} = await params;
  const guide = guides.find(g => g.slug === slug);
  return {title:guide ? `How to grow ${guide.title.toLowerCase()}` : 'Growing guide', description:guide?.summary, ...(guide?.isDraft ? {robots:{index:false,follow:false}} : {})};
}
export default async function GrowingGuide({params}:Props) {
  const {slug} = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();
  return <main id="main" className="growing-guide harvest-page h-guide-page" style={{'--crop':guide.presentation.accent} as CSSProperties}>
    {guide.isDraft && <div className="guide-review"><div className="wrap"><strong>Draft for review</strong><span>Help shape this growing guide. Advice is awaiting editorial approval.</span></div></div>}
    <section className="guide-hero"><div className="wrap guide-hero-grid"><div className="guide-hero-copy">
      <Link href="/growing" className="guide-back"><ArrowLeft size={16} aria-hidden="true"/>All growing guides</Link>
      <div className="eyebrow"><Sprout size={17} aria-hidden="true"/>The growing guides · UK</div>
      <h1>Grow <em>{guide.title.toLowerCase()}.</em></h1>
      <p>{guide.summary}</p>
      <div className="guide-hero-actions"><a className="button button-yellow" href={`#${guide.sections[0].id}`}>Read the guide <span aria-hidden="true">↓</span></a><PrintGuide/></div>
    </div><figure className="guide-art"><img src={guide.presentation.hero.src} alt={guide.presentation.hero.alt} width={guide.presentation.hero.width} height={guide.presentation.hero.height} fetchPriority="high"/></figure></div></section>
    <div className="wrap guide-facts"><dl>{guide.quickFacts.map(f => <div key={f.id}><dt>{f.label}</dt><dd>{f.text}</dd></div>)}</dl></div>
    <div className="wrap guide-body"><GuideNavigation items={[{id:'calendar',title:'Growing calendar'}, ...guide.sections.map(s => ({id:s.id,title:s.title})), {id:'sources',title:'Sources & review'}]}/>
    <div className="guide-content"><section id="calendar" className="guide-calendar"><div className="eyebrow">Plan your season</div><h2>Your growing calendar</h2><p className="guide-calendar-intro">{guide.presentation.calendarIntro ?? "Use the months as a starting point. Your variety, local weather and the stage of your crop matter too."}</p>
      {guide.seasonalTasks.map(t => <div className={`calendar-row calendar-${t.id}`} key={t.id}><div className="calendar-label"><h3>{t.label}</h3>{t.typeLabels.length > 0 && <span>{t.typeLabels.join(' / ')}</span>}</div><ol className="calendar-months" aria-label={`${t.label} months`}>{months.map((month,index) => <li key={month} className={t.months.includes(index+1) ? 'active' : ''}><abbr aria-hidden="true" title={`${month}${t.months.includes(index+1) ? ': usual window' : ': outside this window'}`}>{month.slice(0,3)}</abbr><span className="sr-only">{month}{t.months.includes(index+1) ? ', usual window' : ', outside this window'}</span>{t.months.includes(index+1) && <span aria-hidden="true" className="month-dot">•</span>}</li>)}</ol><p className="calendar-action">{t.text}</p><p className="calendar-condition">{t.condition}</p></div>)}
    </section>
    <div className="guide-reading">{guide.sections.map((s,index) => <section id={s.id} key={s.id} className={`guide-stage guide-stage-${s.id}`}><div className="guide-section-title"><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span><h2>{s.title}</h2></div>{s.typeLabels.length > 0 && <p className="guide-type-note">For {s.typeLabels.join(' and ').toLowerCase()} types</p>}{s.paragraphs.map((p,i) => <p key={i}>{p}</p>)}<a className="guide-next" href={`#${guide.sections[index+1]?.id ?? 'sources'}`}><span>Next</span>{guide.sections[index+1]?.title ?? 'Sources & review'} <span aria-hidden="true">→</span></a></section>)}</div>
    <section id="sources" className="guide-sources"><div className="eyebrow">Useful references</div><h2>Sources & review</h2><p>Practical UK guidance, with room for the conditions in your own garden.</p>{guide.sources.map(s => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.title}<ArrowUpRight size={16} aria-hidden="true"/></a>)}{guide.sourceCheckedOn && <p className="guide-review-date">Sources checked <time dateTime={guide.sourceCheckedOn}>{new Date(`${guide.sourceCheckedOn}T12:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</time>{guide.isDraft ? ' · Draft awaiting approval' : ''}</p>}</section>
    <a className="guide-top" href="#main">Back to the top ↑</a></div></div>
  </main>;
}

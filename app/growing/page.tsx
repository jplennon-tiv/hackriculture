import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { guides } from '@/lib/growing-guides';
import './growing.css';
export const metadata: Metadata = {title:'Vegetable growing guides',description:'Practical UK vegetable growing guides: choosing, sowing, caring for and harvesting your crops.', ...(guides.some(guide => guide.isDraft) ? {robots:{index:false,follow:false}} : {})};
const categoryId = (category:string) => category.toLowerCase().replace(/[^a-z0-9]+/g,'-');
export default function GrowingIndex() {
  const order = ['Root vegetables','Peas & beans','Brassicas','Salads & leaves','Onion family','Fruiting vegetables','Stalks & shoots','Other crops'];
  const categories = [...new Set(guides.map(guide => guide.presentation.category))].sort((a,b) => order.indexOf(a)-order.indexOf(b));
  return <main id="main" className="harvest-page h-interior h-growing-index-page"><section className="page-heading"><div className="wrap"><div className="eyebrow">Grow your own · UK</div><h1>Vegetable growing guides</h1><p>From the first sowing to the last harvest. Find written advice, growing calendars and practical steps to return to through the season.</p>{categories.length > 1 && <nav className="category-nav" aria-label="Vegetable categories">{categories.map(category => <a key={category} href={`#${categoryId(category)}`}>{category}</a>)}</nav>}</div></section>
    <div className="wrap section growing-index">
      {guides.length === 0 ? <div className="growing-empty"><h2>The guide collection is taking root.</h2><p>Our first written guides are being prepared. In the meantime, explore the growing videos from John’s garden.</p><Link className="button button-green" href="/videos#growing">Watch the growing videos <ArrowRight size={18} aria-hidden="true"/></Link></div> : categories.map(category => <section key={category} id={categoryId(category)} className="growing-category"><h2>{category}</h2><div className="growing-cards">{guides.filter(guide => guide.presentation.category === category).map(guide => <Link className="growing-card" key={guide.slug} href={`/growing/${guide.slug}/`}><div className="growing-card-art"><img src={guide.presentation.thumbnail ?? guide.presentation.hero.src} loading="lazy" decoding="async" alt="" width={guide.presentation.hero.width} height={guide.presentation.hero.height}/></div><div className="growing-card-copy">{guide.isDraft && <span className="growing-draft">Draft for review</span>}<h3>{guide.title}</h3><p>{guide.summary}</p><span className="growing-card-link">Read the guide <ArrowRight size={18} aria-hidden="true"/></span></div></Link>)}</div></section>)}
    </div></main>;
}

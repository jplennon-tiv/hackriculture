import type { Metadata } from 'next';
import Link from 'next/link';
import site from '@shared/website/site.json';
import { book, launchVideos } from '@/lib/book-launch';
import { HomeBookDetails } from '@/components/site/home-book-details';
import { HomeBookLaunch } from '@/components/site/home-book-launch';
import { CalendarWidget } from '@/components/site/self-sufficiency-calendar';
import { BookFeature, LaunchClosing, LaunchSignup, LaunchVideo } from '@/components/site/book-launch';

export const metadata: Metadata = {
  title: { absolute: 'Hackriculture — The Vegetable Guru & practical self-sufficiency' },
  description: 'Discover The Vegetable Guru, the new book from John Lennon, alongside Hackriculture videos on growing food, preserving, DIY and home energy.',
};
export default function Home() {
  return <main id="main" className="harvest-page h-home-page"><div className="h-wrap">
    <div className="h-home-top">
      <HomeBookLaunch feature={<BookFeature announcement/>} signup={<LaunchSignup home/>}/>
      <aside className="h-channel-sidebar" aria-label="Videos and Hackriculture">
        <section aria-labelledby="channel-title"><div className="h-section-heading"><h2 id="channel-title">From the <a href={site.channelUrl} target="_blank" rel="noopener noreferrer">YouTube</a> channel</h2><Link href="/videos/">Browse the videos ↗</Link></div><div className="h-video-list">{launchVideos.slice(0,5).map(video => <LaunchVideo key={video.id} video={video}/>)}</div></section>
        <div className="h-broad-note"><div className="h-eyebrow">More than a garden</div><h2>{book.home.broad.video.title}</h2><article className="h-video h-intro-video"><a href={site.introVideoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${book.home.broad.video.title} on YouTube (opens in a new tab)`}><div className="h-video-image"><img src={book.home.broad.video.image} alt="" width="480" height="360" loading="lazy"/><span className="h-duration">{book.home.broad.video.duration}</span><span className="h-play" aria-hidden="true">▶</span></div></a></article></div>
      </aside>
    </div>
    <CalendarWidget/>
    <section className="h-more" id="more-videos"><div className="h-section-heading"><h2>More from <a href={site.channelUrl} target="_blank" rel="noopener noreferrer">youtube.com/<wbr/><span className="h-channel-with-icon">@hackriculture<img className="h-youtube-icon" src="/images/icons/youtube-icon-red.png" alt="" aria-hidden="true" width="1255" height="1075"/></span></a></h2><Link href="/videos/">Browse the videos ↗</Link></div><div className="h-video-grid">{launchVideos.slice(5).map(video => <LaunchVideo key={video.id} video={video}/>)}</div></section>
    <nav className="h-topics" aria-label="Explore video subjects"><span>Explore videos</span>{site.categories.map(category => <Link key={category.id} href={'/videos/#'+category.id}>{category.label} ↗</Link>)}</nav>
    <HomeBookDetails/>
    <LaunchClosing/>
  </div></main>;
}

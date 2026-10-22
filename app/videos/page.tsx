import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { VideoCard } from "@/components/site/video-card";
import { Follow } from "@/components/site/chrome";
import videos from "@shared/website/videos.json";
import site from "@shared/website/site.json";
export const metadata:Metadata={title:"Videos",description:"Gardening, growing your own, preserving and practical home projects from the Hackriculture YouTube channel."};
export default function Videos(){return <main id="main" className="harvest-page h-interior h-videos-page"><section className="page-heading"><div className="wrap"><div className="eyebrow">Watch & try it yourself</div><h1>A practical sort of life.</h1><p>From the allotment to the kitchen and workshop. Pick a subject and come along for the project.</p><nav className="category-nav" aria-label="Video subjects">{site.categories.map(c=><a key={c.id} href={`#${c.id}`}>{c.label}</a>)}</nav></div></section><div className="wrap section">{site.categories.map(c=><section className="catalog-group" id={c.id} key={c.id} aria-labelledby={`${c.id}-title`}><h2 id={`${c.id}-title`}>{c.label}</h2><div className="video-grid">{videos.filter(v=>v.category===c.id).map(video=><VideoCard key={video.id} video={video}/>)}</div></section>)}<p className="note">A selection from the channel. <a className="text-link" href={`${site.channelUrl}/videos`} target="_blank" rel="noopener noreferrer">Find every video on YouTube<ArrowUpRight size={16} aria-hidden="true"/></a></p><Follow/></div></main>}

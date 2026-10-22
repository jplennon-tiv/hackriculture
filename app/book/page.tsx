import type { Metadata } from 'next';
import { book } from '@/lib/book-launch';
import { BookSectionPreviews } from '@/components/site/book-section-previews';
import { BookContents } from '@/components/site/book-contents';
import { BookFeature, EditionLine, LaunchSignup, SectionHeading } from '@/components/site/book-launch';

export const metadata: Metadata = {title:'The Vegetable Guru — look inside the book',description:book.description,openGraph:{title:book.title,description:book.description,type:'website'}};
export default function BookPage() {
  return <main id="main" className="harvest-page h-book-page"><div className="h-wrap">
    <EditionLine/>
    <div className="h-book-top"><BookFeature bookPage/><aside className="h-book-status" aria-label="Book availability"><div className="h-eyebrow">On its way</div><h2>A new chapter<br/> for Hackriculture.</h2><p>{book.availability.text}</p><dl className="h-format">{book.book.format.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><a className="h-text-link" href="#launch">Follow the launch ↗</a></aside></div>
    <nav className="h-book-jumps" aria-label="On this book page"><span>In this page</span><a href="#contents">What’s inside</a><a href="#samples">Read sample pages</a><a href="#buying-questions">Buying questions</a><a href="#launch">Launch updates</a></nav>
    <BookContents/>
    <BookSectionPreviews/>
    <section className="h-faqs" id="buying-questions" aria-labelledby="faq-title"><SectionHeading title="Before you buy"/><h2 id="faq-title" className="sr-only">Buying questions</h2><div>{book.book.faqs.map((faq,index) => <details key={faq.question} open={index===0}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    <LaunchSignup/>
  </div></main>;
}

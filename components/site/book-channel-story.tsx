import type {book} from '@/lib/book-launch';

type Story = typeof book.book.channelStory;

export function BookChannelStory({story}: {story:Story}) {
  const variant = story.variants.find(item=>item.id===story.defaultVariant) ?? story.variants[0];

  return <div className="h-channel-story">
    <div className="h-channel-story-photos" aria-label="Moments from John's gardening videos">
      {story.photographs.map(photo=><figure className="h-channel-story-photo" key={photo.src}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}/>
      </figure>)}
    </div>
    <div className="h-channel-story-copy">{variant.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
  </div>;
}

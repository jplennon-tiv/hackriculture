import content from '@shared/website/book-launch.json';
import catalogue from '@shared/website/videos.json';
import { bookLaunchSchema } from './book-launch-schema.mjs';

export const book = bookLaunchSchema.parse(content);
export type BookSample = (typeof book.samples)[number];
export const launchVideos = book.home.videoIds.map(id => {
  const video = catalogue.find(entry => entry.id === id);
  if (!video) throw new Error(`Unknown launch video: ${id}`);
  return video;
});

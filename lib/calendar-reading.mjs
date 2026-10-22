// Research references may be external; reader-facing links lead to John's work.
export function isCalendarReadingSource(source) {
  if (!source) return false;
  if (source.tier === 'master') return /^\/growing\/[a-z0-9-]+\/$/.test(source.href);
  return source.tier === 'john' && /^https:\/\/(?:www\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}$/.test(source.href);
}

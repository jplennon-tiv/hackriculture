import { createHash } from 'node:crypto';

export const calendarSourceSignature = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Keep authored calendar advice stable. A changed master needs an editorial
// review; refreshing a hash automatically would conceal that change.
export function checkCalendarSources(calendar, readMaster) {
  const records = new Map(), issues = [];
  for (const source of calendar.sources.filter(item => item.tier === 'master')) {
    if (!source.masterKey || !source.masterPath || !/^[a-f0-9]{64}$/.test(source.sourceSha256 ?? '')) {
      issues.push(`${source.id}: missing canonical key, field path or signature`);
      continue;
    }
    if (!records.has(source.masterKey)) records.set(source.masterKey, readMaster(source.masterKey));
    const value = source.masterPath.split('.').reduce((record, key) => record?.[key], records.get(source.masterKey));
    if (value === undefined || calendarSourceSignature(value) !== source.sourceSha256) {
      const jobs = calendar.months.flatMap(month => month.weeks.flatMap(week => week.tasks))
        .filter(task => task.sources.includes(source.id)).map(task => task.id).join(', ');
      issues.push(`${source.masterKey}.${source.masterPath}: ${value === undefined ? 'missing' : 'changed'}; review ${jobs}`);
    }
  }
  return issues;
}

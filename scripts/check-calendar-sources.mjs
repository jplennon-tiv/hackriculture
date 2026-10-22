import { readFile } from 'node:fs/promises';
import { readRecord } from '../../hackriculture-data/lib/records.mjs';
import { calendarSchema } from '../lib/calendar-schema.mjs';
import { checkCalendarSources } from '../lib/calendar-sources.mjs';

const calendar = calendarSchema.parse(JSON.parse(await readFile(new URL('../../hackriculture-data/website/calendar.json', import.meta.url), 'utf8')));
const issues = checkCalendarSources(calendar, key => readRecord('vegetables', key));
if (issues.length) throw Error(`Calendar source review required:\n${issues.join('\n')}\nReview affected advice against the canonical records before updating signatures.`);
console.log(`Calendar: ${calendar.sources.filter(s => s.tier === 'master').length} canonical source fields verified.`);

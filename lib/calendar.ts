import content from '@shared/website/calendar.json';
import { calendarSchema } from './calendar-schema.mjs';
import { isCalendarReadingSource } from './calendar-reading.mjs';
export const calendar = calendarSchema.parse(content);
export type CalendarTask = (typeof calendar.months)[number]['weeks'][number]['tasks'][number];
export type CalendarMonth = (typeof calendar.months)[number];
export const calendarReadingSources = calendar.sources.filter(isCalendarReadingSource);
export const calendarSources = Object.fromEntries(calendarReadingSources.map(source => [source.id, source]));

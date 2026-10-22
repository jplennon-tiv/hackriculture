/** A recurring UK almanac: weeks are 1–7, 8–14, 15–21 and 22–month end. */
export function ukCalendarDate(now = new Date()) {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new TypeError('A valid date is required');
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now);
  const value = type => Number(parts.find(part => part.type === type)?.value);
  const year = value('year'), month = value('month'), day = value('day');
  return { year, month, day, week: Math.min(4, Math.ceil(day / 7)), key: `${year}-${month}-${day}` };
}

export function monthWeeks(month, year = 2000) {
  if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 100) throw new RangeError('Invalid calendar month or year');
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: 4 }, (_, index) => ({ number: index + 1, start: index * 7 + 1, end: index === 3 ? days : index * 7 + 7 }));
}

export function rollingMonths(currentMonth = 1) {
  if (!Number.isInteger(currentMonth) || currentMonth < 1 || currentMonth > 12) throw new RangeError('Invalid calendar month');
  return Array.from({ length: 12 }, (_, index) => (currentMonth - 1 + index) % 12 + 1);
}

export function monthYear(month, today) {
  return today ? today.year + (month < today.month ? 1 : 0) : 2000;
}

import { format, differenceInMinutes, differenceInHours, parseISO } from 'date-fns';

/**
 * Formats the given date string based on the specified conditions.
 * @param dateStr - The date string to format.
 * @returns A formatted string representing the date.
 */
export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  const now = new Date();
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);

  if (minutesDiff < 1) {
    return 'Just now';
  } else if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  } else {
    return format(date, 'dd MMM, yyyy');
  }
}

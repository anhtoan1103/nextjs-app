import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
} from 'date-fns';

export interface DateRange {
  startDate: string;
  endDate: string;
}

/**
 * Get the start and end dates for the current week
 */
export const getWeekRange = (): DateRange => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(now, { weekStartsOn: 1 });

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

/**
 * Get the start and end dates for the current month
 */
export const getMonthRange = (): DateRange => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

/**
 * Get the start and end dates for the current year
 */
export const getYearRange = (): DateRange => {
  const now = new Date();
  const start = startOfYear(now);
  const end = endOfYear(now);

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

/**
 * Format a date string for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
};

/**
 * Get labels for days of the week
 */
export const getWeekDayLabels = (startDate: string, endDate: string): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = eachDayOfInterval({ start, end });
  return days.map((day) => format(day, 'EEE')); // Mon, Tue, Wed, etc.
};

/**
 * Get labels for weeks in a month
 */
export const getMonthWeekLabels = (startDate: string, endDate: string): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
  return weeks.map((_, index) => `Week ${index + 1}`);
};

/**
 * Get labels for months in a year
 */
export const getYearMonthLabels = (startDate: string, endDate: string): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = eachMonthOfInterval({ start, end });
  return months.map((month) => format(month, 'MMM')); // Jan, Feb, Mar, etc.
};

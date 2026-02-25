import { Transaction } from '@/types/transaction';
import { Statistics, StatsPeriod, ChartDataPoint } from '@/types/statistics';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
  parseISO,
  isWithinInterval,
} from 'date-fns';

/**
 * Calculate total income, expense, and net savings from transactions
 */
export const calculateStatistics = (transactions: Transaction[]): Statistics => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netSavings = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    netSavings,
  };
};

/**
 * Calculate current balance (sum of all income minus all expenses)
 */
export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((balance, transaction) => {
    if (transaction.type === 'income') {
      return balance + Number(transaction.amount);
    } else {
      return balance - Number(transaction.amount);
    }
  }, 0);
};

/**
 * Group transactions by period for chart visualization
 */
export const groupByPeriod = (
  transactions: Transaction[],
  period: StatsPeriod
): ChartDataPoint[] => {
  const now = new Date();

  if (period === 'week') {
    return groupByWeek(transactions, now);
  } else if (period === 'month') {
    return groupByMonth(transactions, now);
  } else {
    return groupByYear(transactions, now);
  }
};

/**
 * Group transactions by day for the current week
 */
const groupByWeek = (transactions: Transaction[], referenceDate: Date): ChartDataPoint[] => {
  const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
  const end = endOfWeek(referenceDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return days.map((day) => {
    const dayStart = day;
    const dayEnd = day;

    const dayTransactions = transactions.filter((t) => {
      const transactionDate = parseISO(t.date);
      return isWithinInterval(transactionDate, { start: dayStart, end: dayEnd });
    });

    const totalExpense = dayTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      label: format(day, 'EEE'), // Mon, Tue, Wed
      value: totalExpense,
      date: format(day, 'yyyy-MM-dd'),
    };
  });
};

/**
 * Group transactions by week for the current month
 */
const groupByMonth = (transactions: Transaction[], referenceDate: Date): ChartDataPoint[] => {
  const start = startOfMonth(referenceDate);
  const end = endOfMonth(referenceDate);
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

  return weeks.map((weekStart, index) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    const weekTransactions = transactions.filter((t) => {
      const transactionDate = parseISO(t.date);
      return isWithinInterval(transactionDate, { start: weekStart, end: weekEnd });
    });

    const totalExpense = weekTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      label: `Week ${index + 1}`,
      value: totalExpense,
      date: format(weekStart, 'yyyy-MM-dd'),
    };
  });
};

/**
 * Group transactions by month for the current year
 */
const groupByYear = (transactions: Transaction[], referenceDate: Date): ChartDataPoint[] => {
  const start = new Date(referenceDate.getFullYear(), 0, 1); // Jan 1
  const end = new Date(referenceDate.getFullYear(), 11, 31); // Dec 31
  const months = eachMonthOfInterval({ start, end });

  return months.map((month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);

    const monthTransactions = transactions.filter((t) => {
      const transactionDate = parseISO(t.date);
      return isWithinInterval(transactionDate, { start: monthStart, end: monthEnd });
    });

    const totalExpense = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      label: format(month, 'MMM'), // Jan, Feb, Mar
      value: totalExpense,
      date: format(month, 'yyyy-MM-dd'),
    };
  });
};

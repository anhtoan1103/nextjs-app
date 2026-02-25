export type StatsPeriod = 'week' | 'month' | 'year';

export interface Statistics {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
}

export interface ChartDataPoint {
  label: string; // e.g., "Mon", "Week 1", "Jan"
  value: number; // Total spending for that period
  date: string;  // ISO date string for reference
}

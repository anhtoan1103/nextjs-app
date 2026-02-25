'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/types/transaction';
import { StatsPeriod } from '@/types/statistics';
import { calculateStatistics, groupByPeriod } from '@/lib/utils/calculations';
import { getWeekRange, getMonthRange, getYearRange } from '@/lib/utils/dateHelpers';
import StatsSummary from './StatsSummary';
import TransactionChart from './TransactionChart';
import { parseISO, isWithinInterval } from 'date-fns';

interface StatsTabsProps {
  transactions: Transaction[];
}

export default function StatsTabs({ transactions }: StatsTabsProps) {
  const [activePeriod, setActivePeriod] = useState<StatsPeriod>('week');

  // Filter transactions by active period
  const filteredTransactions = useMemo(() => {
    let dateRange;
    if (activePeriod === 'week') {
      dateRange = getWeekRange();
    } else if (activePeriod === 'month') {
      dateRange = getMonthRange();
    } else {
      dateRange = getYearRange();
    }

    return transactions.filter((transaction) => {
      const transactionDate = parseISO(transaction.date);
      const start = parseISO(dateRange.startDate);
      const end = parseISO(dateRange.endDate);
      return isWithinInterval(transactionDate, { start, end });
    });
  }, [transactions, activePeriod]);

  // Calculate statistics for filtered transactions
  const statistics = useMemo(
    () => calculateStatistics(filteredTransactions),
    [filteredTransactions]
  );

  // Group data for chart
  const chartData = useMemo(
    () => groupByPeriod(filteredTransactions, activePeriod),
    [filteredTransactions, activePeriod]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActivePeriod('week')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            activePeriod === 'week'
              ? 'bg-[#667eea] text-white shadow-md'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#667eea]'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setActivePeriod('month')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            activePeriod === 'month'
              ? 'bg-[#667eea] text-white shadow-md'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#667eea]'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setActivePeriod('year')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            activePeriod === 'year'
              ? 'bg-[#667eea] text-white shadow-md'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#667eea]'
          }`}
        >
          Year
        </button>
      </div>

      {/* Statistics Summary */}
      <StatsSummary statistics={statistics} />

      {/* Chart */}
      <TransactionChart data={chartData} />
    </div>
  );
}

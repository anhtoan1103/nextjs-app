'use client';

import { formatCurrency } from '@/lib/utils/formatters';
import { Statistics } from '@/types/statistics';

interface StatsSummaryProps {
  statistics: Statistics;
}

export default function StatsSummary({ statistics }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {/* Total Income */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
        <div className="text-sm text-gray-600 mb-2">Total Income</div>
        <div className="text-2xl sm:text-3xl font-bold text-green-600">
          {formatCurrency(statistics.totalIncome)}
        </div>
      </div>

      {/* Total Expense */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
        <div className="text-sm text-gray-600 mb-2">Total Expense</div>
        <div className="text-2xl sm:text-3xl font-bold text-red-600">
          {formatCurrency(statistics.totalExpense)}
        </div>
      </div>

      {/* Net Savings */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
        <div className="text-sm text-gray-600 mb-2">Net Savings</div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
          {formatCurrency(statistics.netSavings)}
        </div>
      </div>
    </div>
  );
}

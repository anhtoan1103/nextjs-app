'use client';

import { Transaction } from '@/types/transaction';
import { formatTransactionAmount, getCategoryIcon, getCategoryBgColor } from '@/lib/utils/formatters';
import { formatDate } from '@/lib/utils/dateHelpers';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const icon = getCategoryIcon(transaction.category);
  const bgColor = getCategoryBgColor(transaction.type);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#667eea] hover:shadow-md transition-all duration-300">
      {/* Left Side: Icon + Info */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{transaction.description}</h3>
          <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
        </div>
      </div>

      {/* Right Side: Amount */}
      <div
        className={`text-lg font-bold ${
          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {formatTransactionAmount(transaction.amount, transaction.type)}
      </div>
    </div>
  );
}

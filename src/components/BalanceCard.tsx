'use client';

import { formatCurrency } from '@/lib/utils/formatters';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl p-5 sm:p-6">
      <div className="text-white/90 text-sm sm:text-base mb-2">Current Balance</div>
      <div className="text-3xl sm:text-5xl font-bold">
        {formatCurrency(balance)}
      </div>
    </div>
  );
}

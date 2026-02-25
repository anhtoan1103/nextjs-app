'use client';

import BalanceCard from './BalanceCard';

interface HeaderProps {
  balance: number;
}

export default function Header({ balance }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-8 sm:px-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">💰 Spending Manager</h1>
        <p className="text-white/90 text-sm sm:text-base mb-6">
          Track your expenses and income
        </p>
        <BalanceCard balance={balance} />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types/transaction';
import { calculateBalance } from '@/lib/utils/calculations';
import Header from '@/components/Header';
import StatsTabs from '@/components/StatsTabs';
import TransactionList from '@/components/TransactionList';
import { Spin } from 'antd';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions');
      const result = await response.json();

      if (response.ok && result.data) {
        setTransactions(result.data);
      } else {
        console.error('Failed to fetch transactions:', result.error);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const balance = calculateBalance(transactions);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] pb-10">
      <Header balance={balance} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 space-y-6">
        <StatsTabs transactions={transactions} />
        <TransactionList
          transactions={transactions}
          onTransactionAdded={fetchTransactions}
        />
      </div>
    </main>
  );
}

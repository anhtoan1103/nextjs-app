'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/types/transaction';
import { calculateBalance } from '@/lib/utils/calculations';
import Header from '@/components/Header';
import StatsTabs from '@/components/StatsTabs';
import TransactionList from '@/components/TransactionList';
import { Spin } from 'antd';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions');
      const result = await response.json();

      if (response.ok && result.data) {
        setTransactions(result.data);
      } else if (response.status === 401) {
        router.push('/login');
      } else {
        console.error('Failed to fetch transactions:', result.error);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTransactions();
    }
  }, [status, fetchTransactions]);

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  const balance = calculateBalance(transactions);

  return (
    <main className="min-h-screen bg-[#f5f7fa] pb-10">
      <Header balance={balance} userEmail={session?.user?.email ?? undefined} />
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

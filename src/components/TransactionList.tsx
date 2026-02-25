'use client';

import { useState } from 'react';
import { Transaction } from '@/types/transaction';
import TransactionItem from './TransactionItem';
import AddTransactionModal from './AddTransactionModal';

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionAdded?: () => void;
}

export default function TransactionList({ transactions, onTransactionAdded }: TransactionListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleTransactionAdded = () => {
    handleCloseModal();
    if (onTransactionAdded) {
      onTransactionAdded();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        <button
          onClick={handleOpenModal}
          className="bg-[#667eea] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#5568d3] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#667eea]/40 transition-all duration-300"
        >
          <span className="text-xl">+</span>
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No transactions yet</p>
            <p className="text-sm">Click "Add Transaction" to get started!</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleTransactionAdded}
      />
    </div>
  );
}

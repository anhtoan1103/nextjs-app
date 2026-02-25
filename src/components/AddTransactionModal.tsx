'use client';

import { useState } from 'react';
import { Modal, Radio, Input, InputNumber, DatePicker, Select, message } from 'antd';
import { TransactionType, TransactionCategory } from '@/types/transaction';
import dayjs from 'dayjs';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSuccess,
}: AddTransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState(dayjs());
  const [category, setCategory] = useState<TransactionCategory>('Other');

  const categories: TransactionCategory[] = [
    'Work & Salary',
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Other',
  ];

  const handleSubmit = async () => {
    // Validation
    if (!description.trim()) {
      message.error('Please enter a description');
      return;
    }

    if (!amount || amount <= 0) {
      message.error('Please enter a valid amount');
      return;
    }

    if (!date) {
      message.error('Please select a date');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          description: description.trim(),
          amount,
          date: date.format('YYYY-MM-DD'),
          category,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        message.success('Transaction added successfully!');

        // Reset form
        setType('expense');
        setDescription('');
        setAmount(null);
        setDate(dayjs());
        setCategory('Other');

        // Call success callback
        onSuccess();
      } else {
        message.error(result.error || 'Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      message.error('Failed to add transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setType('expense');
    setDescription('');
    setAmount(null);
    setDate(dayjs());
    setCategory('Other');

    onClose();
  };

  return (
    <Modal
      title={<span className="text-2xl font-semibold">Add New Transaction</span>}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Add Transaction"
      cancelText="Cancel"
      confirmLoading={loading}
      width={500}
      centered
    >
      <div className="space-y-5 mt-6">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <Radio.Group
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full"
          >
            <div className="grid grid-cols-2 gap-3">
              <Radio.Button
                value="expense"
                className="h-auto text-center py-3 rounded-lg"
              >
                <div className="text-2xl mb-1">💸</div>
                <div>Expense</div>
              </Radio.Button>
              <Radio.Button
                value="income"
                className="h-auto text-center py-3 rounded-lg"
              >
                <div className="text-2xl mb-1">💰</div>
                <div>Income</div>
              </Radio.Button>
            </div>
          </Radio.Group>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <Input
            placeholder="e.g., Grocery shopping"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="large"
          />
        </div>

        {/* Amount and Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
            <InputNumber
              placeholder="0.00"
              value={amount}
              onChange={(value) => setAmount(value)}
              min={0}
              step={0.01}
              precision={2}
              size="large"
              className="w-full"
              prefix="$"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <DatePicker
              value={date}
              onChange={(value) => setDate(value || dayjs())}
              size="large"
              className="w-full"
              format="MMM DD, YYYY"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            size="large"
            className="w-full"
          >
            {categories.map((cat) => (
              <Select.Option key={cat} value={cat}>
                {cat}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </Modal>
  );
}

import { TransactionCategory, TransactionType, CategoryConfig } from '@/types/transaction';

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format transaction amount with +/- prefix and color
 */
export const formatTransactionAmount = (amount: number, type: TransactionType): string => {
  const prefix = type === 'income' ? '+' : '-';
  return `${prefix}${formatCurrency(amount)}`;
};

/**
 * Get emoji icon for a category
 */
export const getCategoryIcon = (category: TransactionCategory): string => {
  const categoryMap: Record<TransactionCategory, string> = {
    'Work & Salary': '💵',
    'Food & Dining': '☕',
    'Shopping': '🛒',
    'Transportation': '🚗',
    'Entertainment': '🎮',
    'Bills & Utilities': '🏠',
    'Other': '💰',
  };
  return categoryMap[category] || '💰';
};

/**
 * Get background color class for a category
 */
export const getCategoryBgColor = (type: TransactionType): string => {
  return type === 'income' ? 'bg-green-100' : 'bg-red-100';
};

/**
 * Get all category configurations
 */
export const getCategoryConfig = (): CategoryConfig[] => {
  return [
    { name: 'Work & Salary', icon: '💵', bgColor: 'bg-green-100', type: 'income' },
    { name: 'Food & Dining', icon: '☕', bgColor: 'bg-red-100', type: 'expense' },
    { name: 'Shopping', icon: '🛒', bgColor: 'bg-red-100', type: 'expense' },
    { name: 'Transportation', icon: '🚗', bgColor: 'bg-red-100', type: 'expense' },
    { name: 'Entertainment', icon: '🎮', bgColor: 'bg-red-100', type: 'expense' },
    { name: 'Bills & Utilities', icon: '🏠', bgColor: 'bg-red-100', type: 'expense' },
    { name: 'Other', icon: '💰', bgColor: 'bg-gray-100', type: 'both' },
  ];
};

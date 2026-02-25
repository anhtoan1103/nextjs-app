export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'Work & Salary'
  | 'Food & Dining'
  | 'Shopping'
  | 'Transportation'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string; // ISO date string (YYYY-MM-DD)
  category: TransactionCategory;
  created_at: string;
  updated_at?: string;
}

export interface TransactionFormData {
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: TransactionCategory;
}

export interface CategoryConfig {
  name: TransactionCategory;
  icon: string;
  bgColor: string; // Tailwind color class
  type: TransactionType | 'both';
}

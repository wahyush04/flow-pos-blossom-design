
import { CartItem } from "@/components/layout/Layout";

interface Transaction {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
}

export const getTransactions = (): Transaction[] => {
  try {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      return JSON.parse(storedTransactions);
    }
    return [];
  } catch (error) {
    console.error('Error getting transactions from localStorage', error);
    return [];
  }
};

export const saveTransaction = (items: CartItem[]): void => {
  try {
    const transactions = getTransactions();
    
    const newTransaction: Transaction = {
      id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
      date: new Date().toISOString(),
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transaction to localStorage', error);
  }
};

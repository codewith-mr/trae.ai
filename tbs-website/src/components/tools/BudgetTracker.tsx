"use client";

import { useState, useEffect } from 'react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export default function BudgetTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    if (typeof window !== 'undefined') {
      const savedExpenses = localStorage.getItem('expenses');
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    }
    return [];
  });
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('all');

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (description.trim() === '' || !amount || !date) return;
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category: category || 'Uncategorized',
      date
    };
    
    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const categories = ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Other'];
  
  const filteredExpenses = filter === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === filter);

  // Sort expenses by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateCategoryTotal = (categoryName: string) => {
    return expenses
      .filter(expense => expense.category === categoryName)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary to-accent text-white">
        <h3 className="text-xl font-bold mb-1">Budget Tracker / Expense Manager</h3>
        <p className="text-xs opacity-80">Track your expenses and manage your budget</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Expense Form */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-3">Add New Expense</h4>
            <form onSubmit={addExpense}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What did you spend on?"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Add Expense
              </button>
            </form>
          </div>
          
          {/* Expense List */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-lg">Expenses</h4>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 text-center text-gray-500">No expenses recorded</td>
                    </tr>
                  ) : (
                    sortedExpenses.map(expense => (
                      <tr key={expense.id}>
                        <td className="px-4 py-2 whitespace-nowrap">{new Date(expense.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{expense.description}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100">{expense.category}</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right font-medium">${expense.amount.toFixed(2)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-right">
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-bold mb-2">Total Expenses</h5>
                <p className="text-2xl font-bold text-primary">${calculateTotal().toFixed(2)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-bold mb-2">Category Breakdown</h5>
                <div className="space-y-1 text-sm">
                  {categories.map(cat => {
                    const amount = calculateCategoryTotal(cat);
                    if (amount > 0) {
                      return (
                        <div key={cat} className="flex justify-between">
                          <span>{cat}</span>
                          <span className="font-medium">${amount.toFixed(2)}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
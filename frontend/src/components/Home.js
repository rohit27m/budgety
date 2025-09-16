import React, { useState, useEffect } from "react";

const Home = ({ username }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Simple static categories list (professional, minimal)
  const categories = ["Beauty", "Travel", "Education", "Food", "Health", "Other"];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  const handleAddExpense = () => {
    if (category && amount && parseFloat(amount) > 0) {
      const newExpense = {
        category,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString("en-GB")
      };
      const updated = [...expenses, newExpense];
      setExpenses(updated);
      localStorage.setItem("expenses", JSON.stringify(updated));
      setAmount("");
      setCategory("");
    } else {
      alert("Please select a category and enter a valid amount.");
    }
  };

  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const lastFive = [...expenses].slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10 fade-in">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Hey, {username}! 👋</h2>
          <p className="text-gray-600 dark:text-gray-400">Add a new expense below to start tracking.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input"
                />
              </div>
              <button onClick={handleAddExpense} className="btn-primary w-full">Add Expense</button>
            </div>
          </div>
          <div className="card flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Recent Expenses</h3>
              <div className="flex flex-wrap gap-4 text-sm mt-2">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Spent</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Entries</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{expenses.length}</span>
                </div>
              </div>
            </div>
            {expenses.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">No expenses yet. Add your first entry.</p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 -mx-4 px-4 mb-4">
                {lastFive.map((exp, i) => (
                  <li key={i} className="py-3 flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800 dark:text-gray-100">{exp.category}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{exp.date}</span>
                    </div>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">₹{exp.amount}</span>
                  </li>
                ))}
              </ul>
            )}
            {expenses.length > 5 && (
              <p className="text-[11px] text-gray-500 dark:text-gray-500 mt-auto">Showing last 5 entries. View full history in the History tab.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

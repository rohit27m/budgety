import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ username }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const categories = ["Beauty", "Travel", "Education", "Food", "Health", "Other"];

  const handleAddExpense = () => {
    if (category && amount) {
      const newExpense = {
        category,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString("en-GB")
      };
      const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      savedExpenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(savedExpenses));
      setAmount("");
      setCategory("");
    } else {
      alert("Please select a category and enter an amount.");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
  <nav className="glass sticky top-0 z-30 border-b border-gray-200/60 dark:border-gray-700/50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li><Link className="hover:text-primary-600 transition" to="/history">History</Link></li>
            <li><Link className="hover:text-primary-600 transition" to="/analytics">Analytics</Link></li>
            <li><Link className="text-red-600 hover:text-red-700" to="/">Sign Out</Link></li>
          </ul>
        </div>
      </nav>

      {/* Content */}
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

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {categories.map((c) => (
                <li key={c} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium flex items-center justify-center">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

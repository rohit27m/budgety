import React, { useState } from "react";

const Home = ({ username }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const categories = [
    { name: "Beauty", icon: "💄", color: "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300" },
    { name: "Travel", icon: "✈️", color: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300" },
    { name: "Education", icon: "🎓", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300" },
    { name: "Food", icon: "🍽️", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" },
    { name: "Health", icon: "🩺", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" },
    { name: "Other", icon: "🧩", color: "bg-gray-200 text-gray-700 dark:bg-gray-600/40 dark:text-gray-200" }
  ];

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
                    <option key={i} value={cat.name}>{cat.name}</option>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Categories</h3>
              {category && (
                <span className="text-xs px-2 py-1 rounded bg-primary-500/10 text-primary-600 dark:text-primary-300">Selected: {category}</span>
              )}
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {categories.map((c) => {
                const active = c.name === category;
                return (
                  <li
                    key={c.name}
                    onClick={() => setCategory(c.name)}
                    className={`group cursor-pointer relative px-3 py-3 rounded-xl flex flex-col items-center justify-center gap-1 border text-center transition shadow-sm hover:shadow-md ${c.color} ${active ? 'ring-2 ring-primary-500 scale-[1.02]' : 'border-transparent hover:border-primary-400/40 dark:hover:border-primary-400/30'}`}
                  >
                    <span className="text-lg leading-none">{c.icon}</span>
                    <span className="text-xs font-semibold tracking-wide">{c.name}</span>
                    {active && <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow animate-pulse">✔</span>}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Tap a category to pre-fill the selector above.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

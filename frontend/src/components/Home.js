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
      date: new Date().toLocaleDateString("en-GB") // e.g. 12/09/2025
    };

    // Save to localStorage
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    savedExpenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));

    setAmount("");
    setCategory("");
    alert("Expense added!");
  } else {
    alert("Please select a category and enter an amount.");
  }
};


  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/">Sign Out</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h2>Hey, {username} 👋</h2>
        
        <div className="expense-input">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button onClick={handleAddExpense}>Add</button>
        </div>
      </section>
    </div>
  );
};

export default Home;

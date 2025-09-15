import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Expense History</h2>
          <Link to="/home" className="text-sm font-medium text-primary-600 hover:text-primary-700">← Back</Link>
        </div>
  <div className="card overflow-hidden fade-in">
          {expenses.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No expenses added yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map((exp, index) => (
                <li key={index} className="py-3 flex items-center justify-between">
                  <div className="space-x-3">
                    <span className="font-medium">{exp.category}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{exp.date}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">₹{exp.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;

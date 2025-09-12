import React, { useEffect, useState } from "react";

const History = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  return (
    <div className="history-container">
      <h2>Expense History</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((exp, index) => (
            <li key={index}>
              <strong>{exp.category}</strong> - ₹{exp.amount}{" "}
              <em>({exp.date})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;

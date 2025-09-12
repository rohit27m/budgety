import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from "recharts";

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  // Summarize expenses by category
  const summary = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.entries(summary).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  // Group expenses by date for line chart
  const dateSummary = expenses.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
    return acc;
  }, {});

  const lineData = Object.entries(dateSummary).map(([date, total]) => ({
    date,
    total,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ff69b4"];

  return (
    <div className="analytics-container">
      <h2>Expense Analytics</h2>
      {expenses.length === 0 ? (
        <p>No data to analyze yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
          {/* Charts Row */}
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            
            {/* Pie Chart */}
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            {/* Bar Chart */}
            <BarChart width={500} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Line Chart */}
          <LineChart width={800} height={400} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Analytics;

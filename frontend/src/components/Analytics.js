import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const summary = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  const data = Object.entries(summary).map(([category, total]) => ({ name: category, value: total }));

  const dateSummary = expenses.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
    return acc;
  }, {});
  const lineData = Object.entries(dateSummary).map(([date, total]) => ({ date, total }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]; 

  // Custom label renderer to place labels outside for clarity
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18; // place label outside
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const pct = (percent * 100).toFixed(0);
    return (
      <text
        x={x}
        y={y}
        fill="#1f2937"
        className="dark:fill-gray-100"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: 12, fontWeight: 500 }}
      >
        {`${name} ${pct}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {expenses.length === 0 ? (
          <div className="card text-center">
            <p className="text-gray-600 dark:text-gray-400">No data to analyze yet. Add some expenses first.</p>
          </div>
        ) : (
          <div className="space-y-10 fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="card flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">By Category</h3>
                <div className="w-full" style={{ height: 360 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine
                        label={renderCustomizedLabel}
                      >
                        {data.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                      </Pie>
                      <Tooltip formatter={(val, name) => [val, name]} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">Category Totals</h3>
                <BarChart width={460} height={360} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </div>
            </div>
            <div className="card flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">Spending Over Time</h3>
              <LineChart width={800} height={380} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

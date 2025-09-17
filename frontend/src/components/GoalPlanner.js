import React, { useEffect, useMemo, useState } from "react";

const CATEGORIES = ["Beauty", "Travel", "Education", "Food", "Health", "Other"];

// Savings Goal Planner
// Lets users set a monthly income and a savings goal, then suggests per-category budgets
// based on historical spending proportions from localStorage "expenses".
const GoalPlanner = () => {
  const [income, setIncome] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState(false);

  // Keep categories consistent across the app
  const categories = CATEGORIES; // stable identity

  useEffect(() => {
    const storedIncome = localStorage.getItem("bt_goal_income");
    const storedTarget = localStorage.getItem("bt_goal_target");
    if (storedIncome) setIncome(storedIncome);
    if (storedTarget) setTarget(storedTarget);
  }, []);

  const parseGBDate = (dStr) => {
    // Home.js stores date as toLocaleDateString("en-GB") => dd/mm/yyyy
    if (!dStr) return null;
    const parts = dStr.split("/");
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts.map((p) => parseInt(p, 10));
    if (!yyyy || !mm || !dd) return null;
    return new Date(yyyy, mm - 1, dd);
  };

  const expenses = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("expenses")) || [];
    } catch (e) {
      return [];
    }
  }, []);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const thisMonthExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const d = parseGBDate(e.date);
      return d && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  }, [expenses, currentMonth, currentYear]);

  const thisMonthSpent = thisMonthExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const totalsAllTime = useMemo(() => {
    const map = new Map();
    for (const c of CATEGORIES) map.set(c, 0);
    for (const e of expenses) {
      const curr = map.get(e.category) ?? 0;
      map.set(e.category, curr + (e.amount || 0));
    }
    return map;
  }, [expenses]);

  const totalAll = Array.from(totalsAllTime.values()).reduce((a, b) => a + b, 0);

  const numericIncome = parseFloat(income || "0");
  const numericTarget = parseFloat(target || "0");
  const spendBudget = Math.max(0, (isFinite(numericIncome) ? numericIncome : 0) - (isFinite(numericTarget) ? numericTarget : 0));
  const dailyAllowance = spendBudget > 0 ? spendBudget / daysInMonth : 0;

  const today = now.getDate();
  const expectedSpendByToday = spendBudget * (today / daysInMonth);
  const delta = thisMonthSpent - expectedSpendByToday; // positive => over expected pace

  const recommendations = categories.map((cat) => {
    const catTotal = totalsAllTime.get(cat) || 0;
    const share = totalAll > 0 ? catTotal / totalAll : 0;
    const suggested = spendBudget * share;
    return {
      category: cat,
      share,
      suggested
    };
  });

  const handleSave = () => {
    localStorage.setItem("bt_goal_income", income || "");
    localStorage.setItem("bt_goal_target", target || "");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setIncome("");
    setTarget("");
    localStorage.removeItem("bt_goal_income");
    localStorage.removeItem("bt_goal_target");
  };

  const warn = numericTarget > numericIncome && numericIncome > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8 fade-in">
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Monthly Savings Goal</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
              <input
                type="number"
                className="input"
                placeholder="e.g. 50000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Savings Target (₹)</label>
              <input
                type="number"
                className="input"
                placeholder="e.g. 10000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                min="0"
              />
            </div>
            <div className="flex items-end gap-3">
              <button onClick={handleSave} className="btn-primary w-full">Save</button>
              <button onClick={handleReset} className="btn-secondary w-full">Reset</button>
            </div>
          </div>
          {warn && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">Savings target exceeds income. Lower the target or increase income.</p>
          )}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 shadow">
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Spending Budget</div>
              <div className="text-2xl font-bold">₹{spendBudget.toFixed(2)}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Amount available for expenses after savings.</div>
            </div>
            <div className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 shadow">
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Daily Allowance</div>
              <div className="text-2xl font-bold">₹{dailyAllowance.toFixed(2)}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">For {daysInMonth} days this month.</div>
            </div>
            <div className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 shadow">
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Spent This Month</div>
              <div className="text-2xl font-bold">₹{thisMonthSpent.toFixed(2)}</div>
              <div className={`text-[12px] mt-1 font-medium ${delta > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {delta > 0 ? `Over expected pace by ₹${Math.abs(delta).toFixed(2)}` : `Under expected pace by ₹${Math.abs(delta).toFixed(2)}`}
              </div>
            </div>
          </div>
          {saved && (
            <div className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">Saved!</div>
          )}
        </section>

        <section className="card">
          <h3 className="text-lg font-semibold mb-4">Suggested Monthly Budget by Category</h3>
          {totalAll === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">No history yet. Add some expenses to get personalized suggestions. For now, consider starting with simple caps like 40% on essentials and 20% on dining/entertainment.</p>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 dark:text-gray-300">
                    <th className="py-2">Category</th>
                    <th className="py-2">History Share</th>
                    <th className="py-2">Suggested (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recommendations.map((r) => (
                    <tr key={r.category}>
                      <td className="py-2 font-medium text-gray-800 dark:text-gray-100">{r.category}</td>
                      <td className="py-2">{(r.share * 100).toFixed(1)}%</td>
                      <td className="py-2 font-semibold text-primary-700 dark:text-primary-300">₹{r.suggested.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">Tips: If this feels too tight, reduce the savings target slightly or trim lower-priority categories first.</p>
        </section>
      </main>
    </div>
  );
};

export default GoalPlanner;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import History from "./components/History";
import Analytics from "./components/Analytics";
// import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Navbar from "./navbar";
import GoalPlanner from "./components/GoalPlanner";

// Layout component to inject Navbar with dynamic title based on route
const Layout = ({ children, onSignOut }) => {
  const location = useLocation();
  const path = location.pathname;
  const titleMap = {
    "/": "Login",
    "/home": "Dashboard",
    "/history": "Expense History",
    "/analytics": "Analytics",
    "/goals": "Savings Goal",
    "/login": "Login"
  };
  const title = titleMap[path] || "";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar title={title} onSignOut={onSignOut} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("bt_username");
    if (stored) setUsername(stored);
  }, []);

  const handleLogin = (name) => setUsername(name);
  const handleSignOut = () => {
    localStorage.removeItem("bt_username");
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout onSignOut={handleSignOut}>
              <Login onLogin={handleLogin} />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout onSignOut={handleSignOut}>
              <Home username={username || "Guest"} />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout onSignOut={handleSignOut}>
              <History />
            </Layout>
          }
        />
        <Route
          path="/analytics"
          element={
            <Layout onSignOut={handleSignOut}>
              <Analytics />
            </Layout>
          }
        />
        <Route
          path="/goals"
          element={
            <Layout onSignOut={handleSignOut}>
              <GoalPlanner />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout onSignOut={handleSignOut}>
              <Login onLogin={handleLogin} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import History from "./components/History";
import Analytics from "./components/Analytics";
import LandingPage from "./components/LandingPage";
import Navbar from "./navbar";

// Layout component to inject Navbar with dynamic title based on route
const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const titleMap = {
    "/": "Welcome",
    "/home": "Dashboard",
    "/history": "Expense History",
    "/analytics": "Analytics"
  };
  const title = titleMap[path] || "";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar title={title} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home username="Rohit" />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout>
              <History />
            </Layout>
          }
        />
        <Route
          path="/analytics"
          element={
            <Layout>
              <Analytics />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

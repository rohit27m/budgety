import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Budget Tracker 💰</h1>
      <p>Track your expenses, analyze spending, and manage your budget effectively.</p>
      <Link to="/home">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default LandingPage;

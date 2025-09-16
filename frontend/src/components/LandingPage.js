import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ username }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-center">
      <div className="max-w-2xl fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 gradient-text">
          {username ? `Welcome back, ${username}!` : 'Welcome to Budget Tracker 💰'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Track your expenses, analyze spending, and manage your budget effectively – all in a simple, fast interface.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/home" className="inline-block">
            <button className="btn-primary text-lg px-8 py-3 animate-fade">Get Started</button>
          </Link>
          {!username && (
            <Link to="/login" className="inline-block">
              <button className="btn-secondary text-lg px-8 py-3">Login</button>
            </Link>
          )}
        </div>
      </div>
      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">Built for smarter personal finance.</footer>
    </div>
  );
};

export default LandingPage;

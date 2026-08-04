import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 17h14M7 17V9l2-4h6l2 4v8M5 13h14M8 17v2m8-2v2"
              />
            </svg>
          </div>

          <div>
            <h1 className="font-bold text-xl tracking-tight">
              Fleet<span className="text-blue-500">Flow</span>
            </h1>

            <p className="text-[10px] text-slate-500 tracking-widest uppercase">
              Management System
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#modules"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Modules
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            How It Works
          </a>
        </div>

        {/* Login */}
        <Link
          to="/login"
          className="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../media/fleet-fusion-dark.png";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 w-fit">
          <img src={logo} alt="Fleet Fusion Logo" className="max-w-[150px]" />
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

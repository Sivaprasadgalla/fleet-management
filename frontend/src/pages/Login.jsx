import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/users/userActions";
import logo from "../media/fleet-fusion-dark.png";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };
  
  return (
    <div className="bg-slate-950 text-white flex pt-16 lg:pt-20">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -top-32 -left-32" />

        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full bottom-0 right-0" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-20 w-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img src={logo} alt="Fleet Fusion Logo" className="max-w-[50%]" />
          </Link>


          {/* Main Content */}
          <div className="max-w-xl">

            <h2 className="text-5xl xl:text-6xl font-bold leading-tight mt-5">

              Your fleet.
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Under control.
              </span>

            </h2>

            <p className="text-slate-400 text-lg mt-6 leading-relaxed">
              Manage vehicles, drivers, customers, bookings and
              expenses from one powerful platform.
            </p>


            {/* Features */}
            <div className="mt-10 space-y-5">

              {[
                [
                  "🚗",
                  "Vehicle Management",
                  "Track your entire fleet in one place.",
                ],
                [
                  "👨‍✈️",
                  "Driver Management",
                  "Manage drivers and assignments easily.",
                ],
                [
                  "📊",
                  "Smart Analytics",
                  "Monitor fleet performance and expenses.",
                ],
              ].map(([icon, title, text], index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 group"
                >

                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition">
                    {icon}
                  </div>

                  <div>
                    <h3 className="font-medium">
                      {title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {text}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* Bottom */}
          <p className="text-sm text-slate-600">
            © 2026 FleetFlow. Smart fleet management.
          </p>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">

            <Link
              to="/"
              className="flex items-center gap-3 w-fit"
            >

              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">

                <svg
                  className="w-5 h-5"
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

              <span className="font-bold text-xl">
                Fleet<span className="text-blue-500">
                  Flow
                </span>
              </span>

            </Link>

          </div>


          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p className="text-slate-500 mt-2">
              Sign in to manage your fleet.
            </p>

          </div>


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />

            </div>


            {/* Password */}
            <div>

              <div className="flex justify-between items-center mb-2">

                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />

            </div>


            {/* Error */}
            {error != null && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error.message}
              </div>
            )}


            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>


          {/* Divider */}
          <div className="flex items-center gap-4 my-8">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-slate-600">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>


          {/* Register */}
          <p className="text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-400 font-medium hover:text-blue-300 transition"
            >
              Create account
            </Link>

          </p>


          {/* Back */}
          <Link
            to="/"
            className="block text-center text-xs text-slate-600 hover:text-slate-400 mt-8 transition"
          >
            ← Back to FleetFlow
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;
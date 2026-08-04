import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-36 pb-24 px-6">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Hero Content */}
        <div className="animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Smart Fleet Management
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Manage Your Fleet.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Drive Your Business.
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
            A powerful fleet management platform to manage vehicles, drivers,
            customers, bookings and expenses — all from one centralized
            dashboard.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="group px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <a
              href="#features"
              className="px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-semibold transition-all duration-300"
            >
              Explore Features
            </a>
          </div>

          {/* Trust */}
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-950" />
              <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-slate-950" />
              <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-950" />
            </div>

            <span>Built for modern fleet operations</span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative animate-[float_5s_ease-in-out_infinite]">
          {/* Glow */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />

          <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Fake browser bar */}
            <div className="h-12 border-b border-white/10 flex items-center gap-2 px-5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs text-slate-500">OVERVIEW</p>

                  <h3 className="text-xl font-semibold mt-1">
                    Fleet Dashboard
                  </h3>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs">
                  ● Live
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition">
                  <p className="text-xs text-slate-500">Vehicles</p>

                  <p className="text-2xl font-bold mt-2">128</p>

                  <p className="text-xs text-green-400 mt-1">+12% this month</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition">
                  <p className="text-xs text-slate-500">Drivers</p>

                  <p className="text-2xl font-bold mt-2">84</p>

                  <p className="text-xs text-green-400 mt-1">+8% this month</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition">
                  <p className="text-xs text-slate-500">Bookings</p>

                  <p className="text-2xl font-bold mt-2">356</p>

                  <p className="text-xs text-blue-400 mt-1">24 active</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition">
                  <p className="text-xs text-slate-500">Revenue</p>

                  <p className="text-2xl font-bold mt-2">₹8.4L</p>

                  <p className="text-xs text-green-400 mt-1">+18.5%</p>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-5 p-5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between mb-5">
                  <span className="text-sm text-slate-400">Fleet Activity</span>

                  <span className="text-xs text-slate-500">Last 7 days</span>
                </div>

                <div className="flex items-end gap-3 h-28">
                  {[40, 65, 48, 80, 58, 92, 72].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80 hover:opacity-100 transition-all duration-300"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

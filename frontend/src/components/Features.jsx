import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-14 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8 md:mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Powerful Features
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Everything your fleet needs.
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Manage every part of your fleet operation from a single, easy-to-use
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🚗",
              title: "Vehicle Management",
              text: "Track vehicles, registration details, insurance, permits, fuel type and availability.",
            },
            {
              icon: "👨‍✈️",
              title: "Driver Management",
              text: "Maintain driver profiles, assignments, documents and driver-related expenses.",
            },
            {
              icon: "📅",
              title: "Booking Management",
              text: "Create, track and manage bookings while connecting customers, drivers and vehicles.",
            },
            {
              icon: "👥",
              title: "Customer Management",
              text: "Keep all customer information organized and easily accessible.",
            },
            {
              icon: "💰",
              title: "Expense Tracking",
              text: "Monitor driver expenses and understand where your fleet money is going.",
            },
            {
              icon: "📊",
              title: "Smart Dashboard",
              text: "Get a clear overview of your fleet performance with useful statistics and insights.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mt-6">{feature.title}</h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                {feature.text}
              </p>

              <div className="mt-5 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

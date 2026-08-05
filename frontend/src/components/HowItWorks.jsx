import React from "react";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-14 lg:py-28 px-6 bg-white/[0.02] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Simple Workflow
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Manage your fleet in three steps.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              number: "01",
              title: "Add Your Fleet",
              text: "Register your vehicles, drivers and customers in one centralized system.",
            },
            {
              number: "02",
              title: "Manage Operations",
              text: "Create bookings, assign drivers and vehicles, and track daily operations.",
            },
            {
              number: "03",
              title: "Track & Optimize",
              text: "Monitor expenses, bookings and fleet activity to make better decisions.",
            },
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="text-7xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors">
                {item.number}
              </div>

              <div className="-mt-8 relative">
                <h3 className="text-2xl font-bold">{item.title}</h3>

                <p className="text-slate-400 mt-4 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

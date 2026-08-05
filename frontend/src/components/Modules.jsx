import React from "react";

const Modules = () => {
  return (
    <section id="modules" className="py-14 lg:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            One Platform
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Your entire fleet, connected.
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mt-5">
            From the first vehicle registration to the final booking, FleetFlow
            keeps your operations connected.
          </p>
        </div>

        <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {["Vehicles", "Drivers", "Customers", "Bookings", "Expenses"].map(
            (item, index) => (
              <div
                key={index}
                className="p-6 text-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-4">
                  {["🚘", "👨‍✈️", "👥", "📋", "💳"][index]}
                </div>

                <p className="font-semibold">{item}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Modules;

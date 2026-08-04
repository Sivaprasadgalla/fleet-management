import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 to-cyan-500/5 p-10 md:p-16 text-center">
        <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full -top-32 -right-20" />

        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to take control of your fleet?
          </h2>

          <p className="text-slate-400 mt-5 max-w-xl mx-auto text-lg">
            Simplify fleet operations, reduce manual work and keep everything
            organized in one powerful platform.
          </p>

          <Link
            to="/login"
            className="inline-flex mt-8 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold hover:-translate-y-1 shadow-xl shadow-blue-600/20 transition-all duration-300"
          >
            Start Managing Your Fleet →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;

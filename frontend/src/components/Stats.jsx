import React from 'react'

const Stats = () => {
  return (
     <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

          {[
            ["24/7", "Fleet Visibility"],
            ["100%", "Centralized Control"],
            ["Real-Time", "Booking Management"],
            ["Secure", "Data Management"],
          ].map(([number, text], index) => (
            <div
              key={index}
              className="text-center group"
            >
              <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {number}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {text}
              </p>
            </div>
          ))}

        </div>
      </section>
  )
}

export default Stats
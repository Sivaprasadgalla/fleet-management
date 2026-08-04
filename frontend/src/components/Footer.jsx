import React from 'react'

const Footer = () => {
  return (
    <>
       <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <p className="font-bold text-lg">
              Fleet<span className="text-blue-500">Flow</span>
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Smarter fleet management. Better business.
            </p>
          </div>

          <p className="text-sm text-slate-600">
            © 2026 FleetFlow. All rights reserved.
          </p>

        </div>

      </footer>
    
    </>
  )
}

export default Footer
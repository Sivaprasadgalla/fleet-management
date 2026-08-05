import React from 'react'
import logo from "../../public/fleet-fusion-light.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
       <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-5">
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 w-fit">
              <img src={logo} alt="Fleet Fusion Logo" className="max-w-[150px]" />
            </Link>

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
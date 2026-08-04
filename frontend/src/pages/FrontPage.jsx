import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Modules from "../components/Modules";
import CTA from "../components/CTA";

const FrontPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* ================= NAVBAR ================= */}
      <Header />

      {/* ================= HERO ================= */}

      <HeroSection />

      {/* ================= STATS ================= */}
      <Stats />

      {/* ================= FEATURES ================= */}
      <Features />

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= MODULES ================= */}
      <Modules />

      {/* ================= CTA ================= */}
      <CTA />

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default FrontPage;

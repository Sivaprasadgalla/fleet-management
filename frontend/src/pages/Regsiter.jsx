import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../app/users/userActions";
import logo from "../media/fleet-fusion-dark.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      // Connect your register Redux action here

      const result = await dispatch(register(formData));

      if (register.fulfilled.match(result)) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");

      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white flex pt-16 lg:pt-20">
      {/* ================= LEFT ================= */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />

        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[130px] rounded-full -top-40 -left-40" />

        <div className="absolute w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full bottom-0 right-0" />

        <div className="relative z-10 p-12 xl:p-20 flex flex-col justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img src={logo} alt="Fleet Fusion Logo" className="max-w-[50%]" />
          </Link>

          {/* Content */}
          <div>
            <h2 className="text-5xl xl:text-6xl font-bold leading-tight mt-5">
              Build a smarter
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                fleet operation.
              </span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mt-6 max-w-lg">
              Join FleetFlow and bring your vehicles, drivers, customers and
              bookings together in one simple management platform.
            </p>

            {/* Mini dashboard */}
            <div className="mt-10 p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Fleet Status</span>

                <span className="text-xs text-green-400">● Operational</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-slate-500">Vehicles</p>
                  <p className="font-bold mt-1">128</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-slate-500">Drivers</p>
                  <p className="font-bold mt-1">84</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-slate-500">Bookings</p>
                  <p className="font-bold mt-1">356</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600">© 2026 FleetFlow</p>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                🚘
              </div>

              <span className="font-bold text-xl">
                Fleet<span className="text-blue-500">Flow</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create your account</h1>

            <p className="text-slate-500 mt-2">
              Start managing your fleet smarter today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First + Last */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

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
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>

              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 accent-blue-600"
              />

              <p className="text-xs text-slate-500 leading-relaxed">
                I agree to the{" "}
                <span className="text-slate-300">Terms of Service</span> and{" "}
                <span className="text-slate-300">Privacy Policy</span>.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 font-semibold shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-medium hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>

          <Link
            to="/"
            className="block text-center text-xs text-slate-600 hover:text-slate-400 mt-7"
          >
            ← Back to FleetFlow
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

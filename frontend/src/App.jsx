import React from "react";
import FrontPage from "./pages/FrontPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Regsiter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/main";
import DashboardLayout from "./components/Layout/DashboardLayout";
import MainLayout from "./components/Layout/MainLayout";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Website */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          {/* <Route path="users" element={<Users />} />

          <Route path="drivers" element={<Drivers />} />

          <Route path="vehicles" element={<Vehicles />} />

          <Route path="customers" element={<Customers />} />

          <Route path="expenses" element={<Expenses />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;

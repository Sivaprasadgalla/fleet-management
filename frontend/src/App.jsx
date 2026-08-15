import FrontPage from "./pages/FrontPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Regsiter";
import Dashboard from "./pages/dashboard/main";
import DashboardLayout from "./components/Layout/DashboardLayout";
import MainLayout from "./components/Layout/MainLayout";
import Users from './pages/dashboard/Users';
import Drivers from "./pages/dashboard/Drivers";
import Customers from "./pages/dashboard/Customers";
import SettingsPage from "./pages/dashboard/Settings";
import { ToastProvider } from "./components/ui/Toast";


const App = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Public Website */}
        <Route  element={<MainLayout />}>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="users" element={<Users />} />
          <Route path='drivers' element={<Drivers/>}/>
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* <Route path="vehicles" element={<Vehicles />} />

          <Route path="expenses" element={<Expenses />} />  */}
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;

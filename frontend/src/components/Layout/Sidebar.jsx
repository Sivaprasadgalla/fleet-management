import {
  LayoutDashboard,
  Truck,
  Users,
  Car,
  UserCircle,
  Receipt,
  FileText,
  Settings,
  User,
  X,
} from "lucide-react";
import logo from "../../media/fleet-fusion-light.png";

import SidebarItem from "./SidebarItem";

export default function Sidebar({ user, isOpen, onClose }) {
  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      role: ["user", "admin"],
    },
    {
      name: "Users",
      icon: User,
      path: "/dashboard/users",
      role: ["admin"]
    },
    {
      name: "Vehicles",
      icon: Truck,
      path: "/dashboard/vehicles",
      role: ["user", "admin"],
    },
    {
      name: "Drivers",
      icon: UserCircle,
      path: "/dashboard/drivers",
      role: ["user", "admin"],
    },
    {
      name: "Customers",
      icon: Users,
      path: "/dashboard/customers",
      role: ["user", "admin"],
    },
    {
      name: "Bookings",
      icon: Car,
      path: "/dashboard/bookings",
      role: ["user", "admin"],
    },
    {
      name: "Expenses",
      icon: Receipt,
      path: "/dashboard/expenses",
      role: ["user", "admin"],
    },
    {
      name: "Reports",
      icon: FileText,
      path: "/dashboard/reports",
      role: ["user", "admin"],
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      role: ["user", "admin"],
    },
  ];

  const role = user == null ? "user" : user.role;
  
  const navigation = (
    <div className="space-y-1 p-3 sm:p-4">
        {menus.map((item) => {
          if (item.role.includes(role)) {          
            return <SidebarItem key={item.name} {...item} onNavigate={onClose} />;
          }
          return null;
        })}
  </div>
  );
  return (
    <>
      {isOpen && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <img src={logo} alt="Fleet Fusion" className="max-h-10 max-w-[170px] object-contain" />
          <button type="button" aria-label="Close navigation" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><X size={20} /></button>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto">{navigation}</nav>
      </aside>
    </>
  );
}

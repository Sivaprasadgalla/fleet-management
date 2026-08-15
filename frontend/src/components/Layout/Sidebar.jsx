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
} from "lucide-react";
import logo from "../../media/fleet-fusion-light.png";

import SidebarItem from "./SidebarItem";

export default function Sidebar({ user }) {
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
  
  return (
    <aside className="w-72 bg-white border-r border-slate-200">
      <img src={logo} alt="Logo" className="max-w-[200px] pt-2 pl-4" />

      <div className="p-4 space-y-2">
        {menus.map((item) => {
          if (item.role.includes(role)) {          
            return <SidebarItem key={item.name} {...item} />;
          }
        })}
      </div>
    </aside>
  );
}

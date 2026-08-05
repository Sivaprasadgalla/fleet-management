import {
    LayoutDashboard,
    Truck,
    Users,
    Car,
    UserCircle,
    Receipt,
    FileText,
    Settings
} from "lucide-react";
import logo from "../../../public/fleet-fusion-light.png";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {

    const menus = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "Vehicles",
            icon: Truck,
            path: "/vehicles",
        },
        {
            name: "Drivers",
            icon: UserCircle,
            path: "/drivers",
        },
        {
            name: "Customers",
            icon: Users,
            path: "/customers",
        },
        {
            name: "Trips",
            icon: Car,
            path: "/trips",
        },
        {
            name: "Expenses",
            icon: Receipt,
            path: "/expenses",
        },
        {
            name: "Reports",
            icon: FileText,
            path: "/reports",
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings",
        },
    ];

    return (
        <aside className="w-72 bg-white border-r border-slate-200">

            <img src={logo} alt="Logo" className="max-w-[200px] pt-2 pl-4"/>

            <div className="p-4 space-y-2">

                {menus.map((item) => (
                    <SidebarItem
                        key={item.name}
                        {...item}
                    />
                ))}

            </div>

        </aside>
    );
}
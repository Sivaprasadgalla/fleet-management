import { NavLink } from "react-router-dom";

export default function SidebarItem({
    icon: Icon,
    name,
    path,
}) {
    return (
        <NavLink
            to={path} end
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                    isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 text-slate-700"
                }`
            }
        >
            <Icon size={20} />

            <span>{name}</span>
        </NavLink>
    );
}
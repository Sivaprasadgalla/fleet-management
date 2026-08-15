import { LogOut, Menu, Search, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../app/auth/authSlice";
import { useToast } from "../ui/Toast";

export default function DashboardHeader({ user, onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("fleetUser")) || null;
    } catch {
      return null;
    }
  })();
  const displayUser = user || storedUser;
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-4 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div className="relative hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            placeholder="Search..."
            className="h-10 w-48 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 md:w-64 xl:w-96"
          />
        </div>
      </div>

      <div className="relative flex min-w-0 items-center gap-2 sm:gap-3">
        {menuOpen && (
          <button
            type="button"
            aria-label="Close account menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
        )}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-20 flex min-w-0 items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100 sm:gap-3 sm:pr-2"
        >
          <img
            src={displayUser?.profilePhoto || "https://i.pravatar.cc/80"}
            alt="Profile"
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
          />

          <div className="min-w-0">
            <h3 className="hidden sm:block truncate text-sm font-semibold">
              {displayUser != null
                ? `${capitalize(displayUser.firstName)} ${capitalize(displayUser.lastName)}`
                : "Guest"}
            </h3>

            <p className="hidden text-xs text-slate-500 sm:block">
              {displayUser != null ? capitalize(displayUser.role) : "User"}
            </p>
          </div>
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
          >
            <div className="border-b border-slate-100 px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-slate-800">
                {displayUser
                  ? `${displayUser.firstName} ${displayUser.lastName}`
                  : "Account"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {displayUser?.email || ""}
              </p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard/settings");
              }}
              className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <UserRound size={17} className="text-slate-500" />
              Profile
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard/settings");
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Settings size={17} className="text-slate-500" />
              Settings
            </button>
            <div className="my-1 border-t border-slate-100" />
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                dispatch(logOut());
                setMenuOpen(false);
                toast("You have been signed out.", "success");
                navigate("/login");
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

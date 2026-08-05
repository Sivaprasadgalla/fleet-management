import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";

export default function DashboardHeader() {
    const { user } = useSelector((state) => state.auth);
    const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
    console.log(user);
    
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />

        <input
          placeholder="Search..."
          className="pl-10 h-11 rounded-xl border bg-slate-50 w-96 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell />

          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80"
            className="h-11 w-11 rounded-full"
          />

          <div>
            <h3 className="font-semibold">{user != null ? `${capitalize(user.firstName)} ${capitalize(user.lastName)}` : "John Doe"}</h3>

            <p className="text-sm text-slate-500">{user != null ? capitalize(user.role): "User"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

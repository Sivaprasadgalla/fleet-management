import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
    const { user} = useSelector((state) => state.auth);
    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar user ={user}/>
            <div className="flex-1 flex flex-col">
                <DashboardHeader user={user} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}
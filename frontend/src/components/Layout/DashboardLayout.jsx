import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}
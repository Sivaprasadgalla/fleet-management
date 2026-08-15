import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { hydrateUser } from "../../app/auth/authSlice";

export default function DashboardLayout() {
    const { user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        if (!user) dispatch(hydrateUser());
    }, [dispatch, user]);
    return (
        <div className="flex h-[100dvh] overflow-hidden bg-slate-100">
            <Sidebar user={user} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex min-w-0 flex-1 flex-col">
                <DashboardHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

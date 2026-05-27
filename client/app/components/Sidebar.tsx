"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar(){
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return(
        <div className="w-[250px] h-screen bg-black text-white p-5">
          <h1 className="text-2xl font-bold mb-10">
             Lead Tracker
          </h1>

          <div className="flex flex-col gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/leads">Leads</Link>
            <Link href="/dashboard/clients">Clients</Link>
            <Link href="/dashboard/appointments">Appointments</Link>
            <Link href="/dashboard/settings">Settings</Link>
            <button
            onClick={logout}
            className="bg-red-500 mt-10 px-4 py-2 rounded"
            >
             Logout
            </button>
          </div>
        </div>
    )
}
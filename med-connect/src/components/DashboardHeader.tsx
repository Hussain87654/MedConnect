"use client";

import Link from "next/link";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
}

export default function DashboardHeader({
  userName = "User",
  userRole = "Admin",
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 w-full z-40 bg-white/80 backdrop-blur-2xl flex justify-between items-center h-16 px-8 border-b-0 shadow-[0_20px_50px_rgba(0,92,85,0.06)]">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#e0e3e5] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#005c55]/20 transition-all outline-none"
            placeholder="Search patient files, doctors, or reports..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-slate-600 hover:text-teal-700 transition-colors cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link
            href="/"
            className="text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">home</span>
          </Link>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-teal-700">{userName}</p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">
              {userRole}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-[#005c55] ring-2 ring-[#005c55]/10">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}

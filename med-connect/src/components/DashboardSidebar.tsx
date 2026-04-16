"use client";

import { signOut } from "next-auth/react";

interface DashboardSidebarProps {
  onSettingsClick?: () => void;
}

export default function DashboardSidebar({ onSettingsClick }: DashboardSidebarProps) {
  return (
    <aside className="flex flex-col h-screen sticky left-0 top-0 border-r-0 bg-teal-50/50 backdrop-blur-xl tracking-tight py-8 px-4 w-64 z-50">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold font-headline text-teal-900">MedConnect</h1>
        <p className="text-xs font-medium text-teal-800/60 uppercase tracking-widest mt-1">Clinical Portal</p>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        <a className="flex items-center gap-3 px-4 py-3 bg-white text-teal-700 font-semibold rounded-2xl shadow-sm scale-95 transition-all duration-200" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/50 transition-all duration-300" href="#">
          <span className="material-symbols-outlined">calendar_today</span>
          <span>Appointments</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/50 transition-all duration-300" href="#">
          <span className="material-symbols-outlined">groups</span>
          <span>Patients</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/50 transition-all duration-300" href="#">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span>Messages</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/50 transition-all duration-300" href="#">
          <span className="material-symbols-outlined">monitoring</span>
          <span>Analytics</span>
        </a>
        <button
          onClick={onSettingsClick}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/50 transition-all duration-300 rounded-2xl"
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </button>
      </nav>
      <div className="mt-auto space-y-2 pt-6">
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-linear-to-br from-[#005c55] to-[#0f766e] text-white rounded-full font-semibold shadow-lg shadow-[#005c55]/20 hover:shadow-[#005c55]/40 transition-all active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">add_circle</span>
          <span>New Consultation</span>
        </button>
        <div className="pt-6 border-t border-teal-100/30">
          <a className="flex items-center gap-3 px-4 py-2 text-slate-500 font-medium hover:text-teal-700 transition-colors" href="#">
            <span className="material-symbols-outlined">help</span>
            <span>Help Center</span>
          </a>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 font-medium hover:text-[#ba1a1a] transition-colors cursor-pointer text-left">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface DashboardSidebarProps {
  onSettingsClick?: () => void;
  onMenuSelect?: (menuItem: string) => void;
  activeItem?: string;
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: string;
}

export default function DashboardSidebar({ onSettingsClick, onMenuSelect, activeItem = "Dashboard", isOpen = false, onClose, userRole = "PATIENT" }: DashboardSidebarProps) {
  const isPatient = userRole.toUpperCase() === "PATIENT";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-50 md:hidden backdrop-blur-sm" 
          onClick={onClose}
        />
      )}
      <aside 
        className={`flex flex-col h-dvh fixed md:sticky left-0 top-0 border-r-0 bg-white md:bg-teal-50/50 backdrop-blur-xl tracking-tight py-8 px-4 w-64 z-60 shadow-2xl md:shadow-xl shadow-teal-900/5 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold font-headline text-teal-900">MedConnect</h1>
        <p className="text-xs font-medium text-teal-800/60 uppercase tracking-widest mt-1">Clinical Portal</p>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMenuSelect && onMenuSelect("Dashboard")}
          className={`flex items-center w-full gap-3 px-4 py-3 font-semibold rounded-2xl shadow-sm transition-all duration-200 ${
            activeItem === "Dashboard" ? "bg-white text-teal-700" : "text-slate-500 hover:bg-teal-100/30 font-medium shadow-none"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </motion.button>
        {[
          { icon: "calendar_today", label: "Appointments" },
          { icon: "groups", label: "Patients", hideForPatient: false },
          { icon: "chat_bubble", label: "Messages", hideForPatient: true },
          { icon: "monitoring", label: "Analytics", hideForPatient: false },
        ].filter(item => !(item.hideForPatient && isPatient)).map((item, i) => (
          <motion.button 
            key={i}
            whileHover={{ x: 5, color: "#0f766e" }}
            onClick={() => onMenuSelect && onMenuSelect(item.label)}
            className={`flex items-center w-full gap-3 px-4 py-3 font-medium rounded-2xl transition-all duration-300 ${
              activeItem === item.label ? "bg-white text-teal-700 font-semibold shadow-sm" : "text-slate-500 hover:bg-teal-100/30"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </motion.button>
        ))}
        <motion.button
          whileHover={{ x: 5, color: "#0f766e" }}
          onClick={onSettingsClick}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/30 rounded-2xl transition-all duration-300"
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </motion.button>
      </nav>
      <div className="mt-auto space-y-2 pt-6">
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 92, 85, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-4 bg-linear-to-br from-[#005c55] to-[#0f766e] text-white rounded-full font-semibold shadow-lg shadow-[#005c55]/20 hover:shadow-[#005c55]/40 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>New Consultation</span>
        </motion.button>
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
    </>
  );
}

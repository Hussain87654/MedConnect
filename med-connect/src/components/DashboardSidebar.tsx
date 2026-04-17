"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface DashboardSidebarProps {
  onSettingsClick?: () => void;
}

export default function DashboardSidebar({ onSettingsClick }: DashboardSidebarProps) {
  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", damping: 20 }}
      className="flex flex-col h-screen sticky left-0 top-0 border-r-0 bg-teal-50/50 backdrop-blur-xl tracking-tight py-8 px-4 w-64 z-50 shadow-xl shadow-teal-900/5 transition-all"
    >
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold font-headline text-teal-900">MedConnect</h1>
        <p className="text-xs font-medium text-teal-800/60 uppercase tracking-widest mt-1">Clinical Portal</p>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        <motion.a 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 py-3 bg-white text-teal-700 font-semibold rounded-2xl shadow-sm transition-all duration-200" 
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </motion.a>
        {[
          { icon: "calendar_today", label: "Appointments" },
          { icon: "groups", label: "Patients" },
          { icon: "chat_bubble", label: "Messages" },
          { icon: "monitoring", label: "Analytics" },
        ].map((item, i) => (
          <motion.a 
            key={i}
            whileHover={{ x: 5, color: "#0f766e" }}
            className="flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-teal-100/30 rounded-2xl transition-all duration-300" 
            href="#"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </motion.a>
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
    </motion.aside>
  );
}

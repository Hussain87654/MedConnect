"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  onMenuClick?: () => void;
}

export default function DashboardHeader({
  userName = "User",
  userRole = "Admin",
  onMenuClick,
}: DashboardHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 w-full z-40 bg-white/80 backdrop-blur-2xl flex justify-between items-center h-16 px-4 md:px-8 border-b-0 shadow-[0_20px_50px_rgba(0,92,85,0.06)]"
    >
      <div className="flex items-center gap-4 flex-1">
        {onMenuClick && (
          <button onClick={onMenuClick} className="md:hidden p-2 text-slate-500 hover:text-teal-700 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <div className="relative max-w-md w-full hidden md:block">
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
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
          </motion.button>
          
          {/* Theme Toggle Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">
              {mounted && theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="/"
              className="text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">home</span>
            </Link>
          </motion.div>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-teal-700">{userName}</p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">
              {userRole}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-[#005c55] ring-2 ring-[#005c55]/10">
            {userName.charAt(0).toUpperCase()}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

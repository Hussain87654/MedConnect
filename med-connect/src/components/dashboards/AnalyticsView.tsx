"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface UserProp {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function AnalyticsView({ user }: UserProp) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointmentsForStats();
  }, [user]);

  const fetchAppointmentsForStats = async () => {
    try {
      const role = user.role?.toLowerCase() || "patient";
      let url = "/api/appointments";
      if (role !== "admin") {
        url += `?userId=${user.id}&role=${role}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.appointments) {
        const apts = data.appointments;
        const s = {
          total: apts.length,
          completed: apts.filter((a: any) => a.status === "completed").length,
          upcoming: apts.filter((a: any) => a.status === "pending" || a.status === "confirmed").length,
          cancelled: apts.filter((a: any) => a.status === "cancelled").length
        };
        setStats(s);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-headline text-[#005c55]">Analytics Overview</h2>
          <p className="text-[#3e4947] mt-1">
            {user.role?.toLowerCase() === "admin" 
              ? "Platform-wide performance and utilization statistics." 
              : "Insights and tracking for your personal appointments."}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#80f9c8]/20 rounded-xl shadow-sm border border-[#80f9c8]">
          <span className="material-symbols-outlined text-[#005c55] animate-pulse">monitoring</span>
          <span className="text-sm font-bold text-[#00513a]">Live Data Integration</span>
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium font-body">Generating analytics...</p>
        </div>
      ) : (
        <>
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={item} className="bg-white p-6 rounded-4xl border border-[#e0e3e5] shadow-sm relative overflow-hidden group hover:border-[#005c55] transition-colors">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005c55] shadow-md border border-slate-100 mb-4">
                  <span className="material-symbols-outlined">data_usage</span>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Bookings</h3>
                <p className="text-4xl font-black text-[#191c1e]">{stats.total}</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white p-6 rounded-4xl border border-[#e0e3e5] shadow-sm relative overflow-hidden group hover:border-[#80f9c8] transition-colors">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#80f9c8]/10 rounded-full group-hover:bg-[#80f9c8]/20 transition-colors"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-[#80f9c8] rounded-full flex items-center justify-center text-[#005c55] shadow-md mb-4">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Completed</h3>
                <p className="text-4xl font-black text-[#191c1e]">{stats.completed}</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white p-6 rounded-4xl border border-[#e0e3e5] shadow-sm relative overflow-hidden group hover:border-amber-200 transition-colors">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-md mb-4">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Upcoming</h3>
                <p className="text-4xl font-black text-[#191c1e]">{stats.upcoming}</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white p-6 rounded-4xl border border-[#e0e3e5] shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-[#ffdad6] rounded-full flex items-center justify-center text-[#93000a] shadow-md mb-4">
                  <span className="material-symbols-outlined">cancel</span>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Cancelled</h3>
                <p className="text-4xl font-black text-[#191c1e]">{stats.cancelled}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="bg-white rounded-4xl p-6 text-center border-2 border-dashed border-[#e0e3e5] opacity-60">
             <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">bar_chart</span>
             <p className="text-slate-500 font-bold">Advanced Graphical Charts Coming Soon</p>
          </div>
        </>
      )}
    </div>
  );
}

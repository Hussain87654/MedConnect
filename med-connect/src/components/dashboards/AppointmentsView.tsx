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

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

export function AppointmentsView({ user }: UserProp) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const role = user.role?.toLowerCase() || "patient";
      let url = "/api/appointments";

      if (role !== "admin") {
        url += `?userId=${user.id}&role=${role}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    const map: Record<string, string> = {
      confirmed: "bg-[#80f9c8] text-[#007353]",
      completed: "bg-[#80f9c8] text-[#007353]",
      pending: "bg-amber-100 text-amber-700",
      cancelled: "bg-[#ffdad6] text-[#93000a]",
    };
    return map[status] || "bg-[#e0e3e5] text-slate-500";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-headline text-[#005c55]">All Appointments</h2>
          <p className="text-[#3e4947] mt-1">
            {user.role?.toLowerCase() === "admin" 
              ? "Comprehensive list of all appointments in the system." 
              : "Review your personal appointment history and upcoming schedules."}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-[#e0e3e5]">
          <span className="material-symbols-outlined text-[#005c55]">history</span>
          <span className="text-sm font-bold text-[#191c1e]">{appointments.length} Records</span>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-6 md:p-8 shadow-sm border border-[#e0e3e5]">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium font-body">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center opacity-70">
            <span className="material-symbols-outlined text-6xl text-[#80f9c8] mb-4">event_busy</span>
            <p className="text-slate-500 font-medium font-body text-lg">No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left border-separate border-spacing-y-2 min-w-[800px]">
              <thead>
                <tr className="text-[#3e4947] text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date & Time</th>
                  {user.role?.toLowerCase() !== "doctor" && <th className="px-6 py-4">Doctor</th>}
                  {user.role?.toLowerCase() !== "patient" && <th className="px-6 py-4">Patient</th>}
                  <th className="px-6 py-4">Reason</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="bg-[#f2f4f6] hover:bg-teal-50/50 transition-colors group">
                    <td className="px-6 py-5 rounded-l-2xl">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusBadgeClass(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#191c1e]">{apt.date}</div>
                      <div className="text-xs text-[#3e4947] font-medium mt-1">{apt.time}</div>
                    </td>
                    {user.role?.toLowerCase() !== "doctor" && (
                      <td className="px-6 py-5 font-semibold text-[#191c1e]">{apt.doctorName}</td>
                    )}
                    {user.role?.toLowerCase() !== "patient" && (
                      <td className="px-6 py-5 font-semibold text-[#191c1e]">{apt.patientName}</td>
                    )}
                    <td className="px-6 py-5 text-[#3e4947] rounded-r-2xl max-w-xs truncate" title={apt.reason || "N/A"}>
                      {apt.reason || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

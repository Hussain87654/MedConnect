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

interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string | null;
  bloodGroup?: string | null;
  gender?: string | null;
  createdAt?: string;
  role?: string;
}

export function PatientsView({ user }: UserProp) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, [user]);

  const fetchPatients = async () => {
    try {
      const role = user.role?.toLowerCase() || "patient";

      if (role === "patient") {
        // Patients don't see other patients
        setPatients([]);
        setLoading(false);
        return;
      }

      if (role === "admin") {
        // Fetch all patients for admin
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.users) {
          const patientUsers = data.users.filter((u: any) => u.role === "patient");
          setPatients(patientUsers);
        }
      } else if (role === "doctor") {
        // Fetch patients associated with this doctor
        const res = await fetch(`/api/appointments?userId=${user.id}&role=doctor`);
        const data = await res.json();
        if (data.patients) {
          setPatients(data.patients);
        }
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const isPatientRole = user.role?.toLowerCase() === "patient";

  if (isPatientRole) {
    return (
      <div className="flex flex-col items-center justify-center p-20 opacity-70 animate-in fade-in duration-300">
        <span className="material-symbols-outlined text-6xl text-[#ffdad6] mb-4">lock</span>
        <p className="text-slate-500 font-medium font-body text-xl">Access Denied</p>
        <p className="text-slate-400 mt-2">You do not have permission to view patient records.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-headline text-[#005c55]">Patients Directory</h2>
          <p className="text-[#3e4947] mt-1">
            {user.role?.toLowerCase() === "admin" 
              ? "Comprehensive directory of all registered patients in the system." 
              : "Review the directory of patients assigned to your care."}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-[#e0e3e5]">
          <span className="material-symbols-outlined text-[#005c55]">groups</span>
          <span className="text-sm font-bold text-[#191c1e]">{patients.length} Registered</span>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-6 md:p-8 shadow-sm border border-[#e0e3e5]">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium font-body">Loading patient records...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center opacity-70">
            <span className="material-symbols-outlined text-6xl text-[#80f9c8] mb-4">group_off</span>
            <p className="text-slate-500 font-medium font-body text-lg">No patients found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left border-separate border-spacing-y-2 min-w-[800px]">
              <thead>
                <tr className="text-[#3e4947] text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Patient Profile</th>
                  <th className="px-6 py-4">Email Contact</th>
                  <th className="px-6 py-4">Date of Birth</th>
                  <th className="px-6 py-4">Blood Group</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {patients.map((patient) => (
                  <tr key={patient.id} className="bg-[#f2f4f6] hover:bg-teal-50/50 transition-colors group">
                    <td className="px-6 py-5 rounded-l-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#80f9c8] flex items-center justify-center text-[#005c55] font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                          {patient.name?.charAt(0).toUpperCase() || (patient as any).username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-[#191c1e]">{patient.name || (patient as any).username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#3e4947] font-medium">{patient.email}</td>
                    <td className="px-6 py-5 text-[#3e4947]">
                      {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "Not Provided"}
                    </td>
                    <td className="px-6 py-5 rounded-r-2xl">
                      {patient.bloodGroup ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ffdad6] text-[#93000a]">
                          {patient.bloodGroup}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Unknown</span>
                      )}
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

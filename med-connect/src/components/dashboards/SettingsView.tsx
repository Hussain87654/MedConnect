"use client";

import React from "react";

interface UserProp {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  onUpdateProfile: () => void;
}

export function SettingsView({ user, onUpdateProfile }: UserProp) {
  const roleDisplay = user.role ? user.role.toUpperCase() : "PATIENT";

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-headline text-[#005c55]">Account Settings</h2>
          <p className="text-[#3e4947] mt-1">Manage your profile information and account preferences.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-md border border-[#e0e3e5] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-teal-50 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-10 relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-[#005c55] flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white outline-[#80f9c8]/30 outline-4">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-center">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                roleDisplay === "ADMIN" ? "bg-[#ffdad6] text-[#93000a]" :
                roleDisplay === "DOCTOR" ? "bg-[#80f9c8] text-[#00513a]" :
                "bg-teal-100 text-teal-800"
              }`}>
                {roleDisplay}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                <p className="text-lg font-bold text-[#191c1e]">{user.name || "Not Provided"}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-lg font-bold text-[#191c1e]">{user.email || "Not Provided"}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account ID</p>
                <p className="text-sm font-mono font-medium text-slate-500">{user.id}</p>
              </div>
              <div className="bg-[#80f9c8]/10 p-5 rounded-2xl border border-[#80f9c8]/30">
                <p className="text-[10px] font-bold text-[#00513a] uppercase tracking-widest mb-1">Security Status</p>
                <p className="text-sm font-bold text-[#006c4e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span> Highly Secure
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <button
                onClick={onUpdateProfile}
                className="flex items-center justify-center gap-2 bg-[#005c55] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#004e49] hover:shadow-xl transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
                Update Profile Info
              </button>
            </div>
            {roleDisplay === "ADMIN" && (
                <p className="text-xs text-slate-400 italic">
                    Note: Admin attributes must be edited directly via database currently. Profile edit logic is optimized for Patients and Doctors.
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import { saveDoctorProfile } from '../app/action/doctorAction';

export default function DoctorProfileForm() {
  const [loading, setLoading] = useState(false);
  const [activeTabDay, setActiveTabDay] = useState('MON');
  const [frmDta, setfrmDta] = useState({
    name: '',
    specialization: '',
    qualifications: '',
    experience: '',
    fee: '',
    bio: ''
  });

  const hndlechnge = (e: any) => {
    const { name, value, type, checked } = e.target;
    setfrmDta({ 
      ...frmDta, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };



  const hndlesbmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const result = await saveDoctorProfile(frmDta);

    if (result.success) {
      alert("Profile and Availability updated successfully!");
    } else {
      alert("Error saving profile details.");
    }
    setLoading(false);
  };

  const specializations = [
    "General Physician", "Cardiologist", "Dermatologist",
    "Neurologist", "Pediatrician", "Psychiatrist",
    "Orthopedic", "Gynecologist", "Cardiothoracic Surgery"
  ];

  return (
    <div className="w-full text-[#191c1e] p-2 md:p-6 font-['Inter']">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#bdc9cc]/20 pb-10">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-[#005c55] font-['Plus_Jakarta_Sans']">
              Professional Identity
            </h1>
            <p className="text-[#3e4947] mt-3 max-w-3xl text-lg font-medium opacity-80">
              Configure your medical practice credentials, bio, and hourly availability slots.
            </p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-[#80f9c8]/30 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[#006c4e] text-base">verified_user</span>
            <span className="text-[#006c4e] text-xs uppercase tracking-widest font-black">Verified Practitioner</span>
          </div>
        </div>

        <form onSubmit={hndlesbmit} className="space-y-10">
          
          {/* Identity & Bio */}
          <div className="space-y-10">
            
            {/* Identity Card */}
            <section className="bg-[#f2f4f6] rounded-[2.5rem] p-6 md:p-10 shadow-sm hover:shadow-xl hover:shadow-[#005c55]/5 transition-all duration-300 border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#9cf2e8] rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#005c55]">badge</span>
                </div>
                <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-tight text-[#005c55]">
                  Identity & Credentials
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={frmDta.name}
                    onChange={hndlechnge}
                    placeholder="Dr. Sarah Chen"
                    className="w-full bg-[#e0e3e5] border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#005c55]/10 transition-all outline-none font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest ml-1">Specialization</label>
                  <select 
                    name="specialization"
                    value={frmDta.specialization}
                    onChange={hndlechnge}
                    className="w-full bg-[#e0e3e5] border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#005c55]/10 transition-all outline-none font-medium appearance-none"
                    required
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest ml-1">Qualifications</label>
                  <input 
                    type="text"
                    name="qualifications"
                    value={frmDta.qualifications}
                    onChange={hndlechnge}
                    placeholder="e.g. MBBS, FCPS"
                    className="w-full bg-[#e0e3e5] border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#005c55]/10 transition-all outline-none font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest ml-1">Experience (Years)</label>
                  <input 
                    type="number"
                    name="experience"
                    value={frmDta.experience}
                    onChange={hndlechnge}
                    placeholder="12"
                    className="w-full bg-[#e0e3e5] border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#005c55]/10 transition-all outline-none font-medium"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Consultation Card */}
            <section className="bg-[#f2f4f6] rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#80f9c8] rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#006c4e]">description</span>
                </div>
                <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-tight text-[#005c55]">
                  Practice Bio & Fees
                </h3>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest ml-1">Professional Bio</label>
                  <textarea 
                    name="bio"
                    value={frmDta.bio}
                    onChange={hndlechnge}
                    rows={6}
                    placeholder="Share your medical background, philosophies, and patient care approach..."
                    className="w-full bg-[#e0e3e5] border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#005c55]/10 transition-all outline-none font-medium resize-none shadow-inner"
                  />
                </div>
                <div className="md:w-1/2 space-y-2">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest ml-1">Consultation Fee (PKR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3e4947] font-bold">Rs.</span>
                    <input 
                      type="number"
                      name="fee"
                      value={frmDta.fee}
                      onChange={hndlechnge}
                      placeholder="2500"
                      className="w-full bg-[#e0e3e5] border-none rounded-2xl p-4 pl-12 focus:ring-4 focus:ring-[#005c55]/10 transition-all outline-none font-bold text-[#005c55]"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Action Card */}
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="bg-linear-to-br from-[#005c55] to-[#0f766e] p-6 md:p-10 rounded-[2.5rem] text-white shadow-2xl shadow-[#005c55]/20 flex flex-col items-center text-center space-y-6">
               <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                 <span className="material-symbols-outlined text-5xl">rocket_launch</span>
               </div>
               <h4 className="text-2xl font-bold font-['Plus_Jakarta_Sans']">Ready to Publish?</h4>
               <p className="text-base opacity-80 leading-relaxed font-medium">
                 Your clinical profile and time slots will be synced with the hospital engine.
               </p>
               <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-[#005c55] py-5 rounded-2xl font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
               >
                  {loading ? 'PUBLISHING...' : 'PUBLISH PROFILE'}
               </button>
               <p className="text-xs uppercase tracking-widest font-bold opacity-60">clinical precision v1.0</p>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
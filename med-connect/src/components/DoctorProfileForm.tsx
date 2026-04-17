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
    bio: '',
    isAvailable: true,
    slots: [] as any[]
  });

  const hndlechnge = (e: any) => {
    const { name, value, type, checked } = e.target;
    setfrmDta({ 
      ...frmDta, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const addSlot = () => {
    const newSlot = { 
      id: Math.random().toString(36).substr(2, 9),
      day: activeTabDay, 
      startTime: '09:00', 
      endTime: '12:00' 
    };
    setfrmDta({ ...frmDta, slots: [...frmDta.slots, newSlot] });
  };

  const removeSlot = (id: string) => {
    setfrmDta({ ...frmDta, slots: frmDta.slots.filter(s => s.id !== id) });
  };

  const updateSlot = (id: string, field: string, value: string) => {
    setfrmDta({
      ...frmDta,
      slots: frmDta.slots.map(s => s.id === id ? { ...s, [field]: value } : s)
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

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const specializations = [
    "General Physician", "Cardiologist", "Dermatologist",
    "Neurologist", "Pediatrician", "Psychiatrist",
    "Orthopedic", "Gynecologist", "Cardiothoracic Surgery"
  ];

  const currentDaySlots = frmDta.slots.filter(s => s.day === activeTabDay);

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

        <form onSubmit={hndlesbmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Identity & Bio */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Identity Card */}
            <section className="bg-[#f2f4f6] rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl hover:shadow-[#005c55]/5 transition-all duration-300 border border-white/50">
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
            <section className="bg-[#f2f4f6] rounded-[2.5rem] p-10 shadow-sm border border-white/50">
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

          {/* Right Column: Status & Publish */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Availability Panel */}
            <section className="bg-white rounded-[2.5rem] p-10 border border-[#e0e3e5] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#005c55] to-[#80f9c8]"></div>
               <h3 className="text-2xl font-bold mb-8 font-['Plus_Jakarta_Sans'] text-[#005c55]">Availability Settings</h3>
               
               <div className="space-y-8">
                  {/* Day Selection */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-[#3e4947] uppercase tracking-widest">Select Work Day</p>
                    <div className="flex flex-wrap gap-2">
                      {days.map(day => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setActiveTabDay(day)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTabDay === day 
                            ? 'bg-[#005c55] text-white shadow-lg' 
                            : 'bg-[#f2f4f6] text-[#3e4947] hover:bg-[#e0e3e5]'
                          }`}
                        >
                          {day.charAt(0) + day.slice(1).toLowerCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slots Management */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-[#3e4947] uppercase tracking-widest">Time Slots ({activeTabDay})</p>
                      <button 
                        type="button"
                        onClick={addSlot}
                        className="text-[#0f766e] text-[10px] font-black uppercase tracking-tighter hover:underline"
                      >
                        + Add Slot
                      </button>
                    </div>

                    <div className="space-y-3 min-h-[100px]">
                      {currentDaySlots.map(slot => (
                        <div key={slot.id} className="flex items-center gap-2 p-3 bg-[#f2f4f6] rounded-xl group animate-in slide-in-from-right-2 duration-200">
                          <input 
                            type="time" 
                            value={slot.startTime}
                            onChange={(e) => updateSlot(slot.id, 'startTime', e.target.value)}
                            className="bg-transparent border-none p-0 text-xs font-bold w-full outline-none"
                          />
                          <span className="text-slate-400 text-[10px]">to</span>
                          <input 
                            type="time" 
                            value={slot.endTime}
                            onChange={(e) => updateSlot(slot.id, 'endTime', e.target.value)}
                            className="bg-transparent border-none p-0 text-xs font-bold w-full outline-none"
                          />
                          <button 
                            type="button"
                            onClick={() => removeSlot(slot.id)}
                            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      ))}
                      {currentDaySlots.length === 0 && (
                        <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl opacity-50">
                          <span className="material-symbols-outlined text-slate-400 mb-1">event_busy</span>
                          <p className="text-[10px] font-bold text-slate-400">No slots for {activeTabDay}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Global Availability Toggle */}
                  <div 
                    onClick={() => setfrmDta({...frmDta, isAvailable: !frmDta.isAvailable})}
                    className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${
                      frmDta.isAvailable 
                      ? 'bg-[#80f9c8]/20 border-[#80f9c8] text-[#00513a]' 
                      : 'bg-[#ffdad6]/20 border-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-bold uppercase tracking-wider text-[10px]">Portal Visibility</span>
                       <span className={`material-symbols-outlined ${frmDta.isAvailable ? 'text-[#006c4e]' : 'text-[#ba1a1a]'}`}>
                         {frmDta.isAvailable ? 'check_circle' : 'cancel'}
                       </span>
                    </div>
                    <p className="text-lg font-black">{frmDta.isAvailable ? 'Publicly Visible' : 'Hidden From Patients'}</p>
                  </div>
               </div>
            </section>

            {/* Action Card */}
            <div className="bg-linear-to-br from-[#005c55] to-[#0f766e] p-10 rounded-[2.5rem] text-white shadow-2xl shadow-[#005c55]/20 flex flex-col items-center text-center space-y-6">
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
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components";
import DoctorProfileForm from "../DoctorProfileForm";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
  notes?: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string | null;
  bloodGroup?: string | null;
}

interface Prescription {
  id: string;
  patientId: string;
  patientName?: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  refills: number;
  instructions: string;
  status: string;
  createdAt: string;
  patient?: {
    name: string;
  };
}

interface DoctorDashboardProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function DoctorDashboard({ user }: DoctorDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"appointments" | "patients" | "prescriptions" | "availability">("appointments");
  const [activeTabDay, setActiveTabDay] = useState('MON');
  const [availabilityData, setAvailabilityData] = useState({
    isAvailable: true,
    slots: [] as any[]
  });
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const addSlot = () => {
    const newSlot = { 
      id: Math.random().toString(36).substr(2, 9),
      day: activeTabDay, 
      startTime: '09:00', 
      endTime: '12:00' 
    };
    setAvailabilityData({ ...availabilityData, slots: [...availabilityData.slots, newSlot] });
  };

  const removeSlot = (id: string) => {
    setAvailabilityData({ ...availabilityData, slots: availabilityData.slots.filter(s => s.id !== id) });
  };

  const updateSlot = (id: string, field: string, value: string) => {
    setAvailabilityData({
      ...availabilityData,
      slots: availabilityData.slots.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const currentDaySlots = availabilityData.slots.filter(s => s.day === activeTabDay);
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    completed: 0,
    totalPatients: 0,
    pending: 0,
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [isSavingPrescription, setIsSavingPrescription] = useState(false);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: "",
    dosage: "",
    frequency: "Once daily",
    duration: "",
    refills: 0,
    instructions: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    fetchData();
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch("/api/prescriptions");
      const data = await res.json();
      if (data.prescriptions) {
        setPrescriptions(data.prescriptions);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/appointments?userId=${user.id}&role=doctor`);
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
        updateStats(data.appointments);
      }
      if (data.patients) {
        setPatients(data.patients);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (appts: Appointment[]) => {
    const today = new Date().toISOString().split("T")[0];
    const uniquePatientIds = new Set(appts.map((a) => a.patientId));
    setStats({
      today: appts.filter((apt) => apt.date === today).length,
      upcoming: appts.filter(
        (apt) =>
          apt.date >= today &&
          (apt.status === "confirmed" || apt.status === "pending")
      ).length,
      completed: appts.filter((apt) => apt.status === "completed").length,
      totalPatients: uniquePatientIds.size,
      pending: appts.filter((apt) => apt.status === "pending").length,
    });
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    setUpdatingId(appointmentId);
    try {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        );
        setAppointments(updated);
        updateStats(updated);
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePrescriptionSubmit = async () => {
    if (!selectedPatientId || !prescriptionForm.medication) {
      alert("Please select a patient and enter medication name.");
      return;
    }

    setIsSavingPrescription(true);
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prescriptionForm,
          patientId: selectedPatientId,
        }),
      });

      if (res.ok) {
        setShowPrescriptionModal(false);
        setPrescriptionForm({
          medication: "",
          dosage: "",
          frequency: "Once daily",
          duration: "",
          refills: 0,
          instructions: "",
        });
        setSelectedPatientId("");
        setPatientSearchTerm("");
        fetchPrescriptions();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save prescription.");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Something went wrong.");
    } finally {
      setIsSavingPrescription(false);
    }
  };

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const getStatusBadgeClass = (status: string) => {
    const map: Record<string, string> = {
      confirmed: "bg-[#80f9c8]/40 text-[#007353]",
      completed: "bg-[#80f9c8]/40 text-[#007353]",
      pending: "bg-amber-100 text-amber-700",
      cancelled: "bg-[#ffdad6] text-[#93000a]",
    };
    return map[status] || "bg-[#e0e3e5] text-slate-500";
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10 max-w-7xl mx-auto"
    >
      {/* ── Header: Greeting & Quick Stats ── */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-teal-900 font-headline">
              Welcome back, Dr. {user.name || "Specialist"}.
            </h1>
            <p className="text-on-surface-variant text-lg mt-2">
              You have {stats.pending} pending appointment requests and {stats.today} consultations scheduled for today.
            </p>
          </div>
          <button
            onClick={() => setShowProfileForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005c55] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(0,92,85,0.3)] hover:shadow-[0_6px_20px_rgba(0,92,85,0.4)] hover:bg-[#004e49] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <span className="material-symbols-outlined text-sm">manage_accounts</span>
            Update Profile
          </button>
        </div>
        
        <Card tilt padding="sm" className="bg-[#80f9c8] text-[#00513a] flex flex-col justify-between border-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase  tracking-widest opacity-80">Today's Load</span>
            <span className="material-symbols-outlined opacity-40">calendar_today</span>
          </div>
          <div>
            <h3 className="text-3xl font-black">{stats.today}</h3>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter mt-1">Confirmed Sessions</p>
          </div>
        </Card>

        <Card tilt padding="sm" className="bg-[#80f9c8] text-[#00513a] flex flex-col justify-between border-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Pending Tasks</span>
            <span className="material-symbols-outlined opacity-40">pending_actions</span>
          </div>
          <div>
            <h3 className="text-3xl font-black">{stats.pending}</h3>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter mt-1">Requires Action</p>
          </div>
        </Card>
      </motion.section>

      {/* ── Bento Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Timeline / Appointments / Patients ── */}
        <section className="lg:col-span-2 space-y-6">

          {/* Tab Bar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 p-1 bg-[#f2f4f6] rounded-2xl overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("appointments")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === "appointments"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-[#3e4947] hover:text-[#005c55]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">event_note</span>
                  Today&apos;s Timeline
                </span>
              </button>
              <button
                onClick={() => setActiveTab("patients")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === "patients"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-[#3e4947] hover:text-[#005c55]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">groups</span>
                  My Patients
                </span>
              </button>
              <button
                onClick={() => setActiveTab("prescriptions")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === "prescriptions"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-[#3e4947] hover:text-[#005c55]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">history</span>
                  Prescriptions
                </span>
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === "availability"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-[#3e4947] hover:text-[#005c55]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">event_available</span>
                  Availability
                </span>
              </button>
            </div>
            <p className="text-xs text-[#3e4947] font-medium hidden md:block">{todayLabel}</p>
          </div>

          {/* Appointments Timeline */}
          {activeTab === "appointments" && (
            <div className="bg-[#f2f4f6] rounded-xl p-2 space-y-1">
              {loading ? (
                <div className="p-10 text-center">
                  <div className="w-10 h-10 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="p-10 text-center">
                  <span className="material-symbols-outlined text-4xl text-teal-200 mb-3 block">calendar_today</span>
                  <p className="text-slate-500 font-medium">No appointments found.</p>
                </div>
              ) : (
                appointments.map((apt, idx) => (
                  <div
                    key={apt.id}
                    className={`rounded-xl p-4 flex gap-6 items-center group transition-colors ${
                      idx === 0
                        ? "bg-white shadow-sm border-l-4 border-[#005c55]"
                        : "hover:bg-white/50"
                    }`}
                  >
                    {/* Time */}
                    <div className="text-center min-w-[70px]">
                      <p className={`text-xs font-bold ${idx === 0 ? "text-[#005c55]" : "text-slate-400"}`}>
                        {apt.time || "—"}
                      </p>
                      {idx === 0 && (
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Now</p>
                      )}
                    </div>

                    {/* Patient info */}
                    <div className={`flex-1 flex items-center justify-between ${idx !== 0 ? "border-l border-slate-200 pl-6 ml-1" : ""}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#005c55] flex items-center justify-center text-white font-bold text-base shadow-sm">
                          {apt.patientName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#191c1e]">{apt.patientName}</p>
                          <p className="text-xs text-[#3e4947]">
                            {apt.reason || "Consultation"} • {apt.date}
                          </p>
                        </div>
                      </div>

                      {/* Status badge + action buttons */}
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${getStatusBadgeClass(apt.status)}`}>
                          {apt.status}
                        </span>
                        {apt.status === "pending" && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleStatusUpdate(apt.id, "confirmed")}
                              disabled={updatingId === apt.id}
                              className="p-2 bg-[#f2f4f6] text-[#005c55] rounded-full hover:bg-[#005c55] hover:text-white transition-all disabled:opacity-50"
                              title="Confirm"
                            >
                              <span className="material-symbols-outlined text-base">check</span>
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(apt.id, "cancelled")}
                              disabled={updatingId === apt.id}
                              className="p-2 bg-[#f2f4f6] text-[#ba1a1a] rounded-full hover:bg-[#ffdad6] transition-all disabled:opacity-50"
                              title="Cancel"
                            >
                              <span className="material-symbols-outlined text-base">close</span>
                            </button>
                          </div>
                        )}
                        {apt.status === "confirmed" && (
                          <button
                            onClick={() => handleStatusUpdate(apt.id, "completed")}
                            disabled={updatingId === apt.id}
                            className="p-2 bg-[#f2f4f6] text-[#005c55] rounded-full hover:bg-[#005c55] hover:text-white transition-all disabled:opacity-50 opacity-0 group-hover:opacity-100"
                            title="Mark Complete"
                          >
                            <span className="material-symbols-outlined text-base">task_alt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Patients Table */}
          {activeTab === "patients" && (
            <div className="bg-[#f2f4f6] rounded-xl p-2">
              {loading ? (
                <div className="p-10 text-center">
                  <div className="w-10 h-10 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">Loading patients...</p>
                </div>
              ) : patients.length === 0 ? (
                <div className="p-10 text-center">
                  <span className="material-symbols-outlined text-4xl text-teal-200 mb-3 block">groups</span>
                  <p className="text-slate-500 font-medium">No patients found yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl">
                  <table className="w-full text-left border-separate border-spacing-y-1 min-w-[600px]">
                    <thead>
                      <tr className="text-[#3e4947] text-[10px] uppercase tracking-widest font-bold">
                        <th className="px-6 py-3">Patient</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Date of Birth</th>
                        <th className="px-6 py-3">Blood Group</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {patients.map((patient) => (
                        <tr key={patient.id} className="bg-white hover:bg-teal-50/30 transition-colors rounded-2xl">
                          <td className="px-6 py-4 rounded-l-2xl">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#80f9c8] flex items-center justify-center text-[#007353] font-bold text-sm">
                                {patient.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-semibold text-[#191c1e]">{patient.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#3e4947]">{patient.email}</td>
                          <td className="px-6 py-4 text-[#3e4947]">{patient.dateOfBirth || "N/A"}</td>
                          <td className="px-6 py-4 rounded-r-2xl">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#93000a]">
                              {patient.bloodGroup || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Prescriptions View */}
          {activeTab === "prescriptions" && (
            <div className="bg-[#f2f4f6] rounded-xl p-2">
              {prescriptions.length === 0 ? (
                <div className="p-10 text-center">
                  <span className="material-symbols-outlined text-4xl text-teal-200 mb-3 block">history</span>
                  <p className="text-slate-500 font-medium">No prescriptions written yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl">
                  <table className="w-full text-left border-separate border-spacing-y-1 min-w-[600px]">
                    <thead>
                      <tr className="text-[#3e4947] text-[10px] uppercase tracking-widest font-bold">
                        <th className="px-6 py-3">Patient & Medication</th>
                        <th className="px-6 py-3">Dosage</th>
                        <th className="px-6 py-3">Frequency</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {prescriptions.map((px) => (
                        <tr key={px.id} className="bg-white hover:bg-teal-50/30 transition-colors rounded-2xl group">
                          <td className="px-6 py-4 rounded-l-2xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#f2f4f6] flex items-center justify-center text-[#005c55] group-hover:bg-[#005c55] group-hover:text-white transition-colors border border-slate-100">
                                <span className="material-symbols-outlined text-lg">pill</span>
                              </div>
                              <div>
                                <p className="font-bold text-[#191c1e]">{px.medication}</p>
                                <p className="text-xs text-[#3e4947]">Patient: {px.patient?.name || px.patientName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#3e4947] font-medium">{px.dosage}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-[#3e4947]">
                              {px.frequency}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              px.status === "ACTIVE" ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-500"
                            }`}>
                              {px.status === "ACTIVE" && <span className="w-1 h-1 rounded-full bg-teal-500 mr-2 animate-pulse" />}
                              {px.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 rounded-r-2xl text-right text-xs text-slate-400">
                            {new Date(px.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Availability View */}
          {activeTab === "availability" && (
            <div className="bg-white rounded-xl p-6 border border-[#e0e3e5] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#005c55] to-[#80f9c8]"></div>
               <h3 className="text-xl font-bold mb-6 font-['Plus_Jakarta_Sans'] text-[#005c55]">Availability Settings</h3>
               
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
                        className="text-[#0f766e] text-[10px] font-black uppercase tracking-tighter hover:underline px-2 py-1 rounded-md hover:bg-teal-50"
                      >
                        + Add Slot
                      </button>
                    </div>

                    <div className="space-y-3 min-h-[100px]">
                      {currentDaySlots.map(slot => (
                        <div key={slot.id} className="flex items-center gap-2 p-3 bg-[#f2f4f6] rounded-xl group hover:bg-[#e0e3e5] transition-colors">
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
                            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-50"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      ))}
                      {currentDaySlots.length === 0 && (
                        <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl opacity-50 bg-[#f9fafb]">
                          <span className="material-symbols-outlined text-slate-400 mb-1 text-2xl">event_busy</span>
                          <p className="text-[10px] font-bold text-slate-400">No slots for {activeTabDay}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Global Availability Toggle */}
                  <div 
                    onClick={() => setAvailabilityData({...availabilityData, isAvailable: !availabilityData.isAvailable})}
                    className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${
                      availabilityData.isAvailable 
                      ? 'bg-[#80f9c8]/20 border-[#80f9c8] text-[#00513a] hover:bg-[#80f9c8]/30' 
                      : 'bg-[#ffdad6]/20 border-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-bold uppercase tracking-wider text-[10px]">Portal Visibility</span>
                       <span className={`material-symbols-outlined ${availabilityData.isAvailable ? 'text-[#006c4e]' : 'text-[#ba1a1a]'}`}>
                         {availabilityData.isAvailable ? 'check_circle' : 'cancel'}
                       </span>
                    </div>
                    <p className="text-lg font-black">{availabilityData.isAvailable ? 'Publicly Visible' : 'Hidden From Patients'}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => alert("Availability synced successfully!")}
                      className="w-full bg-[#005c55] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#004e49] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                    >
                      Save Availability
                    </button>
                  </div>
               </div>
            </div>
          )}
        </section>

        {/* ── Right Sidebar ── */}
        <aside className="space-y-6">

          {/* Quick Rx Card */}
          <div className="bg-[#e0e3e5] p-6 rounded-xl border border-white relative group overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-teal-900 mb-2 font-headline">Quick Rx</h4>
              <p className="text-xs text-[#3e4947] mb-4">
                Create a new prescription for any active patient in seconds.
              </p>
              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="w-full bg-white text-teal-800 font-bold py-3 rounded-full text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">history_edu</span>
                Write Prescription
              </button>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          </div>

          {/* Pending Appointment Requests */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#191c1e] text-sm">
                Appointment Requests ({appointments.filter((a) => a.status === "pending").length})
              </h3>
              <button
                onClick={() => setActiveTab("appointments")}
                className="text-[#005c55] text-xs font-bold hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {appointments
                .filter((a) => a.status === "pending")
                .slice(0, 3)
                .map((apt) => (
                  <div key={apt.id} className="bg-white p-4 rounded-xl shadow-sm border-l-2 border-[#80d5cb]">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-bold text-[#191c1e]">{apt.patientName}</p>
                      <span className="text-[10px] font-bold text-slate-400">{apt.date}</span>
                    </div>
                    {apt.reason && (
                      <p className="text-xs text-[#3e4947] mb-3 italic">&quot;{apt.reason}&quot;</p>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStatusUpdate(apt.id, "confirmed")}
                        disabled={updatingId === apt.id}
                        className="bg-[#005c55] text-white text-[11px] font-bold py-2 rounded-full hover:bg-[#0f766e] transition-colors disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(apt.id, "cancelled")}
                        disabled={updatingId === apt.id}
                        className="bg-[#f2f4f6] text-[#3e4947] text-[11px] font-bold py-2 rounded-full hover:bg-[#e0e3e5] transition-colors disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              {appointments.filter((a) => a.status === "pending").length === 0 && (
                <div className="bg-white p-4 rounded-xl text-center text-[#3e4947] text-sm">
                  No pending requests
                </div>
              )}
            </div>
          </section>

          {/* Recent Patients avatars */}
          {patients.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-bold text-[#191c1e] text-sm">Recent Patients</h3>
              <div className="flex -space-x-3 overflow-hidden p-1">
                {patients.slice(0, 5).map((p, i) => (
                  <div
                    key={p.id}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#80f9c8] ring-2 ring-white text-[#007353] font-bold text-xs"
                    title={p.name}
                  >
                    {p.name?.charAt(0).toUpperCase()}
                  </div>
                ))}
                {patients.length > 5 && (
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white">
                    <span className="text-xs font-bold text-slate-500">+{patients.length - 5}</span>
                  </div>
                )}
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                {appointments.slice(0, 2).map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-sm text-slate-400">description</span>
                      <span className="text-xs font-semibold text-[#191c1e] group-hover:text-[#005c55] transition-colors">
                        {apt.patientName} — {apt.reason || "Consultation"}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{apt.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Stats Summary Card */}
          <div className="bg-[#005c55] p-6 rounded-xl text-white relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h4 className="text-lg font-bold font-headline">Your Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-extrabold">{stats.upcoming}</p>
                  <p className="text-[10px] opacity-75 uppercase font-bold">Upcoming</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-extrabold">{stats.completed}</p>
                  <p className="text-[10px] opacity-75 uppercase font-bold">Completed</p>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10">stethoscope</span>
          </div>
        </aside>
      </div>

      {/* ── Doctor Profile Form Modal ── */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-100 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-7xl mx-auto max-h-[92vh] overflow-y-auto rounded-[3rem] bg-[#f7f9fb] shadow-[0_25px_70px_rgba(0,0,0,0.3)] custom-scrollbar border border-white/20">
            <button
              onClick={() => setShowProfileForm(false)}
              className="absolute top-8 right-8 z-110 bg-white/90 hover:bg-red-50 hover:text-red-600 backdrop-blur-md p-3 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 group"
            >
              <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
            </button>
            <div className="p-2 md:p-4">
               <DoctorProfileForm />
            </div>
          </div>
        </div>
      )}

      {/* ── Modern Prescription Modal ── */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-[0_20px_50px_rgba(0,92,85,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-8 border-b-0 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#005c55] text-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined">add_box</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-headline text-[#191c1e]">New Prescription</h2>
                  <p className="text-sm text-[#3e4947]">Create a new medication order for a patient.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPrescriptionModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content (Form) */}
            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              
              {/* Patient Search */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Patient Search</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person_search</span>
                  <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none"
                    value={patientSearchTerm}
                    onChange={(e) => setPatientSearchTerm(e.target.value)}
                  />
                </div>
                {patientSearchTerm && (
                  <div className="mt-2 bg-white border border-slate-100 rounded-xl shadow-sm max-h-40 overflow-y-auto">
                    {patients
                      .filter(p => p.name?.toLowerCase().includes(patientSearchTerm.toLowerCase()))
                      .map(p => (
                        <button
                          key={p.id}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50"
                          onClick={() => {
                            setPatientSearchTerm(p.name || "");
                            setSelectedPatientId(p.id);
                          }}
                        >
                          {p.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medication Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Medication Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">medication</span>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none"
                      placeholder="e.g. Atorvastatin"
                      value={prescriptionForm.medication}
                      onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medication: e.target.value })}
                    />
                  </div>
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none"
                    placeholder="e.g. 500mg"
                    value={prescriptionForm.dosage}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                  />
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Frequency</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none appearance-none"
                    value={prescriptionForm.frequency}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, frequency: e.target.value })}
                  >
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>Every 4 hours</option>
                    <option>As needed (PRN)</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Duration</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none"
                    placeholder="e.g. 7 days"
                    value={prescriptionForm.duration}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, duration: e.target.value })}
                  />
                </div>

                {/* Refills */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Refills Authorized</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none"
                    value={prescriptionForm.refills}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, refills: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Instructions</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#005c55] transition-all text-sm outline-none resize-none"
                  placeholder="Additional directions for the patient or pharmacist..."
                  value={prescriptionForm.instructions}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, instructions: e.target.value })}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-4 border-t-0">
              <div className="flex items-center text-xs text-[#3e4947]">
                <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                Secure Clinical Order
              </div>
              <div className="flex space-x-4 w-full md:w-auto">
                <button 
                  onClick={() => setShowPrescriptionModal(false)}
                  className="flex-1 md:flex-none px-6 py-3 rounded-full text-slate-600 font-semibold hover:bg-slate-200 transition-all font-body"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePrescriptionSubmit}
                  disabled={isSavingPrescription}
                  className="flex-1 md:flex-none bg-[#005c55] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#005c55]/20 hover:saturate-150 transition-all active:scale-95 font-body flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingPrescription ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : null}
                  {isSavingPrescription ? "E-Signing..." : "E-Sign & Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}

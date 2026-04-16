"use client";
import SymptomChecker from './SymptomChecker';
import React, { useState, useEffect } from "react";
import PatientForm from "../PatientForm";

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
}

interface Doctor {
  id: string;
  username: string;
  email: string;
  role: string;
  specialization?: string;
  fee?: number;
  isAvailable?: boolean;
}

interface PatientDashboardProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function PatientDashboard({ user }: PatientDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({
    upcoming: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`/api/appointments?userId=${user.id}&role=patient`);
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
        const today = new Date().toISOString().split("T")[0];
        setStats({
          upcoming: data.appointments.filter((apt: Appointment) => apt.date >= today && apt.status === "confirmed").length,
          completed: data.appointments.filter((apt: Appointment) => apt.status === "completed").length,
          pending: data.appointments.filter((apt: Appointment) => apt.status === "pending").length,
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/appointments?type=doctors");
      const data = await res.json();
      if (data.doctors) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleNewAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentForm.date || !appointmentForm.time) return;

    const doctor = doctors.find((d) => d.id === selectedDoctor);
    if (!doctor) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: user.id,
          doctorId: selectedDoctor,
          date: appointmentForm.date,
          time: appointmentForm.time,
          reason: appointmentForm.reason,
        }),
      });

      if (res.ok) {
        setShowNewAppointment(false);
        setAppointmentForm({ date: "", time: "", reason: "" });
        setSelectedDoctor("");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      confirmed: "bg-secondary-container text-on-secondary-container",
      completed: "bg-secondary-container text-on-secondary-container",
      pending: "bg-amber-100 text-amber-700",
      cancelled: "bg-error-container text-on-error-container",
    };
    const cls = map[status] || "bg-surface-container-highest text-slate-500";
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      {/* ── Hero Greeting & Stats ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left: greeting + stat cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-teal-900 font-headline">
                Good morning, {user.name || "Patient"}.
              </h1>
              <p className="text-on-surface-variant text-lg mt-1">
                Your health journey is looking stable today. You have{" "}
                {stats.upcoming} upcoming consultation{stats.upcoming !== 1 ? "s" : ""}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowProfileForm(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-teal-700 border border-teal-100 rounded-full font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-base">person</span>
                Update Profile
              </button>
              <button
                onClick={() => setShowNewAppointment(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#005c55] text-white rounded-full font-semibold shadow-lg shadow-[#005c55]/20 transition-all hover:shadow-[#005c55]/40 active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Book Appointment
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#005c55] text-white p-6 rounded-2xl flex items-center justify-between shadow-lg shadow-[#005c55]/10">
              <div>
                <p className="text-sm opacity-80 mb-1">Upcoming Appointments</p>
                <h3 className="text-2xl font-bold">{stats.upcoming} Active</h3>
                <p className="text-sm mt-2 font-medium opacity-80">Confirmed consultations</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-40">calendar_month</span>
            </div>
            <div className="bg-[#80f9c8] text-[#00513a] p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80 mb-1">Completed Visits</p>
                <h3 className="text-2xl font-bold">{stats.completed} Reports</h3>
                <p className="text-sm mt-2 font-medium opacity-80">Digital records available</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-40">description</span>
            </div>
          </div>
        </div>

        {/* Right: AI Symptom Checker */}
        <div className="bg-[#f2f4f6] p-8 rounded-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#005c55]/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#005c55]">auto_awesome</span>
            <h3 className="font-bold text-lg">Symptom Checker</h3>
          </div>
          <p className="text-sm text-[#3e4947]">
            Describe how you&apos;re feeling. Our clinical AI will assess and suggest next steps.
          </p>
          <SymptomChecker userId={user.id} />
          <p className="text-[10px] text-center text-[#3e4947] uppercase tracking-widest font-semibold pt-2">
            AI-Powered Analysis
          </p>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Left column: Appointments + History */}
        <div className="xl:col-span-8 space-y-10">

          {/* Upcoming Appointments */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-headline">Upcoming Appointments</h2>
              <button
                onClick={() => setShowNewAppointment(true)}
                className="text-[#005c55] font-semibold text-sm hover:underline"
              >
                View Calendar
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center bg-[#f2f4f6] rounded-2xl">
                <div className="w-10 h-10 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Loading schedule...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="p-10 text-center bg-[#f2f4f6] rounded-2xl border border-dashed border-teal-200">
                <span className="material-symbols-outlined text-4xl text-teal-200 mb-3 block">calendar_today</span>
                <p className="text-slate-500 font-medium">No appointments scheduled.</p>
                <button
                  onClick={() => setShowNewAppointment(true)}
                  className="mt-4 px-5 py-2 bg-[#005c55] text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Book Your First Appointment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.slice(0, 4).map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-[#f2f4f6] p-6 rounded-2xl group hover:bg-white transition-all duration-300 border border-transparent hover:border-teal-100/50 shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#005c55] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                          {apt.doctorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#191c1e]">Dr. {apt.doctorName}</h4>
                          <p className="text-xs text-[#3e4947]">
                            {apt.reason ? apt.reason.slice(0, 20) + (apt.reason.length > 20 ? "…" : "") : "Medical Specialist"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          apt.status === "confirmed"
                            ? "bg-[#80f9c8] text-[#007353]"
                            : apt.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-[#e0e3e5] text-slate-500"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <div className="space-y-3 py-4 border-y border-slate-200/50 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-lg">event</span>
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span>{apt.time}</span>
                      </div>
                    </div>
                    <button className="w-full py-3 rounded-xl bg-[#e0e3e5] font-semibold text-sm hover:bg-[#005c55] hover:text-white transition-all duration-200">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Appointment History Table */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-headline">Recent History</h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#f2f4f6] text-slate-600 hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
                <button className="p-2 rounded-lg bg-[#f2f4f6] text-slate-600 hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[#3e4947] text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Provider</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Outcome</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {appointments.length > 0 ? (
                    appointments.map((apt) => (
                      <tr key={apt.id} className="bg-[#f2f4f6] hover:bg-white transition-colors">
                        <td className="px-6 py-5 rounded-l-2xl font-medium">{apt.date}</td>
                        <td className="px-6 py-5">Dr. {apt.doctorName}</td>
                        <td className="px-6 py-5">{apt.reason || "Consultation"}</td>
                        <td className="px-6 py-5">{getStatusBadge(apt.status)}</td>
                        <td className="px-6 py-5 rounded-r-2xl">
                          <button className="text-[#005c55] font-bold hover:scale-105 transition-transform">
                            Report
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400 font-medium">
                        No historical records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right column: Medical Profile + Insight */}
        <div className="xl:col-span-4 space-y-8">

          {/* Medical Profile Summary */}
          <section className="bg-[#f2f4f6] rounded-xl p-8 space-y-6">
            <h3 className="text-xl font-bold font-headline">Medical Profile</h3>

            {/* Allergies */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#3e4947]">Active Allergies</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold">Penicillin</span>
                <span className="px-4 py-2 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold">Peanuts</span>
                <span className="px-4 py-2 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold">Latex</span>
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#3e4947]">Current Medications</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#191c1e]">Lisinopril</p>
                    <p className="text-xs text-[#3e4947]">10mg • Once Daily</p>
                  </div>
                  <span className="material-symbols-outlined text-[#005c55]">check_circle</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#191c1e]">Vitamin D3</p>
                    <p className="text-xs text-[#3e4947]">2000 IU • Once Daily</p>
                  </div>
                  <span className="material-symbols-outlined text-[#005c55]">check_circle</span>
                </div>
              </div>
            </div>

            {/* Vitals */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#3e4947]">Last Recorded Vitals</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Blood Pressure</p>
                  <p className="text-xl font-extrabold text-teal-800">120/80</p>
                  <p className="text-[10px] text-[#006c4e] font-bold">Optimal</p>
                </div>
                <div className="bg-white p-4 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Heart Rate</p>
                  <p className="text-xl font-extrabold text-teal-800">72 bpm</p>
                  <p className="text-[10px] text-[#006c4e] font-bold">Resting</p>
                </div>
              </div>
            </div>
          </section>

          {/* Health Insight Card */}
          <div className="bg-linear-to-br from-[#005c55] to-[#0f766e] p-8 rounded-xl text-white relative overflow-hidden shadow-lg shadow-[#005c55]/20">
            <div className="relative z-10 space-y-4">
              <h4 className="text-xl font-bold font-headline leading-tight">Hydration Insight</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                Based on your activity levels, increasing your water intake by 500ml today will help maintain your blood pressure stability.
              </p>
              <button
                onClick={() => setShowProfileForm(true)}
                className="bg-white text-[#005c55] px-6 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all active:scale-95"
              >
                Update Profile
              </button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10">water_drop</span>
          </div>
        </div>
      </div>

      {/* ── Profile Form Modal ── */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl mx-auto h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setShowProfileForm(false)}
              className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <PatientForm onClose={() => setShowProfileForm(false)} />
          </div>
        </div>
      )}

      {/* ── New Appointment Modal ── */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-[#005c55] px-8 py-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold font-headline">Book Consultation</h3>
                <p className="text-xs opacity-80 font-medium">Select your preferred date and time</p>
              </div>
              <button
                onClick={() => setShowNewAppointment(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleNewAppointment} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest pl-1">Specialist</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#005c55]/20 outline-none transition-all"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.username}{doctor.specialization ? ` - ${doctor.specialization}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest pl-1">Preferred Date</label>
                  <input
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#005c55]/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest pl-1">Preferred Time</label>
                  <input
                    type="time"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#005c55]/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#3e4947] uppercase tracking-widest pl-1">Consultation Reason</label>
                <textarea
                  value={appointmentForm.reason}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
                  rows={3}
                  placeholder="e.g. Follow-up on blood report, sharp back pain..."
                  className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#005c55]/20 outline-none transition-all resize-none"
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewAppointment(false)}
                  className="flex-1 py-4 text-slate-500 font-bold text-sm bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-[#005c55] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#005c55]/20 hover:shadow-[#005c55]/40 transition-all disabled:opacity-50 active:scale-95"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
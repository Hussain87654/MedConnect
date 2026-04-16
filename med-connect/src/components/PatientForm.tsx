"use client";
import React, { useState } from 'react';

interface PatientFormProps {
  onClose?: () => void;
}

export default function PatientForm({ onClose }: PatientFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    bloodGroup: '',
    gender: 'Female',
    medicalHistory: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
  });

  const [allergies, setAllergies] = useState<string[]>(['Peanuts', 'Penicillin']);
  const [newAllergy, setNewAllergy] = useState('');
  const [addingAllergy, setAddingAllergy] = useState(false);
  const [saved, setSaved] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Female", "Male", "Other"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleAddAllergy = () => {
    const trimmed = newAllergy.trim();
    if (trimmed && !allergies.includes(trimmed)) {
      setAllergies([...allergies, trimmed]);
    }
    setNewAllergy('');
    setAddingAllergy(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, allergies };
    console.log("Patient Data submitted:", payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="relative min-h-full bg-[#f7f9fb] font-body">
      {/* Background decoration */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-[#005c55]/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-[#80f9c8]/10 rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#191c1e] mb-2 font-headline">
            Patient Profile
          </h1>
          <p className="text-[#3e4947] font-medium">
            Complete the comprehensive health record for clinical tracking.
          </p>
        </div>

        {/* Success Banner */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-[#80f9c8]/30 border border-[#80f9c8] rounded-2xl text-[#006c4e] font-semibold animate-in fade-in">
            <span className="material-symbols-outlined">check_circle</span>
            Profile saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Section 1: Personal Information ── */}
          <section
            className="p-8 rounded-xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,92,85,0.04)]"
            style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#005c55]/10 rounded-2xl text-[#005c55]">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight font-headline">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Mitchell"
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-xl py-4 px-5 text-[#191c1e] placeholder:opacity-50 outline-none transition-all"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-xl py-4 px-5 text-[#191c1e] outline-none transition-all"
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-xl py-4 px-5 text-[#191c1e] outline-none transition-all appearance-none"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* Gender Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Gender</label>
                <div className="flex gap-1 p-1 bg-[#e0e3e5] rounded-2xl">
                  {genders.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`flex-1 text-center py-3 rounded-xl text-sm font-bold transition-all ${
                        formData.gender === g
                          ? 'bg-white text-[#005c55] shadow-sm'
                          : 'text-[#3e4947] hover:bg-white/50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 2: Medical Details ── */}
          <section
            className="p-8 rounded-xl shadow-[0_20px_50px_rgba(0,92,85,0.04)]"
            style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#005c55]/10 rounded-2xl text-[#005c55]">
                <span className="material-symbols-outlined">medical_services</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight font-headline">Medical Details</h2>
            </div>

            <div className="space-y-8">
              {/* Allergies Tag Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Known Allergies</label>
                <div className="flex flex-wrap gap-2 p-4 bg-[#e0e3e5] rounded-2xl min-h-[60px]">
                  {allergies.map((allergy, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#005c55] text-white rounded-full text-sm font-medium"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(i)}
                        className="hover:text-[#80f9c8] transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  ))}

                  {addingAllergy ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAllergy(); } if (e.key === 'Escape') { setAddingAllergy(false); setNewAllergy(''); } }}
                        placeholder="Allergy name..."
                        className="px-3 py-1.5 text-sm bg-white rounded-full border-2 border-[#005c55] outline-none w-32"
                      />
                      <button type="button" onClick={handleAddAllergy} className="p-1 bg-[#005c55] text-white rounded-full">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingAllergy(true)}
                      className="inline-flex items-center gap-1 px-4 py-2 border-2 border-dashed border-[#bdc9c6] text-[#3e4947] rounded-full text-sm font-medium hover:border-[#005c55] hover:text-[#005c55] transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add Allergy
                    </button>
                  )}
                </div>
              </div>

              {/* Medical History */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">
                  Chronic Conditions &amp; Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter patient clinical history, previous surgeries, or long-term medication requirements..."
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-2xl py-4 px-5 text-[#191c1e] placeholder:opacity-50 outline-none resize-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* ── Section 3: Emergency Contact ── */}
          <section
            className="p-8 rounded-xl shadow-[0_20px_50px_rgba(0,92,85,0.04)]"
            style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#005c55]/10 rounded-2xl text-[#005c55]">
                <span className="material-symbols-outlined">contact_phone</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight font-headline">Emergency Contact</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Contact Name</label>
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="John Mitchell"
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-xl py-4 px-5 text-[#191c1e] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Relationship</label>
                <input
                  type="text"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  placeholder="Spouse"
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-xl py-4 px-5 text-[#191c1e] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3e4947] px-1">Phone Number</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#e0e3e5] border-none focus:ring-2 focus:ring-[#005c55] rounded-xl py-4 px-5 text-[#191c1e] outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* ── Action Buttons ── */}
          <div className="flex items-center justify-end gap-4 py-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 text-[#3e4947] font-bold rounded-full hover:bg-[#e0e3e5] transition-all active:scale-95"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-10 py-4 text-white font-bold rounded-full shadow-lg shadow-[#005c55]/20 hover:saturate-150 transition-all active:scale-95 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #005c55, #0f766e)' }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
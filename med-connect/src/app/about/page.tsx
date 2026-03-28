import React from 'react';
import Link from 'next/link';

export default function About () {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up as a patient or doctor. Patients can add medical history like allergies and blood group for better care.",
      icon: "👤"
    },
    {
      number: "02",
      title: "Find a Specialist",
      description: "Browse our verified doctors by specialty, rating, or fee. Use our AI symptom checker to find the right match.",
      icon: "🔍"
    },
    {
      number: "03",
      title: "Book an Appointment",
      description: "Select a convenient time slot from the doctor's real-time schedule and confirm your booking instantly.",
      icon: "📅"
    },
    {
      number: "04",
      title: "Start Consultation",
      description: "Connect via secure video call. Receive digital prescriptions and follow-up notes directly in your dashboard.",
      icon: "💻"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Simple Header */}
      <header className="py-10 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-blue-600 tracking-tighter">
            MED<span className="text-slate-800">CONNECT</span>
          </Link>
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section of How it Works */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          How MedConnect <span className="text-blue-600">Works.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          A seamless digital healthcare experience designed for both patients and doctors in Pakistan. [cite: 25]
        </p>
      </section>

      {/* Steps Grid */}
      <section className="pb-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group p-8 rounded-[32px] bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300">
              <div className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors mb-6">
                {step.number}
              </div>
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features for Roles */}
      <section className="py-24 bg-slate-900 rounded-t-[60px] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            {/* For Patients */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="p-2 bg-blue-600 rounded-lg text-sm uppercase tracking-widest">For Patients</span>
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-blue-500 font-bold">•</span>
                  <p className="text-slate-400 font-medium">Browse doctors by specialty and rating. [cite: 23, 249]</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-500 font-bold">•</span>
                  <p className="text-slate-400 font-medium">AI-powered symptom analysis for quick guidance. [cite: 33, 263]</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-500 font-bold">•</span>
                  <p className="text-slate-400 font-medium">Secure storage for medical history and prescriptions. [cite: 23, 263]</p>
                </li>
              </ul>
            </div>

            {/* For Doctors */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="p-2 bg-cyan-500 rounded-lg text-sm uppercase tracking-widest">For Doctors</span>
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-cyan-500 font-bold">•</span>
                  <p className="text-slate-400 font-medium">Manage your weekly schedule and available slots. [cite: 24, 263]</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-cyan-500 font-bold">•</span>
                  <p className="text-slate-400 font-medium">Access patient history before consultations. [cite: 24]</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-cyan-500 font-bold">•</span>
                  <p className="text-slate-400 font-medium">Write digital notes and prescriptions easily. [cite: 24, 263]</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-black mb-8 text-black">Ready to join the platform?</h2>
        <div className="flex justify-center gap-4">
          <Link href="/auth/signup" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-blue-100">
            Get Started Now
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm font-medium">
        MedConnect - Production Ready Telemedicine Platform [cite: 3]
      </footer>
    </div>
  );
}
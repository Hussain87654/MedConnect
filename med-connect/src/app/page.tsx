import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans">
      {/* Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-blue-600">
            MED<span className="text-slate-800">CONNECT</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <Link href="/doctors" className="hover:text-blue-600 transition">Find Doctors</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold hover:text-blue-600 transition">Sign In</button>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200">
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Minimalist */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
            Future of Healthcare in Pakistan [cite: 25]
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            Healthcare <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Without Borders.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
            Connect with certified specialists instantly. Experience AI-driven diagnostics 
            and seamless appointment booking in one unified platform[cite: 22, 23].
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-200">
              Start Your Journey
            </button>
            <Link href="/about" className="bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors">
              How it works
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-50" />
      </section>

      {/* About MedConnect Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-[40px] overflow-hidden">
                 {/* Placeholder for professional medical image */}
                 <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold italic">
                   [ Professional Medical UI Image ]
                 </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-[30px] shadow-2xl hidden md:block">
                <p className="text-white font-black text-4xl leading-none">100%</p>
                <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mt-2">Verified Doctors</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">
                Not just another app. <br />
                <span className="text-blue-600">A life-saving platform.</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                MedConnect is a production-ready telemedicine platform designed to bridge the gap 
                between patients and healthcare providers[cite: 3]. We provide a multi-role system where 
                Patients, Doctors, and Admins interact in a secure, professional environment.
              </p>
              <ul className="space-y-4">
                {[
                  "AI-Powered Symptom Checker for instant guidance [cite: 32]",
                  "Real-time appointment scheduling & slot management [cite: 30]",
                  "Comprehensive patient medical history tracking [cite: 24]",
                  "Digital prescriptions and consultation notes [cite: 263]"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Join Now CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[40px] p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Ready to transform your <br /> healthcare experience?
            </h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
              Join thousands of users across Pakistan who trust MedConnect for their 
              daily medical needs. Professionalism at its peak.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-black hover:bg-blue-500 hover:text-white transition-all">
                Join as Patient
              </button>
              <button className="bg-transparent border border-slate-700 text-white px-8 py-3 rounded-xl font-black hover:border-white transition-all">
                Register as Doctor
              </button>
            </div>
          </div>
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
      </section>

      {/* Modern Simple Footer */}
      <footer className="py-12 border-t border-slate-200 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          MedConnect Capstone 2026 [cite: 7]
        </p>
        <p className="mt-2 text-slate-500 font-medium">Developed by SMIT Student under Instructor Talal Ahmed [cite: 6]</p>
      </footer>
    </div>
  );
}
"use client";

import React from "react";
import Link from "next/link";
import { Header, Footer } from "@/components"; 
import { CustomCursor } from "@/components/CustomCursor";
import { 
  Calendar, 
  ShieldCheck, 
  Headphones, 
  Search, 
  UserPlus, 
  Star,
  Activity
} from "lucide-react";

// Original Logic retained to not mess with existing state/arrays
const teamMembers = [
  { name: "Hussain", role: "Lead Developer", image: "H" },
  { name: "Zain", role: "Backend Engineer", image: "Z" },
  { name: "Asher", role: "UI/UX Designer", image: "A" },
  { name: "Bilal", role: "Project Manager", image: "B" },
];

const features = [
  {
    title: "Easy Appointments",
    description: "Book appointments with doctors in just a few clicks. No more long waiting times.",
    icon: <Calendar className="w-8 h-8" />,
    color: "from-[#005c55] to-[#0f766e]", 
  },
  {
    title: "Secure Health Records",
    description: "Your medical records are encrypted and securely stored. Access them anytime.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "24/7 Support",
    description: "Get round-the-clock support from our dedicated team for any queries.",
    icon: <Headphones className="w-8 h-8" />,
    color: "from-purple-500 to-violet-600",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    text: "MedConnect has completely transformed how I manage my healthcare. Booking appointments is now so convenient!",
    avatar: "S",
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    text: "As a healthcare provider, this platform has streamlined my practice and improved patient communication significantly.",
    avatar: "M",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    text: "The ability to track my medical records and appointments in one place is incredible. Highly recommend!",
    avatar: "E",
  },
];

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen flex flex-col bg-[#f7f9fb] font-body text-[#191c1e]">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section id="home" className="relative px-8 pt-16 pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80f9c8] text-[#007353] font-label text-sm mb-6">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                  Next-Gen Clinical Precision
                </div>
                <h1 className="text-6xl lg:text-7xl font-extrabold font-headline leading-[1.1] text-[#191c1e] mb-8 tracking-tight">
                  AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005c55] to-[#0f766e]">Telemedicine</span> Platform
                </h1>
                <p className="text-lg text-[#3e4947] leading-relaxed mb-10 max-w-xl">
                  Experience the future of healthcare. Secure, instantaneous, and intelligent consultation environments designed for the modern patient and provider.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-gradient-to-br from-[#005c55] to-[#0f766e] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-xl hover:shadow-[#005c55]/20 transition-all cursor-pointer">
                    Book Appointment
                    <span className="material-symbols-outlined">calendar_today</span>
                  </button>
                  <button className="bg-[#e0e3e5] text-[#191c1e] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e6e8ea] transition-all cursor-pointer">
                    Find Doctors
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#9cf2e8]/20 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#80f9c8]/20 rounded-full blur-[100px]"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img alt="Healthcare Professional" className="w-full h-[500px] object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA2EVNbh-8ixaN8C6-EDdzB6T7aG1-IQUKMUy1SYLEubUul-7kAljphZE6gxrTxnNr2pmpjD2qhizhcOzG5KcbbtG35fc9fnF_Ej1cYIBA2xYeORw_eUm2UOJWI3wgiGySc1Wt3AWzgocXoMhYFEBzeJJdeR8wS8Wti30bpQcWhiw0T2mfXUOwHqJ7jvkys08ZLboFGPnpOwopGag9WqjhrXSFNA8WGQ6StX0mQUvxQlZx0Cu6MQVfUCIDnWG-mKDHXTXmf5z6xUDV" />
                  
                  {/* Glass Overlay Stats */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-lg border border-white/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#3e4947] text-xs uppercase tracking-widest font-bold">Active Consultations</p>
                        <p className="text-2xl font-bold text-[#005c55]">1,284 Patients</p>
                      </div>
                      <div className="flex -space-x-3">
                        <img alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgcrOvf9EWCTXxqBKXLa6SHIISar2Kki4RcSw1KGsp3Q5jZ3A6VHitGQ6f4NvCXpgUYA5kXh4iSkitvOuEclAjb_BouIkRi9x-uoKvai2HEzIpaXvimc1jDmIwdtrfbtCDrol7IKNmj-DUk3twhWANxaEg5wDQ1TJKqnbuOENhyGbpqfAca-pAjNh0rzl-Ac4a41ve_jNlrDHGH3Qo4zcHkZfUWi1uV7TMGkbnAid5VW-POEEL0-kcBZwf8onmjzoOCa3eDbRy7B9f" />
                        <img alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgIB7DR9TyN8o_xwoWjked3E0IKhVBszIH4rPxG3xU_x9azm28sCbKXe9WD0BO0JQLEwXcTuIAsxW5wLvBxYJh64E2gNQW1f-ZiT2sLfX0oz_SIvEGy10vmRAxPq65a9MPIp2YD-ayoZ34vkh6LTPOAoeVDFKFlxWsKZP9RdzH8DE_9_x615R7Le2AmsYSv-lqtaLbt2MqzYGFhcu09f_9KkcF2DHazOSNiYLUQuvTrN13uXntvzOTL6mAGZamT6jYqnZ2cYltjBsd" />
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[#005c55] text-white flex items-center justify-center text-xs font-bold">+2k</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-[#f2f4f6]">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-extrabold font-headline text-[#005c55] mb-2">99.8%</p>
                  <p className="text-[#3e4947] font-medium">Uptime Guarantee</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold font-headline text-[#005c55] mb-2">500+</p>
                  <p className="text-[#3e4947] font-medium">Expert Specialists</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold font-headline text-[#005c55] mb-2">12M+</p>
                  <p className="text-[#3e4947] font-medium">Successful Consults</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold font-headline text-[#005c55] mb-2">4.9/5</p>
                  <p className="text-[#3e4947] font-medium">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </section>

          {/* Discovery & Filters */}
          <section id="find-doctors" className="py-32 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                  <h2 className="text-4xl font-extrabold font-headline mb-4 tracking-tight">Discover Specialists</h2>
                  <p className="text-[#3e4947] text-lg">Filter through our curated network of certified medical professionals using AI-enhanced matching.</p>
                </div>
                <div className="flex gap-3">
                  <div className="px-4 py-2 rounded-full bg-[#e0e3e5] text-sm font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#005c55]/10 transition-all">
                    Specialty
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-[#e0e3e5] text-sm font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#005c55]/10 transition-all">
                    Availability
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-[#005c55] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer">
                    Near Me
                    <span className="material-symbols-outlined text-sm">location_on</span>
                  </div>
                </div>
              </div>

              {/* Bento Grid Layout for Doctors */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Large Featured Card */}
                <div className="md:col-span-8 bg-[#f2f4f6] rounded-xl overflow-hidden group relative p-8">
                  <div className="flex flex-col md:flex-row gap-8 h-full">
                    <div className="md:w-1/2">
                      <span className="bg-[#006c4e] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Top Rated</span>
                      <h3 className="text-3xl font-bold font-headline mb-4">Dr. Sarah Chen</h3>
                      <p className="text-[#005c55] font-semibold mb-6">Senior Cardiologist • 15 Yrs Exp</p>
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#006c4e]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                          <span className="font-bold">4.98</span>
                          <span className="text-[#3e4947]">(2.4k reviews)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#005c55]">schedule</span>
                          <span className="text-[#191c1e]">Available Today, 2:00 PM</span>
                        </div>
                      </div>
                      <button className="bg-[#005c55] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer">
                        Book Fast Track
                      </button>
                    </div>
                    <div className="md:w-1/2 relative min-h-[300px]">
                      <img alt="Dr. Sarah Chen" className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlmbZ7Dbn6ifw8xbxUnlPCCzS1PudosDHfYcvn00xpyOcDQSOQxBDbQ9xTwA_Lzki2kPjDKNsLVw4B9i396EfzHcfeBRWdt4eRJvhl127sJXBuQ2tNVrfX1UAnBIASuH-z6W1lEWY8V2jKdovTECTGui1lOvO82GIJK9z6WfsGB-gOTsaesndUXMfrPr2T9fZyJOTUXCMJrRx0MutvY81Kcl_YMi5O0FqND9WX0zqrxQ1RG1Kr2qNkmOD95jjkkFnP_4IA4P7tnzbN" />
                    </div>
                  </div>
                </div>

                {/* Small Card 1 */}
                <div className="md:col-span-4 bg-[#f2f4f6] rounded-xl p-6 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-md">
                    <img alt="Dr. James Wilson" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGA3HsN9YgI2xLsRyPAxIfjh_ZgonmbJyqQZF50PVpO1Vx2CEivcPzAgoOVmfyz5q-2cNU_BSEUEOKWV-EkJDfCSdxQAhzJ7KgAN4Ecyr_Vvunr3QqvyYv0hk_MJE5rS1LnKNHhC9cU498YVpsmmgDCRb4pJSCg2e8yRbqubnBOeASIiIT9GlBvQT1pHD6XRN9YEsnQb2kM6RUwiRSyK_cMimKqrtqFFgNgvZ67MyZXiXQVBTCrzs-f9CYsR0xtrXIRxHalgWDtU_k" />
                  </div>
                  <h4 className="text-xl font-bold font-headline mb-1">Dr. James Wilson</h4>
                  <p className="text-[#3e4947] text-sm mb-4">Neurologist • PhD</p>
                  <div className="flex items-center gap-1 text-[#006c4e] mb-6">
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="font-bold">4.8</span>
                  </div>
                  <button className="w-full py-3 rounded-full border border-[#bdc9c6] text-[#005c55] font-bold hover:bg-[#005c55] hover:text-white transition-all cursor-pointer">
                    View Profile
                  </button>
                </div>

                {/* Small Card 2 */}
                <div className="md:col-span-4 bg-[#f2f4f6] rounded-xl p-6 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-md">
                    <img alt="Dr. Elena Rodriguez" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCExRcpQNVif87ElsezSYRSB_3bgDDrU7O6dz7q8Aqb_SR_IAojELLrqvoD_Ka2nzbu9qse4S4w88VT7huqJcqZch900Xu_yQMsMDndy3i_p51xyVd8K4lTYHoU2fRx5D5EmijbkfBHe7j1X4-jm1cAsJxVCEOCBc4_WXPMlMfVJ_gs98atmcOC6Sthig9sfQ82Oj4m0EPoJks2VnHuMabOVZRqXcL3V2WTb46z4i9ZdYUKzRxlOmEQorBbf6ijtk7LCgzM8Ia3YX9K" />
                  </div>
                  <h4 className="text-xl font-bold font-headline mb-1">Dr. Elena Rodriguez</h4>
                  <p className="text-[#3e4947] text-sm mb-4">Pediatrician • MD</p>
                  <div className="flex items-center gap-1 text-[#006c4e] mb-6">
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="font-bold">5.0</span>
                  </div>
                  <button className="w-full py-3 rounded-full border border-[#bdc9c6] text-[#005c55] font-bold hover:bg-[#005c55] hover:text-white transition-all cursor-pointer">
                    View Profile
                  </button>
                </div>

                {/* Feature Block */}
                <div className="md:col-span-8 bg-[#005c55] text-white rounded-xl p-8 flex flex-col justify-center">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-[#0f766e] rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-3xl">psychology</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-headline mb-2">AI Symptom Checker</h3>
                      <p className="text-[#a3faef]/90 text-lg mb-6">Not sure who to see? Our advanced diagnostic engine can guide you to the right specialist in under 2 minutes.</p>
                      <button className="bg-white text-[#005c55] px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all cursor-pointer">
                        Start AI Screening
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="patient-stories" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold font-headline mb-4">Patient Stories</h2>
                <p className="text-[#3e4947] max-w-xl mx-auto">Real experiences from our global community of patients who found healing through MedConnect.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* 1st Testimonial */}
                <div className="p-8 rounded-xl bg-[#f2f4f6] relative">
                  <span className="material-symbols-outlined text-[#0f766e]/20 text-6xl absolute top-4 right-4">format_quote</span>
                  <div className="flex gap-1 text-[#006c4e] mb-6">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    ))}
                  </div>
                  <p className="text-lg mb-8 text-[#191c1e]">"The clinical precision of the interface and the speed of connecting with a cardiologist was life-changing."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img alt="Client" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdAW-7JYr8RE10CbaBi5Wz_Q0FfpWG1RBTXq48tFQrvZ5NL35Qv_1jLhshsegKXTYUI9iXZP4eHpVyfyd5nnft6uNdwlXYKFmh4oNABSys0QPYbpn1bHtuNiTjaUa8bkRRbOld268UqprKBWJsooYu5-vUJtwYsdcTBgXhbJCdxF1_tKckkb42-95Zuzj12uIB-1TNLX-Mo4kMrUPpjXxfAHda4LwrUXmNNHpuRsIpt4stxEdKqGFqrMEwsarpDa5ACdc6_Dxx-SSF" />
                    </div>
                    <div>
                      <p className="font-bold">David Markham</p>
                      <p className="text-xs text-[#3e4947] uppercase tracking-tighter">Heart Patient</p>
                    </div>
                  </div>
                </div>

                {/* 2nd Testimonial */}
                <div className="p-8 rounded-xl bg-[#f2f4f6] relative">
                  <span className="material-symbols-outlined text-[#0f766e]/20 text-6xl absolute top-4 right-4">format_quote</span>
                  <div className="flex gap-1 text-[#006c4e] mb-6">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    ))}
                  </div>
                  <p className="text-lg mb-8 text-[#191c1e]">"The interface is so calm and easy to navigate. I never felt overwhelmed by my medical data."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img alt="Client" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEHMPZv3PjjYVphbGQx1A65AjpLEAGV7XlrXXiFU4GFG80VusLBiq_egPKPqoAI3xzRfC5m0tLPVX6bbhh-k6eLpAi0sGs3fNxqJRBmw3RN0jNibTZZkjwX1pTx1A2S4x_DaB7BWvs4JUqh_zoc7MpHwh5bxprj6oloNLgFeA4xRWQUK-QWwuHTtnTXdtbLobWNXmOHkCkTx_MAMKbVgJJVgarRpiAgYeMI-Qla6n7K9T2h-tMEekhrSNLFZyMcFXYGV0FEqYWDgAs" />
                    </div>
                    <div>
                      <p className="font-bold">Lydia Thorne</p>
                      <p className="text-xs text-[#3e4947] uppercase tracking-tighter">Chronic Care User</p>
                    </div>
                  </div>
                </div>

                {/* 3rd Testimonial */}
                <div className="p-8 rounded-xl bg-[#f2f4f6] relative">
                  <span className="material-symbols-outlined text-[#0f766e]/20 text-6xl absolute top-4 right-4">format_quote</span>
                  <div className="flex gap-1 text-[#006c4e] mb-6">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    ))}
                  </div>
                  <p className="text-lg mb-8 text-[#191c1e]">"Finally, a medical platform that feels like it was built for the 21st century. Fast and elegant."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img alt="Client" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8yM-Z8fmhIghEE7QOQUGszb-clSEKmA_AFvic9cEmB4498JuDzr_vjCZhNp1RZRzysxTCczgACQKMWFbVJ5igbUtssQP9DVRnO3p3GlWHnSXwGq30P4vcO2ZADWBZPk3HFXUkEyxkrEIBc48GM6GM7uGIjPurNf88n_dC8uSMZLX1UmGixJInjLEcq6No4WOWn4_OeQ347ke72mhLfYfU-xqeTAERmJ5pUZ_oOPdd1h7-w8L7E0at76_tABLozJKqEJ6YQCmLOvb-" />
                    </div>
                    <div>
                      <p className="font-bold">Marcus Vane</p>
                      <p className="text-xs text-[#3e4947] uppercase tracking-tighter">Tech Executive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
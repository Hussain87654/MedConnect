"use client";

import Link from "next/link";

interface FooterProps {
  variant?: "landing" | "dashboard";
}

export default function Footer({ variant = "landing" }: FooterProps) {
  if (variant === "dashboard") {
    // Keep original dashboard footer intact as requested ('kisi bhi logic ke sath cher char nhi karna')
    return (
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 MedConnect. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-2 sm:mt-0">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    );
  }

  // The new Stitch UI landing footer
  return (
    <footer className="bg-[#191c1e] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <span className="text-2xl font-bold font-headline tracking-tight text-white mb-6 block">MedConnect</span>
          <p className="text-slate-400 mb-8">Pioneering the future of ethereal clinical care with artificial intelligence and human empathy.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#005c55] transition-all" href="#">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#005c55] transition-all" href="#">
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>
        </div>

        <div>
          <h5 className="font-bold mb-6">Platform</h5>
          <ul className="space-y-4 text-slate-400">
            <li><a className="hover:text-white transition-colors" href="#">Find Doctors</a></li>
            <li><a className="hover:text-white transition-colors" href="#">AI Diagnostics</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Pricing Plans</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Mobile App</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Resources</h5>
          <ul className="space-y-4 text-slate-400">
            <li><a className="hover:text-white transition-colors" href="#">Health Blog</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Documentation</a></li>
            <li><a className="hover:text-white transition-colors" href="#">API for Clinics</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Community</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Legal</h5>
          <ul className="space-y-4 text-slate-400">
            <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-white transition-colors" href="#">HIPAA Compliance</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Security</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
        <p>© 2026 MedConnect Clinical Portal. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Status: Fully Operational</span>
          <div className="w-2 h-2 rounded-full bg-[#006c4e] animate-pulse"></div>
        </div>
      </div>
    </footer>
  );
}

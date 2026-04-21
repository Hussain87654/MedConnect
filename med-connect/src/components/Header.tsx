"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <header className="sticky top-0 w-full z-40 bg-white flex justify-between items-center h-16 px-4 md:px-8 shadow-[0_20px_50px_rgba(0,92,85,0.06)] border-b-0">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-[#005c55] font-headline tracking-tight">
          MedConnect
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-[#005c55] font-bold transition-colors font-label" href="#home">Home</a>
          <a className="text-slate-600 hover:text-[#005c55] transition-colors font-label" href="#find-doctors">Find Doctors</a>
          <a className="text-slate-600 hover:text-[#005c55] transition-colors font-label" href="#patient-stories">Patient Stories</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7977]">search</span>
          <input className="bg-[#e0e3e5] border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-[#005c55]/20 outline-none" placeholder="Search conditions, doctors..." type="text" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-600 hover:text-[#005c55] transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="p-2 text-slate-600 hover:text-[#005c55] transition-colors"
          >
            <span className="material-symbols-outlined">
              {mounted && theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          
          <Link href="/login" className="hidden sm:inline-flex ml-2 bg-[#e0e3e5] text-[#191c1e] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#e6e8ea] transition-all">
            Sign In
          </Link>
          <Link href="/signup" className="hidden sm:inline-flex ml-2 bg-[#005c55] text-white px-6 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all">
            Sign Up
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600 hover:text-[#005c55] transition-colors ml-1">
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Dropdown */}
    {mobileMenuOpen && (
      <div className="fixed top-16 left-0 w-full bg-white border-b border-[#bdc9c6] shadow-lg z-30 md:hidden flex flex-col p-6 animate-in slide-in-from-top-2">
        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="sm:hidden bg-[#e0e3e5] text-[#191c1e] px-6 py-4 rounded-full font-bold text-center mb-3 hover:bg-[#e6e8ea]">
          Sign In
        </Link>
        <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="sm:hidden bg-[#005c55] text-white px-6 py-4 rounded-full font-bold text-center hover:opacity-90">
          Sign Up
        </Link>
        <div className="sm:hidden w-full bg-[#bdc9c6]/30 h-px my-6"></div>
        <a onClick={() => setMobileMenuOpen(false)} className="text-[#005c55] font-bold py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors" href="#home">Home</a>
        <a onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-bold hover:text-[#005c55] py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors" href="#find-doctors">Find Doctors</a>
        <a onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-bold hover:text-[#005c55] py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors" href="#patient-stories">Patient Stories</a>
      </div>
    )}
    </>
  );
}

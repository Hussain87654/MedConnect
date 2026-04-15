"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl flex justify-between items-center h-16 px-8 shadow-[0_20px_50px_rgba(0,92,85,0.06)] border-b-0">
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
          <button className="p-2 text-slate-600 hover:text-[#005c55] transition-colors">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          
          <Link href="/login" className="ml-2 bg-[#e0e3e5] text-[#191c1e] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#e6e8ea] transition-all">
            Sign In
          </Link>
          <Link href="/signup" className="ml-2 bg-[#005c55] text-white px-6 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

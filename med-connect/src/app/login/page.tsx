"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, HelpCircle, Loader2 } from 'lucide-react';
import { CustomCursor } from "@/components/CustomCursor";

export default function LoginPage() {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Logic: Exactly what you provided
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 100);
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[#f0f4f4] flex flex-col font-sans text-slate-700">
        {/* Header */}
        <header className="px-8 py-6 flex justify-between items-center bg-transparent">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-[#0d6e64] font-bold text-xl tracking-tight">MedConnect</h1>
          </Link>
          <button className="text-sm font-medium flex items-center gap-1 hover:underline text-slate-500">
            <HelpCircle className="w-4 h-4" /> Help
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-[500px] animate-fade-in-up">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-teal-900/5 p-10 md:p-14 text-center border border-white">
              {/* Title */}
              <div className="mb-10">
                <h1 className="text-[#0d6e64] text-4xl font-bold mb-3 tracking-tight">Welcome Back</h1>
                <p className="text-slate-500 font-medium">Sign in to your clinical dashboard</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium animate-fade-in-down">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0d6e64] w-5 h-5 transition-colors z-10" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#e8ebeb] border-2 border-transparent rounded-full py-4 pl-14 pr-6 focus:border-[#0d6e64]/20 focus:bg-white focus:ring-4 focus:ring-[#0d6e64]/5 outline-none transition-all font-medium"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0d6e64] w-5 h-5 transition-colors z-10" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-[#e8ebeb] border-2 border-transparent rounded-full py-4 pl-14 pr-6 focus:border-[#0d6e64]/20 focus:bg-white focus:ring-4 focus:ring-[#0d6e64]/5 outline-none transition-all font-medium"
                  />
                </div>

                <div className="flex items-center justify-between px-2 pb-2">
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 text-[#0d6e64] border-slate-300 rounded focus:ring-[#0d6e64] transition-colors" />
                    <span className="ml-2 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm text-[#0d6e64] hover:underline font-bold">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0d6e64] text-white font-bold py-4 rounded-full mt-4 hover:bg-[#0a5a52] shadow-lg shadow-teal-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-6 text-slate-400 tracking-[0.2em] font-semibold">Or continue with</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                disabled={isGoogleLoading || isLoading}
                onClick={async () => {
                  setIsGoogleLoading(true);
                  await signIn("google", { callbackUrl: "/patient-dashboard" });
                }}
                className="w-full border-2 border-slate-100 rounded-full py-4 flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#0d6e64]" />
                ) : (
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                )}
                <span className="font-bold text-slate-700">
                  {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                </span>
              </button>

              {/* Switch to Signup */}
              <div className="mt-10 pt-6 border-t border-slate-50 text-center animate-fade-in-up">
                <p className="text-sm text-slate-500 font-medium">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-[#0d6e64] font-extrabold hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="px-12 py-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-[#0d6e64] text-xs mb-1 tracking-normal">MedConnect Framework</p>
            <p>© 2024. All Rights Reserved. HIPAA Compliant System.</p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-[#0d6e64] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0d6e64] transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-[#0d6e64] transition-colors">Support</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
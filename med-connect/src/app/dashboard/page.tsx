"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardHeader, DashboardSidebar, AdminDashboard, DoctorDashboard, PatientDashboard } from "@/components";
import { CustomCursor } from "@/components/CustomCursor";
import PatientForm from "@/components/PatientForm";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };

  const isPatient = user.role?.toUpperCase() === "PATIENT" || !user.role;

  const renderDashboard = () => {
    const userRole = user.role?.toUpperCase();
    switch (userRole) {
      case "ADMIN":
        return <AdminDashboard user={user} />;
      case "DOCTOR":
        return <DoctorDashboard user={user} />;
      case "PATIENT":
      default:
        return <PatientDashboard user={user} />;
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen relative font-body bg-[#f7f9fb] text-[#191c1e]">
        <DashboardSidebar
          onSettingsClick={isPatient ? () => setShowProfileForm(true) : undefined}
        />
        <main className="flex-1 flex flex-col min-w-0 bg-[#f7f9fb]">
          <DashboardHeader
            userName={user.name || "User"}
            userRole={user.role || "Patient"}
          />
          <div className="p-8 space-y-8 overflow-y-auto">
            {renderDashboard()}
          </div>
        </main>
      </div>

      {/* Patient Profile Form Modal — triggered from Settings button */}
      {showProfileForm && isPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl mx-auto max-h-[95vh] overflow-y-auto rounded-3xl bg-[#f7f9fb] shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowProfileForm(false)}
              className="absolute top-6 right-6 z-20 p-2 bg-white hover:bg-red-50 hover:text-red-600 rounded-full shadow-md transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <PatientForm onClose={() => setShowProfileForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminDashboard, DoctorDashboard, PatientDashboard, DashboardHeader, DashboardSidebar } from "@/components";
import { CustomCursor } from "@/components/CustomCursor";
import PatientForm from "@/components/PatientForm";

interface RolePageProps {
  params: Promise<{ role: string }>;
}

export default function RolePage({ params }: RolePageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen relative font-body bg-[#f7f9fb] text-[#191c1e]">
        <DashboardSidebar
          onSettingsClick={isPatient ? () => setShowProfileForm(true) : undefined}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          userRole={user.role}
        />
        <main className="flex-1 flex flex-col min-w-0 bg-[#f7f9fb]">
          <DashboardHeader
            userName={user.name || "User"}
            userRole={user.role || "Patient"}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          <div className="p-4 md:p-8 space-y-8 overflow-y-auto">
            <RoleDashboard user={user} />
          </div>
        </main>
      </div>

      {/* Patient Profile Form Modal — triggered from Settings button */}
      {showProfileForm && isPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl mx-auto max-h-[95vh] overflow-y-auto rounded-3xl bg-[#f7f9fb] shadow-2xl">
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

function RoleDashboard({ user }: { user: { id: string; name?: string | null; email?: string | null; role?: string } }) {
  const role = user.role?.toUpperCase();

  switch (role) {
    case "ADMIN":
      return <AdminDashboard user={user} />;
    case "DOCTOR":
      return <DoctorDashboard user={user} />;
    case "PATIENT":
      return <PatientDashboard user={user} />;
    default:
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Role</h1>
            <p className="text-gray-500">Your role is not recognized. Please contact support.</p>
          </div>
        </div>
      );
  }
}

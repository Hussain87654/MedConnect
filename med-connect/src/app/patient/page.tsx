"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components";
import { Footer } from "@/components";
import { Card } from "@/components";
import { Button } from "@/components";

const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Smith",
    specialty: "Cardiology",
    date: "2026-03-29",
    time: "10:00 AM",
    status: "Confirmed",
    type: "General Checkup",
  },
  {
    id: 2,
    doctor: "Dr. John Davis",
    specialty: "Neurology",
    date: "2026-04-02",
    time: "02:30 PM",
    status: "Pending",
    type: "Consultation",
  },
  {
    id: 3,
    doctor: "Dr. Emily Brown",
    specialty: "Pediatrics",
    date: "2026-04-10",
    time: "09:00 AM",
    status: "Confirmed",
    type: "Follow-up",
  },
];

const mockMedicalRecords = [
  {
    id: 1,
    title: "Annual Checkup Results",
    date: "2026-03-15",
    doctor: "Dr. Sarah Smith",
    type: "Lab Report",
  },
  {
    id: 2,
    title: "Blood Pressure Monitoring",
    date: "2026-02-28",
    doctor: "Dr. Sarah Smith",
    type: "Vital Signs",
  },
  {
    id: 3,
    title: "Prescription Renewal",
    date: "2026-02-15",
    doctor: "Dr. John Davis",
    type: "Prescription",
  },
];

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<"appointments" | "profile">(
    "appointments"
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader userName="Ahmed Khan" userRole="Patient" />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your appointments and health records
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Upcoming Appointments
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Completed Visits
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Medical Records
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Prescriptions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button>Book Appointment</Button>
            <Button variant="outline">View Medical History</Button>
            <Button variant="secondary">Request Prescription</Button>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "appointments"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "profile"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Profile
                </button>
              </nav>
            </div>
          </div>

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <Card padding="none">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming Appointments
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {appointment.doctor}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {appointment.specialty} • {appointment.type}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {appointment.date} at {appointment.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}
                          >
                            {appointment.status}
                          </span>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="secondary" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="danger" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Medical Records */}
              <Card padding="none">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Medical Records
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockMedicalRecords.map((record) => (
                    <div
                      key={record.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mr-4">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {record.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {record.doctor} • {record.type}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              {record.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="secondary" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="p-6 lg:col-span-1">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    A
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Ahmed Khan
                  </h2>
                  <p className="text-gray-500">Patient</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <Button variant="outline" size="sm">
                      Edit Photo
                    </Button>
                    <Button variant="secondary" size="sm">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Profile Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="text-gray-900 font-medium">Ahmed Khan</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="text-gray-900 font-medium">
                        ahmed.khan@email.com
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="text-gray-900 font-medium">
                        +1 (555) 123-4567
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="text-gray-900 font-medium">March 15, 1990</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Blood Type</label>
                      <p className="text-gray-900 font-medium">O+</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Emergency Contact</label>
                      <p className="text-gray-900 font-medium">
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Medical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">
                        Known Allergies
                      </label>
                      <p className="text-gray-900 font-medium">Penicillin</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Current Medications
                      </label>
                      <p className="text-gray-900 font-medium">
                        Lisinopril 10mg
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">
                        Medical Conditions
                      </label>
                      <p className="text-gray-900 font-medium">Hypertension</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer variant="dashboard" />
    </div>
  );
}

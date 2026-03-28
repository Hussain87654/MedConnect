"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components";
import { Footer } from "@/components";
import { Card } from "@/components";
import { Button } from "@/components";

const mockAppointments = [
  {
    id: 1,
    patient: "Ahmed Khan",
    date: "2026-03-29",
    time: "10:00 AM",
    type: "General Checkup",
    status: "Confirmed",
    notes: "Annual health checkup",
  },
  {
    id: 2,
    patient: "Fatima Ali",
    date: "2026-03-29",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Pending",
    notes: "Follow-up for previous consultation",
  },
  {
    id: 3,
    patient: "Muhammad Usman",
    date: "2026-03-29",
    time: "02:00 PM",
    type: "Consultation",
    status: "Confirmed",
    notes: "New patient consultation",
  },
  {
    id: 4,
    patient: "Ayesha Malik",
    date: "2026-03-30",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Cancelled",
    notes: "Rescheduled due to patient request",
  },
  {
    id: 5,
    patient: "Ali Hassan",
    date: "2026-03-30",
    time: "10:30 AM",
    type: "General Checkup",
    status: "Confirmed",
    notes: "Routine examination",
  },
];

const mockPatients = [
  {
    id: 1,
    name: "Ahmed Khan",
    email: "ahmed.khan@email.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "2026-03-15",
    condition: "Hypertension",
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima.ali@email.com",
    phone: "+1 (555) 234-5678",
    lastVisit: "2026-03-20",
    condition: "Diabetes Type 2",
    status: "Active",
  },
  {
    id: 3,
    name: "Muhammad Usman",
    email: "usman@email.com",
    phone: "+1 (555) 345-6789",
    lastVisit: "2026-03-22",
    condition: "Asthma",
    status: "Active",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha.malik@email.com",
    phone: "+1 (555) 456-7890",
    lastVisit: "2026-02-28",
    condition: "Arthritis",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Ali Hassan",
    email: "ali.hassan@email.com",
    phone: "+1 (555) 567-8901",
    lastVisit: "2026-03-25",
    condition: "General Wellness",
    status: "Active",
  },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<"appointments" | "patients">(
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
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader userName="Dr. Sarah Smith" userRole="Doctor" />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your appointments and patient records
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Today's Appointments
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
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
                    Total Patients
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Completed This Week
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">32</p>
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
                    Pending Requests
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button>Schedule Appointment</Button>
            <Button variant="outline">View Schedule</Button>
            <Button variant="secondary">Write Prescription</Button>
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
                  onClick={() => setActiveTab("patients")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "patients"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Patients
                </button>
              </nav>
            </div>
          </div>

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id} hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                        {appointment.patient.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {appointment.patient}
                        </h3>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
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
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      {appointment.notes}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <Button variant="success" size="sm">
                      Start Session
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Patients Tab */}
          {activeTab === "patients" && (
            <Card padding="none">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    All Patients
                  </h2>
                  <Button size="sm">Add New Patient</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium mr-3">
                              {patient.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {patient.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {patient.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {patient.lastVisit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {patient.condition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}
                          >
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="secondary" size="sm">
                              Edit
                            </Button>
                            <Button variant="success" size="sm">
                              Record
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer variant="dashboard" />
    </div>
  );
}

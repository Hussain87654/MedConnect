import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components";

interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  createdAt?: string;
}

interface AdminDashboardProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

const roleOptions = ["admin", "doctor", "patient"];

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
        setStats({
          totalUsers: data.users.length,
          totalDoctors: data.users.filter((u: User) => u.role === "doctor").length,
          totalPatients: data.users.filter((u: User) => u.role === "patient").length,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string) => {
    if (!selectedRole) return;
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });
      if (res.ok) {
        const updatedUsers = users.map(u => 
          u.id === userId ? { ...u, role: selectedRole } : u
        );
        setUsers(updatedUsers);
        setEditingUser(null);
        setSelectedRole("");
        setStats({
          totalUsers: updatedUsers.length,
          totalDoctors: updatedUsers.filter((u: User) => u.role === "doctor").length,
          totalPatients: updatedUsers.filter((u: User) => u.role === "patient").length,
        });
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold tracking-tight font-headline text-[#191c1e]">Command Center</h2>
          <p className="text-[#3e4947] font-medium">Monitoring clinic efficiency and patient flow in real-time.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-[#80f9c8] text-[#007353] rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006c4e] animate-pulse"></span>
            System Live
          </div>
          <div className="px-4 py-2 bg-[#e6e8ea] rounded-full text-sm font-semibold text-[#3e4947]">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </motion.section>

      {/* Bento Grid Metrics */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card tilt padding="none" className="bg-[#f2f4f6] p-6 rounded-xl border-none flex flex-col justify-between h-40 group hover:bg-white transition-all duration-300 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-[#005c55] bg-[#9cf2e8] p-2 rounded-xl">groups</span>
            <span className="text-[#006c4e] font-bold text-sm">Active</span>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-[#191c1e] font-headline">{loading ? "-" : stats.totalUsers}</p>
            <p className="text-sm font-semibold text-[#3e4947]">Total Users</p>
          </div>
        </Card>
        <Card tilt padding="none" className="bg-[#f2f4f6] p-6 rounded-xl border-none flex flex-col justify-between h-40 group hover:bg-white transition-all duration-300 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-[#005c55] bg-[#9cf2e8] p-2 rounded-xl">medical_services</span>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-[#191c1e] font-headline">{loading ? "-" : stats.totalDoctors}</p>
            <p className="text-sm font-semibold text-[#3e4947]">Specialists (Doctors)</p>
          </div>
        </Card>
        <Card tilt padding="none" className="bg-[#f2f4f6] p-6 rounded-xl border-none flex flex-col justify-between h-40 group hover:bg-white transition-all duration-300 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-[#005c55] bg-[#9cf2e8] p-2 rounded-xl">accessible</span>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-[#191c1e] font-headline">{loading ? "-" : stats.totalPatients}</p>
            <p className="text-sm font-semibold text-[#3e4947]">Registered Patients</p>
          </div>
        </Card>
        <Card tilt padding="none" className="bg-[#f2f4f6] p-6 rounded-xl border-none flex flex-col justify-between h-40 group hover:bg-white transition-all duration-300 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-[#005c55] bg-[#9cf2e8] p-2 rounded-xl">speed</span>
            <span className="text-[#006c4e] font-bold text-sm">98.2%</span>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-[#191c1e] font-headline">4.8s</p>
            <p className="text-sm font-semibold text-[#3e4947]">Avg Response Time</p>
          </div>
        </Card>
      </motion.section>

      {/* Analytics & Tables Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity Chart Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Area */}
          <motion.div whileHover={{ y: -5 }} className="bg-[#f2f4f6] rounded-xl p-8 h-[400px] flex flex-col shadow-sm border border-[#eceef0]/50">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold font-headline">Patient Inflow</h3>
                <p className="text-sm text-[#3e4947]">Weekly statistical analysis</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white rounded-lg text-xs font-bold shadow-sm cursor-pointer border border-[#e0e3e5]">Weekly</button>
                <button className="px-3 py-1 text-xs font-bold text-[#3e4947] cursor-pointer">Monthly</button>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-4 px-2">
              {[0.5, 0.67, 0.33, 0.75, 0.5, 0.83, 0.25].map((height, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-[#005c55] rounded-t-xl opacity-20 hover:opacity-100 transition-opacity cursor-pointer relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#191c1e] text-white text-[10px] px-2 py-1 rounded">
                    {Math.floor(height * 500)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-[#3e4947] uppercase tracking-widest">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>

          {/* Management Table */}
          <div className="bg-[#f2f4f6] rounded-xl overflow-hidden shadow-sm border border-[#eceef0]">
            <div className="p-6 flex justify-between items-center border-b border-[#eceef0]">
              <h3 className="text-xl font-bold font-headline">Platform Users</h3>
              <button className="text-[#005c55] text-sm font-bold flex items-center gap-1 cursor-pointer">Total: {users.length}</button>
            </div>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-[#f2f4f6] z-10">
                  <tr className="text-[10px] font-bold text-[#3e4947] uppercase tracking-widest bg-[#e6e8ea]/50">
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Current Role</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef0] bg-white text-[#191c1e]">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center">
                        <div className="w-8 h-8 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-sm font-bold text-[#3e4947]">Loading directory...</p>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center">
                        <p className="text-sm font-bold text-[#3e4947]">No users found</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((userItem) => (
                      <tr key={userItem.id} className="hover:bg-[#f7f9fb] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm border border-teal-200">
                              {userItem.username?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <div className="space-y-0.5">
                              <span className="block text-sm font-semibold">{userItem.username}</span>
                              <span className="block text-[10px] text-[#3e4947]">Joined {userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : "N/A"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#3e4947]">{userItem.email}</td>
                        <td className="px-6 py-4">
                          {editingUser === userItem.id ? (
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              className="px-3 py-1.5 text-xs border border-[#bdc9c6] rounded-full focus:ring-2 focus:ring-[#005c55] outline-none"
                            >
                              <option value="">Select role</option>
                              {roleOptions.map((r) => (
                                <option key={r} value={r}>{r.toUpperCase()}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              userItem.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                              userItem.role === 'doctor' ? 'bg-[#9cf2e8] text-[#00201d]' : 
                              'bg-[#80f9c8] text-[#007353]'
                            }`}>
                              {userItem.role || 'patient'}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {editingUser === userItem.id ? (
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleRoleUpdate(userItem.id)} disabled={!selectedRole} className="w-8 h-8 flex items-center justify-center text-[#005c55] bg-[#9cf2e8]/50 hover:bg-[#9cf2e8] rounded-full transition-colors disabled:opacity-50 cursor-pointer">
                                <span className="material-symbols-outlined text-sm">check</span>
                              </button>
                              <button onClick={() => { setEditingUser(null); setSelectedRole(""); }} className="w-8 h-8 flex items-center justify-center text-[#ba1a1a] bg-[#ffdad6]/50 hover:bg-[#ffdad6] rounded-full transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-sm">close</span>
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => { setEditingUser(userItem.id); setSelectedRole(userItem.role || "patient"); }} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-[#005c55] bg-transparent hover:bg-[#9cf2e8]/30 rounded-full transition-colors cursor-pointer" title="Edit Role">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Action Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-[#005c55] p-8 rounded-xl text-white space-y-6 shadow-xl shadow-[#005c55]/10">
            <h3 className="text-xl font-bold font-headline">Quick Shortcuts</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors text-center cursor-pointer">
                <span className="material-symbols-outlined text-2xl mb-2">person_add</span>
                <span className="text-xs font-bold uppercase tracking-tighter">New Patient</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors text-center cursor-pointer">
                <span className="material-symbols-outlined text-2xl mb-2">lab_research</span>
                <span className="text-xs font-bold uppercase tracking-tighter">Lab Results</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors text-center cursor-pointer">
                <span className="material-symbols-outlined text-2xl mb-2">prescriptions</span>
                <span className="text-xs font-bold uppercase tracking-tighter">Prescription</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors text-center cursor-pointer">
                <span className="material-symbols-outlined text-2xl mb-2">summarize</span>
                <span className="text-xs font-bold uppercase tracking-tighter">Billing</span>
              </button>
            </div>
          </div>

          {/* System Health Card */}
          <div className="bg-[#f2f4f6] rounded-xl p-8 space-y-6 shadow-sm border border-[#eceef0]">
            <h3 className="text-xl font-bold font-headline">Server Resources</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-[#3e4947]">CPU Usage</span>
                  <span className="text-[#005c55]">34%</span>
                </div>
                <div className="h-2 w-full bg-[#e6e8ea] rounded-full overflow-hidden">
                  <div className="h-full bg-[#005c55] w-[34%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-[#3e4947]">Database Storage</span>
                  <span className="text-[#006c4e]">82%</span>
                </div>
                <div className="h-2 w-full bg-[#e6e8ea] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c4e] w-[82%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-[#3e4947]">Network Latency</span>
                  <span className="text-[#005c55]">12ms</span>
                </div>
                <div className="h-2 w-full bg-[#e6e8ea] rounded-full overflow-hidden">
                  <div className="h-full bg-[#005c55] w-[15%] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-3 text-xs font-bold text-[#3e4947] bg-[#e6e8ea]/30 p-4 rounded-xl shadow-inner">
              <span className="material-symbols-outlined text-[#006c4e]">check_circle</span>
              All regional nodes are healthy
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-[#f2f4f6] rounded-xl p-8 space-y-6 shadow-sm border border-[#eceef0]">
            <h3 className="text-xl font-bold font-headline">Activity Log</h3>
            <div className="space-y-6">
              <div className="flex gap-4 relative">
                <div className="w-0.5 bg-[#eceef0] absolute left-4 top-8 bottom-[-24px]"></div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm relative z-10 border border-[#eceef0]">
                  <span className="material-symbols-outlined text-xs text-[#005c55]">update</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Doctor Profile Updated</p>
                  <p className="text-xs text-[#3e4947]">Dr. Alan Turing changed availability</p>
                  <p className="text-[10px] font-bold text-[#0f766e] uppercase">12 mins ago</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-0.5 bg-[#eceef0] absolute left-4 top-8 bottom-[-24px]"></div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm relative z-10 border border-[#eceef0]">
                  <span className="material-symbols-outlined text-xs text-[#006c4e]">inventory</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Medical Supply Restock</p>
                  <p className="text-xs text-[#3e4947]">Batch #4492 processed by Admin</p>
                  <p className="text-[10px] font-bold text-[#0f766e] uppercase">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm relative z-10 border border-[#eceef0]">
                  <span className="material-symbols-outlined text-xs text-[#ba1a1a]">report_problem</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Login Attempt Warning</p>
                  <p className="text-xs text-[#3e4947]">Suspicious IP blocked: 192.168.1.1</p>
                  <p className="text-[10px] font-bold text-[#0f766e] uppercase">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

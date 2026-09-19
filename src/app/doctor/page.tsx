"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useKioskStore } from "@/store/kiosk-store";
import { DoctorNav } from "@/components/doctor/DoctorNav";
import { 
  Users, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  HeartPulse,
  Activity
} from "lucide-react";
import { QueueStatus, QueuePriority } from "@/types/medical";

export default function DoctorQueuePage() {
  const { queue, updatePatientStatus } = useKioskStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");

  // Filter queue
  const filteredQueue = queue.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.opdToken.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === "ALL" || patient.status === selectedStatus;
    const matchesDept = selectedDept === "ALL" || patient.department === selectedDept;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Counters
  const urgentCount = queue.filter((p) => p.status === "Urgent" || p.hasRedFlags).length;
  const readyCount = queue.filter((p) => p.status === "Ready").length;
  const waitingCount = queue.filter((p) => p.status === "Waiting").length;
  const completedCount = queue.filter((p) => p.status === "Completed").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <DoctorNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
        {/* Urgent Triage Alert Banner if any patient flagged */}
        {urgentCount > 0 && (
          <div className="bg-red-500 text-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="bg-white text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  OPD Triage Emergency
                </span>
                <h3 className="text-lg font-black tracking-tight">
                  {urgentCount} Patient(s) Detected with High-Risk Red Flags at Kiosk
                </h3>
                <p className="text-xs text-red-100">
                  Immediate clinical evaluation recommended. Priority P1 triage protocols activated.
                </p>
              </div>
            </div>

            <Link
              href="/doctor/patient/p1"
              className="py-2.5 px-5 bg-white text-red-700 hover:bg-red-50 font-black text-xs sm:text-sm rounded-xl shadow transition shrink-0 flex items-center gap-1.5"
            >
              <span>Attend Ravi Kumar (P1)</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        )}

        {/* Top Summary Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Patients</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{queue.length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Today's Shift Intake</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Urgent Triage</p>
              <p className="text-3xl font-black text-red-600 mt-1">{urgentCount}</p>
              <p className="text-[11px] text-red-500 mt-0.5">Requires immediate ECG/ER</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">Ready for Consult</p>
              <p className="text-3xl font-black text-teal-700 mt-1">{readyCount}</p>
              <p className="text-[11px] text-teal-600 mt-0.5">History & Docs Digitized</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Consulted</p>
              <p className="text-3xl font-black text-emerald-700 mt-1">{completedCount}</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">Signed by Physician</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Patient Name, OPD Token, or Complaint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none bg-slate-50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              {["ALL", "Urgent", "Ready", "Waiting", "Completed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    selectedStatus === st
                      ? "bg-white text-teal-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Department Dropdown */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Cardiology OPD">Cardiology OPD</option>
              <option value="General Medicine OPD">General Medicine OPD</option>
              <option value="Pulmonology OPD">Pulmonology OPD</option>
            </select>
          </div>
        </div>

        {/* Patient Queue Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">
              Today's Patient Queue ({filteredQueue.length})
            </h2>
            <span className="text-xs text-slate-500">
              Click any patient to inspect clinical history, AYUSH chart & digitized records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider">
                  <th className="py-4 px-6">Token</th>
                  <th className="py-4 px-6">Patient</th>
                  <th className="py-4 px-6">Age/Sex</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Chief Complaint</th>
                  <th className="py-4 px-6">Priority</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredQueue.map((p) => {
                  const isUrgent = p.status === "Urgent" || p.hasRedFlags;

                  return (
                    <tr 
                      key={p.id}
                      className={`hover:bg-slate-50/80 transition group ${
                        isUrgent ? "bg-red-50/30" : ""
                      }`}
                    >
                      {/* Token */}
                      <td className="py-4 px-6 font-mono font-black text-slate-900">
                        <span className="bg-slate-100 group-hover:bg-teal-50 text-slate-800 group-hover:text-teal-900 px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
                          {p.opdToken}
                        </span>
                      </td>

                      {/* Patient Name */}
                      <td className="py-4 px-6">
                        <p className="font-black text-slate-900 group-hover:text-teal-700 transition">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          ABHA: {p.abhaId || "Manual Entry"}
                        </p>
                      </td>

                      {/* Age / Sex */}
                      <td className="py-4 px-6 text-slate-600 text-xs">
                        {p.age} Yrs / {p.gender}
                      </td>

                      {/* Department */}
                      <td className="py-4 px-6 text-slate-600 text-xs font-semibold">
                        {p.department}
                      </td>

                      {/* Chief Complaint */}
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-xs text-slate-800 truncate font-semibold">
                          {p.chiefComplaint}
                        </p>
                      </td>

                      {/* Priority */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            p.priority === "P1-Urgent"
                              ? "bg-red-100 text-red-800 border border-red-200 animate-pulse"
                              : p.priority === "P2-Priority"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {p.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                            p.status === "Urgent"
                              ? "bg-red-600 text-white font-black"
                              : p.status === "Ready"
                              ? "bg-teal-100 text-teal-800 font-bold"
                              : p.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800 font-bold"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/doctor/patient/${p.id}`}
                          className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-slate-900 group-hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
                        >
                          <span>Open Chart</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

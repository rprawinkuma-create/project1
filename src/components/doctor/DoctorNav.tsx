"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Stethoscope, 
  Users, 
  ArrowLeft, 
  Bell, 
  ShieldAlert, 
  MonitorSmartphone,
  Hospital,
  Activity
} from "lucide-react";
import { useKioskStore } from "@/store/kiosk-store";

export function DoctorNav() {
  const pathname = usePathname();
  const { queue } = useKioskStore();

  const urgentCount = queue.filter((p) => p.status === "Urgent" || p.hasRedFlags).length;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Branding & Portal Title */}
        <div className="flex items-center gap-3">
          <Link href="/doctor" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30 group-hover:scale-105 transition">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white group-hover:text-teal-400 transition">
                  MediKiosk MD
                </span>
                <span className="bg-teal-900 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-teal-700">
                  Physician Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                OPD Clinical History & Triage System
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Department indicator */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
          <Hospital className="w-4 h-4 text-teal-400" />
          <span>Apollo Specialty OPD • Cardiology & Internal Medicine Wing</span>
        </div>

        {/* Right: Urgent alerts, Kiosk Switcher, Physician Profile */}
        <div className="flex items-center gap-3">
          {urgentCount > 0 && (
            <div className="flex items-center gap-1.5 bg-red-950 text-red-300 px-3 py-1.5 rounded-xl border border-red-700 text-xs font-bold animate-pulse">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>{urgentCount} Urgent Triage</span>
            </div>
          )}

          {/* Quick link back to Patient Kiosk */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
          >
            <MonitorSmartphone className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Kiosk Terminal</span>
          </Link>

          {/* Doctor Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <div className="w-8 h-8 rounded-full bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xs border border-teal-600">
              DR
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-bold text-slate-100">Dr. Arvind Swaminathan</p>
              <p className="text-[10px] text-slate-400">MD, DM (Cardiology)</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

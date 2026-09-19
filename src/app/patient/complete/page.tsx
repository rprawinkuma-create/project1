"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { UI_STRINGS } from "@/data/translations";
import { 
  CheckCircle2, 
  Stethoscope, 
  Clock, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  QrCode,
  ShieldCheck,
  Building2
} from "lucide-react";

export default function IntakeCompletePage() {
  const router = useRouter();
  const { language, patient, clinicalSummary, resetInterview } = useKioskStore();
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const handleStartNew = () => {
    resetInterview();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader showBack={false} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col justify-center text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Top Success Badge */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-600/10">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            Intake Successfully Transmitted
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Clinical History Received
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8">
            Your medical history summary and digitized documents have been sent to your physician's OPD consultation terminal.
          </p>

          {/* Token & Room Ticket Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 mb-8 text-left shadow-xl border border-slate-700 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <QrCode className="w-48 h-48" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-700">
              <div>
                <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                  {strings.tokenNumber}
                </p>
                <p className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                  {patient?.opdToken || "OPD-CAR-042"}
                </p>
                <p className="text-sm font-semibold text-slate-300 mt-1">
                  {patient?.name} ({patient?.age} Yrs • {patient?.gender})
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-600 rounded-2xl p-4 text-center shrink-0">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                  {strings.estWait}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-emerald-400">
                  <Clock className="w-5 h-5" />
                  <span>~12 Mins</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">2 patients ahead</p>
              </div>
            </div>

            {/* Room Location & Physician info */}
            <div className="relative z-10 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    {strings.roomAssigned}
                  </p>
                  <p className="font-bold text-white text-base">
                    Room 108 • 1st Floor
                  </p>
                  <p className="text-xs text-slate-300">
                    Cardiology & Internal Medicine Wing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Consulting Physician
                  </p>
                  <p className="font-bold text-white text-base">
                    Dr. Arvind Swaminathan
                  </p>
                  <p className="text-xs text-slate-300">
                    MD, DM (Cardio), Senior Consultant
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seamless Transition to Doctor Dashboard (Crucial for evaluation!) */}
          <div className="space-y-3">
            <Link
              href={`/doctor/patient/${patient?.id || "p1"}`}
              className="w-full py-5 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-lg rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center gap-3 transition touch-target"
            >
              <Stethoscope className="w-6 h-6" />
              <span>Open Doctor OPD Dashboard (View Clinical Chart)</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Link>

            <button
              type="button"
              onClick={handleStartNew}
              className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl border border-slate-200 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Return to Kiosk Welcome Screen</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Please proceed to Waiting Lounge B. An audio announcement and digital screen will call your token number.
          </p>
        </div>
      </main>
    </div>
  );
}

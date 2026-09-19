"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, 
  BellRing, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle,
  Volume2
} from "lucide-react";
import { useKioskStore } from "@/store/kiosk-store";
import { UI_STRINGS } from "@/data/translations";

interface RedFlagModalProps {
  ruleName: string;
  notes: string;
  onDismiss: () => void;
  onAlertTriage: () => void;
}

export function RedFlagModal({
  ruleName,
  notes,
  onDismiss,
  onAlertTriage
}: RedFlagModalProps) {
  const { language, callNurse } = useKioskStore();
  const [triageAlerted, setTriageAlerted] = useState(false);

  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const handleAlert = () => {
    callNurse();
    setTriageAlerted(true);
    onAlertTriage();
  };

  return (
    <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-red-500 animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header Banner */}
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30 animate-pulse">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              TRIAGE PROTOCOL ALERT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-red-950 tracking-tight">
              {strings.emergencyAlert}
            </h2>
            <p className="text-sm font-semibold text-red-700">
              {strings.emergencySubtitle}
            </p>
          </div>
        </div>

        {/* Symptoms Detected Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Automated Triage Rule Triggered</span>
          </div>
          <p className="text-base font-bold text-slate-900 mb-2">
            {ruleName}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
            {notes}
          </p>
        </div>

        {/* Success or Actions */}
        {triageAlerted ? (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 mb-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-emerald-950 mb-1">Triage Staff Dispatched</h4>
            <p className="text-xs text-emerald-800 mb-4">
              An ER / Triage nurse has been paged to Kiosk Terminal #04. An immediate ECG and vitals monitor are on the way.
            </p>
            <button
              onClick={onDismiss}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition"
            >
              Proceed to Document Upload While Waiting
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={handleAlert}
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-black text-base sm:text-lg rounded-2xl transition shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 active:scale-95"
            >
              <BellRing className="w-6 h-6 animate-bounce" />
              <span>{strings.alertStaffBtn}</span>
            </button>

            {/* Secondary override */}
            <button
              type="button"
              onClick={onDismiss}
              className="w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition border border-slate-200"
            >
              {strings.continueAnywayBtn}
            </button>
          </div>
        )}

        {/* Legal / Medical Safety Notice */}
        <p className="mt-4 text-[11px] text-slate-400 text-center leading-relaxed">
          *Important: MediKiosk is a clinical intake triage tool and does not provide an autonomous medical diagnosis. If you feel dizzy, breathless, or faint, immediately signal any hospital staff member.
        </p>
      </div>
    </div>
  );
}

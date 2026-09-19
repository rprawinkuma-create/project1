"use client";

import React, { useState } from "react";
import { useKioskStore } from "@/store/kiosk-store";
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  HelpCircle, 
  BellRing, 
  CheckCircle2, 
  X,
  Sparkles
} from "lucide-react";
import { UI_STRINGS } from "@/data/translations";

export function AccessibilityBar() {
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    toggleHighContrast, 
    soundEnabled, 
    toggleSound,
    language,
    callNurse,
    nurseCalled,
    dismissNurse
  } = useKioskStore();

  const [showHelpModal, setShowHelpModal] = useState(false);
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const handleCallAttendant = () => {
    callNurse();
    setShowHelpModal(true);
  };

  return (
    <>
      <div className="bg-slate-900 text-slate-100 px-4 py-2 flex flex-wrap items-center justify-between text-xs sm:text-sm border-b border-slate-800 shadow-inner">
        {/* Terminal Info */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">Hospital OPD Kiosk #04</span>
          <span className="hidden md:inline text-slate-400">• ABDM Health Gateway Mock v2.4</span>
        </div>

        {/* Accessibility controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Font Size Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setFontSize("normal")}
              className={`px-2 py-1 rounded font-bold text-xs transition ${
                fontSize === "normal" ? "bg-teal-600 text-white" : "text-slate-300 hover:text-white"
              }`}
              title="Normal Text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2.5 py-1 rounded font-bold text-sm transition ${
                fontSize === "large" ? "bg-teal-600 text-white" : "text-slate-300 hover:text-white"
              }`}
              title="Large Text (Elderly Mode)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xl")}
              className={`px-3 py-1 rounded font-extrabold text-base transition ${
                fontSize === "xl" ? "bg-teal-600 text-white" : "text-slate-300 hover:text-white"
              }`}
              title="Extra Large Text"
            >
              A++
            </button>
          </div>

          {/* High Contrast */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition text-xs font-semibold ${
              highContrast 
                ? "bg-yellow-400 text-black border-yellow-300 font-bold" 
                : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">High Contrast</span>
          </button>

          {/* Audio Assistance */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition text-xs font-medium ${
              soundEnabled
                ? "bg-teal-900/60 text-teal-300 border-teal-700"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
            title="Audio guidance on/off"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-teal-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Muted"}</span>
          </button>

          {/* Call Attendant / Nurse */}
          <button
            onClick={handleCallAttendant}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold text-xs transition shadow-sm ${
              nurseCalled 
                ? "bg-amber-500 text-slate-950 animate-bounce" 
                : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>{nurseCalled ? "Attendant Dispatched!" : strings.helpBtn}</span>
          </button>
        </div>
      </div>

      {/* Help Modal Alert */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hospital Assistant Notified</h3>
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">
              {strings.nurseAssistanceAlert}
              <br />
              Please stay at this kiosk terminal. An OPD triage coordinator will assist you with touchscreen or language translation in 2 minutes.
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-left text-xs text-teal-900 mb-5 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>You can continue answering the intake questions using voice or touch while waiting.</span>
            </div>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition"
            >
              Continue on Kiosk
            </button>
          </div>
        </div>
      )}
    </>
  );
}

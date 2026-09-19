"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { UI_STRINGS } from "@/data/translations";
import { 
  ShieldCheck, 
  Volume2, 
  CheckCircle, 
  HelpCircle, 
  Lock, 
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";

export default function ConsentPage() {
  const router = useRouter();
  const { language, setConsent, callNurse, soundEnabled } = useKioskStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const handlePlayConsentAudio = () => {
    setIsPlayingAudio(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(strings.consentNotice);
        utterance.lang = language === "ta" ? "ta-IN" : "en-IN";
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {
        setIsPlayingAudio(false);
      }
    }
    // Fallback simulation timer
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  const handleAgree = () => {
    setConsent({
      agreed: true,
      timestamp: new Date().toISOString(),
      language,
      audioPlayed: isPlayingAudio,
      method: "touch"
    });
    router.push("/patient/identify");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader showBack={true} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle top decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 to-emerald-500" />

          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Step 0 • Informed Consent
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {strings.consentTitle}
              </h1>
            </div>
          </div>

          {/* Simple Consent Card Text */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 relative">
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                "{strings.consentNotice}"
              </p>

              {/* Audio Play Button beside the consent text */}
              <button
                type="button"
                onClick={handlePlayConsentAudio}
                className={`p-3.5 rounded-2xl transition shrink-0 flex items-center gap-2 font-bold text-xs shadow-sm ${
                  isPlayingAudio
                    ? "bg-teal-600 text-white animate-pulse"
                    : "bg-teal-100 hover:bg-teal-200 text-teal-800"
                }`}
                title={strings.consentAudio}
              >
                <Volume2 className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {isPlayingAudio ? "Playing..." : strings.consentAudio}
                </span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>
                Simulated ABDM & Digital Personal Data Protection (DPDP) standard consent artifact. No sensitive Aadhaar data is stored.
              </span>
            </div>
          </div>

          {/* Action Buttons: I Agree / I Need Help */}
          <div className="space-y-3">
            <button
              onClick={handleAgree}
              className="w-full py-5 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center gap-3 transition touch-target"
            >
              <CheckCircle className="w-6 h-6 stroke-[2.5]" />
              <span>{strings.agreeBtn}</span>
            </button>

            <button
              type="button"
              onClick={callNurse}
              className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base rounded-2xl border border-slate-200 flex items-center justify-center gap-2 transition"
            >
              <HelpCircle className="w-4 h-4 text-rose-600" />
              <span>{strings.needHelpBtn}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

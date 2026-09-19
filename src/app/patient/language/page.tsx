"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { SUPPORTED_LANGUAGES, UI_STRINGS } from "@/data/translations";
import { SupportedLanguage } from "@/types/medical";
import { Volume2, Check, ArrowRight, Sparkles } from "lucide-react";

export default function LanguageSelectionPage() {
  const router = useRouter();
  const { language, setLanguage, soundEnabled } = useKioskStore();
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    setLanguage(langCode);

    // Audio greeting feedback if sound is enabled
    if (soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
        if (langObj) {
          const utterance = new SpeechSynthesisUtterance(langObj.nativeName);
          utterance.lang = langCode === "ta" ? "ta-IN" : "en-IN";
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {}
    }

    // Advance to consent
    setTimeout(() => {
      router.push("/patient/consent");
    }, 250);
  };

  const playVoiceSample = (e: React.MouseEvent, langCode: SupportedLanguage) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
        if (langObj) {
          const utterance = new SpeechSynthesisUtterance(langObj.greeting);
          utterance.lang = langCode === "ta" ? "ta-IN" : "en-IN";
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader showBack={true} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 md:py-10 flex flex-col justify-between">
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Kiosk Accessibility • மொழி தேர்வு
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Choose Your Preferred Language
            </h1>
            <p className="text-lg font-bold text-teal-700">
              உங்கள் வசதியான மொழியைத் தேர்ந்தெடுக்கவும்
            </p>
            <p className="text-sm text-slate-500 mt-1">
              MediKiosk will speak and display questions in your selected language.
            </p>
          </div>

          {/* 8 Indian Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              const hasFullSupport = lang.code === "en" || lang.code === "ta";

              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-150 flex flex-col justify-between h-36 group active:scale-98 shadow-sm ${
                    isSelected
                      ? "border-teal-600 bg-teal-50/70 ring-4 ring-teal-500/20 shadow-md"
                      : "border-slate-200 bg-white hover:border-teal-400 hover:bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex items-center gap-1">
                      {hasFullSupport && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Full AI Voice
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => playVoiceSample(e, lang.code)}
                        className="p-1.5 rounded-full hover:bg-teal-200/60 text-teal-700 transition"
                        title="Listen to audio greeting"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-teal-700 transition">
                      {lang.nativeName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {lang.name}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA / Continue */}
        <div className="mt-8 max-w-md mx-auto w-full">
          <button
            onClick={() => router.push("/patient/consent")}
            className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-lg rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>{strings.agreeBtn || "Proceed to Consent"}</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </main>
    </div>
  );
}

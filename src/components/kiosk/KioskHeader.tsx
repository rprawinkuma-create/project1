"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { 
  HeartPulse, 
  Globe, 
  ArrowLeft, 
  Stethoscope, 
  Check,
  Building2,
  Zap
} from "lucide-react";
import { SUPPORTED_LANGUAGES, UI_STRINGS } from "@/data/translations";
import { SAMPLE_DOCUMENTS } from "@/data/demo-documents";
import { INITIAL_SUMMARIES } from "@/services/mock-patients";

interface KioskHeaderProps {
  currentStep?: 1 | 2 | 3 | 4;
  showBack?: boolean;
}

export function KioskHeader({ currentStep, showBack = true }: KioskHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    language, 
    setPatient, 
    setAnswer, 
    loadSampleDocuments, 
    setClinicalSummary,
    addPatientToQueue
  } = useKioskStore();

  const strings = UI_STRINGS[language] || UI_STRINGS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const steps = [
    { num: 1, label: strings.step1, path: "/patient/identify" },
    { num: 2, label: strings.step2, path: "/patient/interview" },
    { num: 3, label: strings.step3, path: "/patient/documents" },
    { num: 4, label: strings.step4, path: "/patient/summary" },
  ];

  const handleFastComplete = () => {
    const fastPatient = {
      id: "p1",
      name: "Ravi Kumar",
      age: 52,
      gender: "Male" as const,
      phone: "+91 98401 23456",
      abhaId: "91-2345-6789-0123",
      opdToken: "OPD-CAR-042",
      department: "Cardiology OPD",
      registrationType: "ABHA" as const,
      registeredAt: "19 Sep 2026, 06:15 PM"
    };

    setPatient(fastPatient);
    setAnswer("chief_complaint", "chest_pain");
    setAnswer("chest_pain_onset", "less_than_1hr");
    setAnswer("chest_pain_character", "crushing_pressure");
    setAnswer("chest_pain_radiation", "left_arm_jaw");
    setAnswer("chest_pain_associated", ["profuse_sweating", "shortness_breath"]);
    setAnswer("past_medical_history", ["hypertension", "diabetes", "heart_disease"]);
    loadSampleDocuments();
    
    const summary = INITIAL_SUMMARIES["p1"];
    setClinicalSummary(summary);
    addPatientToQueue({
      id: "p1",
      opdToken: "OPD-CAR-042",
      name: "Ravi Kumar",
      age: 52,
      gender: "Male",
      department: "Cardiology OPD",
      status: "Urgent",
      priority: "P1-Urgent",
      chiefComplaint: "Acute crushing chest pain radiating to left arm with diaphoresis",
      intakeDurationMins: 4,
      lastUpdated: "Just now",
      hasRedFlags: true,
      abhaId: "91-2345-6789-0123",
      ayushEnabled: true
    }, summary);

    router.push("/patient/complete");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Hospital Logo & Back */}
        <div className="flex items-center gap-3 sm:gap-4">
          {showBack && pathname !== "/" && (
            <button
              onClick={() => router.back()}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition touch-target flex items-center justify-center"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                  MediKiosk
                </span>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-teal-200 hidden sm:inline">
                  OPD Intake
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                AI Clinical History Terminal
              </p>
            </div>
          </Link>
        </div>

        {/* Center: 4-Step Progress Indicator (Shown if on patient flow) */}
        {currentStep && (
          <nav className="hidden lg:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            {steps.map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    isCurrent
                      ? "bg-white text-teal-800 shadow-sm border border-slate-200"
                      : isPast
                      ? "text-teal-600"
                      : "text-slate-400"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? "bg-teal-600 text-white"
                        : isPast
                        ? "bg-teal-100 text-teal-700"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isPast ? <Check className="w-3 h-3" /> : step.num}
                  </div>
                  <span>{step.label}</span>
                </div>
              );
            })}
          </nav>
        )}

        {/* Right: Fast Complete Demo Button + Language switch & Doctor Dashboard Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Fast-Track 1-Click Complete Button */}
          <button
            type="button"
            onClick={handleFastComplete}
            title="Fast Demo: Complete entire intake in 1 click"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-xs sm:text-sm font-black transition shadow-sm border border-amber-400"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">Fast Complete</span>
            <span className="sm:hidden">⚡ Fast</span>
          </button>

          <Link
            href="/patient/language"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition border border-slate-200"
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span>{currentLangObj.nativeName}</span>
          </Link>

          {/* Quick Doctor Portal Switcher for testing convenience */}
          <Link
            href="/doctor"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition shadow-sm"
          >
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Doctor Portal</span>
            <span className="sm:hidden">MD</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { 
  HeartPulse, 
  ArrowRight, 
  Globe, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Stethoscope,
  Activity,
  Fingerprint,
  Zap
} from "lucide-react";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { SUPPORTED_LANGUAGES, UI_STRINGS } from "@/data/translations";
import { INITIAL_SUMMARIES } from "@/services/mock-patients";

export default function WelcomePage() {
  const router = useRouter();
  const { 
    language, 
    setPatient, 
    setAnswer,
    loadSampleDocuments,
    setClinicalSummary,
    addPatientToQueue,
    callNurse 
  } = useKioskStore();
  const strings = UI_STRINGS[language] || UI_STRINGS.en;
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleStart = () => {
    router.push("/patient/language");
  };

  const handleQuickDemo = (patientId: string) => {
    if (patientId === "p1") {
      setPatient({
        id: "p1",
        name: "Ravi Kumar",
        age: 52,
        gender: "Male",
        phone: "+91 98401 23456",
        abhaId: "91-2345-6789-0123",
        opdToken: "OPD-CAR-042",
        department: "Cardiology OPD",
        registrationType: "ABHA",
        registeredAt: "19 Sep 2026, 06:15 PM"
      });
    } else if (patientId === "p2") {
      setPatient({
        id: "p2",
        name: "Meena Devi",
        age: 46,
        gender: "Female",
        phone: "+91 94440 98765",
        abhaId: "91-8842-1109-7734",
        opdToken: "OPD-GEN-019",
        department: "General Medicine OPD",
        registrationType: "QR_SCAN",
        registeredAt: "19 Sep 2026, 06:20 PM"
      });
    }
    router.push("/patient/consent");
  };

  const handleInstantComplete = () => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100">
      <AccessibilityBar />
      <KioskHeader showBack={false} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col justify-between">
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs sm:text-sm font-bold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI Clinical Intake & History Platform for Indian OPDs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none mb-4">
            {strings.appTitle}
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-teal-700 mb-4">
            {strings.appSubtitle}
          </p>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            "{strings.tagline}"
          </p>
        </div>

        {/* 4-Step Intake Pipeline Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto w-full">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-lg mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{strings.step1}</h3>
            <p className="text-xs text-slate-500">ABHA ID or QR Scan</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-lg mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{strings.step2}</h3>
            <p className="text-xs text-slate-500">Touch & Voice Interview</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-black text-lg mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{strings.step3}</h3>
            <p className="text-xs text-slate-500">Upload Rx & Lab OCR</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-lg mb-3">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{strings.step4}</h3>
            <p className="text-xs text-slate-500">Physician-Ready Summary</p>
          </div>
        </div>

        {/* Primary Action Button (Extra Large for Kiosk touch) */}
        <div className="max-w-md mx-auto w-full space-y-4 mb-8">
          <button
            onClick={handleStart}
            className="w-full py-5 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-xl rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center gap-3 transition"
          >
            <span>{strings.startBtn}</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Instant 1-Click Fast Complete Demo Button */}
          <button
            type="button"
            onClick={handleInstantComplete}
            className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-black text-base rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 transition border border-amber-400"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            <span>⚡ Instant 1-Click Intake (Fast Demo Mode)</span>
          </button>

          {/* Secondary Actions Row */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/patient/language"
              className="py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-200 text-sm flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Globe className="w-4 h-4 text-teal-600" />
              <span>{currentLang.nativeName} ({strings.languageBtn})</span>
            </Link>

            <button
              onClick={callNurse}
              className="py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-200 text-sm flex items-center justify-center gap-2 transition shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-rose-600" />
              <span>{strings.helpBtn}</span>
            </button>
          </div>
        </div>

        {/* Demo Fast Track Shortcuts for Reviewers */}
        <div className="max-w-2xl mx-auto w-full bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-teal-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Evaluator Shortcuts — Quick Pre-filled Patient Scenarios</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleInstantComplete}
              className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs rounded-xl border border-amber-300 flex items-center gap-1.5 transition shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-900" />
              <span>⚡ Complete Intake in 1-Click</span>
            </button>
            <button
              onClick={() => handleQuickDemo("p1")}
              className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs rounded-xl border border-teal-300 flex items-center gap-1.5 transition"
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-500" />
              <span>Ravi Kumar (52/M) — Chest Pain / ACS</span>
            </button>
            <button
              onClick={() => handleQuickDemo("p2")}
              className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs rounded-xl border border-teal-300 flex items-center gap-1.5 transition"
            >
              <Activity className="w-3.5 h-3.5 text-amber-500" />
              <span>Meena Devi (46/F) — Acute Fever</span>
            </button>
            <Link
              href="/doctor"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
            >
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>Doctor OPD Queue</span>
            </Link>
          </div>
        </div>

        {/* Bottom Trust & Compliance Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ABDM & DPDP Compliance Prototype</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Average Intake: 3 to 4 Minutes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fingerprint className="w-4 h-4 text-blue-600" />
            <span>Synthetic Demo Data Only</span>
          </div>
        </div>
      </main>
    </div>
  );
}

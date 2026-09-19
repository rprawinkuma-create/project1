"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { UI_STRINGS } from "@/data/translations";
import { 
  CreditCard, 
  QrCode, 
  UserPlus, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Camera,
  HeartPulse,
  UserCheck
} from "lucide-react";
import { Patient } from "@/types/medical";

type IdentifyTab = "abha" | "qr" | "new";

export default function PatientIdentifyPage() {
  const router = useRouter();
  const { language, setPatient } = useKioskStore();
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const [activeTab, setActiveTab] = useState<IdentifyTab>("abha");

  // ABHA Form state
  const [abhaInput, setAbhaInput] = useState("91-2345-6789-0123");
  const [isVerifyingAbha, setIsVerifyingAbha] = useState(false);
  const [verifiedAbhaPatient, setVerifiedAbhaPatient] = useState<Patient | null>(null);

  // QR Scan simulator state
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // New Patient Form state
  const [newPatient, setNewPatient] = useState({
    name: "Ravi Kumar",
    age: "52",
    gender: "Male" as "Male" | "Female" | "Other",
    phone: "+91 98401 23456",
    department: "Cardiology OPD"
  });

  const handleVerifyAbha = () => {
    setIsVerifyingAbha(true);
    setTimeout(() => {
      setIsVerifyingAbha(false);
      const mockP: Patient = {
        id: "p1",
        name: "Ravi Kumar",
        age: 52,
        gender: "Male",
        phone: "+91 98401 23456",
        abhaId: abhaInput,
        opdToken: "OPD-CAR-042",
        department: "Cardiology OPD",
        registrationType: "ABHA",
        registeredAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      };
      setVerifiedAbhaPatient(mockP);
    }, 800);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      const mockP: Patient = {
        id: "p2",
        name: "Meena Devi",
        age: 46,
        gender: "Female",
        phone: "+91 94440 98765",
        abhaId: "91-8842-1109-7734",
        opdToken: "OPD-GEN-019",
        department: "General Medicine OPD",
        registrationType: "QR_SCAN",
        registeredAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      };
      setPatient(mockP);
      setTimeout(() => {
        router.push("/patient/interview");
      }, 1200);
    }, 1500);
  };

  const handleSelectQuickDemo = (scenario: "ravi" | "meena" | "arun") => {
    let p: Patient;
    if (scenario === "ravi") {
      p = {
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
      };
    } else if (scenario === "meena") {
      p = {
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
      };
    } else {
      p = {
        id: "p3",
        name: "Arun Kumar",
        age: 64,
        gender: "Male",
        phone: "+91 91234 56789",
        abhaId: "91-4433-2211-9988",
        opdToken: "OPD-PUL-008",
        department: "Pulmonology OPD",
        registrationType: "NEW_PATIENT",
        registeredAt: "19 Sep 2026, 06:25 PM"
      };
    }
    setPatient(p);
    router.push("/patient/interview");
  };

  const handleProceedWithVerifiedAbha = () => {
    if (verifiedAbhaPatient) {
      setPatient(verifiedAbhaPatient);
      router.push("/patient/interview");
    }
  };

  const handleCreateNewPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const mockP: Patient = {
      id: `p-${Date.now()}`,
      name: newPatient.name,
      age: parseInt(newPatient.age, 10) || 45,
      gender: newPatient.gender,
      phone: newPatient.phone,
      opdToken: `OPD-GEN-${Math.floor(10 + Math.random() * 90)}`,
      department: newPatient.department,
      registrationType: "NEW_PATIENT",
      registeredAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
    setPatient(mockP);
    router.push("/patient/interview");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader currentStep={1} showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col justify-between">
        <div>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Step 1 of 4 • Patient Check-In
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Patient Identification
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Identify yourself using your ABHA number, hospital appointment QR code, or register as a new patient.
            </p>
          </div>

          {/* Quick Evaluator Preset Bar */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Quick 1-Click Demo Profiles:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectQuickDemo("ravi")}
                className="px-3 py-1.5 bg-white hover:bg-teal-100 text-teal-950 font-bold rounded-xl border border-teal-300 shadow-sm"
              >
                Ravi Kumar (52/M - Chest Pain)
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickDemo("meena")}
                className="px-3 py-1.5 bg-white hover:bg-teal-100 text-teal-950 font-bold rounded-xl border border-teal-300 shadow-sm"
              >
                Meena Devi (46/F - Fever)
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickDemo("arun")}
                className="px-3 py-1.5 bg-white hover:bg-teal-100 text-teal-950 font-bold rounded-xl border border-teal-300 shadow-sm"
              >
                Arun Kumar (64/M - Breathing)
              </button>
            </div>
          </div>

          {/* 3 Main Identification Tabs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 bg-slate-200/70 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("abha")}
              className={`py-3 sm:py-4 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-2 transition ${
                activeTab === "abha"
                  ? "bg-white text-teal-800 shadow-md border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              <span>ABHA ID</span>
            </button>

            <button
              onClick={() => setActiveTab("qr")}
              className={`py-3 sm:py-4 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-2 transition ${
                activeTab === "qr"
                  ? "bg-white text-teal-800 shadow-md border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              <span>Scan QR</span>
            </button>

            <button
              onClick={() => setActiveTab("new")}
              className={`py-3 sm:py-4 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-2 transition ${
                activeTab === "new"
                  ? "bg-white text-teal-800 shadow-md border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              <span>New Patient</span>
            </button>
          </div>

          {/* Tab 1: ABHA ID */}
          {activeTab === "abha" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Enter 14-Digit ABHA Number or ABHA Address
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Ayushman Bharat Health Account (ABDM mock sandbox integration)
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <input
                  type="text"
                  value={abhaInput}
                  onChange={(e) => setAbhaInput(e.target.value)}
                  placeholder="e.g. 91-2345-6789-0123 or ravi@abdm"
                  className="flex-1 text-lg font-bold p-4 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none"
                />
                <button
                  type="button"
                  onClick={handleVerifyAbha}
                  disabled={isVerifyingAbha}
                  className="py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 shrink-0 touch-target"
                >
                  {isVerifyingAbha ? (
                    <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span>Verify ABHA</span>
                </button>
              </div>

              {/* Verified ABHA Patient Card */}
              {verifiedAbhaPatient && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                      RK
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-black text-slate-900">
                          {verifiedAbhaPatient.name}
                        </h4>
                        <span className="bg-emerald-200 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded-md">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {verifiedAbhaPatient.age} Yrs • {verifiedAbhaPatient.gender} • Token:{" "}
                        <span className="font-bold text-teal-800">{verifiedAbhaPatient.opdToken}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        ABHA: {verifiedAbhaPatient.abhaId} • Dept: {verifiedAbhaPatient.department}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedWithVerifiedAbha}
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition shrink-0"
                  >
                    <span>Proceed with Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Scan QR */}
          {activeTab === "qr" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Scan Hospital Appointment Slip / ABHA QR
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Hold your paper OPD slip or mobile phone screen facing the terminal camera
              </p>

              {/* Viewfinder simulation */}
              <div className="relative w-64 h-64 mx-auto bg-slate-950 rounded-3xl border-4 border-teal-500 flex flex-col items-center justify-center overflow-hidden mb-6 shadow-inner">
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400 shadow-lg shadow-teal-400 animate-pulse top-1/2 -translate-y-1/2 w-full" />
                )}

                {scanSuccess ? (
                  <div className="text-center text-white p-4 animate-in zoom-in">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-2" />
                    <p className="font-bold text-sm">QR Code Verified!</p>
                    <p className="text-xs text-slate-300">Meena Devi • OPD-GEN-019</p>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 p-4">
                    <Camera className="w-12 h-12 mx-auto mb-2 text-slate-500" />
                    <p className="text-xs">Align QR within viewfinder</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning || scanSuccess}
                className="py-4 px-8 bg-teal-600 hover:bg-teal-700 text-white font-black text-base rounded-2xl shadow-xl shadow-teal-600/30 transition inline-flex items-center gap-2"
              >
                {isScanning ? "Scanning Barcode..." : "Simulate QR Scan (Meena Devi)"}
              </button>
            </div>
          )}

          {/* Tab 3: New Patient Form */}
          {activeTab === "new" && (
            <form
              onSubmit={handleCreateNewPatient}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Walk-In New Patient Registration
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Enter your basic details to create a temporary OPD token
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full text-base font-bold p-3.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={110}
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full text-base font-bold p-3.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Gender *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Male", "Female", "Other"] as const).map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setNewPatient({ ...newPatient, gender: g })}
                        className={`py-3 rounded-xl font-bold text-xs sm:text-sm border transition ${
                          newPatient.gender === g
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full text-base font-bold p-3.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-base rounded-2xl shadow-xl shadow-teal-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Register & Begin Clinical Interview</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

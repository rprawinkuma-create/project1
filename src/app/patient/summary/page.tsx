"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { UI_STRINGS } from "@/data/translations";
import { generateClinicalSummary } from "@/services/mock-ai";
import { ClinicalSummary, QueuePatient } from "@/types/medical";
import { 
  FileText, 
  Edit3, 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  ArrowLeft,
  User,
  HeartPulse,
  Pill,
  Clock
} from "lucide-react";

export default function ClinicalSummaryPage() {
  const router = useRouter();
  const { 
    language, 
    patient, 
    answers, 
    documents, 
    redFlagAlert, 
    clinicalSummary, 
    setClinicalSummary,
    updateSummaryField,
    addPatientToQueue
  } = useKioskStore();

  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(!clinicalSummary);
  const [isSending, setIsSending] = useState(false);

  // Editable local state
  const [formData, setFormData] = useState<Partial<ClinicalSummary>>({});

  useEffect(() => {
    async function loadSummary() {
      if (!clinicalSummary && patient) {
        setIsGenerating(true);
        const generated = await generateClinicalSummary(
          patient, 
          answers, 
          documents, 
          redFlagAlert || undefined
        );
        setClinicalSummary(generated);
        setFormData(generated);
        setIsGenerating(false);
      } else if (clinicalSummary) {
        setFormData(clinicalSummary);
      }
    }
    loadSummary();
  }, [clinicalSummary, patient, answers, documents, redFlagAlert, setClinicalSummary]);

  const handleSaveEdits = () => {
    Object.entries(formData).forEach(([key, val]) => {
      updateSummaryField(key as keyof ClinicalSummary, val);
    });
    setIsEditing(false);
  };

  const handleConfirmAndSend = () => {
    setIsSending(true);

    if (patient && clinicalSummary) {
      const isUrgent = redFlagAlert?.detected || clinicalSummary.overallPriority === "P1-Urgent";

      const queueItem: QueuePatient = {
        id: patient.id,
        opdToken: patient.opdToken,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        department: patient.department,
        status: isUrgent ? "Urgent" : "Ready",
        priority: isUrgent ? "P1-Urgent" : "P2-Priority",
        chiefComplaint: formData.chiefComplaint || clinicalSummary.chiefComplaint,
        intakeDurationMins: 4,
        lastUpdated: "Just now",
        hasRedFlags: isUrgent,
        abhaId: patient.abhaId,
        ayushEnabled: true
      };

      addPatientToQueue(queueItem, {
        ...clinicalSummary,
        ...formData
      } as ClinicalSummary);
    }

    setTimeout(() => {
      setIsSending(false);
      router.push("/patient/complete");
    }, 1000);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <AccessibilityBar />
        <KioskHeader currentStep={4} showBack={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center animate-spin mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Structuring Clinical Summary...
          </h2>
          <p className="text-sm text-slate-500 max-w-md">
            Synthesizing conversational history, risk factors, and OCR lab findings into physician standard format.
          </p>
        </div>
      </div>
    );
  }

  const summary = { ...clinicalSummary, ...formData };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader currentStep={4} showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col justify-between">
        <div>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Step 4 of 4 • Final Review
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {strings.summaryTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review your clinical history before it is transferred directly to your physician's OPD dashboard.
            </p>
          </div>

          {/* Mandatory Prominent Physician Verification Banner */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-center gap-3 text-amber-900">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <div className="text-left">
              <p className="font-black text-sm sm:text-base">
                {strings.summaryNotice}
              </p>
              <p className="text-xs text-amber-700">
                This clinical intake draft was compiled by MediKiosk AI based on your answers and uploaded records. Your doctor will review and verify every section during your consultation.
              </p>
            </div>
          </div>

          {/* Red Flag Warning Box if detected */}
          {redFlagAlert?.detected && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-6 flex items-center gap-3 text-red-900">
              <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
              <div className="text-left">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  URGENT TRIAGE FLAG
                </span>
                <p className="font-bold text-sm mt-1">{redFlagAlert.ruleTriggered}</p>
                <p className="text-xs text-red-700">{redFlagAlert.notes}</p>
              </div>
            </div>
          )}

          {/* Structured Note Document */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
            {/* Note Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-lg">
                  {patient?.name?.substring(0, 2).toUpperCase() || "PT"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {patient?.name} ({patient?.age} Yrs • {patient?.gender})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Token: <span className="font-bold text-teal-800">{patient?.opdToken}</span> • Dept: {patient?.department} • ABHA: {patient?.abhaId || "Not linked"}
                  </p>
                </div>
              </div>

              {/* Edit Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    handleSaveEdits();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="py-2 px-4 rounded-xl text-xs sm:text-sm font-bold border transition flex items-center gap-1.5 shadow-sm bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 text-emerald-600" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 text-teal-600" />
                    <span>Edit Draft</span>
                  </>
                )}
              </button>
            </div>

            {/* Summary Sections Grid */}
            <div className="space-y-5 text-left text-sm">
              {/* 1. Chief Complaint */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                  1. Chief Complaint
                </label>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={formData.chiefComplaint || ""}
                    onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                  />
                ) : (
                  <p className="font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {summary.chiefComplaint}
                  </p>
                )}
              </div>

              {/* 2. History of Present Illness (HPI) */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                  2. History of Present Illness (HPI)
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={formData.hpi || ""}
                    onChange={(e) => setFormData({ ...formData, hpi: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 text-slate-800"
                  />
                ) : (
                  <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {summary.hpi}
                  </p>
                )}
              </div>

              {/* 3. Past Medical & Surgical */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                    3. Past Medical History (PMH)
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.pastMedicalHistory || ""}
                      onChange={(e) => setFormData({ ...formData, pastMedicalHistory: e.target.value })}
                      className="w-full p-2 rounded-xl border border-teal-300 text-slate-800"
                    />
                  ) : (
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {summary.pastMedicalHistory}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                    4. Past Surgical History (PSH)
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.pastSurgicalHistory || ""}
                      onChange={(e) => setFormData({ ...formData, pastSurgicalHistory: e.target.value })}
                      className="w-full p-2 rounded-xl border border-teal-300 text-slate-800"
                    />
                  ) : (
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {summary.pastSurgicalHistory}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Medications & Allergies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                    5. Current Medications
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.drugHistory || ""}
                      onChange={(e) => setFormData({ ...formData, drugHistory: e.target.value })}
                      className="w-full p-2 rounded-xl border border-teal-300 text-slate-800"
                    />
                  ) : (
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {summary.drugHistory}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                    6. Drug & Food Allergies
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.allergyHistory || ""}
                      onChange={(e) => setFormData({ ...formData, allergyHistory: e.target.value })}
                      className="w-full p-2 rounded-xl border border-teal-300 text-slate-800"
                    />
                  ) : (
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-semibold text-rose-700">
                      {summary.allergyHistory}
                    </p>
                  )}
                </div>
              </div>

              {/* 5. Family & Personal History */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                    7. Family Medical History
                  </label>
                  <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {summary.familyHistory}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                    8. Lifestyle & Habits
                  </label>
                  <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {summary.personalHistory}
                  </p>
                </div>
              </div>

              {/* 6. Previous Investigations & Documents */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                  9. Previous Investigations (OCR Extracted)
                </label>
                <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-xs">
                  {summary.previousInvestigations}
                </p>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                  10. Attached Records Reviewed
                </label>
                <p className="text-slate-600 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {summary.documentsReviewed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto py-4 px-6 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm sm:text-base rounded-2xl border border-slate-200 flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Documents</span>
          </button>

          <button
            type="button"
            onClick={handleConfirmAndSend}
            disabled={isSending}
            className="w-full sm:w-auto py-4 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center gap-3 transition touch-target"
          >
            {isSending ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{isSending ? "Transmitting to OPD..." : strings.confirmSummaryBtn}</span>
          </button>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { DoctorNav } from "@/components/doctor/DoctorNav";
import { AyushHistoryPanel } from "@/components/doctor/AyushHistoryPanel";
import { LabTrendsChart } from "@/components/doctor/LabTrendsChart";
import { MedicalTimelineView } from "@/components/doctor/MedicalTimelineView";
import { 
  getPatientSummary, 
  getPatientAyush, 
  getPatientTimeline, 
  getPatientDocuments 
} from "@/services/mock-patients";
import { 
  ClinicalSummary, 
  AyushHistory, 
  TimelineEvent, 
  MedicalDocument, 
  QueuePatient 
} from "@/types/medical";
import { 
  ArrowLeft, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Save, 
  Edit3, 
  Share2, 
  Printer, 
  Leaf, 
  Pill, 
  Activity, 
  Calendar, 
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Eye,
  Check
} from "lucide-react";

export default function DoctorPatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = (params?.id as string) || "p1";

  const { 
    queue, 
    summaries, 
    updatePatientStatus, 
    updateDoctorNote 
  } = useKioskStore();

  // Find patient from queue or fallback
  const queuePatient = queue.find((p) => p.id === patientId) || queue[0];
  const initialSummary = summaries[patientId] || summaries["p1"];

  // Toggle for AYUSH Mode
  const [historyMode, setHistoryMode] = useState<"standard" | "ayush">("standard");

  // Active tab in patient view
  const [activeTab, setActiveTab] = useState<"summary" | "trends" | "timeline" | "documents">("summary");

  // Local state for clinical summary & doctor actions
  const [summaryData, setSummaryData] = useState<ClinicalSummary | null>(initialSummary);
  const [ayushData, setAyushData] = useState<AyushHistory | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);

  // Physician control states
  const [isEditing, setIsEditing] = useState(false);
  const [doctorNoteInput, setDoctorNoteInput] = useState(initialSummary?.doctorNotes || "");
  const [diagnosisInput, setDiagnosisInput] = useState(initialSummary?.provisionalDiagnosis || "");
  const [isVerified, setIsVerified] = useState(initialSummary?.status === "PHYSICIAN_VERIFIED");
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    async function loadData() {
      const ayush = await getPatientAyush(patientId);
      setAyushData(ayush);

      const timeline = await getPatientTimeline(patientId);
      setTimelineEvents(timeline);

      const docs = await getPatientDocuments(patientId);
      setDocuments(docs);
    }
    loadData();
  }, [patientId]);

  const handleSaveSummaryEdits = () => {
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSignAndConfirm = () => {
    updateDoctorNote(patientId, doctorNoteInput, diagnosisInput);
    updatePatientStatus(patientId, "Completed");
    setIsVerified(true);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 2500);
  };

  if (!queuePatient) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <p className="font-bold text-slate-700">Patient not found in OPD Queue.</p>
      </div>
    );
  }

  const isUrgent = queuePatient.status === "Urgent" || queuePatient.hasRedFlags;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 pb-16">
      <DoctorNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Back Link & Quick Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/doctor"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to OPD Queue</span>
          </Link>

          {/* Toast Notification */}
          {saveToast && (
            <div className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Encounter Saved & Transmitted to Hospital EMR</span>
            </div>
          )}
        </div>

        {/* Patient Demographics Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Demographics */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-black text-2xl shadow-md">
                {queuePatient.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black text-slate-900">
                    {queuePatient.name}
                  </h1>
                  <span className="bg-slate-100 text-slate-800 text-xs font-mono font-black px-2.5 py-0.5 rounded-md border border-slate-200">
                    {queuePatient.opdToken}
                  </span>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isUrgent
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-teal-100 text-teal-800"
                    }`}
                  >
                    {queuePatient.status} ({queuePatient.priority})
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600">
                  {queuePatient.age} Yrs • {queuePatient.gender} • Dept:{" "}
                  <span className="text-teal-800 font-bold">{queuePatient.department}</span> • ABHA:{" "}
                  <span className="font-mono">{queuePatient.abhaId || "91-2345-6789-0123"}</span>
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  <span className="font-bold text-slate-700">Intake Complaint: </span>
                  {queuePatient.chiefComplaint}
                </p>
              </div>
            </div>

            {/* Right: AYUSH Mode Switch & Verification Control */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* AYUSH MODE TOGGLE (Key Requirement) */}
              <div className="bg-amber-50 p-1 rounded-2xl border border-amber-300 flex items-center gap-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setHistoryMode("standard")}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    historyMode === "standard"
                      ? "bg-white text-teal-900 shadow-sm border border-amber-200"
                      : "text-amber-800 hover:text-amber-950"
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  <span>Standard Clinical</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHistoryMode("ayush")}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    historyMode === "ayush"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "text-amber-800 hover:text-amber-950 font-black"
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  <span>AYUSH Mode</span>
                </button>
              </div>

              {/* Physician Verification Sign-Off Status */}
              <button
                type="button"
                onClick={handleSignAndConfirm}
                className={`py-2.5 px-5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md ${
                  isVerified
                    ? "bg-emerald-600 text-white"
                    : "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20"
                }`}
              >
                <CheckCircle className="w-4 h-4 stroke-[3]" />
                <span>{isVerified ? "Physician Verified ✓" : "Sign & Complete Encounter"}</span>
              </button>
            </div>
          </div>

          {/* Red Flag Warning Box */}
          {isUrgent && (
            <div className="mt-5 pt-4 border-t border-red-100 flex items-center gap-3 text-red-800 bg-red-50 p-3 rounded-2xl border border-red-200">
              <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
              <div className="text-xs">
                <span className="font-black text-red-900 uppercase">Emergency Triage Protocol: </span>
                Patient reported acute crushing retrosternal pain radiating to left arm with cold diaphoresis. Prioritize immediate 12-lead ECG, troponin testing, and cardiac monitor.
              </div>
            </div>
          )}
        </div>

        {/* View Selection Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            {[
              { id: "summary", label: "Clinical Summary & Rx", icon: FileText },
              { id: "trends", label: "Lab & Biomarker Trends", icon: Activity },
              { id: "timeline", label: "Medical Timeline", icon: Calendar },
              { id: "documents", label: `Digitized Records (${documents.length})`, icon: Eye },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                    isActive
                      ? "bg-white text-teal-800 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-600" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 text-slate-600 hover:text-slate-900 bg-white rounded-xl border border-slate-200 shadow-xs text-xs font-semibold flex items-center gap-1.5"
              title="Print OPD Consultation Summary"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Record</span>
            </button>
          </div>
        </div>

        {/* MAIN TAB 1: Structured Clinical Summary (or AYUSH Mode) */}
        {activeTab === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Clinical Summary Draft (or AYUSH Panel) */}
            <div className="lg:col-span-2 space-y-6">
              {historyMode === "ayush" && ayushData ? (
                /* AYUSH 10-Fold Assessment */
                <AyushHistoryPanel
                  initialData={ayushData}
                  onSave={(updated) => setAyushData(updated)}
                />
              ) : (
                /* Standard Allopathic Structured Summary */
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        AI-Synthesized Structured Clinical Note
                      </h3>
                      <p className="text-xs text-amber-700 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Physician control state: AI draft requires doctor verification & sign-off
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isEditing) {
                          handleSaveSummaryEdits();
                        } else {
                          setIsEditing(true);
                        }
                      }}
                      className="py-2 px-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-300 text-xs flex items-center gap-1.5 transition"
                    >
                      {isEditing ? <Save className="w-3.5 h-3.5 text-emerald-600" /> : <Edit3 className="w-3.5 h-3.5 text-teal-600" />}
                      <span>{isEditing ? "Save Note Changes" : "Edit Sections"}</span>
                    </button>
                  </div>

                  {/* Note Content Fields */}
                  <div className="space-y-4 text-left text-xs sm:text-sm">
                    {/* Chief Complaint & HPI */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                        Chief Complaint & History of Present Illness (HPI)
                      </p>
                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={summaryData?.hpi || ""}
                          onChange={(e) =>
                            setSummaryData({ ...summaryData!, hpi: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-teal-300 bg-white font-medium"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium leading-relaxed">
                          {summaryData?.hpi}
                        </p>
                      )}
                    </div>

                    {/* PMH & PSH */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                          Past Medical History (PMH)
                        </p>
                        <p className="text-slate-800 font-medium">
                          {summaryData?.pastMedicalHistory}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                          Past Surgical History (PSH)
                        </p>
                        <p className="text-slate-800 font-medium">
                          {summaryData?.pastSurgicalHistory}
                        </p>
                      </div>
                    </div>

                    {/* Drugs & Allergies */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Pill className="w-3.5 h-3.5 text-teal-600" />
                          <span>Current Medication Regimen</span>
                        </p>
                        <p className="text-slate-800 font-medium">
                          {summaryData?.drugHistory}
                        </p>
                      </div>

                      <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200">
                        <p className="text-xs font-black text-rose-800 uppercase tracking-wider mb-1">
                          Allergies & Contraindications
                        </p>
                        <p className="text-rose-900 font-bold">
                          {summaryData?.allergyHistory}
                        </p>
                      </div>
                    </div>

                    {/* Family & Personal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                          Family Medical History
                        </p>
                        <p className="text-slate-800 font-medium">
                          {summaryData?.familyHistory}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                          Personal & Lifestyle Habits
                        </p>
                        <p className="text-slate-800 font-medium">
                          {summaryData?.personalHistory}
                        </p>
                      </div>
                    </div>

                    {/* Review of Systems */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
                        Review of Systems (ROS)
                      </p>
                      <p className="text-slate-800 font-medium">
                        {summaryData?.reviewOfSystems}
                      </p>
                    </div>

                    {/* Previous Investigations */}
                    <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200">
                      <p className="text-xs font-black text-sky-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-sky-600" />
                        <span>OCR Extracted Investigation Findings</span>
                      </p>
                      <p className="text-sky-950 font-mono text-xs">
                        {summaryData?.previousInvestigations}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 Col: Physician Action Pad & Diagnosis */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm pb-3 border-b border-slate-100">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                  <span>Physician Impression & Rx Order</span>
                </div>

                {/* Provisional Diagnosis */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                    Provisional Clinical Diagnosis *
                  </label>
                  <textarea
                    rows={2}
                    value={diagnosisInput}
                    onChange={(e) => setDiagnosisInput(e.target.value)}
                    placeholder="Enter provisional diagnosis..."
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 focus:border-teal-500 outline-none"
                  />
                </div>

                {/* Physician Notes */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                    Consultation Clinical Notes & Orders
                  </label>
                  <textarea
                    rows={5}
                    value={doctorNoteInput}
                    onChange={(e) => setDoctorNoteInput(e.target.value)}
                    placeholder="Document clinical exam findings, immediate medications, referral..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-teal-500 outline-none font-medium text-slate-800"
                  />
                </div>

                {/* Fast Order Presets for high volume OPD */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Quick Clinical Actions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setDoctorNoteInput(
                          (prev) => prev + "\n- Stat 12-lead ECG repeat and Troponin-I sent."
                        )
                      }
                      className="text-[11px] bg-slate-100 hover:bg-teal-50 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      + Order Stat ECG & Trop
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDoctorNoteInput(
                          (prev) => prev + "\n- Sublingual Sorbitrate 5mg administered in room."
                        )
                      }
                      className="text-[11px] bg-slate-100 hover:bg-teal-50 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      + Sublingual Sorbitrate
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDoctorNoteInput(
                          (prev) => prev + "\n- Referred to CCU bed for 24hr hemodynamic monitoring."
                        )
                      }
                      className="text-[11px] bg-slate-100 hover:bg-teal-50 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      + Refer CCU
                    </button>
                  </div>
                </div>

                {/* Sign and Confirm Button */}
                <button
                  type="button"
                  onClick={handleSignAndConfirm}
                  className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 stroke-[3]" />
                  <span>Confirm Encounter & Close Token</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN TAB 2: Lab & Biomarker Trends (Recharts) */}
        {activeTab === "trends" && (
          <LabTrendsChart patientId={patientId} />
        )}

        {/* MAIN TAB 3: Chronological Timeline */}
        {activeTab === "timeline" && (
          <MedicalTimelineView events={timelineEvents} />
        )}

        {/* MAIN TAB 4: Digitized Documents & OCR Inspector */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Digitized Clinical Documents & Extracted Parameters
                </h3>
                <p className="text-xs text-slate-500">
                  Inspected via Optical Character Recognition & Medical Vision AI
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-teal-100 text-teal-900 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {doc.type.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-slate-500">{doc.uploadDate}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1">{doc.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{doc.size} • Confidence Score: 96%</p>

                  {/* OCR Raw Text Box */}
                  <div className="bg-slate-900 text-teal-300 font-mono text-[11px] p-3 rounded-xl mb-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {doc.rawTextPreview || "Raw scanned text extracted successfully."}
                  </div>

                  {/* Extracted findings pills */}
                  <div className="space-y-1.5 text-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Extracted Medical Tokens:
                    </p>
                    {doc.extractedFindings.map((f) => (
                      <div key={f.id} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-700 font-medium">{f.label}</span>
                        <span className={`font-bold ${f.isAbnormal ? "text-red-600 bg-red-50 px-1.5 py-0.5 rounded" : "text-slate-900"}`}>
                          {f.value} {f.unit || ""} {f.isAbnormal && "⚠️ ABNORMAL"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { UI_STRINGS } from "@/data/translations";
import { processDocument, extractMedicalData } from "@/services/mock-ocr";
import { MedicalDocument, DocumentType } from "@/types/medical";
import { 
  UploadCloud, 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Search, 
  PlusCircle,
  Pill,
  Activity,
  HeartPulse
} from "lucide-react";

export default function DocumentUploadPage() {
  const router = useRouter();
  const { 
    language, 
    documents, 
    addDocument, 
    removeDocument, 
    loadSampleDocuments 
  } = useKioskStore();

  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrStage, setOcrStage] = useState("");
  const [ocrPercent, setOcrPercent] = useState(0);
  const [activeDocType, setActiveDocType] = useState<DocumentType>("prescription");

  const { medications, abnormalLabs, normalLabs, diagnoses } = extractMedicalData(documents);

  const handleSimulateUpload = async (docName: string, sizeBytes: number) => {
    setIsProcessing(true);
    setOcrPercent(10);
    setOcrStage("Uploading document to secure intake enclave...");

    try {
      const processedDoc = await processDocument(
        { name: docName, size: sizeBytes, type: "application/pdf" },
        (stage, percent) => {
          setOcrStage(stage);
          setOcrPercent(percent);
        }
      );
      addDocument(processedDoc);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      setOcrPercent(0);
    }
  };

  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSimulateUpload(file.name, file.size);
    }
  };

  const handleProceedToSummary = () => {
    router.push("/patient/summary");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader currentStep={3} showBack={true} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col justify-between">
        <div>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Step 3 of 4 • Medical Records & OCR
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {strings.uploadDocs}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Upload past prescriptions, lab tests, ECGs, or discharge summaries. MediKiosk OCR extracts past medications and abnormal lab values.
            </p>
          </div>

          {/* Quick Evaluator Action: Load Sample Hospital Records */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-teal-950">
                  Load Pre-digitized Hospital Records
                </p>
                <p className="text-xs text-teal-700">
                  Includes Apollo Cardiology Rx, Metropolis Lipid/Cardiac Biomarkers, and 12-Lead ECG Report
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadSampleDocuments}
              className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition shrink-0"
            >
              Populate Demo Records
            </button>
          </div>

          {/* Upload Zone & Document Type Pills */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Document Category:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "prescription", label: "Prescription (Rx)" },
                  { id: "lab_report", label: "Lab Report (Blood / Urine)" },
                  { id: "discharge_summary", label: "Discharge Summary" },
                  { id: "imaging_report", label: "ECG / Imaging" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveDocType(cat.id as DocumentType)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      activeDocType === cat.id
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag and drop / file input box */}
            <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition group relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleNativeFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
              <div className="w-16 h-16 rounded-full bg-white text-teal-600 border border-slate-200 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-900 text-base mb-1">
                Touch to Upload or Drag & Drop Document
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Supports PDF, JPG, PNG from phone, camera or USB drive (Max 25 MB)
              </p>
              <span className="inline-block px-3 py-1 bg-white text-slate-700 font-bold text-xs rounded-lg border border-slate-200 shadow-xs">
                Browse Files
              </span>
            </label>

            {/* Quick Demo Upload Triggers */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSimulateUpload("Apollo_Cardiology_Rx.pdf", 1400000)}
                disabled={isProcessing}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
              >
                + Simulate Rx Upload (Ecosprin / Telmisartan)
              </button>
              <button
                type="button"
                onClick={() => handleSimulateUpload("Metropolis_Cardiac_Biomarkers.pdf", 2800000)}
                disabled={isProcessing}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
              >
                + Simulate Lab Report (Hb, Glucose, Troponin)
              </button>
            </div>
          </div>

          {/* Animated 5-Stage OCR Pipeline Indicator */}
          {isProcessing && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 mb-8 shadow-xl border border-slate-800 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-teal-300 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                  <span>Medical Vision OCR Pipeline Active</span>
                </div>
                <span className="text-xs font-mono font-bold text-teal-400">{ocrPercent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${ocrPercent}%` }}
                />
              </div>

              <p className="text-xs font-mono text-slate-300">{ocrStage}</p>

              <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                <div className={ocrPercent >= 20 ? "text-teal-400 font-bold" : ""}>1. Uploading</div>
                <div className={ocrPercent >= 45 ? "text-teal-400 font-bold" : ""}>2. Vision AI</div>
                <div className={ocrPercent >= 68 ? "text-teal-400 font-bold" : ""}>3. Optical Text</div>
                <div className={ocrPercent >= 85 ? "text-teal-400 font-bold" : ""}>4. Extract Meds</div>
                <div className={ocrPercent >= 100 ? "text-teal-400 font-bold" : ""}>5. Flag Labs</div>
              </div>
            </div>
          )}

          {/* Digitized Documents List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">
                Uploaded Records ({documents.length})
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                Digitized & Indexed for Physician Review
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                        {doc.type === "prescription" ? (
                          <Pill className="w-5 h-5" />
                        ) : doc.type === "lab_report" ? (
                          <Activity className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {doc.type.replace(/_/g, " ").toUpperCase()} • {doc.size} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeDocument(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Extracted Findings Pills */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                    <p className="font-bold text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                      OCR Extracted Data:
                    </p>
                    {doc.extractedFindings.slice(0, 3).map((f) => (
                      <div key={f.id} className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium truncate max-w-[180px]">
                          {f.label}:
                        </span>
                        <span className={`font-bold ${f.isAbnormal ? "text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200" : "text-slate-900"}`}>
                          {f.value} {f.unit || ""} {f.isAbnormal && (f.flagType === "critical" ? "⚠️ CRITICAL" : "⚠️ OUT OF RANGE")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abnormal Labs Callout Box (as required by prompt) */}
          {abnormalLabs.length > 0 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-8">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Highlighted Abnormal Lab Findings (OCR Verified)</span>
              </div>
              <p className="text-xs text-amber-800 mb-4">
                The following biomarkers are out of standard clinical reference ranges and will be highlighted in the physician's summary:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {abnormalLabs.map((lab) => (
                  <div key={lab.id} className="bg-white rounded-xl p-3 border border-amber-200 shadow-xs">
                    <p className="text-xs font-bold text-slate-700">{lab.label}</p>
                    <p className="text-base font-black text-red-600 my-0.5">
                      {lab.value} <span className="text-xs text-slate-500">{lab.unit}</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Ref: {lab.referenceRange}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA to Summary */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="py-4 px-6 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm sm:text-base rounded-2xl border border-slate-200 flex items-center gap-2 transition"
          >
            <span>Back to Interview</span>
          </button>

          <button
            type="button"
            onClick={handleProceedToSummary}
            className="py-4 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-teal-600/30 flex items-center gap-2 transition"
          >
            <span>Generate Clinical Summary</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </main>
    </div>
  );
}

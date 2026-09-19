import { create } from "zustand";
import { 
  SupportedLanguage, 
  Patient, 
  ConsentRecord, 
  MedicalDocument, 
  ClinicalSummary, 
  RedFlagAlert, 
  QueuePatient 
} from "@/types/medical";
import { SAMPLE_DOCUMENTS } from "@/data/demo-documents";
import { INITIAL_QUEUE, INITIAL_SUMMARIES } from "@/services/mock-patients";

interface KioskState {
  // Localization
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;

  // Consent
  consent: ConsentRecord | null;
  setConsent: (consent: ConsentRecord) => void;

  // Patient Info
  patient: Patient | null;
  setPatient: (patient: Patient) => void;

  // Interview Answers
  answers: Record<string, any>;
  voiceTranscripts: Record<string, string>;
  setAnswer: (questionId: string, value: any, rawVoice?: string) => void;
  resetInterview: () => void;

  // Red Flag Alert
  redFlagAlert: RedFlagAlert | null;
  setRedFlagAlert: (alert: RedFlagAlert | null) => void;

  // Medical Documents
  documents: MedicalDocument[];
  addDocument: (doc: MedicalDocument) => void;
  removeDocument: (id: string) => void;
  loadSampleDocuments: () => void;

  // Clinical Summary
  clinicalSummary: ClinicalSummary | null;
  setClinicalSummary: (summary: ClinicalSummary) => void;
  updateSummaryField: (field: keyof ClinicalSummary, value: any) => void;

  // Doctor OPD Queue
  queue: QueuePatient[];
  summaries: Record<string, ClinicalSummary>;
  addPatientToQueue: (newPatient: QueuePatient, newSummary: ClinicalSummary) => void;
  updatePatientStatus: (patientId: string, status: QueuePatient["status"]) => void;
  updateDoctorNote: (patientId: string, note: string, diagnosis?: string) => void;

  // Accessibility & Hospital Assistance
  fontSize: "normal" | "large" | "xl";
  setFontSize: (size: "normal" | "large" | "xl") => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  nurseCalled: boolean;
  callNurse: () => void;
  dismissNurse: () => void;
}

export const useKioskStore = create<KioskState>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),

  consent: null,
  setConsent: (consent) => set({ consent }),

  patient: {
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
  },
  setPatient: (patient) => set({ patient }),

  answers: {},
  voiceTranscripts: {},
  setAnswer: (questionId, value, rawVoice) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
      voiceTranscripts: rawVoice 
        ? { ...state.voiceTranscripts, [questionId]: rawVoice } 
        : state.voiceTranscripts
    })),
  resetInterview: () => set({ answers: {}, voiceTranscripts: {}, redFlagAlert: null }),

  redFlagAlert: null,
  setRedFlagAlert: (redFlagAlert) => set({ redFlagAlert }),

  documents: [SAMPLE_DOCUMENTS[0], SAMPLE_DOCUMENTS[1]],
  addDocument: (doc) =>
    set((state) => ({ documents: [doc, ...state.documents] })),
  removeDocument: (id) =>
    set((state) => ({ documents: state.documents.filter((d) => d.id !== id) })),
  loadSampleDocuments: () => set({ documents: [...SAMPLE_DOCUMENTS] }),

  clinicalSummary: null,
  setClinicalSummary: (clinicalSummary) => set({ clinicalSummary }),
  updateSummaryField: (field, value) =>
    set((state) => ({
      clinicalSummary: state.clinicalSummary
        ? { ...state.clinicalSummary, [field]: value }
        : null
    })),

  queue: INITIAL_QUEUE,
  summaries: INITIAL_SUMMARIES,
  addPatientToQueue: (newPatient, newSummary) =>
    set((state) => ({
      queue: [newPatient, ...state.queue.filter((p) => p.id !== newPatient.id)],
      summaries: { ...state.summaries, [newPatient.id]: newSummary }
    })),
  updatePatientStatus: (patientId, status) =>
    set((state) => ({
      queue: state.queue.map((p) => (p.id === patientId ? { ...p, status } : p))
    })),
  updateDoctorNote: (patientId, note, diagnosis) =>
    set((state) => {
      const existing = state.summaries[patientId];
      if (!existing) return state;
      return {
        summaries: {
          ...state.summaries,
          [patientId]: {
            ...existing,
            doctorNotes: note,
            provisionalDiagnosis: diagnosis || existing.provisionalDiagnosis,
            status: "PHYSICIAN_VERIFIED"
          }
        }
      };
    }),

  fontSize: "normal",
  setFontSize: (fontSize) => set({ fontSize }),
  highContrast: false,
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  nurseCalled: false,
  callNurse: () => set({ nurseCalled: true }),
  dismissNurse: () => set({ nurseCalled: false })
}));

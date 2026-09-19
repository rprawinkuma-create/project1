import { MedicalDocument, TimelineEvent } from "@/types/medical";

export const SAMPLE_DOCUMENTS: MedicalDocument[] = [
  {
    id: "doc-rx-001",
    name: "Apollo_Cardiology_Rx_Aug2026.pdf",
    type: "prescription",
    size: "1.4 MB",
    uploadDate: "15 Aug 2026",
    status: "ready",
    progress: 100,
    extractedFindings: [
      {
        id: "f-1",
        category: "medication",
        label: "Tab. Ecosprin (Aspirin)",
        value: "75 mg",
        unit: "Once daily (post lunch)",
        confidence: 0.98,
        date: "15 Aug 2026",
        sourceDocId: "doc-rx-001"
      },
      {
        id: "f-2",
        category: "medication",
        label: "Tab. Telmisartan",
        value: "40 mg",
        unit: "Once daily (morning)",
        confidence: 0.96,
        date: "15 Aug 2026",
        sourceDocId: "doc-rx-001"
      },
      {
        id: "f-3",
        category: "medication",
        label: "Tab. Atorvastatin",
        value: "20 mg",
        unit: "At bedtime",
        confidence: 0.95,
        date: "15 Aug 2026",
        sourceDocId: "doc-rx-001"
      },
      {
        id: "f-4",
        category: "diagnosis",
        label: "Clinical Diagnosis",
        value: "Hypertension with Angina on Exertion",
        confidence: 0.92,
        date: "15 Aug 2026",
        sourceDocId: "doc-rx-001"
      }
    ],
    rawTextPreview: "APOLLO HOSPITALS CHENNAI\nDr. R. Venkatraman, MD, DM (Cardio)\nPatient: Ravi Kumar (52/M)\nRx:\n1. Tab. Ecosprin 75mg OD (After food)\n2. Tab. Telmisartan 40mg OD\n3. Tab. Atorvastatin 20mg HS\nAdvised: TMT & Echo next review."
  },
  {
    id: "doc-lab-002",
    name: "Metropolis_Lab_Report_Aug2026.pdf",
    type: "lab_report",
    size: "2.8 MB",
    uploadDate: "15 Aug 2026",
    status: "ready",
    progress: 100,
    extractedFindings: [
      {
        id: "f-5",
        category: "lab_value",
        label: "Hemoglobin (Hb)",
        value: "10.8",
        unit: "g/dL",
        referenceRange: "13.0 - 17.0 g/dL",
        isAbnormal: true,
        flagType: "low",
        confidence: 0.99,
        date: "15 Aug 2026",
        sourceDocId: "doc-lab-002"
      },
      {
        id: "f-6",
        category: "lab_value",
        label: "Fasting Blood Glucose",
        value: "142",
        unit: "mg/dL",
        referenceRange: "70 - 100 mg/dL",
        isAbnormal: true,
        flagType: "high",
        confidence: 0.98,
        date: "15 Aug 2026",
        sourceDocId: "doc-lab-002"
      },
      {
        id: "f-7",
        category: "lab_value",
        label: "Glycated Hemoglobin (HbA1c)",
        value: "7.9",
        unit: "%",
        referenceRange: "< 5.7 % (Normal), < 7.0 % (Target)",
        isAbnormal: true,
        flagType: "high",
        confidence: 0.99,
        date: "15 Aug 2026",
        sourceDocId: "doc-lab-002"
      },
      {
        id: "f-8",
        category: "lab_value",
        label: "Serum Creatinine",
        value: "1.1",
        unit: "mg/dL",
        referenceRange: "0.7 - 1.3 mg/dL",
        isAbnormal: false,
        confidence: 0.97,
        date: "15 Aug 2026",
        sourceDocId: "doc-lab-002"
      },
      {
        id: "f-9",
        category: "lab_value",
        label: "Troponin-I (High Sensitivity)",
        value: "0.18",
        unit: "ng/mL",
        referenceRange: "< 0.04 ng/mL",
        isAbnormal: true,
        flagType: "critical",
        confidence: 0.95,
        date: "15 Aug 2026",
        sourceDocId: "doc-lab-002"
      }
    ],
    rawTextPreview: "METROPOLIS HEALTHCARE LTD\nBiochemistry & Immunoassay Report\nHb: 10.8 g/dL (LOW)\nFasting Glucose: 142 mg/dL (HIGH)\nHbA1c: 7.9 % (UNCONTROLLED)\nSerum Creatinine: 1.1 mg/dL (Normal)\nHigh Sensitivity Troponin-I: 0.18 ng/mL (ELEVATED)"
  },
  {
    id: "doc-ecg-003",
    name: "12_Lead_ECG_Report_Aug2026.jpg",
    type: "imaging_report",
    size: "3.2 MB",
    uploadDate: "15 Aug 2026",
    status: "ready",
    progress: 100,
    extractedFindings: [
      {
        id: "f-10",
        category: "observation",
        label: "Rhythm",
        value: "Sinus Tachycardia (HR: 104 bpm)",
        confidence: 0.94,
        date: "15 Aug 2026",
        sourceDocId: "doc-ecg-003"
      },
      {
        id: "f-11",
        category: "observation",
        label: "ST-T Segment",
        value: "T-wave inversions in V4 - V6 anterolateral leads",
        isAbnormal: true,
        flagType: "critical",
        confidence: 0.91,
        date: "15 Aug 2026",
        sourceDocId: "doc-ecg-003"
      }
    ],
    rawTextPreview: "CARDIAC CARE CENTER\n12-Lead Electrocardiogram\nVentricular Rate: 104 BPM\nPR Interval: 156 ms\nQRS Duration: 88 ms\nInterpretation: Sinus Tachycardia with ST-T changes V4-V6."
  }
];

export const SAMPLE_TIMELINE: TimelineEvent[] = [
  {
    id: "tl-1",
    date: "15 Aug 2026",
    title: "Cardiology OPD Follow-up & Investigations",
    facility: "Apollo Specialty Hospital, Chennai",
    category: "opd",
    diagnosis: "Unstable Angina under evaluation, Type 2 DM, HTN",
    medications: ["Ecosprin 75mg", "Telmisartan 40mg", "Atorvastatin 20mg"],
    investigations: ["Hb: 10.8 g/dL", "Fasting Glucose: 142 mg/dL", "Troponin-I: 0.18 ng/mL (Elevated)"],
    importantFindings: "T-wave inversion in anterior leads on 12-lead ECG. Advised urgent clinical correlation."
  },
  {
    id: "tl-2",
    date: "12 Jan 2026",
    title: "Routine Diabetology Consultation",
    facility: "Dr. Mohan's Diabetes Center",
    category: "opd",
    diagnosis: "Type 2 Diabetes Mellitus (Uncontrolled)",
    medications: ["Metformin 500mg BD", "Glimepiride 1mg OD"],
    investigations: ["HbA1c: 8.4%", "Fasting Blood Sugar: 168 mg/dL"],
    importantFindings: "Recommended dietary counseling, lifestyle modification, and medication titration."
  },
  {
    id: "tl-3",
    date: "18 Nov 2024",
    title: "Elective Laparoscopic Cholecystectomy",
    facility: "Manipal Hospital, Bangalore",
    category: "admission",
    diagnosis: "Symptomatic Cholelithiasis (Gallstones)",
    medications: ["Post-op analgesics and antibiotics for 5 days"],
    investigations: ["Ultrasound Abdomen: Multiple gallstones, no CBD dilation"],
    importantFindings: "Surgery completed with no intra-op complications. Discharged in stable condition."
  }
];

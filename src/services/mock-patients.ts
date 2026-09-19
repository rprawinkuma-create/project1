import { 
  Patient, 
  QueuePatient, 
  ClinicalSummary, 
  AyushHistory, 
  TimelineEvent, 
  MedicalDocument 
} from "@/types/medical";
import { SAMPLE_DOCUMENTS, SAMPLE_TIMELINE } from "@/data/demo-documents";

export const INITIAL_QUEUE: QueuePatient[] = [
  {
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
    lastUpdated: "5 mins ago",
    hasRedFlags: true,
    abhaId: "91-2345-6789-0123",
    ayushEnabled: true
  },
  {
    id: "p2",
    opdToken: "OPD-GEN-019",
    name: "Meena Devi",
    age: 46,
    gender: "Female",
    department: "General Medicine OPD",
    status: "Ready",
    priority: "P2-Priority",
    chiefComplaint: "High grade fever with chills and joint ache x 3 days",
    intakeDurationMins: 3,
    lastUpdated: "12 mins ago",
    hasRedFlags: false,
    abhaId: "91-8842-1109-7734",
    ayushEnabled: false
  },
  {
    id: "p3",
    opdToken: "OPD-PUL-008",
    name: "Arun Kumar",
    age: 64,
    gender: "Male",
    department: "Pulmonology OPD",
    status: "Waiting",
    priority: "P2-Priority",
    chiefComplaint: "Worsening shortness of breath on exertion and night cough",
    intakeDurationMins: 6,
    lastUpdated: "25 mins ago",
    hasRedFlags: false,
    abhaId: "91-4433-2211-9988",
    ayushEnabled: true
  },
  {
    id: "p4",
    opdToken: "OPD-GEN-031",
    name: "Priya Sharma",
    age: 31,
    gender: "Female",
    department: "General Medicine OPD",
    status: "Completed",
    priority: "P3-Normal",
    chiefComplaint: "Persistent dry cough following viral throat infection",
    intakeDurationMins: 3,
    lastUpdated: "45 mins ago",
    hasRedFlags: false,
    abhaId: "91-7766-5544-3322",
    ayushEnabled: false
  }
];

export const INITIAL_SUMMARIES: Record<string, ClinicalSummary> = {
  p1: {
    id: "sum-p1",
    patientId: "p1",
    generatedAt: "19 Sep 2026, 06:20 PM",
    status: "DRAFT_PENDING_PHYSICIAN",
    overallPriority: "P1-Urgent",
    chiefComplaint: "Severe Crushing Retrosternal Chest Pain (Duration: ~45 mins)",
    hpi: "52-year-old male with known hypertension and diabetes presents with sudden-onset heavy retrosternal crushing pressure radiating down the left arm and jaw. Started 45 minutes prior while walking. Associated with cold profuse sweating and nausea. No relief with rest.",
    pastMedicalHistory: "Hypertension (diagnosed 2018), Type 2 Diabetes Mellitus (HbA1c 7.9%), Dyslipidemia.",
    pastSurgicalHistory: "Laparoscopic Cholecystectomy (Nov 2024, Manipal Hospital).",
    drugHistory: "Tab. Telmisartan 40mg OD, Tab. Ecosprin 75mg OD, Tab. Atorvastatin 20mg HS. Reports fair compliance.",
    allergyHistory: "No Known Drug Allergies (NKDA). Tolerates paracetamol and amoxicillin.",
    familyHistory: "Father suffered premature myocardial infarction at age 51. Strong family history of CAD.",
    personalHistory: "Former smoker (15 pack-years, quit 2 years ago). Non-alcoholic. Mixed Indian non-vegetarian diet.",
    reviewOfSystems: "Reports palpitations and dizziness. Denies fever, hemoptysis, calf swelling, or neurological weakness.",
    previousInvestigations: "15 Aug 2026 Metropolis: Fasting Blood Sugar 142 mg/dL (High), Hb 10.8 g/dL (Mild Anemia), Troponin-I: 0.18 ng/mL (Elevated). ECG shows T-wave inversions in V4-V6.",
    documentsReviewed: "3 Documents Digitized: Apollo Cardiology Rx (15 Aug 2026), Metropolis Lab Panel (15 Aug 2026), 12-Lead ECG (15 Aug 2026).",
    redFlagsNote: "CRITICAL RED FLAG DETECTED: Acute retrosternal crushing pain with radiation to left arm and cold sweats. High suspicion of Acute Coronary Syndrome (NSTEMI / Angina).",
    provisionalDiagnosis: "Acute Coronary Syndrome (NSTEMI vs High-Risk Unstable Angina). Rule out Acute STEMI.",
    doctorNotes: "Stat 12-lead ECG repeated in room. Sublingual Sorbitrate 5mg administered. Troponin repeat ordered. Shifted to Cardiac Care Unit (CCU) bed 3."
  },
  p2: {
    id: "sum-p2",
    patientId: "p2",
    generatedAt: "19 Sep 2026, 06:10 PM",
    status: "DRAFT_PENDING_PHYSICIAN",
    overallPriority: "P2-Priority",
    chiefComplaint: "High-grade fever with rigors and body aches x 3 days",
    hpi: "46-year-old female presents with acute fever reaching 102°F accompanied by chills and retro-orbital headache. No rash or burning micturition.",
    pastMedicalHistory: "Hypothyroidism on Levothyroxine 50 mcg OD.",
    pastSurgicalHistory: "No previous surgical history.",
    drugHistory: "Levothyroxine 50mcg empty stomach morning.",
    allergyHistory: "Penicillin allergy (hives and facial itching).",
    familyHistory: "Mother has hypertension. No premature heart disease.",
    personalHistory: "Non-smoker, vegetarian diet, moderate physical activity.",
    reviewOfSystems: "Severe generalized myalgia, anorexia. Denies vomiting or loose stools.",
    previousInvestigations: "Previous CBC 6 months ago normal.",
    documentsReviewed: "1 Previous Prescription digitized.",
    provisionalDiagnosis: "Acute febrile illness — Dengue vs Viral Pyrexia. Ordered Dengue NS1 & CBC."
  }
};

export const INITIAL_AYUSH_RECORDS: Record<string, AyushHistory> = {
  p1: {
    prakriti: {
      dosha: "Pitta-Kapha",
      assessment: "Pitta dominant with secondary Kapha. Warm skin, sharp appetite, strong muscular build with tendency to central adiposity."
    },
    vikriti: {
      doshicImbalance: ["Vata Dushti (Vyana Vata)", "Pitta Dushti (Pachaka & Sadhaka Pitta)", "Rasa-Rakta Dhatu Kshobha"],
      manifestation: "Hrid-roga (chest discomfort) triggered by Vata-Pitta obstruction in Hridaya Srotas."
    },
    sara: {
      predominance: "Pravara (Superior)",
      tissueDominance: "Mamsa",
      notes: "Mamsa and Asthi sara are pravara; Meda sara is madhyama to avara."
    },
    samhanana: {
      compactness: "Su-samhata (Robust/Compact)"
    },
    pramana: {
      anthropometry: "Pramana-yukta (Proportionate)"
    },
    satmya: {
      adaptability: "Sarva-rasa Satmya",
      notes: "Habituated to spicy and fried South Indian diet (Katu, Lavana rasa excessive)."
    },
    sattva: {
      mentalStrength: "Madhyama (Average)"
    },
    aharaShakti: {
      abhyavaharana: "Pravara",
      jaranaShakti: "Teekshna (Sharp)"
    },
    vyayamaShakti: {
      physicalStamina: "Madhyama (Moderate)"
    },
    vaya: {
      ageCategory: "Madhyama (Adulthood)"
    },
    aharaVihara: {
      dietPattern: "Katu-Tikta dominance",
      sleepPattern: "Nidranasha (Insomnia)",
      bowelHabit: "Krura (Constipated)",
      lifestyleNotes: "High occupational stress, erratic bedtime (1:00 AM), sedentary lifestyle during work hours."
    },
    physicianAyushNotes: "Ayurvedic formulation adjunct suggested post-cardiology stabilization: Arjuna Ksheerapaka 50ml BD, Prabhakar Vati 1 tab BD, Hridyarnava Rasa under supervision."
  }
};

export async function getPatientQueue(): Promise<QueuePatient[]> {
  // In a real app, this calls the Hospital HIS / ABDM queue API
  await new Promise((resolve) => setTimeout(resolve, 100));
  return INITIAL_QUEUE;
}

export async function getPatientSummary(id: string): Promise<ClinicalSummary | null> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return INITIAL_SUMMARIES[id] || null;
}

export async function getPatientAyush(id: string): Promise<AyushHistory | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return INITIAL_AYUSH_RECORDS[id] || INITIAL_AYUSH_RECORDS["p1"];
}

export async function getPatientTimeline(id: string): Promise<TimelineEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return SAMPLE_TIMELINE;
}

export async function getPatientDocuments(id: string): Promise<MedicalDocument[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return SAMPLE_DOCUMENTS;
}

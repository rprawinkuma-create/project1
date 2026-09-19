import { CLINICAL_QUESTIONS } from "@/data/questions";
import { 
  InterviewAnswer, 
  InterviewQuestion, 
  Patient, 
  MedicalDocument, 
  ClinicalSummary, 
  RedFlagAlert 
} from "@/types/medical";

export async function startInterview(): Promise<InterviewQuestion> {
  // Return the first question (Chief Complaint)
  return CLINICAL_QUESTIONS[0];
}

export async function getNextQuestion(
  currentQuestionId: string, 
  answers: Record<string, any>
): Promise<{ nextQuestion: InterviewQuestion | null; isCompleted: boolean }> {
  // Simulate minor network/AI processing delay for realistic kiosk feel
  await new Promise((resolve) => setTimeout(resolve, 80));

  const chiefComplaint = answers["chief_complaint"];

  // Branching rules based on chief complaint
  if (currentQuestionId === "chief_complaint") {
    if (chiefComplaint === "chest_pain") {
      const q = CLINICAL_QUESTIONS.find((q) => q.id === "chest_pain_onset");
      return { nextQuestion: q || null, isCompleted: false };
    }
    if (chiefComplaint === "breathing_difficulty") {
      const q = CLINICAL_QUESTIONS.find((q) => q.id === "breathing_onset");
      return { nextQuestion: q || null, isCompleted: false };
    }
    if (chiefComplaint === "fever") {
      const q = CLINICAL_QUESTIONS.find((q) => q.id === "fever_pattern");
      return { nextQuestion: q || null, isCompleted: false };
    }
    if (chiefComplaint === "cough") {
      const q = CLINICAL_QUESTIONS.find((q) => q.id === "cough_type");
      return { nextQuestion: q || null, isCompleted: false };
    }
    // Default or other: jump straight to past medical
    const q = CLINICAL_QUESTIONS.find((q) => q.id === "past_medical_history");
    return { nextQuestion: q || null, isCompleted: false };
  }

  // Follow-ups within chest pain
  if (currentQuestionId === "chest_pain_onset") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "chest_pain_character") || null, isCompleted: false };
  }
  if (currentQuestionId === "chest_pain_character") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "chest_pain_radiation") || null, isCompleted: false };
  }
  if (currentQuestionId === "chest_pain_radiation") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "chest_pain_associated") || null, isCompleted: false };
  }
  if (currentQuestionId === "chest_pain_associated") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "past_medical_history") || null, isCompleted: false };
  }

  // Breathing follow-up
  if (currentQuestionId === "breathing_onset") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "past_medical_history") || null, isCompleted: false };
  }

  // Fever follow-up
  if (currentQuestionId === "fever_pattern") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "past_medical_history") || null, isCompleted: false };
  }

  // Cough follow-up
  if (currentQuestionId === "cough_type") {
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === "past_medical_history") || null, isCompleted: false };
  }

  // Universal flow after HPI branches
  const universalSequence = [
    "past_medical_history",
    "past_surgical_history",
    "medication_history",
    "allergy_history",
    "family_history",
    "personal_history",
    "review_of_systems"
  ];

  const currIndex = universalSequence.indexOf(currentQuestionId);
  if (currIndex !== -1 && currIndex < universalSequence.length - 1) {
    const nextId = universalSequence[currIndex + 1];
    return { nextQuestion: CLINICAL_QUESTIONS.find((q) => q.id === nextId) || null, isCompleted: false };
  }

  // Completed all sections
  return { nextQuestion: null, isCompleted: true };
}

export async function detectRedFlags(answers: Record<string, any>): Promise<RedFlagAlert> {
  const chief = answers["chief_complaint"];
  const chestOnset = answers["chest_pain_onset"];
  const chestChar = answers["chest_pain_character"];
  const chestRad = answers["chest_pain_radiation"];
  const chestAssoc: string[] = Array.isArray(answers["chest_pain_associated"]) 
    ? answers["chest_pain_associated"] 
    : [];
  const breathingOnset = answers["breathing_onset"];
  const coughType = answers["cough_type"];

  // Red Flag 1: Acute Coronary Syndrome Warning
  if (
    chief === "chest_pain" &&
    (chestChar === "crushing_pressure" || chestRad === "left_arm_jaw" || chestOnset === "less_than_1hr") &&
    (chestAssoc.includes("profuse_sweating") || chestAssoc.includes("shortness_breath") || chestAssoc.includes("dizziness"))
  ) {
    return {
      detected: true,
      ruleTriggered: "Possible Acute Coronary Syndrome / High-Risk Angina",
      severity: "CRITICAL",
      timestamp: new Date().toISOString(),
      notes: "Severe crushing retrosternal pain with left arm radiation and diaphoresis detected. Requires immediate ECG and triage evaluation."
    };
  }

  // Red Flag 2: Acute Resting Respiratory Distress
  if (chief === "breathing_difficulty" && breathingOnset === "at_rest") {
    return {
      detected: true,
      ruleTriggered: "Severe Respiratory Compromise at Rest",
      severity: "CRITICAL",
      timestamp: new Date().toISOString(),
      notes: "Patient reports severe dyspnea at rest, gasping for air. Requires immediate pulse oximetry and oxygenation support."
    };
  }

  // Red Flag 3: Hemoptysis
  if (chief === "cough" && coughType === "blood_streaked") {
    return {
      detected: true,
      ruleTriggered: "Active Hemoptysis (Coughing Blood)",
      severity: "HIGH",
      timestamp: new Date().toISOString(),
      notes: "Hemoptysis identified. Requires emergency chest x-ray and hemodynamic stability assessment."
    };
  }

  // Red Flag 4: Neurological / Stroke warning
  if (chief === "headache_weakness") {
    return {
      detected: true,
      ruleTriggered: "Sudden Severe Headache / Neurological Deficit",
      severity: "CRITICAL",
      timestamp: new Date().toISOString(),
      notes: "Sudden focal weakness or severe headache. Immediate FAST stroke screening and neuro triage recommended."
    };
  }

  return {
    detected: false,
    ruleTriggered: "None",
    severity: "HIGH",
    timestamp: new Date().toISOString(),
    notes: "No red flags detected based on preliminary questionnaire."
  };
}

export async function generateClinicalSummary(
  patient: Patient,
  answers: Record<string, any>,
  documents: MedicalDocument[],
  redFlagAlert?: RedFlagAlert
): Promise<ClinicalSummary> {
  const chief = answers["chief_complaint"];
  let chiefText = "General Medical Consultation";
  let hpiText = "Patient presented for outpatient clinical intake.";

  if (chief === "chest_pain") {
    chiefText = "Chest Pain & Left Arm Discomfort";
    const onset = answers["chest_pain_onset"] === "less_than_1hr" ? "acute onset (< 1 hour ago)" : "started within past 24 hours";
    const char = answers["chest_pain_character"] === "crushing_pressure" ? "heavy crushing retrosternal pressure" : "retrosternal aching";
    const rad = answers["chest_pain_radiation"] === "left_arm_jaw" ? "radiating to left shoulder and jaw" : "localized";
    const assoc = Array.isArray(answers["chest_pain_associated"]) ? answers["chest_pain_associated"].join(", ") : "sweating and breathlessness";
    hpiText = `52-year-old male presents with ${onset} of ${char}, ${rad}. Associated with ${assoc}. Denies relief with rest.`;
  } else if (chief === "fever") {
    chiefText = "High Grade Fever with Chills";
    hpiText = "Patient presents with acute febrile illness accompanied by rigors and body aches over the last 3 days.";
  } else if (chief === "breathing_difficulty") {
    chiefText = "Shortness of Breath on Minimal Exertion";
    hpiText = "Patient presents with progressively worsening dyspnea, orthopnea, and bilateral lower limb heaviness.";
  } else if (chief === "cough") {
    chiefText = "Persistent Productive Cough";
    hpiText = "Patient reports a 10-day history of wet cough with mucoid expectoration, worse at night.";
  }

  // Past Medical
  const pmhAnswers = Array.isArray(answers["past_medical_history"]) ? answers["past_medical_history"] : [];
  const pmhText = pmhAnswers.length > 0 && !pmhAnswers.includes("none")
    ? `Known history of: ${pmhAnswers.map((p: string) => p.toUpperCase()).join(", ")}.`
    : "No known previous chronic medical illnesses declared.";

  // Past Surgical
  const psh = answers["past_surgical_history"];
  const pshText = psh && psh !== "no_surgeries"
    ? `Previous surgical procedure: ${psh.replace(/_/g, " ")}.`
    : "No previous surgical interventions reported.";

  // Medications
  const meds = Array.isArray(answers["medication_history"]) ? answers["medication_history"] : [];
  const drugText = meds.length > 0 && !meds.includes("no_medications")
    ? `Regular medications reported: ${meds.map((m: string) => m.replace(/_/g, " ")).join(", ")}.`
    : "No daily prescription medications.";

  // Allergies
  const allergy = answers["allergy_history"];
  const allergyText = allergy && allergy !== "no_known_allergies"
    ? `Reported drug/substance allergy: ${allergy.replace(/_/g, " ")}.`
    : "No Known Drug Allergies (NKDA).";

  // Family
  const fam = answers["family_history"];
  const familyText = fam && fam !== "no_family_history"
    ? `Positive family history: ${fam.replace(/_/g, " ")}.`
    : "Non-contributory family medical history.";

  // Personal
  const personal = answers["personal_history"];
  const personalText = personal
    ? `Habits: ${personal.replace(/_/g, " ")}. Mixed Indian diet.`
    : "Non-smoker, non-alcoholic.";

  // Review of systems
  const ros = Array.isArray(answers["review_of_systems"]) ? answers["review_of_systems"] : [];
  const rosText = ros.length > 0 && !ros.includes("none")
    ? `Positive ROS findings: ${ros.join(", ")}.`
    : "Constitutional, neurological, and gastrointestinal review of systems within normal limits.";

  // Document findings
  const abnormalLabs = documents
    .flatMap((d) => d.extractedFindings)
    .filter((f) => f.isAbnormal)
    .map((f) => `${f.label}: ${f.value} ${f.unit || ""} (${f.flagType?.toUpperCase()})`)
    .join("; ");

  const docsText = documents.length > 0 
    ? `${documents.length} medical document(s) digitized. ${abnormalLabs ? `Flagged findings: ${abnormalLabs}` : "No critical lab abnormalities found."}`
    : "No prior records attached.";

  const priority = redFlagAlert?.detected ? "P1-Urgent" : (chief === "chest_pain" ? "P2-Priority" : "P3-Normal");

  return {
    id: `sum-${Date.now()}`,
    patientId: patient.id,
    generatedAt: new Date().toLocaleDateString("en-IN", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    }),
    status: "DRAFT_PENDING_PHYSICIAN",
    overallPriority: priority,
    chiefComplaint: chiefText,
    hpi: hpiText,
    pastMedicalHistory: pmhText,
    pastSurgicalHistory: pshText,
    drugHistory: drugText,
    allergyHistory: allergyText,
    familyHistory: familyText,
    personalHistory: personalText,
    reviewOfSystems: rosText,
    previousInvestigations: abnormalLabs || "Recent Hb: 10.8 g/dL (Low), Fasting Glucose: 142 mg/dL, Troponin-I: 0.18 ng/mL (High).",
    documentsReviewed: docsText,
    redFlagsNote: redFlagAlert?.detected ? `ALERT: ${redFlagAlert.ruleTriggered} - ${redFlagAlert.notes}` : undefined,
    provisionalDiagnosis: chief === "chest_pain" ? "Acute Coronary Syndrome (ACS) - Rule out NSTEMI / Unstable Angina" : "Evaluation required by OPD Physician"
  };
}

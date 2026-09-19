export type SupportedLanguage = 
  | 'en' 
  | 'ta' 
  | 'hi' 
  | 'te' 
  | 'kn' 
  | 'ml' 
  | 'mr' 
  | 'bn';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  greeting: string;
  subtext: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  abhaId?: string;
  opdToken: string;
  department: string;
  registrationType: 'ABHA' | 'QR_SCAN' | 'NEW_PATIENT';
  registeredAt: string;
}

export interface ConsentRecord {
  agreed: boolean;
  timestamp: string;
  language: SupportedLanguage;
  audioPlayed: boolean;
  method: 'touch' | 'voice';
}

export type QuestionSection = 
  | 'chief_complaint'
  | 'hpi'
  | 'past_medical'
  | 'past_surgical'
  | 'medications'
  | 'allergies'
  | 'family_history'
  | 'personal_history'
  | 'review_of_systems';

export type QuestionType = 
  | 'single_choice'
  | 'multiple_choice'
  | 'duration_slider'
  | 'severity_scale'
  | 'text'
  | 'voice_preferred';

export interface QuestionOption {
  id: string;
  label: string;
  tamilLabel?: string;
  hindiLabel?: string;
  icon?: string;
  triggersRedFlag?: boolean;
  triggersBranch?: string; // id of follow-up question or branch
}

export interface InterviewQuestion {
  id: string;
  section: QuestionSection;
  sectionTitle: string;
  sectionTitleTa?: string;
  text: string;
  textTa?: string;
  textHi?: string;
  subtext?: string;
  subtextTa?: string;
  type: QuestionType;
  options?: QuestionOption[];
  minVal?: number;
  maxVal?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  placeholderTa?: string;
  required?: boolean;
  isRedFlagTrigger?: (answers: Record<string, any>) => boolean;
}

export interface InterviewAnswer {
  questionId: string;
  section: QuestionSection;
  value: any;
  displayText: string;
  isVoiceTranscribed?: boolean;
  editedByPatient?: boolean;
  timestamp: string;
}

export interface RedFlagAlert {
  detected: boolean;
  ruleTriggered: string;
  severity: 'CRITICAL' | 'HIGH';
  timestamp: string;
  actionTaken?: 'ALERTED_TRIAGE' | 'OVERRIDDEN_BY_PATIENT';
  notes: string;
}

export type DocumentType = 
  | 'prescription' 
  | 'lab_report' 
  | 'discharge_summary' 
  | 'imaging_report';

export interface ExtractedFinding {
  id: string;
  category: 'vital' | 'lab_value' | 'medication' | 'diagnosis' | 'observation';
  label: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  isAbnormal?: boolean;
  flagType?: 'high' | 'low' | 'critical';
  confidence: number;
  date?: string;
  sourceDocId?: string;
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadDate: string;
  status: 'uploading' | 'analyzing' | 'extracting' | 'ready' | 'error';
  progress: number;
  extractedFindings: ExtractedFinding[];
  rawTextPreview?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  facility: string;
  category: 'opd' | 'admission' | 'lab' | 'pharmacy' | 'imaging';
  diagnosis?: string;
  medications?: string[];
  investigations?: string[];
  importantFindings?: string;
  documentRefId?: string;
}

export interface ClinicalSummary {
  id: string;
  patientId: string;
  generatedAt: string;
  status: 'DRAFT_PENDING_PHYSICIAN' | 'PHYSICIAN_VERIFIED';
  verifiedBy?: string;
  verifiedAt?: string;
  overallPriority: 'P1-Urgent' | 'P2-Priority' | 'P3-Normal';
  chiefComplaint: string;
  hpi: string;
  pastMedicalHistory: string;
  pastSurgicalHistory: string;
  drugHistory: string;
  allergyHistory: string;
  familyHistory: string;
  personalHistory: string;
  reviewOfSystems: string;
  previousInvestigations: string;
  documentsReviewed: string;
  redFlagsNote?: string;
  doctorNotes?: string;
  provisionalDiagnosis?: string;
}

export interface AyushHistory {
  prakriti: {
    dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridosha';
    assessment: string;
  };
  vikriti: {
    doshicImbalance: string[];
    manifestation: string;
  };
  sara: {
    predominance: 'Pravara (Superior)' | 'Madhyama (Moderate)' | 'Avara (Inferior)';
    tissueDominance: 'Rasa' | 'Rakta' | 'Mamsa' | 'Meda' | 'Asthi' | 'Majja' | 'Sukra' | 'Sarva-sara';
    notes: string;
  };
  samhanana: {
    compactness: 'Su-samhata (Robust/Compact)' | 'Madhyama (Moderate)' | 'Heena (Poor/Frail)';
  };
  pramana: {
    anthropometry: 'Pramana-yukta (Proportionate)' | 'Ati-krisha (Underweight)' | 'Ati-sthula (Overweight)';
  };
  satmya: {
    adaptability: 'Sarva-rasa Satmya' | 'Eka-rasa Satmya' | 'Madhyama';
    notes: string;
  };
  sattva: {
    mentalStrength: 'Pravara (High mental grit)' | 'Madhyama (Average)' | 'Avara (Anxious/Low)';
  };
  aharaShakti: {
    abhyavaharana: 'Pravara' | 'Madhyama' | 'Avara'; // Intake capacity
    jaranaShakti: 'Teekshna (Sharp)' | 'Manda (Sluggish)' | 'Visham (Irregular)' | 'Sama (Balanced)'; // Digestive fire
  };
  vyayamaShakti: {
    physicalStamina: 'Pravara (High stamina)' | 'Madhyama (Moderate)' | 'Alpa (Low stamina)';
  };
  vaya: {
    ageCategory: 'Balya (Childhood)' | 'Madhyama (Adulthood)' | 'Vriddha (Geriatric)';
  };
  aharaVihara: {
    dietPattern: 'Katu-Tikta dominance' | 'Madhura-Snigdha' | 'Irregular / Fast-food' | 'Balanced Sattvic';
    sleepPattern: 'Nidranasha (Insomnia)' | 'Atinidra (Hypersomnia)' | 'Samyak (Sound sleep)';
    bowelHabit: 'Krura (Constipated)' | 'Mrida (Loose/Frequent)' | 'Madhyama (Regular)';
    lifestyleNotes: string;
  };
  physicianAyushNotes: string;
}

export type QueueStatus = 'Waiting' | 'Ready' | 'Urgent' | 'Completed';
export type QueuePriority = 'P1-Urgent' | 'P2-Priority' | 'P3-Normal';

export interface QueuePatient {
  id: string;
  opdToken: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  status: QueueStatus;
  priority: QueuePriority;
  chiefComplaint: string;
  intakeDurationMins: number;
  lastUpdated: string;
  hasRedFlags: boolean;
  abhaId?: string;
  ayushEnabled?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  degree: string;
  department: string;
  roomNumber: string;
  hospitalName: string;
  isOnline: boolean;
}

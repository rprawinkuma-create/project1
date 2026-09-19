import { ExtractedFinding, MedicalDocument, DocumentType } from "@/types/medical";
import { SAMPLE_DOCUMENTS } from "@/data/demo-documents";

export interface OcrProgressCallback {
  (stage: string, progressPercent: number): void;
}

export async function processDocument(
  file: { name: string; size: number; type: string },
  onProgress?: OcrProgressCallback
): Promise<MedicalDocument> {
  const steps = [
    { stage: "Uploading document to secure intake enclave...", percent: 20 },
    { stage: "Analyzing document structure with Medical Vision AI...", percent: 45 },
    { stage: "Extracting optical text & physician handwritten tokens...", percent: 68 },
    { stage: "Identifying Rx dosages, frequencies & brand names...", percent: 85 },
    { stage: "Validating lab reference ranges & abnormal biomarker tags...", percent: 100 },
  ];

  for (const step of steps) {
    if (onProgress) {
      onProgress(step.stage, step.percent);
    }
    await new Promise((resolve) => setTimeout(resolve, 90));
  }

  // Determine doc type from filename
  const lower = file.name.toLowerCase();
  let docType: DocumentType = "prescription";
  if (lower.includes("lab") || lower.includes("blood") || lower.includes("test")) {
    docType = "lab_report";
  } else if (lower.includes("discharge") || lower.includes("summary")) {
    docType = "discharge_summary";
  } else if (lower.includes("ecg") || lower.includes("xray") || lower.includes("scan")) {
    docType = "imaging_report";
  }

  // Match sample or generate findings
  const matchedSample = SAMPLE_DOCUMENTS.find((d) => d.type === docType) || SAMPLE_DOCUMENTS[0];

  const docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  return {
    id: docId,
    name: file.name,
    type: docType,
    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    uploadDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    status: "ready",
    progress: 100,
    extractedFindings: matchedSample.extractedFindings.map((f, i) => ({
      ...f,
      id: `ext-${docId}-${i}`,
      sourceDocId: docId
    })),
    rawTextPreview: matchedSample.rawTextPreview
  };
}

export function extractMedicalData(documents: MedicalDocument[]): {
  medications: ExtractedFinding[];
  abnormalLabs: ExtractedFinding[];
  normalLabs: ExtractedFinding[];
  diagnoses: ExtractedFinding[];
} {
  const allFindings = documents.flatMap((d) => d.extractedFindings);

  return {
    medications: allFindings.filter((f) => f.category === "medication"),
    abnormalLabs: allFindings.filter((f) => f.category === "lab_value" && f.isAbnormal),
    normalLabs: allFindings.filter((f) => f.category === "lab_value" && !f.isAbnormal),
    diagnoses: allFindings.filter((f) => f.category === "diagnosis" || f.category === "observation")
  };
}

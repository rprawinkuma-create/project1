"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKioskStore } from "@/store/kiosk-store";
import { AccessibilityBar } from "@/components/kiosk/AccessibilityBar";
import { KioskHeader } from "@/components/kiosk/KioskHeader";
import { VoiceButton } from "@/components/kiosk/VoiceButton";
import { RedFlagModal } from "@/components/kiosk/RedFlagModal";
import { CLINICAL_QUESTIONS } from "@/data/questions";
import { UI_STRINGS } from "@/data/translations";
import { 
  startInterview, 
  getNextQuestion, 
  detectRedFlags 
} from "@/services/mock-ai";
import { InterviewQuestion, RedFlagAlert } from "@/types/medical";
import { 
  Bot, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  HeartPulse, 
  ShieldAlert,
  Volume2
} from "lucide-react";

export default function ClinicalInterviewPage() {
  const router = useRouter();
  const { 
    language, 
    patient, 
    answers, 
    setAnswer, 
    redFlagAlert, 
    setRedFlagAlert,
    soundEnabled,
    updatePatientStatus
  } = useKioskStore();

  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion>(CLINICAL_QUESTIONS[0]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [showRedFlagModal, setShowRedFlagModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [totalEstimatedQuestions] = useState(8);

  // Initialize or restore answer for current question
  useEffect(() => {
    const existingVal = answers[currentQuestion.id];
    if (existingVal !== undefined) {
      if (Array.isArray(existingVal)) {
        setSelectedMultiOptions(existingVal);
      } else if (typeof existingVal === "string") {
        setSelectedOption(existingVal);
        setTextAnswer(existingVal);
      }
    } else {
      setSelectedOption(null);
      setSelectedMultiOptions([]);
      setTextAnswer("");
    }

    // Play text-to-speech for the question if sound is enabled
    if (soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const textToRead = language === "ta" && currentQuestion.textTa 
          ? currentQuestion.textTa 
          : currentQuestion.text;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language === "ta" ? "ta-IN" : "en-IN";
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  }, [currentQuestion, language, soundEnabled]);

  // Handle single choice option selection
  const handleSelectSingleOption = (optId: string) => {
    setSelectedOption(optId);
  };

  // Handle multi-choice toggle
  const handleToggleMultiOption = (optId: string) => {
    if (optId === "none" || optId === "no_known_allergies" || optId === "no_medications") {
      setSelectedMultiOptions([optId]);
      return;
    }

    let updated = selectedMultiOptions.filter((item) => item !== "none" && item !== "no_known_allergies" && item !== "no_medications");
    if (updated.includes(optId)) {
      updated = updated.filter((item) => item !== optId);
    } else {
      updated.push(optId);
    }
    setSelectedMultiOptions(updated);
  };

  // Handle voice speech completion
  const handleVoiceCompleted = (transcribedText: string) => {
    setTextAnswer(transcribedText);
    setSelectedOption(transcribedText);
    setAnswer(currentQuestion.id, transcribedText, transcribedText);
  };

  // Submit current answer and advance
  const handleNext = async () => {
    setIsProcessingAI(true);

    let answerValue: any = null;
    if (currentQuestion.type === "multiple_choice") {
      answerValue = selectedMultiOptions.length > 0 ? selectedMultiOptions : ["none"];
    } else if (currentQuestion.type === "single_choice") {
      answerValue = selectedOption || currentQuestion.options?.[0]?.id || "other";
    } else {
      answerValue = textAnswer || "No additional comments";
    }

    // Save answer
    setAnswer(currentQuestion.id, answerValue);

    // Build current answers map including newly submitted
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: answerValue
    };

    // Check for Red Flags in real-time
    const flagCheck = await detectRedFlags(updatedAnswers);
    if (flagCheck.detected && !redFlagAlert) {
      setRedFlagAlert(flagCheck);
      setShowRedFlagModal(true);
      setIsProcessingAI(false);
      return;
    }

    // Advance to next branch question
    const { nextQuestion, isCompleted } = await getNextQuestion(currentQuestion.id, updatedAnswers);
    setIsProcessingAI(false);

    if (isCompleted || !nextQuestion) {
      // Move to document upload step
      router.push("/patient/documents");
    } else {
      setCurrentQuestion(nextQuestion);
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRedFlagTriageAlert = () => {
    if (patient) {
      updatePatientStatus(patient.id, "Urgent");
    }
    // Dismiss modal and allow user to continue to documents
    setShowRedFlagModal(false);
  };

  // Question display strings
  const questionTitle = language === "ta" && currentQuestion.textTa ? currentQuestion.textTa : currentQuestion.text;
  const sectionTitle = language === "ta" && currentQuestion.sectionTitleTa ? currentQuestion.sectionTitleTa : currentQuestion.sectionTitle;
  const subtext = language === "ta" && currentQuestion.subtextTa ? currentQuestion.subtextTa : currentQuestion.subtext;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AccessibilityBar />
      <KioskHeader currentStep={2} showBack={true} />

      {/* Red Flag Triage Alert Modal */}
      {showRedFlagModal && redFlagAlert && (
        <RedFlagModal
          ruleName={redFlagAlert.ruleTriggered}
          notes={redFlagAlert.notes}
          onDismiss={() => setShowRedFlagModal(false)}
          onAlertTriage={handleRedFlagTriageAlert}
        />
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col justify-between">
        <div>
          {/* Top Progress & Section Info */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-600 animate-pulse" />
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wider bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
                {sectionTitle}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-slate-500">
                Question {questionIndex} • Step 2 of 4
              </span>
              <div className="w-28 sm:w-40 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-teal-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (questionIndex / totalEstimatedQuestions) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Conversational AI Message Bubble */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-700/20">
                <Bot className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-teal-800 uppercase tracking-wider">
                    MediKiosk Clinical Assistant
                  </span>
                  <span className="text-[10px] text-slate-400">• OPD Intake AI</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {questionTitle}
                </h2>

                {subtext && (
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    {subtext}
                  </p>
                )}
              </div>
            </div>

            {/* Answer Options Controls */}
            {currentQuestion.options && currentQuestion.options.length > 0 && (
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((opt) => {
                    const optLabel = language === "ta" && opt.tamilLabel ? opt.tamilLabel : opt.label;
                    const isMulti = currentQuestion.type === "multiple_choice";
                    const isChecked = isMulti 
                      ? selectedMultiOptions.includes(opt.id)
                      : selectedOption === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => 
                          isMulti 
                            ? handleToggleMultiOption(opt.id) 
                            : handleSelectSingleOption(opt.id)
                        }
                        className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between gap-3 shadow-sm touch-target active:scale-[0.98] ${
                          isChecked
                            ? "bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 text-teal-950 font-bold"
                            : "bg-white border-slate-200 text-slate-800 hover:border-teal-400 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-bold leading-snug">
                          {optLabel}
                        </span>

                        <div
                          className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition ${
                            isChecked
                              ? "bg-teal-600 text-white"
                              : "border-2 border-slate-300"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Voice Input Experience */}
            <div className="border-t border-slate-100 pt-6">
              <VoiceButton
                questionId={currentQuestion.id}
                language={language}
                defaultSimulatedText={
                  currentQuestion.id === "chief_complaint"
                    ? "I have severe crushing chest pain since morning that moves into my left arm with sweating."
                    : currentQuestion.id === "past_medical_history"
                    ? "I have had high blood pressure and sugar for 5 years and take tablets."
                    : "No other major issues to report."
                }
                onTranscriptionComplete={handleVoiceCompleted}
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="py-4 px-6 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm sm:text-base rounded-2xl border border-slate-200 flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{strings.backBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isProcessingAI}
            className="py-4 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-teal-600/30 flex items-center gap-2 transition"
          >
            <span>{isProcessingAI ? "Analyzing..." : strings.nextBtn}</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import { TimelineEvent } from "@/types/medical";
import { 
  Calendar, 
  Building2, 
  Pill, 
  Activity, 
  CheckCircle2, 
  FileText, 
  Stethoscope 
} from "lucide-react";

interface MedicalTimelineViewProps {
  events: TimelineEvent[];
}

export function MedicalTimelineView({ events }: MedicalTimelineViewProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Chronological Longitudinal Health Record
          </h3>
          <p className="text-xs text-slate-500">
            Synthesized across hospital visits, discharge summaries, and prescriptions
          </p>
        </div>
      </div>

      <div className="relative border-l-2 border-teal-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
        {events.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md border-4 border-white group-hover:scale-110 transition">
              <Stethoscope className="w-4 h-4" />
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-teal-300 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="bg-teal-100 text-teal-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                  {event.date}
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {event.facility}
                </span>
              </div>

              <h4 className="text-base font-black text-slate-900 mb-1">
                {event.title}
              </h4>

              {event.diagnosis && (
                <p className="text-xs font-bold text-teal-800 mb-3">
                  Diagnosis: <span className="font-semibold text-slate-800">{event.diagnosis}</span>
                </p>
              )}

              {/* Medication tags */}
              {event.medications && event.medications.length > 0 && (
                <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    Rx:
                  </span>
                  {event.medications.map((m, i) => (
                    <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Investigations */}
              {event.investigations && event.investigations.length > 0 && (
                <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-sky-600" />
                    Labs:
                  </span>
                  {event.investigations.map((inv, i) => (
                    <span key={i} className="bg-sky-50 border border-sky-200 text-sky-900 px-2 py-0.5 rounded-md text-[11px] font-bold">
                      {inv}
                    </span>
                  ))}
                </div>
              )}

              {event.importantFindings && (
                <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 italic mt-2">
                  Key Note: {event.importantFindings}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from "recharts";
import { Activity, TrendingUp, AlertTriangle } from "lucide-react";

interface LabTrendsChartProps {
  patientId: string;
}

export function LabTrendsChart({ patientId }: LabTrendsChartProps) {
  const [metric, setMetric] = useState<"glucose" | "bp">("glucose");

  const glucoseData = [
    { visit: "Nov 2024", fbs: 156, hba1c: 8.4, date: "18 Nov 2024" },
    { visit: "Jan 2026", fbs: 168, hba1c: 8.1, date: "12 Jan 2026" },
    { visit: "Today (Aug 2026)", fbs: 142, hba1c: 7.9, date: "15 Aug 2026" }
  ];

  const bpData = [
    { visit: "Nov 2024", systolic: 146, diastolic: 92, date: "18 Nov 2024" },
    { visit: "Jan 2026", systolic: 154, diastolic: 98, date: "12 Jan 2026" },
    { visit: "Today (Aug 2026)", systolic: 162, diastolic: 100, date: "15 Aug 2026" }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Biomarker & Vital Longitudinal Trends
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated across past 3 OPD visits and extracted OCR reports
            </p>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMetric("glucose")}
            className={`px-3 py-1.5 rounded-lg transition ${
              metric === "glucose"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Fasting Glucose & HbA1c
          </button>
          <button
            type="button"
            onClick={() => setMetric("bp")}
            className={`px-3 py-1.5 rounded-lg transition ${
              metric === "bp"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Blood Pressure (Systolic/Diastolic)
          </button>
        </div>
      </div>

      {/* Recharts Component */}
      <div className="h-64 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          {metric === "glucose" ? (
            <LineChart data={glucoseData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="visit" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[60, 200]} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", color: "#fff", border: "none" }}
              />
              <Legend />
              {/* Normal upper threshold reference line */}
              <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label="Normal Fasting (100)" />
              <Line 
                type="monotone" 
                dataKey="fbs" 
                name="Fasting Glucose (mg/dL)" 
                stroke="#ef4444" 
                strokeWidth={3} 
                dot={{ r: 5, fill: "#ef4444" }} 
              />
              <Line 
                type="monotone" 
                dataKey="hba1c" 
                name="HbA1c (%)" 
                stroke="#0284c7" 
                strokeWidth={2} 
                dot={{ r: 4, fill: "#0284c7" }} 
              />
            </LineChart>
          ) : (
            <LineChart data={bpData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="visit" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[70, 180]} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", color: "#fff", border: "none" }}
              />
              <Legend />
              <ReferenceLine y={130} stroke="#f59e0b" strokeDasharray="3 3" label="Stage 1 HTN (130)" />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                name="Systolic BP (mmHg)" 
                stroke="#dc2626" 
                strokeWidth={3} 
                dot={{ r: 5, fill: "#dc2626" }} 
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                name="Diastolic BP (mmHg)" 
                stroke="#2563eb" 
                strokeWidth={2} 
                dot={{ r: 4, fill: "#2563eb" }} 
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 text-red-600 font-bold">
          <AlertTriangle className="w-3.5 h-3.5" />
          Persistent Uncontrolled Hypertension & Glycemic Volatility
        </span>
        <span>Reference Standard: ICMR Guidelines 2026</span>
      </div>
    </div>
  );
}

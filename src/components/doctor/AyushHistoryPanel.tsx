"use client";

import React, { useState } from "react";
import { AyushHistory } from "@/types/medical";
import { 
  Sparkles, 
  Leaf, 
  Info, 
  Save, 
  Check, 
  Heart, 
  Flame, 
  Wind, 
  Droplet,
  Compass
} from "lucide-react";

interface AyushHistoryPanelProps {
  initialData: AyushHistory;
  onSave?: (updated: AyushHistory) => void;
}

export function AyushHistoryPanel({ initialData, onSave }: AyushHistoryPanelProps) {
  const [data, setData] = useState<AyushHistory>(initialData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    if (onSave) onSave(data);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            <Leaf className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">
                AYUSH Dashavidha Pareeksha
              </h3>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-300">
                Traditional Medicine Framework
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ten-fold clinical assessment for integrated Ayurvedic & Allopathic OPD practice
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? "Saved Assessment" : "Save AYUSH Assessment"}</span>
        </button>
      </div>

      {/* Structured 10-fold Assessment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left text-sm">
        {/* 1. Prakriti (Constitution) */}
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>1. Prakriti (Primary Constitution)</span>
            </label>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
              {data.prakriti.dosha}
            </span>
          </div>
          <select
            value={data.prakriti.dosha}
            onChange={(e) =>
              setData({
                ...data,
                prakriti: { ...data.prakriti, dosha: e.target.value as any }
              })
            }
            className="w-full text-xs font-bold p-2.5 rounded-xl border border-amber-300 bg-white mb-2 outline-none"
          >
            <option value="Vata">Vata Dominant</option>
            <option value="Pitta">Pitta Dominant</option>
            <option value="Kapha">Kapha Dominant</option>
            <option value="Vata-Pitta">Vata-Pitta Dvandvaja</option>
            <option value="Pitta-Kapha">Pitta-Kapha Dvandvaja</option>
            <option value="Vata-Kapha">Vata-Kapha Dvandvaja</option>
            <option value="Tridosha">Sama Prakriti (Tridoshic)</option>
          </select>
          <textarea
            rows={2}
            value={data.prakriti.assessment}
            onChange={(e) =>
              setData({
                ...data,
                prakriti: { ...data.prakriti, assessment: e.target.value }
              })
            }
            className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white text-slate-700 outline-none"
            placeholder="Prakriti phenotypic notes..."
          />
        </div>

        {/* 2. Vikriti (Current Imbalance) */}
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
          <label className="block text-xs font-black text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>2. Vikriti (Pathological Doshic Imbalance)</span>
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {data.vikriti.doshicImbalance.map((dosh, idx) => (
              <span key={idx} className="bg-rose-100 text-rose-900 text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-200">
                {dosh}
              </span>
            ))}
          </div>
          <textarea
            rows={2}
            value={data.vikriti.manifestation}
            onChange={(e) =>
              setData({
                ...data,
                vikriti: { ...data.vikriti, manifestation: e.target.value }
              })
            }
            className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white text-slate-700 outline-none"
            placeholder="Clinical manifestation of Vikriti..."
          />
        </div>

        {/* 3. Sara (Tissue Excellence) & 4. Samhanana (Compactness) */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            3. Sara (Dhatu Tissue Excellence)
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Tissue Dominance</span>
              <select
                value={data.sara.tissueDominance}
                onChange={(e) =>
                  setData({
                    ...data,
                    sara: { ...data.sara, tissueDominance: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Rasa">Rasa Sara</option>
                <option value="Rakta">Rakta Sara</option>
                <option value="Mamsa">Mamsa Sara</option>
                <option value="Meda">Meda Sara</option>
                <option value="Asthi">Asthi Sara</option>
                <option value="Majja">Majja Sara</option>
                <option value="Sukra">Sukra Sara</option>
                <option value="Sarva-sara">Sarva-sara (Optimum)</option>
              </select>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Excellence Level</span>
              <select
                value={data.sara.predominance}
                onChange={(e) =>
                  setData({
                    ...data,
                    sara: { ...data.sara, predominance: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Pravara (Superior)">Pravara (Superior)</option>
                <option value="Madhyama (Moderate)">Madhyama (Moderate)</option>
                <option value="Avara (Inferior)">Avara (Inferior)</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            value={data.sara.notes}
            onChange={(e) => setData({ ...data, sara: { ...data.sara, notes: e.target.value } })}
            className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-600"
          />
        </div>

        {/* 4. Samhanana (Compactness) & 5. Pramana (Proportions) */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            4. Samhanana & 5. Pramana (Anthropometry)
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Body Compactness</span>
              <select
                value={data.samhanana.compactness}
                onChange={(e) =>
                  setData({
                    ...data,
                    samhanana: { compactness: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Su-samhata (Robust/Compact)">Su-samhata (Robust)</option>
                <option value="Madhyama (Moderate)">Madhyama (Moderate)</option>
                <option value="Heena (Poor/Frail)">Heena (Frail)</option>
              </select>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Anthropometry</span>
              <select
                value={data.pramana.anthropometry}
                onChange={(e) =>
                  setData({
                    ...data,
                    pramana: { anthropometry: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Pramana-yukta (Proportionate)">Pramana-yukta</option>
                <option value="Ati-sthula (Overweight)">Ati-sthula (Overweight)</option>
                <option value="Ati-krisha (Underweight)">Ati-krisha (Underweight)</option>
              </select>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Normal limb proportions and musculoskeletal symmetry observed.
          </p>
        </div>

        {/* 6. Satmya (Adaptability) & 7. Sattva (Mental grit) */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            6. Satmya & 7. Sattva (Mental Grit)
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Satmya (Diet Habituation)</span>
              <select
                value={data.satmya.adaptability}
                onChange={(e) =>
                  setData({
                    ...data,
                    satmya: { ...data.satmya, adaptability: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Sarva-rasa Satmya">Sarva-rasa (All 6 Tastes)</option>
                <option value="Madhyama">Madhyama</option>
                <option value="Eka-rasa Satmya">Eka-rasa Satmya</option>
              </select>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Sattva (Psychic Strength)</span>
              <select
                value={data.sattva.mentalStrength}
                onChange={(e) =>
                  setData({
                    ...data,
                    sattva: { mentalStrength: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Pravara (High mental grit)">Pravara (High Grit)</option>
                <option value="Madhyama (Average)">Madhyama (Average)</option>
                <option value="Avara (Anxious/Low)">Avara (Anxious)</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            value={data.satmya.notes}
            onChange={(e) => setData({ ...data, satmya: { ...data.satmya, notes: e.target.value } })}
            className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-600"
          />
        </div>

        {/* 8. Ahara Shakti & 9. Vyayama Shakti */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            8. Ahara Shakti (Agni) & 9. Vyayama Shakti (Stamina)
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Digestive Fire (Jarana)</span>
              <select
                value={data.aharaShakti.jaranaShakti}
                onChange={(e) =>
                  setData({
                    ...data,
                    aharaShakti: { ...data.aharaShakti, jaranaShakti: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Teekshna (Sharp)">Teekshna (Sharp Agni)</option>
                <option value="Sama (Balanced)">Sama (Balanced)</option>
                <option value="Manda (Sluggish)">Manda (Sluggish)</option>
                <option value="Visham (Irregular)">Visham (Fluctuating)</option>
              </select>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Physical Stamina</span>
              <select
                value={data.vyayamaShakti.physicalStamina}
                onChange={(e) =>
                  setData({
                    ...data,
                    vyayamaShakti: { physicalStamina: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Pravara (High stamina)">Pravara (High)</option>
                <option value="Madhyama (Moderate)">Madhyama (Moderate)</option>
                <option value="Alpa (Low stamina)">Alpa (Low / Sedentary)</option>
              </select>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Abhyavaharana Shakti: {data.aharaShakti.abhyavaharana} • Vaya: {data.vaya.ageCategory}
          </p>
        </div>

        {/* 10. Ahara-Vihara (Diet, Sleep & Regimen) */}
        <div className="md:col-span-2 bg-amber-50/40 p-4 rounded-2xl border border-amber-200">
          <label className="block text-xs font-black text-amber-950 uppercase tracking-wider mb-2">
            10. Ahara-Vihara Patterns (Dietary & Circadian Lifestyle)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Dietary Pattern</span>
              <input
                type="text"
                value={data.aharaVihara.dietPattern}
                onChange={(e) =>
                  setData({
                    ...data,
                    aharaVihara: { ...data.aharaVihara, dietPattern: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-amber-200 bg-white"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Sleep Pattern (Nidra)</span>
              <input
                type="text"
                value={data.aharaVihara.sleepPattern}
                onChange={(e) =>
                  setData({
                    ...data,
                    aharaVihara: { ...data.aharaVihara, sleepPattern: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-amber-200 bg-white"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Bowel Habits (Koshta)</span>
              <input
                type="text"
                value={data.aharaVihara.bowelHabit}
                onChange={(e) =>
                  setData({
                    ...data,
                    aharaVihara: { ...data.aharaVihara, bowelHabit: e.target.value as any }
                  })
                }
                className="w-full text-xs font-semibold p-2 rounded-lg border border-amber-200 bg-white"
              />
            </div>
          </div>
          <textarea
            rows={2}
            value={data.aharaVihara.lifestyleNotes}
            onChange={(e) =>
              setData({
                ...data,
                aharaVihara: { ...data.aharaVihara, lifestyleNotes: e.target.value }
              })
            }
            className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white text-slate-700 outline-none"
            placeholder="Specific Vihara / occupational stressors / seasonal factors..."
          />
        </div>

        {/* Physician AYUSH Rx & Integrative Recommendations */}
        <div className="md:col-span-2 bg-white p-4 rounded-2xl border-2 border-amber-400">
          <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Physician Integrative AYUSH Notes & Herbal Formulations</span>
          </label>
          <textarea
            rows={2}
            value={data.physicianAyushNotes}
            onChange={(e) => setData({ ...data, physicianAyushNotes: e.target.value })}
            className="w-full text-xs p-3 rounded-xl border border-amber-200 font-medium text-slate-800 outline-none"
            placeholder="Adjunctive herbal formulation notes, Shamana therapy, Pathya-Apathya guidance..."
          />
        </div>
      </div>

      <div className="text-[11px] text-slate-500 text-center bg-amber-50/50 p-2.5 rounded-xl border border-amber-200">
        *AYUSH Clinical Intake Note: Standardized data collection format per National Commission for Indian System of Medicine (NCISM) guidelines.
      </div>
    </div>
  );
}

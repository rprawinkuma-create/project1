import { InterviewQuestion } from "@/types/medical";

export const CLINICAL_QUESTIONS: InterviewQuestion[] = [
  // 1. CHIEF COMPLAINT
  {
    id: "chief_complaint",
    section: "chief_complaint",
    sectionTitle: "Chief Complaint",
    sectionTitleTa: "முக்கிய பிரச்சனை (Chief Complaint)",
    text: "What brings you to the hospital today?",
    textTa: "இன்று நீங்கள் மருத்துவமனைக்கு எதற்காக வந்துள்ளீர்கள்?",
    textHi: "आज आप अस्पताल किस कारण से आए हैं?",
    subtext: "Select the main symptom or tap the microphone to speak",
    subtextTa: "முக்கிய அறிகுறியைத் தேர்ந்தெடுக்கவும் அல்லது பேசி விவரிக்கவும்",
    type: "single_choice",
    required: true,
    options: [
      { id: "chest_pain", label: "Chest Pain / Discomfort", tamilLabel: "நெஞ்சு வலி / அசௌகரியம்", icon: "Heart" },
      { id: "breathing_difficulty", label: "Breathing Problem / Shortness of Breath", tamilLabel: "சுவாசிப்பதில் சிரமம் / மூச்சுத் திணறல்", icon: "Wind" },
      { id: "fever", label: "Fever & Body Chills", tamilLabel: "காய்ச்சல் மற்றும் நடுக்கம்", icon: "Thermometer" },
      { id: "cough", label: "Cough / Cold", tamilLabel: "இருமல் / சளி", icon: "Activity" },
      { id: "abdominal_pain", label: "Stomach / Abdominal Pain", tamilLabel: "வயிற்று வலி", icon: "ShieldAlert" },
      { id: "headache_weakness", label: "Severe Headache / Sudden Weakness", tamilLabel: "கடுமையான தலைவலி / திடீர் பலவீனம்", icon: "Zap", triggersRedFlag: true },
      { id: "other", label: "Other General Consultation", tamilLabel: "பிற பொதுவான பிரச்சனை", icon: "PlusCircle" }
    ]
  },

  // 2. CHEST PAIN BRANCH
  {
    id: "chest_pain_onset",
    section: "hpi",
    sectionTitle: "History of Present Illness (HPI)",
    sectionTitleTa: "தற்போதைய நோய் வரலாறு",
    text: "When did your chest pain begin?",
    textTa: "நெஞ்சு வலி எப்போது தொடங்கியது?",
    textHi: "सीने में दर्द कब शुरू हुआ था?",
    subtext: "Approximate time since pain started",
    subtextTa: "வலி தொடங்கிய தோராயமான நேரம்",
    type: "single_choice",
    options: [
      { id: "less_than_1hr", label: "Just now / Less than 1 hour ago", tamilLabel: "இப்போதுதான் / 1 மணி நேரத்திற்குள்", triggersRedFlag: true },
      { id: "1_to_6hrs", label: "1 to 6 hours ago", tamilLabel: "1 முதல் 6 மணி நேரத்திற்கு முன்" },
      { id: "today", label: "Earlier today (6-24 hours)", tamilLabel: "இன்று காலை / பகலில்" },
      { id: "few_days", label: "2 to 3 days ago", tamilLabel: "2 முதல் 3 நாட்களுக்கு முன்" },
      { id: "more_than_week", label: "Over a week (on and off)", tamilLabel: "ஒரு வாரத்திற்கும் மேலாக (விட்டு விட்டு)" }
    ]
  },
  {
    id: "chest_pain_character",
    section: "hpi",
    sectionTitle: "History of Present Illness (HPI)",
    sectionTitleTa: "வலியின் தன்மை",
    text: "What does the pain feel like?",
    textTa: "இந்த வலி எந்த மாதிரியாக உணர்கிறீர்கள்?",
    textHi: "दर्द किस प्रकार का महसूस होता है?",
    type: "single_choice",
    options: [
      { id: "crushing_pressure", label: "Crushing, heavy pressure or tight squeezing", tamilLabel: "அழுத்துவது போன்ற அல்லது நெஞ்சைப் பிழிவது போன்ற வலி", triggersRedFlag: true },
      { id: "sharp_stabbing", label: "Sharp or stabbing pain with deep breaths", tamilLabel: "மூச்சு விடும்போது குத்துவது போன்ற கூர்மையான வலி" },
      { id: "burning_acid", label: "Burning sensation / acidity-like in center of chest", tamilLabel: "நெஞ்செரிச்சல் / அசிடிட்டி போன்ற உணர்வு" },
      { id: "dull_ache", label: "Dull, mild continuous ache", tamilLabel: "மிதமான தொடர் வலி" }
    ]
  },
  {
    id: "chest_pain_radiation",
    section: "hpi",
    sectionTitle: "History of Present Illness (HPI)",
    sectionTitleTa: "வலி பரவுதல்",
    text: "Does the pain radiate or move to other parts of your body?",
    textTa: "வலி உடலின் வேறு பகுதிகளுக்குப் பரவுகிறதா?",
    textHi: "क्या दर्द शरीर के किसी अन्य हिस्से में फैलता है?",
    type: "single_choice",
    options: [
      { id: "left_arm_jaw", label: "Yes, to left arm, shoulder or jaw", tamilLabel: "ஆம், இடது கை, தோள்பட்டை அல்லது தாடைக்கு", triggersRedFlag: true },
      { id: "back", label: "Yes, straight to the upper back", tamilLabel: "ஆம், முதுகுப் பகுதிக்கு" },
      { id: "neck", label: "Yes, up to the neck or throat", tamilLabel: "ஆம், கழுத்து அல்லது தொண்டைக்கு" },
      { id: "no_radiation", label: "No, stays in one spot only", tamilLabel: "இல்லை, ஒரே இடத்தில் மட்டும் உள்ளது" }
    ]
  },
  {
    id: "chest_pain_associated",
    section: "hpi",
    sectionTitle: "Associated Symptoms",
    sectionTitleTa: "உடன் இருக்கும் பிற அறிகுறிகள்",
    text: "Are you experiencing any of these associated symptoms?",
    textTa: "இவற்றுடன் கீழ்வரும் பிற அறிகுறிகள் ஏதேனும் உள்ளதா?",
    textHi: "क्या आपको इनमें से कोई अन्य लक्षण भी हैं?",
    type: "multiple_choice",
    options: [
      { id: "profuse_sweating", label: "Cold Sweats / Excessive perspiration", tamilLabel: "அதிகப்படியான வியர்வை / குளிர்ந்த வியர்வை", triggersRedFlag: true },
      { id: "palpitations", label: "Heart racing or fluttering (Palpitations)", tamilLabel: "இதயப் படபடப்பு", triggersRedFlag: true },
      { id: "shortness_breath", label: "Severe Shortness of Breath", tamilLabel: "கடுமையான மூச்சுத் திணறல்", triggersRedFlag: true },
      { id: "nausea_vomiting", label: "Nausea or vomiting", tamilLabel: "குமட்டல் அல்லது வாந்தி" },
      { id: "dizziness", label: "Dizziness / Feeling faint", tamilLabel: "தலைசுற்றல் / மயக்கம் வரும் உணர்வு", triggersRedFlag: true },
      { id: "none", label: "None of these", tamilLabel: "இதில் எதுவும் இல்லை" }
    ]
  },

  // 3. BREATHING PROBLEM BRANCH
  {
    id: "breathing_onset",
    section: "hpi",
    sectionTitle: "Breathing Characteristics",
    sectionTitleTa: "மூச்சுத் திணறல் விவரங்கள்",
    text: "How severe is your breathing difficulty?",
    textTa: "சுவாசிப்பதில் உள்ள சிரமம் எவ்வளவு தீவிரமானது?",
    textHi: "सांस लेने में तकलीफ कितनी गंभीर है?",
    type: "single_choice",
    options: [
      { id: "at_rest", label: "Severe — struggling to breathe even while resting or speaking", tamilLabel: "கடுமையானது — பேசும்போதும் ஓய்வெடுக்கும்போதும் மூச்சுத் திணறல்", triggersRedFlag: true },
      { id: "minimal_exertion", label: "Moderate — occurs when walking short distances (to bathroom)", tamilLabel: "மிதமானது — சில அடிகள் நடக்கும்போது ஏற்படுகிறது" },
      { id: "strenuous", label: "Mild — occurs only on climbing stairs or exertion", tamilLabel: "லேசானது — படிக்கட்டு ஏறும் போது மட்டும்" },
      { id: "lying_flat", label: "Worse when lying flat in bed (need extra pillows)", tamilLabel: "படுக்கையில் படுக்கும்போது அதிகமாகிறது" }
    ]
  },

  // 4. FEVER BRANCH
  {
    id: "fever_pattern",
    section: "hpi",
    sectionTitle: "Fever Details",
    sectionTitleTa: "காய்ச்சல் விவரங்கள்",
    text: "How long have you had fever, and what does it feel like?",
    textTa: "காய்ச்சல் எத்தனை நாட்களாக உள்ளது? அதன் தன்மை என்ன?",
    textHi: "बुखार कितने दिनों से है?",
    type: "single_choice",
    options: [
      { id: "high_chills", label: "High grade with violent shivering / chills (102°F+)", tamilLabel: "நடுக்கத்துடன் கூடிய அதிக காய்ச்சல் (102°F+)" },
      { id: "moderate_bodyache", label: "Moderate fever with severe body and joint aches", tamilLabel: "கடுமையான உடல் வலி மற்றும் மூட்டு வலியுடன் கூடிய காய்ச்சல்" },
      { id: "evening_rise", label: "Low grade fever rising in the evenings / night sweats", tamilLabel: "மாலையில் அதிகரிக்கும் மிதமான காய்ச்சல்" },
      { id: "fever_rash", label: "Fever accompanied by skin rashes or red spots", tamilLabel: "தோலில் தடிப்புகள் அல்லது சிவந்த புள்ளிகளுடன் கூடிய காய்ச்சல்" }
    ]
  },

  // 5. COUGH BRANCH
  {
    id: "cough_type",
    section: "hpi",
    sectionTitle: "Cough Characteristics",
    sectionTitleTa: "இருமல் விவரங்கள்",
    text: "What kind of cough do you have?",
    textTa: "உங்கள் இருமல் எந்த வகையைச் சேர்ந்தது?",
    textHi: "खांसी किस प्रकार की है?",
    type: "single_choice",
    options: [
      { id: "dry_tickling", label: "Dry persistent cough without phlegm", tamilLabel: "சளி இல்லாத வறட்டு இருமல்" },
      { id: "productive_yellow_green", label: "Wet cough with thick yellowish/greenish sputum", tamilLabel: "மஞ்சள் அல்லது பச்சை நிற சளியுடன் கூடிய இருமல்" },
      { id: "blood_streaked", label: "Coughing up blood or rust-colored phlegm", tamilLabel: "இருமும் போது இரத்தம் கலந்து வருதல்", triggersRedFlag: true },
      { id: "chronic_smoker", label: "Long-standing smoker's morning cough", tamilLabel: "நீண்ட கால புகைப்பிடித்தலால் வரும் காலை நேர இருமல்" }
    ]
  },

  // 6. PAST MEDICAL HISTORY (PMH)
  {
    id: "past_medical_history",
    section: "past_medical",
    sectionTitle: "Past Medical History",
    sectionTitleTa: "முந்தைய மருத்துவ வரலாறு",
    text: "Do you have any existing chronic medical conditions?",
    textTa: "உங்களுக்கு ஏற்கனவே பின்வரும் நோய்கள் அல்லது பாதிப்புகள் உள்ளதா?",
    textHi: "क्या आपको पहले से कोई बीमारी है?",
    subtext: "Select all that apply",
    subtextTa: "பொருத்தமான அனைத்தையும் தேர்ந்தெடுக்கவும்",
    type: "multiple_choice",
    options: [
      { id: "diabetes", label: "Diabetes (Sugar)", tamilLabel: "நீரிழிவு நோய் (சர்க்கரை வியாதி)" },
      { id: "hypertension", label: "Hypertension (High BP)", tamilLabel: "உயர் இரத்த அழுத்தம் (BP)" },
      { id: "heart_disease", label: "Heart Attack / CAD / Heart Stent", tamilLabel: "மாரடைப்பு / இதய ஸ்டென்ட்" },
      { id: "asthma_copd", label: "Asthma / Breathing Allergy / COPD", tamilLabel: "ஆஸ்துமா / மூச்சு ஒவ்வாமை" },
      { id: "thyroid", label: "Thyroid Disorder", tamilLabel: "தைராய்டு பிரச்சனை" },
      { id: "kidney_disease", label: "Kidney Disease / High Creatinine", tamilLabel: "சிறுநீரக நோய்" },
      { id: "none", label: "No Pre-existing Chronic Conditions", tamilLabel: "எந்த நாள்பட்ட நோயும் இல்லை" }
    ]
  },

  // 7. PAST SURGICAL HISTORY (PSH)
  {
    id: "past_surgical_history",
    section: "past_surgical",
    sectionTitle: "Surgical History",
    sectionTitleTa: "முந்தைய அறுவை சிகிச்சை வரலாறு",
    text: "Have you undergone any surgeries or major procedures in the past?",
    textTa: "கடந்த காலத்தில் நீங்கள் ஏதேனும் அறுவை சிகிச்சை செய்துள்ளீர்களா?",
    textHi: "क्या आपकी पहले कोई सर्जरी हुई है?",
    type: "single_choice",
    options: [
      { id: "heart_surgery", label: "Heart Surgery / Angioplasty / Bypass (CABG)", tamilLabel: "இதய அறுவை சிகிச்சை / பைபாஸ் / ஆஞ்சியோபிளாஸ்டி" },
      { id: "abdominal_surgery", label: "Abdominal Surgery (Gallbladder / Appendix / Hernia)", tamilLabel: "வயிற்றுப் பகுதி அறுவை சிகிச்சை (பித்தப்பை / குடல்வால் / குடலிறக்கம்)" },
      { id: "ortho_surgery", label: "Orthopedic / Joint Replacement / Spine surgery", tamilLabel: "எலும்பு / மூட்டு மாற்று அறுவை சிகிச்சை" },
      { id: "other_surgery", label: "Other Minor Surgery", tamilLabel: "பிற சிறிய அறுவை சிகிச்சை" },
      { id: "no_surgeries", label: "Never Undergone Any Surgery", tamilLabel: "எந்த அறுவை சிகிச்சையும் செய்யவில்லை" }
    ]
  },

  // 8. MEDICATIONS HISTORY
  {
    id: "medication_history",
    section: "medications",
    sectionTitle: "Current Medications",
    sectionTitleTa: "தற்போது உட்கொள்ளும் மருந்துகள்",
    text: "Which of these medicines do you take regularly every day?",
    textTa: "பின்வரும் மருந்துகளில் எவற்றை தினமும் தவறாமல் உட்கொள்கிறீர்கள்?",
    textHi: "आप वर्तमान में कौन सी दवाएं नियमित लेते हैं?",
    type: "multiple_choice",
    options: [
      { id: "bp_meds", label: "Blood Pressure Tablets (e.g. Telmisartan, Amlodipine)", tamilLabel: "இரத்த அழுத்த மாத்திரைகள்" },
      { id: "diabetes_meds", label: "Diabetes Tablets / Insulin injections", tamilLabel: "சர்க்கரை மாத்திரை / இன்சுலின் ஊசி" },
      { id: "blood_thinners", label: "Blood Thinners / Aspirin / Clopidogrel", tamilLabel: "இரத்தத்தை நீர்க்க வைக்கும் மருந்துகள் (Aspirin)" },
      { id: "cholesterol_statins", label: "Cholesterol medicine (Atorvastatin / Rosuvastatin)", tamilLabel: "கொலஸ்ட்ரால் மாத்திரைகள்" },
      { id: "thyroid_meds", label: "Thyroxine / Eltroxin (morning empty stomach)", tamilLabel: "தைராய்டு மாத்திரை" },
      { id: "no_medications", label: "Not taking any regular medications", tamilLabel: "தற்போது எந்த வழக்கமான மருந்துகளும் உட்கொள்ளவில்லை" }
    ]
  },

  // 9. ALLERGIES
  {
    id: "allergy_history",
    section: "allergies",
    sectionTitle: "Drug & Food Allergies",
    sectionTitleTa: "மருந்து மற்றும் உணவு ஒவ்வாமை (Allergies)",
    text: "Do you have any known severe allergies to medicines?",
    textTa: "உங்களுக்கு ஏதேனும் மருந்துகளால் ஒவ்வாமை அல்லது பக்கவிளைவுகள் ஏற்பட்டுள்ளதா?",
    textHi: "क्या आपको किसी दवा से एलर्जी है?",
    type: "single_choice",
    options: [
      { id: "penicillin_allergy", label: "Penicillin / Amoxicillin / Antibiotic allergy", tamilLabel: "பென்சிலின் / நுண்ணுயிர் எதிர்ப்பு மருந்து ஒவ்வாமை" },
      { id: "nsaid_allergy", label: "Painkiller allergy (Aspirin, Brufen, Diclofenac)", tamilLabel: "வலி நிவாரணி மருந்து ஒவ்வாமை" },
      { id: "sulfa_allergy", label: "Sulfa drug allergy", tamilLabel: "சல்பா மருந்து ஒவ்வாமை" },
      { id: "food_allergy", label: "Food allergy (Peanuts, Eggs, Seafood)", tamilLabel: "உணவு ஒவ்வாமை" },
      { id: "no_known_allergies", label: "No Known Drug Allergies (NKDA)", tamilLabel: "எந்த மருந்து ஒவ்வாமையும் இல்லை (NKDA)" }
    ]
  },

  // 10. FAMILY HISTORY
  {
    id: "family_history",
    section: "family_history",
    sectionTitle: "Family History",
    sectionTitleTa: "குடும்ப மருத்துவ வரலாறு",
    text: "Is there a history of early heart disease or stroke in your parents or siblings?",
    textTa: "உங்கள் பெற்றோர் அல்லது உடன் பிறந்தோருக்கு இளம் வயதில் மாரடைப்பு அல்லது பக்கவாதம் ஏற்பட்ட வரலாறு உள்ளதா?",
    textHi: "क्या आपके परिवार में किसी को दिल का दौरा या स्ट्रोक हुआ है?",
    type: "single_choice",
    options: [
      { id: "premature_heart_attack", label: "Yes, early heart attack before age 55 in father/brother or 65 in mother", tamilLabel: "ஆம், 55 வயதுக்கு முன் குடும்பத்தில் மாரடைப்பு ஏற்பட்ட வரலாறு உள்ளது" },
      { id: "family_diabetes_bp", label: "Yes, strong family history of Diabetes and High BP", tamilLabel: "ஆம், சர்க்கரை மற்றும் இரத்த அழுத்த குடும்ப வரலாறு உள்ளது" },
      { id: "family_stroke", label: "Yes, family history of Stroke or Brain hemorrhage", tamilLabel: "ஆம், பக்கவாத குடும்ப வரலாறு உள்ளது" },
      { id: "no_family_history", label: "No significant hereditary or heart disease history", tamilLabel: "குறிப்பிடத்தக்க பரம்பரை நோய் வரலாறு இல்லை" }
    ]
  },

  // 11. PERSONAL / LIFESTYLE HISTORY
  {
    id: "personal_history",
    section: "personal_history",
    sectionTitle: "Lifestyle & Habits",
    sectionTitleTa: "வாழ்க்கை முறை மற்றும் பழக்கவழக்கங்கள்",
    text: "Do you have any tobacco or smoking habits?",
    textTa: "உங்களுக்கு புகைபிடித்தல் அல்லது புகையிலை மெல்லும் பழக்கம் உள்ளதா?",
    textHi: "क्या आपको धूम्रपान या तंबाकू की आदत है?",
    type: "single_choice",
    options: [
      { id: "active_smoker", label: "Active Cigarette / Bidi smoker (> 5 sticks daily)", tamilLabel: "வழக்கமாக சிகரெட் / பீடி பிடிப்பவர்" },
      { id: "tobacco_chewer", label: "Chewing Tobacco / Gutkha / Khaini", tamilLabel: "புகையிலை / குட்கா மெல்லும் பழக்கம்" },
      { id: "former_smoker", label: "Former smoker (Quit more than 1 year ago)", tamilLabel: "முன்பு புகைப்பிடித்தவர் (இப்போது நிறுத்திவிட்டார்)" },
      { id: "non_user", label: "Non-smoker / Never used any tobacco products", tamilLabel: "புகைபிடித்தல் அல்லது புகையிலை பழக்கம் ஒருபோதும் இல்லை" }
    ]
  },

  // 12. REVIEW OF SYSTEMS (ROS)
  {
    id: "review_of_systems",
    section: "review_of_systems",
    sectionTitle: "Review of Systems (ROS)",
    sectionTitleTa: "பொதுவான உடல்நிலை ஆய்வு",
    text: "Have you noticed any of these general symptoms recently?",
    textTa: "சமீபத்தில் பின்வரும் பொதுவான அறிகுறிகள் ஏதேனும் தென்பட்டதா?",
    textHi: "क्या हाल ही में इनमें से कोई अन्य लक्षण महसूस हुए हैं?",
    type: "multiple_choice",
    options: [
      { id: "unintended_weight_loss", label: "Unintended rapid weight loss or loss of appetite", tamilLabel: "திடீர் எடை குறைவு அல்லது பசியின்மை" },
      { id: "extreme_fatigue", label: "Severe unexplained exhaustion / weakness", tamilLabel: "கடுமையான உடல் சோர்வு மற்றும் பலவீனம்" },
      { id: "swelling_feet", label: "Swelling in feet / ankles (pedal edema)", tamilLabel: "கால் அல்லது கணுக்காலில் வீக்கம்" },
      { id: "night_sweats", label: "Drenching night sweats", tamilLabel: "இரவில் அதீத வியர்வை" },
      { id: "none", label: "None of these general symptoms", tamilLabel: "இதில் எந்த பிரச்சனையும் இல்லை" }
    ]
  }
];

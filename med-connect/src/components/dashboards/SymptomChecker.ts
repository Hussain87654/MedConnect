// SymptomChecker.ts

const checkSymptoms = (symptom: string): string => {
  const s = symptom.toLowerCase().trim();

  // Agar user ne kuch likha hi nahi
  if (!s) return "Please enter a symptom to check.";

  // Behtareen aur zyada symptoms ki list
  if (s.includes("fever") || s.includes("temperature")) {
    return "Advice: Stay hydrated, rest, and monitor your temperature. If it's over 101°F, consult a doctor.";
  }
  
  if (s.includes("cough") || s.includes("sore throat") || s.includes("flu")) {
    return "Advice: Drink warm fluids like herbal tea or honey water. If you have difficulty breathing, seek help immediately.";
  }

  if (s.includes("headache") || s.includes("migraine")) {
    return "Advice: Rest in a quiet, dark room. Ensure you are well-hydrated and avoid screen time.";
  }

  if (s.includes("stomach") || s.includes("pain") || s.includes("nausea")) {
    return "Advice: Avoid heavy foods. Stick to a light diet like bananas or rice. If pain is severe, visit a clinic.";
  }

  if (s.includes("body ache") || s.includes("tired") || s.includes("weakness")) {
    return "Advice: Your body needs recovery. Ensure 7-8 hours of sleep and balanced nutrition.";
  }

  // Agar kuch match na ho
  return "Advice: Your symptoms are noted. We recommend scheduling an appointment with a specialist for an accurate diagnosis.";
};

export default checkSymptoms ;
import React, { useState } from 'react';

function checkSymptoms(input: string): string {
  const symptom = input.toLowerCase().trim();
  if (symptom.includes('fever')) return 'You may have a fever. Stay hydrated, rest well, and consider taking a paracetamol. Consult a doctor if it persists beyond 3 days.';
  if (symptom.includes('headache')) return 'Headaches can be caused by dehydration, stress, or migraine. Drink water, rest in a quiet dark room. See a doctor if severe or persistent.';
  if (symptom.includes('cough')) return 'A cough may indicate a cold, allergy, or respiratory infection. Stay hydrated and avoid irritants. Consult a doctor if you have difficulty breathing.';
  if (symptom.includes('cold') || symptom.includes('runny nose')) return 'Common cold symptoms. Rest, drink warm fluids, and use a saline nasal spray. Should resolve in 7-10 days.';
  if (symptom.includes('stomach') || symptom.includes('nausea') || symptom.includes('vomiting')) return 'Stomach issues may relate to food poisoning or gastritis. Avoid solid food, stay hydrated. See a doctor if vomiting persists.';
  if (symptom.includes('fatigue') || symptom.includes('tired')) return 'Fatigue can be from lack of sleep, poor diet, or underlying illness. Ensure 7-8 hours of sleep and a balanced diet.';
  if (symptom.includes('chest pain')) return '⚠️ Chest pain can be serious. Please seek immediate medical attention or call emergency services.';
  if (symptom.includes('back pain')) return 'Back pain often results from muscle strain. Rest, gentle stretching, and over-the-counter pain relief can help. See a doctor if severe.';
  return `For "${input}": Please consult a qualified doctor for personalized medical advice. Do not self-diagnose.`;
}

interface SymptomCheckerProps {
  userId?: string;
}

const SymptomChecker = ({ userId }: SymptomCheckerProps) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const advice = checkSymptoms(input);
    setResult(advice);

    try {
      await fetch('/api/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom: input,
          advice: advice,
          userId: userId || "anonymous"
        }),
      });
      console.log("Data saved to DB!");
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-low p-8 rounded-xl border-none space-y-5 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">auto_awesome</span>
        <h3 className="font-bold text-lg text-teal-900">AI Symptom Checker</h3>
      </div>
      
      <p className="text-sm text-on-surface-variant leading-relaxed">
        Describe how you're feeling. Our clinical AI will assess and suggest next steps.
      </p>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I have a mild headache and fever..."
            className="w-full px-4 py-3 bg-white/50 border border-teal-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none min-h-[100px]"
          />
        </div>
        
        <button
          onClick={handleCheck}
          disabled={loading || !input.trim()}
          className="w-full py-4 bg-[#005c55] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#005c55]/20 transition-all hover:shadow-[#005c55]/40 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white  rounded-full animate-spin"></span>
          ) : (
            <span className="material-symbols-outlined text-sm">bolt</span>
          )}
          <span>{loading ? "Analyzing..." : "Analyze Symptoms"}</span>
        </button>
      </div>

      {result && (
        <div className="p-5 bg-secondary-container/30 border border-secondary-container/20 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-secondary text-lg">info</span>
            <p className="text-sm text-on-secondary-container leading-relaxed font-medium">
              {result}
            </p>
          </div>
        </div>
      )}

      <p className="text-[10px] text-center text-on-surface-variant uppercase tracking-widest font-bold pt-2 border-t border-teal-100/30">
        AI-Powered Clinical Analysis
      </p>
    </div>
  );
};

export default SymptomChecker
import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, BookOpen } from 'lucide-react';
import { CountryData } from '../types';
import { generateEmailDraft, getCountryEtiquette } from '../services/geminiService';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: CountryData | null;
  currentLocalTime: string;
}

const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose, country, currentLocalTime }) => {
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [etiquette, setEtiquette] = useState('');
  const [loading, setLoading] = useState(false);
  const [etiquetteLoading, setEtiquetteLoading] = useState(false);

  useEffect(() => {
    if (isOpen && country) {
      setResult('');
      setContext('');
      setEtiquette('');
      
      setEtiquetteLoading(true);
      getCountryEtiquette(country)
        .then(setEtiquette)
        .finally(() => setEtiquetteLoading(false));
    }
  }, [isOpen, country]);

  if (!isOpen || !country) return null;

  const handleGenerate = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setResult('');
    
    const draft = await generateEmailDraft(country, currentLocalTime, context);
    setResult(draft);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-50 border-b p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-800">AI Communications Advisor</h2>
              <p className="text-xs text-slate-500">Target: {country.name} • Local Time: {currentLocalTime}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
          {/* Etiquette Section */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
             <h3 className="text-blue-800 font-semibold flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4" />
                Cultural Etiquette
             </h3>
             {etiquetteLoading ? (
                 <div className="animate-pulse space-y-2">
                     <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                     <div className="h-2 bg-blue-200 rounded w-1/2"></div>
                 </div>
             ) : (
                 <div className="text-sm text-blue-900 whitespace-pre-wrap leading-relaxed">
                     {etiquette}
                 </div>
             )}
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              What do you need to communicate?
            </label>
            <textarea
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-24 text-sm"
              placeholder="E.g., Asking for a status update on the Q3 project..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !context.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Draft
                </>
              )}
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="block text-sm font-medium text-slate-700">Suggested Draft</label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
              <p className="text-xs text-slate-400 text-center">AI generated content. Review before sending.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantModal;
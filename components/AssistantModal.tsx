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
      <div className="bg-slate-800 rounded-2xl shadow-2xl shadow-black/40 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-700/50">
        {/* Header */}
        <div className="bg-slate-900/80 border-b border-slate-700/50 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-100">AI Communications Advisor</h2>
              <p className="text-xs text-slate-400">Target: {country.name} • Local Time: {currentLocalTime}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Etiquette Section */}
          <div className="bg-blue-900/30 border border-blue-500/20 rounded-xl p-4">
            <h3 className="text-blue-300 font-semibold flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4" />
              Cultural Etiquette
            </h3>
            {etiquetteLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-2 bg-blue-800 rounded w-3/4"></div>
                <div className="h-2 bg-blue-800 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="text-sm text-blue-200 whitespace-pre-wrap leading-relaxed">
                {etiquette}
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              What do you need to communicate?
            </label>
            <textarea
              className="w-full border border-slate-600/50 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none h-24 text-sm bg-slate-700/50 text-slate-200 placeholder-slate-500"
              placeholder="E.g., Asking for a status update on the Q3 project..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !context.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
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
              <label className="block text-sm font-medium text-slate-300">Suggested Draft</label>
              <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
              <p className="text-xs text-slate-500 text-center">AI generated content. Review before sending.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantModal;
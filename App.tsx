import React, { useState, useEffect } from 'react';
import ClockHeader from './components/ClockHeader';
import WorldTable from './components/WorldTable';
import AssistantModal from './components/AssistantModal';
import { CountryData } from './types';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedLocalTime, setSelectedLocalTime] = useState<string>('');

  // Update clock every minute (or second if we want second hand, keeping it efficient with 10s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAssistantRequest = (country: CountryData, localTime: string) => {
    setSelectedCountry(country);
    setSelectedLocalTime(localTime);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-12">
      <ClockHeader currentTime={currentTime} />
      
      <main className="max-w-[95vw] mx-auto px-4 -mt-8 relative z-10">
        <div className="grid gap-6">
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-white/20 shadow-sm mb-4">
             <h2 className="text-xl font-bold text-slate-800 mb-2">全球商务联络最佳时机 (Global Reach Analyzer)</h2>
             <p className="text-slate-600 max-w-2xl leading-relaxed">
               下表列出了各个国家/地区的当前时间。
               <span className="text-blue-700 font-semibold bg-blue-50 px-1 rounded mx-1">最佳发信时间 (北京)</span> 
               列为您自动换算了当地人最可能查看邮件的时间窗口（通常为当地 09:00-11:00 或 14:00-16:00）。
               <br/>
               <span className="text-xs text-slate-400 mt-1 block">
                  The table calculates the optimal time to send emails based on local business hours, converted to your Beijing Time.
               </span>
             </p>
          </div>

          <WorldTable 
            currentTime={currentTime} 
            onAssistantRequest={handleAssistantRequest}
          />
        </div>
      </main>

      <AssistantModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        country={selectedCountry}
        currentLocalTime={selectedLocalTime}
      />
      
      <footer className="max-w-7xl mx-auto px-6 mt-12 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Global Reach Analyzer. Times are approximations based on standard business hours.</p>
      </footer>
    </div>
  );
};

export default App;
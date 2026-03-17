import React, { useState, useEffect } from 'react';
import ClockHeader from './components/ClockHeader';
import WorldTable from './components/WorldTable';
import AssistantModal from './components/AssistantModal';
import CountryDetailPanel from './components/CountryDetailPanel';
import { useTheme } from './ThemeContext';
import { CountryData } from './types';

const App: React.FC = () => {
  const { isDark } = useTheme();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedLocalTime, setSelectedLocalTime] = useState<string>('');
  const [selectedCountryIso3, setSelectedCountryIso3] = useState<string | null>(null);

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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0F172A]' : 'bg-slate-100'}`}>
      <ClockHeader currentTime={currentTime} />

      <main className="max-w-[95vw] mx-auto px-4 pt-5 pb-8">
        <WorldTable
          currentTime={currentTime}
          onAssistantRequest={handleAssistantRequest}
          onCountryClick={(iso3) => setSelectedCountryIso3(iso3)}
        />
      </main>

      <AssistantModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        country={selectedCountry}
        currentLocalTime={selectedLocalTime}
      />

      <CountryDetailPanel
        iso3={selectedCountryIso3}
        onClose={() => setSelectedCountryIso3(null)}
      />
    </div>
  );
};

export default App;
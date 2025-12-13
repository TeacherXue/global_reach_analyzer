import React from 'react';
import { Clock } from 'lucide-react';

interface ClockHeaderProps {
  currentTime: Date;
}

const ClockHeader: React.FC<ClockHeaderProps> = ({ currentTime }) => {
  // Format: HH:mm:ss
  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai'
  }).format(currentTime);

  const dateStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Shanghai'
  }).format(currentTime);

  return (
    <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-8 h-8 text-blue-400" />
            Global Reach Analyzer
          </h1>
          <p className="text-blue-200 text-sm mt-1">Optimize your international communication timing</p>
        </div>
        
        <div className="flex flex-col items-end bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
          <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">Beijing Time (CST)</span>
          <div className="text-4xl font-mono font-bold tracking-tight text-white shadow-black drop-shadow-md">
            {timeStr}
          </div>
          <div className="text-sm text-blue-100 font-medium">
            {dateStr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockHeader;
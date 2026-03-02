import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Send, Clock } from 'lucide-react';

interface ClockHeaderProps {
  currentTime: Date;
}

const ClockHeader: React.FC<ClockHeaderProps> = ({ currentTime }) => {
  const navigate = useNavigate();

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
    <header className="relative overflow-hidden">
      {/* Background with gradient + subtle mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.06)_0%,_transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-[95vw] mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-4">

          {/* Left — Brand + Quick Stats */}
          <div className="flex items-center gap-5">
            {/* Logo Mark */}
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Send className="w-6 h-6 text-white -rotate-12" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Global Reach Analyzer
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">全球商务联络 · 最佳发信时机</p>
            </div>
          </div>

          {/* Center — Beijing Clock (hero element) */}
          <div className="hidden md:flex items-center gap-3 bg-slate-800/60 pl-4 pr-5 py-2.5 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-widest leading-none">北京时间</span>
              <div className="text-2xl font-mono font-bold text-white tracking-tight leading-tight mt-0.5">
                {timeStr}
              </div>
            </div>
            <div className="text-xs text-slate-500 ml-1 flex flex-col items-start">
              <span>{dateStr}</span>
              <span className="text-[10px] text-slate-600">CST (UTC+8)</span>
            </div>
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile clock */}
            <div className="md:hidden text-right">
              <div className="text-lg font-mono font-bold text-white">{timeStr}</div>
              <div className="text-[10px] text-slate-500">北京时间</div>
            </div>

            {/* Language Map */}
            <button
              onClick={() => navigate('/language-map')}
              className="group flex items-center gap-2 px-4 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 rounded-xl transition-all border border-emerald-500/20 hover:border-emerald-400/40 font-medium text-sm"
            >
              <Globe className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">语言地图</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </header>
  );
};

export default ClockHeader;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Send, Clock, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface ClockHeaderProps {
  currentTime: Date;
}

const ClockHeader: React.FC<ClockHeaderProps> = ({ currentTime }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

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
      <div className={`absolute inset-0 ${isDark
        ? 'bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900'
        : 'bg-gradient-to-br from-white via-blue-50/80 to-slate-50'
        }`} />
      <div className={`absolute inset-0 ${isDark
        ? 'bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08)_0%,_transparent_60%)]'
        : 'bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.06)_0%,_transparent_60%)]'
        }`} />
      <div className={`absolute inset-0 ${isDark
        ? 'bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.06)_0%,_transparent_60%)]'
        : 'bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.04)_0%,_transparent_60%)]'
        }`} />

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
              <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 ${isDark ? 'border-slate-900' : 'border-white'} animate-pulse`} />
            </div>

            {/* Title */}
            <div>
              <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Global Reach Analyzer
              </h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>全球商务联络 · 最佳发信时机</p>
            </div>
          </div>

          {/* Center — Beijing Clock (hero element) */}
          <div className={`hidden md:flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-2xl backdrop-blur-sm ${isDark
            ? 'bg-slate-800/60 border border-slate-700/40'
            : 'bg-white/80 border border-slate-200 shadow-sm'
            }`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark
              ? 'bg-blue-500/10 border border-blue-500/20'
              : 'bg-blue-50 border border-blue-200'
              }`}>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-widest leading-none">北京时间</span>
              <div className={`text-2xl font-mono font-bold tracking-tight leading-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {timeStr}
              </div>
            </div>
            <div className={`text-xs ml-1 flex flex-col items-start ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>{dateStr}</span>
              <span className={`text-[10px] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>CST (UTC+8)</span>
            </div>
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile clock */}
            <div className="md:hidden text-right">
              <div className={`text-lg font-mono font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{timeStr}</div>
              <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>北京时间</div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark
                ? 'bg-slate-800/60 hover:bg-slate-700 text-amber-400 border border-slate-700/40'
                : 'bg-white/80 hover:bg-amber-50 text-amber-500 border border-slate-200 shadow-sm'
                }`}
              title={isDark ? '切换浅色主题' : '切换深色主题'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Language Map */}
            <button
              onClick={() => navigate('/language-map')}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${isDark
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/20 hover:border-emerald-400/40'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 hover:border-emerald-300'
                }`}
            >
              <Globe className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">世界地图</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom border glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark
        ? 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'
        : 'bg-gradient-to-r from-transparent via-blue-300/30 to-transparent'
        }`} />
    </header>
  );
};

export default ClockHeader;
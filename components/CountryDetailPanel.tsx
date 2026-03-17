import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ExternalLink, BookOpen, Globe, Clock, Mail, MessageCircle, Map, Sun, Moon, ChevronRight } from 'lucide-react';
import { getCountryInfo, getEnglishProficiencyLabel, getWhatsappPopularityLabel, MESSENGER_INFO } from '../languageData';
import { getYellowPages, getAvailableCategories, getYellowPagesCount, YellowPagesEntry, YellowPagesCategory } from '../yellowPagesData';
import { useTheme } from '../ThemeContext';

// Timezone data (reused from LanguageMap)
const COUNTRY_TIMEZONES: Record<string, { offset: number; timezone: string }> = {
    USA: { offset: -5, timezone: 'America/New_York' },
    CAN: { offset: -5, timezone: 'America/Toronto' },
    MEX: { offset: -6, timezone: 'America/Mexico_City' },
    BRA: { offset: -3, timezone: 'America/Sao_Paulo' },
    ARG: { offset: -3, timezone: 'America/Buenos_Aires' },
    GBR: { offset: 0, timezone: 'Europe/London' },
    DEU: { offset: 1, timezone: 'Europe/Berlin' },
    FRA: { offset: 1, timezone: 'Europe/Paris' },
    ITA: { offset: 1, timezone: 'Europe/Rome' },
    ESP: { offset: 1, timezone: 'Europe/Madrid' },
    RUS: { offset: 3, timezone: 'Europe/Moscow' },
    CHN: { offset: 8, timezone: 'Asia/Shanghai' },
    JPN: { offset: 9, timezone: 'Asia/Tokyo' },
    KOR: { offset: 9, timezone: 'Asia/Seoul' },
    IND: { offset: 5.5, timezone: 'Asia/Kolkata' },
    AUS: { offset: 10, timezone: 'Australia/Sydney' },
    NZL: { offset: 12, timezone: 'Pacific/Auckland' },
    SAU: { offset: 3, timezone: 'Asia/Riyadh' },
    ARE: { offset: 4, timezone: 'Asia/Dubai' },
    TUR: { offset: 3, timezone: 'Europe/Istanbul' },
    ZAF: { offset: 2, timezone: 'Africa/Johannesburg' },
    EGY: { offset: 2, timezone: 'Africa/Cairo' },
    NGA: { offset: 1, timezone: 'Africa/Lagos' },
    IDN: { offset: 7, timezone: 'Asia/Jakarta' },
    THA: { offset: 7, timezone: 'Asia/Bangkok' },
    VNM: { offset: 7, timezone: 'Asia/Ho_Chi_Minh' },
    MYS: { offset: 8, timezone: 'Asia/Kuala_Lumpur' },
    SGP: { offset: 8, timezone: 'Asia/Singapore' },
    PHL: { offset: 8, timezone: 'Asia/Manila' },
    PAK: { offset: 5, timezone: 'Asia/Karachi' },
    IRN: { offset: 3.5, timezone: 'Asia/Tehran' },
    ISR: { offset: 2, timezone: 'Asia/Jerusalem' },
    POL: { offset: 1, timezone: 'Europe/Warsaw' },
    NLD: { offset: 1, timezone: 'Europe/Amsterdam' },
    SWE: { offset: 1, timezone: 'Europe/Stockholm' },
    NOR: { offset: 1, timezone: 'Europe/Oslo' },
    CHE: { offset: 1, timezone: 'Europe/Zurich' },
    PRT: { offset: 0, timezone: 'Europe/Lisbon' },
    GRC: { offset: 2, timezone: 'Europe/Athens' },
    UKR: { offset: 2, timezone: 'Europe/Kiev' },
    CHL: { offset: -4, timezone: 'America/Santiago' },
    COL: { offset: -5, timezone: 'America/Bogota' },
    PER: { offset: -5, timezone: 'America/Lima' },
    VEN: { offset: -4, timezone: 'America/Caracas' },
    KAZ: { offset: 6, timezone: 'Asia/Almaty' },
    HKG: { offset: 8, timezone: 'Asia/Hong_Kong' },
    TWN: { offset: 8, timezone: 'Asia/Taipei' },
};

type TabId = 'overview' | 'yellowpages';

interface Tab {
    id: TabId;
    label: string;
    icon: React.ReactNode;
}

const TABS: Tab[] = [
    { id: 'overview', label: '概览', icon: <Globe className="w-4 h-4" /> },
    { id: 'yellowpages', label: '黄页', icon: <BookOpen className="w-4 h-4" /> },
    // Future tabs can be added here:
    // { id: 'market', label: '市场分析', icon: <BarChart className="w-4 h-4" /> },
    // { id: 'trade', label: '贸易数据', icon: <TrendingUp className="w-4 h-4" /> },
];

interface CountryDetailPanelProps {
    iso3: string | null;
    onClose: () => void;
}

const CountryDetailPanel: React.FC<CountryDetailPanelProps> = ({ iso3, onClose }) => {
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [isVisible, setIsVisible] = useState(false);

    // Animate in
    useEffect(() => {
        if (iso3) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setIsVisible(true));
            });
            setActiveTab('overview');
        } else {
            setIsVisible(false);
        }
    }, [iso3]);

    const countryInfo = useMemo(() => iso3 ? getCountryInfo(iso3) : null, [iso3]);
    const yellowPages = useMemo(() => iso3 ? getYellowPages(iso3) : null, [iso3]);
    const availableCategories = useMemo(() => iso3 ? getAvailableCategories(iso3) : [], [iso3]);
    const ypCount = useMemo(() => iso3 ? getYellowPagesCount(iso3) : 0, [iso3]);

    // Time info
    const timeInfo = useMemo(() => {
        if (!iso3) return null;
        const tzInfo = COUNTRY_TIMEZONES[iso3];
        if (!tzInfo) return null;
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('zh-CN', {
                timeZone: tzInfo.timezone,
                hour: '2-digit', minute: '2-digit',
                hour12: false,
            });
            const hourFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tzInfo.timezone,
                hour: 'numeric', hour12: false,
            });
            const hour = parseInt(hourFormatter.format(now));
            const offsetDiff = 8 - tzInfo.offset;
            const morningBj = ((9 + offsetDiff) % 24 + 24) % 24;
            const afternoonBj = ((14 + offsetDiff) % 24 + 24) % 24;
            return {
                timeStr: formatter.format(now),
                isDaytime: hour >= 6 && hour < 18,
                isWorkHour: hour >= 9 && hour < 18,
                utcOffset: tzInfo.offset >= 0 ? `UTC+${tzInfo.offset}` : `UTC${tzInfo.offset}`,
                morningBj: `${String(morningBj).padStart(2, '0')}:00`,
                afternoonBj: `${String(afternoonBj).padStart(2, '0')}:00`,
            };
        } catch { return null; }
    }, [iso3]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }, [onClose]);

    if (!iso3) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isDark ? 'bg-black/30' : 'bg-black/15'} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handleClose}
            />

            {/* Panel */}
            <div
                className={`fixed right-0 top-0 h-full w-[440px] max-w-[90vw] z-50 flex flex-col transition-transform duration-300 ease-out ${isVisible ? 'translate-x-0' : 'translate-x-full'} ${isDark
                    ? 'bg-slate-900 border-l border-slate-700/70 shadow-2xl shadow-black/40'
                    : 'bg-white border-l border-slate-200 shadow-2xl shadow-slate-300/40'
                    }`}
            >
                {/* Header */}
                <div className={`flex-shrink-0 border-b ${isDark ? 'border-slate-700/70 bg-slate-800/60' : 'border-slate-100 bg-slate-50'}`}>
                    <div className="flex items-center justify-between p-4 pb-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-3xl flex-shrink-0">{countryInfo?.flag || '🏳️'}</span>
                            <div className="min-w-0">
                                <h2 className={`text-lg font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                    {countryInfo?.name || iso3}
                                </h2>
                                <p className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {countryInfo?.nameEn || ''}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isDark
                                ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                                : 'hover:bg-slate-200 text-slate-400 hover:text-slate-700'
                                }`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex px-4 gap-1">
                        {TABS.map(tab => {
                            const isActive = activeTab === tab.id;
                            const badge = tab.id === 'yellowpages' && ypCount > 0 ? ypCount : null;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative ${isActive
                                        ? isDark
                                            ? 'bg-slate-900 text-white border-t-2 border-x border-t-blue-500 border-x-slate-700/50'
                                            : 'bg-white text-slate-800 border-t-2 border-x border-t-blue-500 border-x-slate-200'
                                        : isDark
                                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                    {badge !== null && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-1 ${isActive
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : isDark ? 'bg-slate-600 text-slate-400' : 'bg-slate-200 text-slate-500'
                                            }`}>
                                            {badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content — Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'overview' && countryInfo && (
                        <OverviewTab countryInfo={countryInfo} timeInfo={timeInfo} isDark={isDark} />
                    )}
                    {activeTab === 'yellowpages' && (
                        <YellowPagesTab
                            iso3={iso3}
                            yellowPages={yellowPages}
                            categories={availableCategories}
                            countryName={countryInfo?.name || iso3}
                            isDark={isDark}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

// ——— Overview Tab ———
interface OverviewTabProps {
    countryInfo: NonNullable<ReturnType<typeof getCountryInfo>>;
    timeInfo: {
        timeStr: string;
        isDaytime: boolean;
        isWorkHour: boolean;
        utcOffset: string;
        morningBj: string;
        afternoonBj: string;
    } | null;
    isDark: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ countryInfo, timeInfo, isDark }) => {
    const englishLabel = getEnglishProficiencyLabel(countryInfo.englishProficiency);
    const whatsappLabel = getWhatsappPopularityLabel(countryInfo.whatsappPopularity);

    return (
        <div className="p-4 space-y-4">
            {/* Language Card */}
            <div className={`rounded-xl p-4 border ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> 语言信息
                </h3>
                <div className="space-y-2.5 text-sm">
                    <InfoRow label="母语" value={countryInfo.primaryLanguage} isDark={isDark} />
                    {countryInfo.secondaryLanguages.length > 0 && (
                        <InfoRow label="第二语言" value={countryInfo.secondaryLanguages.join(', ')} isDark={isDark} />
                    )}
                    <InfoRow
                        label="英语水平"
                        value={englishLabel.text}
                        isDark={isDark}
                        valueClass={
                            countryInfo.englishProficiency === 'native' ? 'text-green-400' :
                                countryInfo.englishProficiency === 'high' ? 'text-blue-400' :
                                    countryInfo.englishProficiency === 'medium' ? 'text-amber-400' :
                                        'text-red-400'
                        }
                    />
                </div>
            </div>

            {/* Business Communication Card */}
            <div className={`rounded-xl p-4 border ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> 商务沟通建议
                </h3>
                <div className="space-y-2.5 text-sm">
                    <InfoRow label="开发信语言" value={countryInfo.businessLang} isDark={isDark} valueClass="text-green-400 font-bold" />
                    {countryInfo.businessLangAlt && (
                        <InfoRow label="备选语言" value={countryInfo.businessLangAlt} isDark={isDark} />
                    )}
                    <InfoRow label="Google地图" value={countryInfo.googleMapsLang} isDark={isDark} />
                    <div className="flex justify-between gap-4">
                        <span className={`flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            <MessageCircle className="w-3 h-3" /> 推荐 IM
                        </span>
                        <span className={isDark ? 'text-white' : 'text-slate-800'}>
                            {MESSENGER_INFO[countryInfo.preferredMessenger]?.icon} {MESSENGER_INFO[countryInfo.preferredMessenger]?.name}
                        </span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>WhatsApp 普及度</span>
                        <span className={`font-medium ${countryInfo.whatsappPopularity === 'high' ? 'text-green-400' :
                            countryInfo.whatsappPopularity === 'medium' ? 'text-amber-400' :
                                'text-red-400'
                            }`}>
                            {whatsappLabel.text}
                        </span>
                    </div>
                </div>
                {countryInfo.businessNote && (
                    <div className={`mt-3 p-2.5 rounded-lg text-xs italic leading-relaxed ${isDark ? 'bg-slate-700/40 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        💡 {countryInfo.businessNote}
                    </div>
                )}
            </div>

            {/* Time Card */}
            {timeInfo && (
                <div className={`rounded-xl p-4 border ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                    <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> 时间信息
                    </h3>
                    <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between items-center gap-4">
                            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>当地时间</span>
                            <span className={`font-mono font-bold text-lg flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                {timeInfo.timeStr}
                                {timeInfo.isDaytime ? (
                                    <Sun className="w-4 h-4 text-yellow-400" />
                                ) : (
                                    <Moon className="w-4 h-4 text-blue-300" />
                                )}
                                {timeInfo.isWorkHour && (
                                    <span className="text-[10px] bg-green-600 px-1.5 py-0.5 rounded text-white font-sans font-medium">工作中</span>
                                )}
                            </span>
                        </div>
                        <InfoRow label="时区" value={timeInfo.utcOffset} isDark={isDark} />
                    </div>
                    <div className={`mt-3 p-2.5 rounded-lg border ${isDark ? 'bg-amber-900/20 border-amber-800/30' : 'bg-amber-50 border-amber-200'}`}>
                        <div className={`text-xs mb-1.5 font-medium ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>🇨🇳 最佳联系时间（北京时间）</div>
                        <div className="flex justify-between text-xs">
                            <span className={`flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                <Sun className="w-3 h-3 text-amber-400" />
                                早间: <span className={`font-bold ml-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{timeInfo.morningBj}</span>
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                <Moon className="w-3 h-3 text-blue-400" />
                                午后: <span className={`font-bold ml-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{timeInfo.afternoonBj}</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ——— Yellow Pages Tab ———
interface YellowPagesTabProps {
    iso3: string;
    yellowPages: Record<string, YellowPagesEntry[]> | null;
    categories: YellowPagesCategory[];
    countryName: string;
    isDark: boolean;
}

const YellowPagesTab: React.FC<YellowPagesTabProps> = ({ iso3, yellowPages, categories, countryName, isDark }) => {
    if (!yellowPages || categories.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>暂无 {countryName} 的黄页数据</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Yellow Pages data not available yet</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-3">
            {categories.map(category => {
                const entries = yellowPages[category.id] || [];
                if (entries.length === 0) return null;
                return (
                    <div key={category.id} className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/40' : 'bg-white border-slate-200'}`}>
                        {/* Category Header */}
                        <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${isDark ? 'bg-slate-800/80 border-slate-700/40' : 'bg-slate-50 border-slate-100'}`}>
                            <span className="text-base">{category.icon}</span>
                            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>{category.name}</span>
                            <span className={`text-xs ml-auto ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{entries.length}</span>
                        </div>
                        {/* Entries */}
                        <div className={`divide-y ${isDark ? 'divide-slate-700/30' : 'divide-slate-100'}`}>
                            {entries.map((entry, idx) => (
                                <a
                                    key={idx}
                                    href={entry.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer ${isDark ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'}`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className={`text-sm font-medium transition-colors truncate ${isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-500 group-hover:text-blue-600'}`}>
                                                {entry.name}
                                            </span>
                                            <ExternalLink className={`w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-500'}`} />
                                        </div>
                                        <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{entry.description}</p>
                                        {entry.tags && entry.tags.length > 0 && (
                                            <div className="flex gap-1 mt-1.5">
                                                {entry.tags.map(tag => (
                                                    <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${tag === '免费' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
                                                        tag === '官方' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' :
                                                            tag === '付费' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                                                                isDark ? 'bg-slate-600/50 text-slate-400 border border-slate-600/30' : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                        }`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <ChevronRight className={`w-4 h-4 mt-1 flex-shrink-0 transition-colors ${isDark ? 'text-slate-600 group-hover:text-slate-400' : 'text-slate-300 group-hover:text-slate-500'}`} />
                                </a>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// ——— Helper Components ———
const InfoRow: React.FC<{ label: string; value: string; valueClass?: string; isDark?: boolean }> = ({ label, value, valueClass, isDark = true }) => (
    <div className="flex justify-between gap-4">
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{label}</span>
        <span className={`font-medium ${valueClass || (isDark ? 'text-white' : 'text-slate-800')}`}>{value}</span>
    </div>
);

export default CountryDetailPanel;

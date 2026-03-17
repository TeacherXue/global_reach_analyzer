import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Line,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { ArrowLeft, Globe, Info, Tag, MessageCircle, Map, Mail, Download, Search, Clock, Sun, Moon } from 'lucide-react';
import { MAJOR_LANGUAGES, COUNTRY_LANGUAGES, getEnglishProficiencyLabel, getCountryInfo, getWhatsappPopularityLabel, MESSENGER_INFO, CountryLanguageInfo } from '../languageData';
import CountryDetailPanel from './CountryDetailPanel';
import { useTheme } from '../ThemeContext';

// Timezone data for countries (UTC offset in hours)
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

// Very small countries/territories that are NOT visible on the 110m resolution map
const SMALL_COUNTRY_MARKERS: Array<{ iso3: string; coordinates: [number, number]; name: string; flag: string }> = [
  { iso3: 'SGP', coordinates: [103.8198, 1.3521], name: '新加坡', flag: '🇸🇬' },
  { iso3: 'HKG', coordinates: [114.1694, 22.3193], name: '香港', flag: '🇭🇰' },
  { iso3: 'MAC', coordinates: [113.5439, 22.1987], name: '澳门', flag: '🇲🇴' },
  { iso3: 'BHR', coordinates: [50.5577, 26.0667], name: '巴林', flag: '🇧🇭' },
  { iso3: 'LUX', coordinates: [6.1296, 49.8153], name: '卢森堡', flag: '🇱🇺' },
  { iso3: 'MLT', coordinates: [14.3754, 35.9375], name: '马耳他', flag: '🇲🇹' },
  { iso3: 'MUS', coordinates: [57.5522, -20.3484], name: '毛里求斯', flag: '🇲🇺' },
  { iso3: 'MDV', coordinates: [73.2207, 3.2028], name: '马尔代夫', flag: '🇲🇻' },
  { iso3: 'SYC', coordinates: [55.4920, -4.6796], name: '塞舌尔', flag: '🇸🇨' },
  { iso3: 'CPV', coordinates: [-23.5087, 14.9330], name: '佛得角', flag: '🇨🇻' },
  { iso3: 'COM', coordinates: [43.8723, -11.6455], name: '科摩罗', flag: '🇰🇲' },
];

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Mapping from ISO numeric codes to ISO alpha-3 codes (comprehensive list)
const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
  // A
  '4': 'AFG', '8': 'ALB', '12': 'DZA', '16': 'ASM', '20': 'AND', '24': 'AGO',
  '28': 'ATG', '32': 'ARG', '51': 'ARM', '533': 'ABW', '36': 'AUS', '40': 'AUT',
  '31': 'AZE',
  // B
  '44': 'BHS', '48': 'BHR', '50': 'BGD', '52': 'BRB', '112': 'BLR', '56': 'BEL',
  '84': 'BLZ', '204': 'BEN', '60': 'BMU', '64': 'BTN', '68': 'BOL', '70': 'BIH',
  '72': 'BWA', '76': 'BRA', '92': 'VGB', '96': 'BRN', '100': 'BGR', '854': 'BFA',
  '108': 'BDI',
  // C
  '116': 'KHM', '120': 'CMR', '124': 'CAN', '132': 'CPV', '136': 'CYM', '140': 'CAF',
  '148': 'TCD', '152': 'CHL', '156': 'CHN', '170': 'COL', '174': 'COM', '178': 'COG',
  '180': 'COD', '184': 'COK', '188': 'CRI', '191': 'HRV', '192': 'CUB', '531': 'CUW',
  '196': 'CYP', '203': 'CZE',
  // D
  '208': 'DNK', '262': 'DJI', '212': 'DMA', '214': 'DOM',
  // E
  '218': 'ECU', '818': 'EGY', '222': 'SLV', '226': 'GNQ', '232': 'ERI', '233': 'EST',
  '231': 'ETH', '748': 'SWZ',
  // F
  '238': 'FLK', '234': 'FRO', '242': 'FJI', '246': 'FIN', '250': 'FRA', '254': 'GUF',
  '258': 'PYF', '260': 'ATF',
  // G
  '266': 'GAB', '270': 'GMB', '268': 'GEO', '276': 'DEU', '288': 'GHA', '292': 'GIB',
  '300': 'GRC', '304': 'GRL', '308': 'GRD', '312': 'GLP', '316': 'GUM', '320': 'GTM',
  '324': 'GIN', '624': 'GNB', '328': 'GUY',
  // H
  '332': 'HTI', '336': 'VAT', '340': 'HND', '344': 'HKG', '348': 'HUN',
  // I
  '352': 'ISL', '356': 'IND', '360': 'IDN', '364': 'IRN', '368': 'IRQ', '372': 'IRL',
  '833': 'IMN', '376': 'ISR', '380': 'ITA', '384': 'CIV',
  // J
  '388': 'JAM', '392': 'JPN', '832': 'JEY', '400': 'JOR',
  // K
  '398': 'KAZ', '404': 'KEN', '296': 'KIR', '408': 'PRK', '410': 'KOR', '414': 'KWT',
  '417': 'KGZ',
  // L
  '418': 'LAO', '428': 'LVA', '422': 'LBN', '426': 'LSO', '430': 'LBR', '434': 'LBY',
  '438': 'LIE', '440': 'LTU', '442': 'LUX',
  // M
  '446': 'MAC', '807': 'MKD', '450': 'MDG', '454': 'MWI', '458': 'MYS', '462': 'MDV',
  '466': 'MLI', '470': 'MLT', '584': 'MHL', '474': 'MTQ', '478': 'MRT', '480': 'MUS',
  '175': 'MYT', '484': 'MEX', '583': 'FSM', '498': 'MDA', '492': 'MCO', '496': 'MNG',
  '499': 'MNE', '500': 'MSR', '504': 'MAR', '508': 'MOZ', '104': 'MMR',
  // N
  '516': 'NAM', '520': 'NRU', '524': 'NPL', '528': 'NLD', '540': 'NCL', '554': 'NZL',
  '558': 'NIC', '562': 'NER', '566': 'NGA', '570': 'NIU', '574': 'NFK', '580': 'MNP',
  '578': 'NOR',
  // O
  '512': 'OMN',
  // P
  '586': 'PAK', '585': 'PLW', '275': 'PSE', '591': 'PAN', '598': 'PNG', '600': 'PRY',
  '604': 'PER', '608': 'PHL', '612': 'PCN', '616': 'POL', '620': 'PRT', '630': 'PRI',
  // Q
  '634': 'QAT',
  // R
  '638': 'REU', '642': 'ROU', '643': 'RUS', '646': 'RWA',
  // S
  '652': 'BLM', '654': 'SHN', '659': 'KNA', '662': 'LCA', '663': 'MAF', '666': 'SPM',
  '670': 'VCT', '882': 'WSM', '674': 'SMR', '678': 'STP', '682': 'SAU', '686': 'SEN',
  '688': 'SRB', '690': 'SYC', '694': 'SLE', '702': 'SGP', '534': 'SXM', '703': 'SVK',
  '705': 'SVN', '90': 'SLB', '706': 'SOM', '710': 'ZAF', '239': 'SGS', '728': 'SSD',
  '724': 'ESP', '144': 'LKA', '729': 'SDN', '740': 'SUR', '744': 'SJM', '752': 'SWE',
  '756': 'CHE', '760': 'SYR',
  // T
  '158': 'TWN', '762': 'TJK', '834': 'TZA', '764': 'THA', '626': 'TLS', '768': 'TGO',
  '772': 'TKL', '776': 'TON', '780': 'TTO', '788': 'TUN', '792': 'TUR', '795': 'TKM',
  '796': 'TCA', '798': 'TUV',
  // U
  '800': 'UGA', '804': 'UKR', '784': 'ARE', '826': 'GBR', '840': 'USA', '858': 'URY',
  '860': 'UZB',
  // V
  '548': 'VUT', '862': 'VEN', '704': 'VNM', '850': 'VIR',
  // W
  '876': 'WLF', '732': 'ESH',
  // Y
  '887': 'YEM',
  // Z
  '894': 'ZMB', '716': 'ZWE',
  // Special
  '-99': 'XKX', // Kosovo
};

interface TooltipContent {
  name: string;
  nameEn: string;
  flag: string;
  iso3: string;
  primaryLanguage: string;
  secondaryLanguages: string[];
  englishProficiency: string;
  // Business info
  googleMapsLang: string;
  businessLang: string;
  businessLangAlt?: string;
  businessNote?: string;
  preferredMessenger: string;
  whatsappPopularity: string;
  // Time info
  localTime?: string;
  isDaytime?: boolean;
  isWorkHour?: boolean;
  utcOffset?: string;
  morningBj?: string;
  afternoonBj?: string;
  x: number;
  y: number;
}

const LanguageMap: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipContent | null>(null);
  const [position, setPosition] = useState({ coordinates: [150, 0] as [number, number], zoom: 1 });
  const [showLabels, setShowLabels] = useState(true);
  const [showTimezones, setShowTimezones] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CountryLanguageInfo[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const geographiesRef = useRef<any[]>([]);
  const [selectedCountryIso3, setSelectedCountryIso3] = useState<string | null>(null);
  // Save the initial position when component first mounts (East longitude 150 degrees)
  const initialPosition = useMemo(() => ({ coordinates: [150, 0] as [number, number], zoom: 1 }), []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to selected item when using keyboard
  useEffect(() => {
    if (selectedIndex >= 0 && searchResultsRef.current) {
      const selectedElement = searchResultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Get local time for a country
  const getCountryTime = useCallback((iso3: string) => {
    const tzInfo = COUNTRY_TIMEZONES[iso3];
    if (!tzInfo) return null;

    try {
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: tzInfo.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const timeStr = formatter.format(currentTime);

      // Get day/night status
      const hourFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tzInfo.timezone,
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(hourFormatter.format(currentTime));
      const isDaytime = hour >= 6 && hour < 18;
      const isWorkHour = hour >= 9 && hour < 18;

      return { timeStr, isDaytime, isWorkHour, hour };
    } catch {
      return null;
    }
  }, [currentTime]);

  // Get best contact time suggestion
  const getBestContactTime = useCallback((iso3: string) => {
    const tzInfo = COUNTRY_TIMEZONES[iso3];
    if (!tzInfo) return null;

    // Calculate Beijing time when it's 9:00-10:00 local time (best morning time)
    const offsetDiff = 8 - tzInfo.offset; // Beijing is UTC+8
    const morningBj = ((9 + offsetDiff) % 24 + 24) % 24;
    const afternoonBj = ((14 + offsetDiff) % 24 + 24) % 24;

    return {
      morningBj: `${String(morningBj).padStart(2, '0')}:00`,
      afternoonBj: `${String(afternoonBj).padStart(2, '0')}:00`,
      utcOffset: tzInfo.offset >= 0 ? `UTC+${tzInfo.offset}` : `UTC${tzInfo.offset}`,
    };
  }, []);

  // Search countries
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setSelectedIndex(-1); // Reset selection when search changes
    if (term.length < 1) {
      setSearchResults([]);
      setShowSearchResults(false);
      // 清空搜索框时恢复到初始位置（页面第一次加载时的位置）
      setPosition(initialPosition);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const results = Object.values(COUNTRY_LANGUAGES).filter(
      (c) => c.name.toLowerCase().includes(lowerTerm) ||
        c.nameEn.toLowerCase().includes(lowerTerm)
    ).slice(0, 10);
    setSearchResults(results);
    setShowSearchResults(true);
  }, [initialPosition]);

  // Export to CSV
  const exportToCSV = useCallback(() => {
    const headers = [
      '国家', 'Country', '国旗', '母语', '第二语言', '英语水平',
      'Google地图语言', '开发信语言', '备选语言', '推荐IM', 'WhatsApp普及度', '商务建议'
    ];

    const rows = Object.values(COUNTRY_LANGUAGES).map((c) => {
      const info = getCountryInfo(c.iso3);
      if (!info) return [];
      return [
        info.name,
        info.nameEn,
        info.flag,
        info.primaryLanguage,
        info.secondaryLanguages.join('; '),
        info.englishProficiency === 'native' ? '母语' :
          info.englishProficiency === 'high' ? '高' :
            info.englishProficiency === 'medium' ? '中' : '低',
        info.googleMapsLang,
        info.businessLang,
        info.businessLangAlt || '',
        MESSENGER_INFO[info.preferredMessenger]?.name || '',
        info.whatsappPopularity === 'high' ? '普及' :
          info.whatsappPopularity === 'medium' ? '一般' : '较少',
        info.businessNote || ''
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `国家语言信息_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }, []);

  // Get countries that speak the selected language
  const highlightedCountries = useMemo(() => {
    if (!selectedLanguage) return new Set<string>();
    const countries = new Set<string>();
    Object.entries(COUNTRY_LANGUAGES).forEach(([iso3, info]) => {
      if (info.languages.includes(selectedLanguage)) {
        countries.add(iso3);
      }
    });
    return countries;
  }, [selectedLanguage]);

  // Handle zoom with mouse wheel
  const handleMoveEnd = useCallback((position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  }, []);

  // Helper to get ISO3 code from geography data
  const getIso3 = useCallback((geo: any): string => {
    const geoId = geo.id;
    const numericId = String(geoId);

    // Remove leading zeros for lookup (e.g., '036' -> '36')
    const numericIdNoLeadingZeros = String(parseInt(numericId, 10));

    // 1. First try numeric ID mapping with original format
    if (ISO_NUMERIC_TO_ALPHA3[numericId]) {
      return ISO_NUMERIC_TO_ALPHA3[numericId];
    }

    // 2. Try without leading zeros (world-atlas uses '036' but our map has '36')
    if (ISO_NUMERIC_TO_ALPHA3[numericIdNoLeadingZeros]) {
      return ISO_NUMERIC_TO_ALPHA3[numericIdNoLeadingZeros];
    }

    // 3. Check if geo.id is already a 3-letter ISO code
    if (typeof geoId === 'string' && /^[A-Z]{3}$/.test(geoId)) {
      return geoId;
    }

    // 4. Try ISO_A3 property from various possible property names
    const props = geo.properties || {};
    const possibleIso3 = props.ISO_A3 || props.iso_a3 || props.ISO3 || props.iso3 ||
      props.ADM0_A3 || props.adm0_a3 || props.ISO_A3_EH;
    if (possibleIso3 && possibleIso3 !== '-99' && /^[A-Z]{3}$/.test(possibleIso3)) {
      return possibleIso3;
    }

    // 5. Fallback
    return numericId;
  }, []);

  // Focus on a country by ISO3 code
  const focusOnCountry = useCallback((iso3: string) => {
    // Find the geography object for this country
    const geo = geographiesRef.current.find((g) => {
      const geoIso3 = getIso3(g);
      return geoIso3 === iso3;
    });

    if (geo) {
      try {
        const centroid = geoCentroid(geo);
        // Set map position to country center with zoom level 3
        setPosition({
          coordinates: centroid as [number, number],
          zoom: 3,
        });
      } catch (error) {
        console.error('Error focusing on country:', error);
      }
    } else {
      // If not found in main geographies, check small country markers
      const smallCountry = SMALL_COUNTRY_MARKERS.find((c) => c.iso3 === iso3);
      if (smallCountry) {
        setPosition({
          coordinates: smallCountry.coordinates as [number, number],
          zoom: 3,
        });
      }
    }
  }, [getIso3]);

  // Handle keyboard navigation in search results
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          const country = searchResults[selectedIndex];
          setShowSearchResults(false);
          focusOnCountry(country.iso3);
        } else if (searchResults.length > 0) {
          // If nothing selected, select the first one
          const country = searchResults[0];
          setShowSearchResults(false);
          focusOnCountry(country.iso3);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSearchResults(false);
        setSelectedIndex(-1);
        break;
    }
  }, [showSearchResults, searchResults, selectedIndex, focusOnCountry]);

  // Handle mouse enter on country
  const handleMouseEnter = useCallback((geo: any, event: React.MouseEvent) => {
    const iso3 = getIso3(geo);
    const countryInfo = getCountryInfo(iso3);
    const timeInfo = getCountryTime(iso3);
    const contactTime = getBestContactTime(iso3);

    if (countryInfo) {
      const englishLabel = getEnglishProficiencyLabel(countryInfo.englishProficiency);
      setTooltip({
        name: countryInfo.name,
        nameEn: countryInfo.nameEn,
        flag: countryInfo.flag,
        iso3: iso3,
        primaryLanguage: countryInfo.primaryLanguage,
        secondaryLanguages: countryInfo.secondaryLanguages,
        englishProficiency: englishLabel.text,
        googleMapsLang: countryInfo.googleMapsLang,
        businessLang: countryInfo.businessLang,
        businessLangAlt: countryInfo.businessLangAlt,
        businessNote: countryInfo.businessNote,
        preferredMessenger: countryInfo.preferredMessenger,
        whatsappPopularity: countryInfo.whatsappPopularity,
        localTime: timeInfo?.timeStr,
        isDaytime: timeInfo?.isDaytime,
        isWorkHour: timeInfo?.isWorkHour,
        utcOffset: contactTime?.utcOffset,
        morningBj: contactTime?.morningBj,
        afternoonBj: contactTime?.afternoonBj,
        x: event.clientX,
        y: event.clientY,
      });
    } else {
      // For countries not in our data, show basic info
      const geoName = geo.properties?.NAME || geo.properties?.name || geo.properties?.ADMIN || 'Unknown';
      setTooltip({
        name: geoName,
        nameEn: geoName,
        flag: '🏳️',
        iso3: iso3,
        primaryLanguage: '未收录',
        secondaryLanguages: [],
        englishProficiency: '-',
        googleMapsLang: '-',
        businessLang: '-',
        preferredMessenger: 'other',
        whatsappPopularity: 'medium',
        x: event.clientX,
        y: event.clientY,
      });
    }
  }, [getIso3, getCountryTime, getBestContactTime]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (tooltip) {
      setTooltip(prev => prev ? { ...prev, x: event.clientX, y: event.clientY } : null);
    }
  }, [tooltip]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Get fill color for country based on primary language
  // Map Chinese language names to colors - expanded for China trade partners
  const getPrimaryLanguageColor = useCallback((primaryLanguage: string): string | null => {
    const langMap: Record<string, string> = {
      // 原有10种主要语言
      '英语': '#3B82F6',      // English - blue
      '中文': '#EF4444',      // Chinese - red
      '西班牙语': '#F59E0B',   // Spanish - amber
      '阿拉伯语': '#10B981',   // Arabic - emerald
      '法语': '#8B5CF6',      // French - violet
      '俄语': '#EC4899',      // Russian - pink
      '葡萄牙语': '#14B8A6',   // Portuguese - teal
      '德语': '#F97316',      // German - orange
      '日语': '#6366F1',      // Japanese - indigo
      '印地语': '#84CC16',    // Hindi - lime

      // 东亚/东南亚 - 中国重要贸易伙伴
      '韩语': '#0EA5E9',      // Korean - sky blue
      '越南语': '#22C55E',    // Vietnamese - green
      '泰语': '#A855F7',      // Thai - purple
      '印尼语': '#DC2626',    // Indonesian - red-600
      '马来语': '#0891B2',    // Malay - cyan
      '菲律宾语': '#4ADE80',  // Filipino - green-400
      '他加禄语': '#4ADE80',  // Tagalog - same as Filipino
      '缅甸语': '#FBBF24',    // Burmese - yellow
      '高棉语': '#7C3AED',    // Khmer - violet
      '老挝语': '#059669',    // Lao - emerald-600
      '蒙古语': '#0284C7',    // Mongolian - sky-600

      // 南亚 - 重要贸易伙伴
      '孟加拉语': '#16A34A',  // Bengali - green-600
      '乌尔都语': '#15803D',  // Urdu - green-700
      '尼泊尔语': '#EA580C',  // Nepali - orange-600
      '僧伽罗语': '#B91C1C',  // Sinhala - red-700
      '泰米尔语': '#C026D3',  // Tamil - fuchsia

      // 中亚 - 一带一路重要区域
      '哈萨克语': '#0369A1',  // Kazakh - sky-700
      '乌兹别克语': '#0F766E', // Uzbek - teal-700
      '土库曼语': '#047857',  // Turkmen - emerald-700
      '塔吉克语': '#7E22CE',  // Tajik - purple-700
      '吉尔吉斯语': '#1D4ED8', // Kyrgyz - blue-700

      // 中东 - 重要贸易伙伴
      '波斯语': '#B45309',    // Persian - amber-700
      '土耳其语': '#E11D48',  // Turkish - rose
      '希伯来语': '#2563EB',  // Hebrew - blue-600
      '库尔德语': '#65A30D',  // Kurdish - lime-600

      // 欧洲 - 重要贸易伙伴
      '荷兰语': '#FB923C',    // Dutch - orange-400
      '意大利语': '#059669',  // Italian - emerald-600
      '波兰语': '#DC2626',    // Polish - red-600
      '乌克兰语': '#FACC15',  // Ukrainian - yellow
      '罗马尼亚语': '#1E40AF', // Romanian - blue-800
      '捷克语': '#1E3A8A',    // Czech - blue-900
      '匈牙利语': '#166534',  // Hungarian - green-800
      '瑞典语': '#0369A1',    // Swedish - sky-700
      '希腊语': '#1D4ED8',    // Greek - blue-700
      '丹麦语': '#BE123C',    // Danish - rose-700
      '芬兰语': '#0C4A6E',    // Finnish - sky-900
      '挪威语': '#0F172A',    // Norwegian - slate-900

      // 非洲 - 新兴市场
      '斯瓦希里语': '#15803D', // Swahili - green-700
      '豪萨语': '#A16207',    // Hausa - yellow-700
      '约鲁巴语': '#4D7C0F',  // Yoruba - lime-700
      '阿姆哈拉语': '#0E7490', // Amharic - cyan-700
      '祖鲁语': '#0F766E',    // Zulu - teal-700
      '南非荷兰语': '#C2410C', // Afrikaans - orange-700
    };
    return langMap[primaryLanguage] || null;
  }, []);

  const getFillColor = useCallback((geo: any) => {
    const iso3 = getIso3(geo);
    const countryInfo = COUNTRY_LANGUAGES[iso3];

    if (selectedLanguage) {
      if (highlightedCountries.has(iso3)) {
        const langInfo = MAJOR_LANGUAGES.find(l => l.id === selectedLanguage);
        return langInfo?.color || '#3B82F6';
      }
      return '#E2E8F0';
    }

    // Default coloring strictly based on primaryLanguage (native language)
    if (countryInfo && countryInfo.primaryLanguage) {
      const color = getPrimaryLanguageColor(countryInfo.primaryLanguage);
      if (color) {
        return color;
      }
    }
    // Fallback for countries with non-major primary languages (gray)
    return '#94A3B8';
  }, [selectedLanguage, highlightedCountries, getIso3, getPrimaryLanguageColor]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
      : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
      }`}>
      {/* Header */}
      <div className={`backdrop-blur border-b ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-[95vw] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
              >
                <ArrowLeft className="w-4 h-4" />
                返回
              </button>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>世界地图 Language Map</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Toggle Labels Button */}
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${showLabels
                  ? 'bg-blue-600 text-white'
                  : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <Tag className="w-4 h-4" />
                国名
              </button>

              {/* Toggle Timezone Button */}
              <button
                onClick={() => setShowTimezones(!showTimezones)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${showTimezones
                  ? 'bg-amber-600 text-white'
                  : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <Clock className="w-4 h-4" />
                时区
              </button>

              {/* Beijing Time Display */}
              <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-red-900/50' : 'bg-red-50 border border-red-200'}`}>
                <span className="text-red-400">🇨🇳 北京</span>
                <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {currentTime.toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Shanghai'
                  })}
                </span>
              </div>

              {/* Legend - Primary Language Colors - Expanded */}
              {!selectedLanguage && (
                <div className="hidden lg:flex items-center gap-2 text-xs flex-wrap">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>母语:</span>
                  {[
                    { name: '英语', color: '#3B82F6' },
                    { name: '中文', color: '#EF4444' },
                    { name: '西班牙语', color: '#F59E0B' },
                    { name: '阿拉伯语', color: '#10B981' },
                    { name: '法语', color: '#8B5CF6' },
                    { name: '俄语', color: '#EC4899' },
                    { name: '葡萄牙语', color: '#14B8A6' },
                    { name: '韩语', color: '#0EA5E9' },
                    { name: '越南语', color: '#22C55E' },
                    { name: '其他', color: '#94A3B8' },
                  ].map((lang) => (
                    <div key={lang.name} className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded"
                        style={{ backgroundColor: lang.color }}
                      ></span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className={`border-b ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-white/60 border-slate-200'}`}>
        <div className="max-w-[95vw] mx-auto px-4 py-3">
          {/* Search Box and Export */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜索国家名称... Search country..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDark
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-slate-200 text-slate-700'
                  }`}
              />
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div
                  ref={searchResultsRef}
                  className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto ${isDark
                    ? 'bg-slate-800 border-slate-600'
                    : 'bg-white border-slate-200'
                    }`}
                >
                  {searchResults.map((country, index) => {
                    const info = getCountryInfo(country.iso3);
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={country.iso3}
                        className={`px-4 py-3 cursor-pointer border-b last:border-b-0 transition-colors ${isDark ? 'border-slate-700' : 'border-slate-100'} ${isSelected
                          ? 'bg-blue-600 text-white'
                          : isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                          }`}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSelectedIndex(-1);
                          // Focus on the selected country (keep search term)
                          focusOnCountry(country.iso3);
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div className="flex-1">
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{country.name}</div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{country.nameEn}</div>
                          </div>
                          <div className="text-right text-xs">
                            <div className="text-green-400">📧 {info?.businessLang}</div>
                            <div className={isDark ? 'text-slate-400' : 'text-slate-500'}>🗺️ {info?.googleMapsLang}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Export Button */}
            <button
              onClick={() => exportToCSV()}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              导出CSV
            </button>
          </div>

          {/* Language Filter Buttons */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedLanguage(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedLanguage === null
                ? isDark ? 'bg-white text-slate-900 shadow-lg' : 'bg-slate-800 text-white shadow-lg'
                : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              全部 All
            </button>
            {MAJOR_LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id === selectedLanguage ? null : lang.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${selectedLanguage === lang.id
                  ? 'text-white shadow-lg'
                  : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                style={{
                  backgroundColor: selectedLanguage === lang.id ? lang.color : undefined,
                }}
              >
                {lang.name}
                <span className="text-xs opacity-70">{lang.nameEn}</span>
              </button>
            ))}
          </div>

          {selectedLanguage && (
            <div className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              高亮显示: 使用
              <span className={`font-medium mx-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {MAJOR_LANGUAGES.find(l => l.id === selectedLanguage)?.name}
              </span>
              的国家 ({highlightedCountries.size} 个)
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div
        className="relative"
        style={{ height: 'calc(100vh - 180px)' }}
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 180,
            center: [0, 0],
            rotate: [-150, 0, 0],
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={0.5}
            maxZoom={15}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                // Store geographies in ref for search functionality
                if (geographies.length > 0) {
                  geographiesRef.current = geographies;
                }

                return (
                  <>
                    {geographies.map((geo) => {
                      const iso3 = getIso3(geo);
                      const isHighlighted = highlightedCountries.has(iso3);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(event) => handleMouseEnter(geo, event)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => {
                            const clickedIso3 = getIso3(geo);
                            setSelectedCountryIso3(clickedIso3);
                            setTooltip(null);
                          }}
                          style={{
                            default: {
                              fill: selectedCountryIso3 === iso3 ? '#3B82F6' : getFillColor(geo),
                              stroke: selectedCountryIso3 === iso3 ? '#60A5FA' : (isDark ? '#334155' : '#94a3b8'),
                              strokeWidth: selectedCountryIso3 === iso3 ? 1.5 : 0.5,
                              outline: 'none',
                              transition: 'fill 0.2s',
                            },
                            hover: {
                              fill: selectedLanguage && !isHighlighted
                                ? '#94A3B8'
                                : '#60A5FA',
                              stroke: isDark ? '#1E293B' : '#475569',
                              strokeWidth: 1,
                              outline: 'none',
                              cursor: 'pointer',
                            },
                            pressed: {
                              fill: '#2563EB',
                              outline: 'none',
                            },
                          }}
                        />
                      );
                    })}
                    {/* Country Labels */}
                    {showLabels && geographies.map((geo) => {
                      const iso3 = getIso3(geo);
                      const countryInfo = COUNTRY_LANGUAGES[iso3];
                      if (!countryInfo) return null;

                      const centroid = geoCentroid(geo);
                      // Skip if centroid is invalid
                      if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;

                      // Calculate font size based on zoom level - larger base size
                      const baseFontSize = 8;
                      const fontSize = Math.max(baseFontSize / position.zoom, 2.5);

                      // Only show labels when zoomed in enough or for larger countries
                      const minZoomForSmallCountries = 2;
                      const isLargeCountry = ['CHN', 'USA', 'RUS', 'CAN', 'AUS', 'BRA', 'IND', 'ARG', 'KAZ', 'DZA', 'COD', 'SAU', 'MEX', 'IDN', 'SDN', 'LBY', 'IRN', 'MNG', 'PER', 'TCD', 'NER', 'AGO', 'MLI', 'ZAF', 'COL', 'ETH', 'BOL', 'MRT', 'EGY', 'TZA', 'NGA', 'VEN', 'PAK', 'TUR', 'CHL', 'MMR', 'AFG', 'SOM', 'CAF', 'UKR', 'MOZ', 'BWA', 'YEM', 'TKM', 'CMR', 'IRQ', 'JPN', 'DEU', 'FRA', 'ESP', 'SWE', 'NOR', 'FIN', 'POL', 'ITA', 'GBR', 'PHL', 'VNM', 'MYS', 'THA', 'KOR', 'PRK', 'UZB', 'MAR', 'KEN', 'GHA', 'CIV', 'MDG', 'NPL', 'BGD'].includes(iso3);

                      if (position.zoom < minZoomForSmallCountries && !isLargeCountry) {
                        return null;
                      }

                      // Get short name (first part before space or full name)
                      const shortName = countryInfo.name.split(' ')[0];

                      return (
                        <Marker key={`label-${geo.rsmKey}`} coordinates={centroid}>
                          <text
                            textAnchor="middle"
                            style={{
                              fontFamily: 'system-ui, sans-serif',
                              fontSize: `${fontSize}px`,
                              fill: '#1E293B',
                              fontWeight: 600,
                              pointerEvents: 'none',
                              textShadow: '0 0 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.6)',
                            }}
                          >
                            {shortName}
                          </text>
                        </Marker>
                      );
                    })}
                  </>
                );
              }}
            </Geographies>

            {/* Small Country Markers */}
            {SMALL_COUNTRY_MARKERS.map((country) => {
              const countryInfo = getCountryInfo(country.iso3);
              const rawCountryInfo = COUNTRY_LANGUAGES[country.iso3];
              const isHighlighted = highlightedCountries.has(country.iso3);

              // Get color based on primary language
              const getMarkerColor = () => {
                if (selectedLanguage) {
                  return isHighlighted
                    ? MAJOR_LANGUAGES.find(l => l.id === selectedLanguage)?.color || '#3B82F6'
                    : '#94A3B8';
                }
                if (rawCountryInfo && rawCountryInfo.languages.length > 0) {
                  const langInfo = MAJOR_LANGUAGES.find(l => l.id === rawCountryInfo.languages[0]);
                  if (langInfo) return langInfo.color;
                }
                return '#94A3B8';
              };

              return (
                <Marker
                  key={`small-${country.iso3}`}
                  coordinates={country.coordinates}
                >
                  <circle
                    r={position.zoom > 2 ? 8 / position.zoom : 4}
                    fill={getMarkerColor()}
                    stroke={selectedCountryIso3 === country.iso3 ? '#60A5FA' : '#1E293B'}
                    strokeWidth={selectedCountryIso3 === country.iso3 ? 2 / position.zoom : 1 / position.zoom}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedCountryIso3(country.iso3);
                      setTooltip(null);
                    }}
                    onMouseEnter={(event: React.MouseEvent) => {
                      if (countryInfo) {
                        const englishLabel = getEnglishProficiencyLabel(countryInfo.englishProficiency);
                        const timeInfo = getCountryTime(country.iso3);
                        const contactTime = getBestContactTime(country.iso3);
                        setTooltip({
                          name: countryInfo.name,
                          nameEn: countryInfo.nameEn,
                          flag: countryInfo.flag,
                          iso3: country.iso3,
                          primaryLanguage: countryInfo.primaryLanguage,
                          secondaryLanguages: countryInfo.secondaryLanguages,
                          englishProficiency: englishLabel.text,
                          googleMapsLang: countryInfo.googleMapsLang,
                          businessLang: countryInfo.businessLang,
                          businessLangAlt: countryInfo.businessLangAlt,
                          businessNote: countryInfo.businessNote,
                          preferredMessenger: countryInfo.preferredMessenger,
                          whatsappPopularity: countryInfo.whatsappPopularity,
                          localTime: timeInfo?.timeStr,
                          isDaytime: timeInfo?.isDaytime,
                          isWorkHour: timeInfo?.isWorkHour,
                          utcOffset: contactTime?.utcOffset,
                          morningBj: contactTime?.morningBj,
                          afternoonBj: contactTime?.afternoonBj,
                          x: event.clientX,
                          y: event.clientY,
                        });
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  />
                  {position.zoom > 1.5 && (
                    <text
                      textAnchor="middle"
                      y={-8 / position.zoom}
                      style={{
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: `${Math.max(4 / position.zoom, 2)}px`,
                        fill: '#1E293B',
                        fontWeight: 600,
                        pointerEvents: 'none',
                        textShadow: '0 0 2px rgba(255,255,255,0.9)',
                      }}
                    >
                      {country.flag} {country.name}
                    </text>
                  )}
                </Marker>
              );
            })}

            {/* Timezone Lines */}
            {showTimezones && (
              <>
                {Array.from({ length: 25 }, (_, i) => {
                  const utcOffset = i - 12; // UTC-12 to UTC+12
                  const longitude = utcOffset * 15; // Each timezone is 15 degrees
                  const isMainLine = utcOffset % 3 === 0;
                  const isChinaLine = utcOffset === 8; // Beijing time

                  return (
                    <g key={`tz-${utcOffset}`}>
                      <Line
                        from={[longitude, -60]}
                        to={[longitude, 80]}
                        stroke={isChinaLine ? '#EF4444' : isMainLine ? '#F59E0B' : '#64748B'}
                        strokeWidth={isChinaLine ? 2 : isMainLine ? 1 : 0.5}
                        strokeOpacity={isChinaLine ? 0.8 : isMainLine ? 0.5 : 0.3}
                        strokeDasharray={isChinaLine ? undefined : '4,4'}
                      />
                      {isMainLine && (
                        <Marker coordinates={[longitude, 75]}>
                          <text
                            textAnchor="middle"
                            style={{
                              fontFamily: 'system-ui, sans-serif',
                              fontSize: '3px',
                              fill: isChinaLine ? '#EF4444' : '#F59E0B',
                              fontWeight: isChinaLine ? 700 : 600,
                            }}
                          >
                            {utcOffset >= 0 ? `+${utcOffset}` : utcOffset}
                          </text>
                        </Marker>
                      )}
                    </g>
                  );
                })}
                {/* Current sun position indicator */}
                <Marker coordinates={[((currentTime.getUTCHours() + currentTime.getUTCMinutes() / 60) - 12) * 15, 0]}>
                  <circle r={4} fill="#FCD34D" stroke="#F59E0B" strokeWidth={1} />
                  <text
                    y={-8}
                    textAnchor="middle"
                    style={{
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '3px',
                      fill: '#FCD34D',
                      fontWeight: 600,
                    }}
                  >
                    ☀️ 正午
                  </text>
                </Marker>
              </>
            )}
          </ZoomableGroup>
        </ComposableMap>

        {/* Zoom Instructions */}
        <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-2 rounded-lg text-xs text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4" />
          滚轮缩放 · 拖拽移动
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4 pointer-events-none max-w-sm"
            style={{
              left: Math.min(tooltip.x + 15, window.innerWidth - 320),
              top: tooltip.y + 15,
              transform: 'translate(0, 0)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{tooltip.flag}</span>
              <div>
                <div className="font-bold text-white text-lg">{tooltip.name}</div>
                <div className="text-slate-400 text-sm">{tooltip.nameEn}</div>
              </div>
            </div>

            {/* Language Info */}
            <div className="space-y-1.5 text-sm border-b border-slate-600 pb-3 mb-3">
              <div className="flex justify-between gap-6">
                <span className="text-slate-400">母语:</span>
                <span className="text-white font-medium">{tooltip.primaryLanguage}</span>
              </div>

              {tooltip.secondaryLanguages.length > 0 && (
                <div className="flex justify-between gap-6">
                  <span className="text-slate-400">第二语言:</span>
                  <span className="text-white font-medium">{tooltip.secondaryLanguages.join(', ')}</span>
                </div>
              )}

              <div className="flex justify-between gap-6">
                <span className="text-slate-400">英语水平:</span>
                <span className={`font-medium ${tooltip.englishProficiency === '母语' ? 'text-green-400' :
                  tooltip.englishProficiency === '高' ? 'text-blue-400' :
                    tooltip.englishProficiency === '中' ? 'text-amber-400' :
                      tooltip.englishProficiency === '低' ? 'text-red-400' :
                        'text-slate-400'
                  }`}>
                  {tooltip.englishProficiency}
                </span>
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-1.5 text-sm">
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2">
                📧 商务沟通建议
              </div>

              <div className="flex justify-between gap-6">
                <span className="text-slate-400 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  开发信语言:
                </span>
                <span className="text-green-400 font-bold">{tooltip.businessLang}</span>
              </div>

              {tooltip.businessLangAlt && (
                <div className="flex justify-between gap-6">
                  <span className="text-slate-400">备选语言:</span>
                  <span className="text-slate-300">{tooltip.businessLangAlt}</span>
                </div>
              )}

              <div className="flex justify-between gap-6">
                <span className="text-slate-400 flex items-center gap-1">
                  <Map className="w-3 h-3" />
                  Google地图:
                </span>
                <span className="text-white">{tooltip.googleMapsLang}</span>
              </div>

              <div className="flex justify-between gap-6">
                <span className="text-slate-400 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  推荐IM:
                </span>
                <span className="text-white">
                  {MESSENGER_INFO[tooltip.preferredMessenger]?.icon} {MESSENGER_INFO[tooltip.preferredMessenger]?.name}
                </span>
              </div>

              <div className="flex justify-between gap-6">
                <span className="text-slate-400">WhatsApp普及:</span>
                <span className={`font-medium ${tooltip.whatsappPopularity === 'high' ? 'text-green-400' :
                  tooltip.whatsappPopularity === 'medium' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                  {getWhatsappPopularityLabel(tooltip.whatsappPopularity).text}
                </span>
              </div>

              {tooltip.businessNote && (
                <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs text-slate-300 italic">
                  💡 {tooltip.businessNote}
                </div>
              )}
            </div>

            {/* Time Info */}
            {tooltip.localTime && (
              <div className="border-t border-slate-600 pt-3 mt-3 space-y-1.5 text-sm">
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                  ⏰ 时间信息
                </div>

                <div className="flex justify-between gap-6">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    当地时间:
                  </span>
                  <span className="text-white font-mono font-bold flex items-center gap-2">
                    {tooltip.localTime}
                    {tooltip.isDaytime ? (
                      <Sun className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-blue-300" />
                    )}
                    {tooltip.isWorkHour && (
                      <span className="text-xs bg-green-600 px-1.5 py-0.5 rounded text-white">工作中</span>
                    )}
                  </span>
                </div>

                {tooltip.utcOffset && (
                  <div className="flex justify-between gap-6">
                    <span className="text-slate-400">时区:</span>
                    <span className="text-slate-300 font-mono">{tooltip.utcOffset}</span>
                  </div>
                )}

                <div className="mt-2 p-2 bg-amber-900/30 rounded">
                  <div className="text-xs text-amber-300 mb-1">🇨🇳 最佳联系时间 (北京时间)</div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">
                      <Sun className="w-3 h-3 inline mr-1 text-amber-400" />
                      早间: <span className="text-white font-bold">{tooltip.morningBj}</span>
                    </span>
                    <span className="text-slate-300">
                      <Moon className="w-3 h-3 inline mr-1 text-blue-400" />
                      午后: <span className="text-white font-bold">{tooltip.afternoonBj}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Country Detail Side Panel */}
      <CountryDetailPanel
        iso3={selectedCountryIso3}
        onClose={() => setSelectedCountryIso3(null)}
      />
    </div>
  );
};

export default LanguageMap;

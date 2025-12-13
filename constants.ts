import { CountryData, TimeSlot } from './types';

export const DEFAULT_SLOTS: TimeSlot[] = [
  { startHour: 9, endHour: 11, label: "Morning" },
  { startHour: 14, endHour: 16, label: "Afternoon" }
];

export const LATE_START_SLOTS: TimeSlot[] = [
  { startHour: 10, endHour: 13, label: "Late Morning" },
  { startHour: 15, endHour: 17, label: "Late Afternoon" }
];

export const BEIJING_TZ = 'Asia/Shanghai';

// Comprehensive list of major global countries/regions with Bilingual Names
// Sorted loosely by Region then importance/population
export const COUNTRIES: CountryData[] = [
  // --- North America ---
  {
    id: 'us-ny',
    name: '美国 (纽约/东部) USA (New York)',
    flag: '🇺🇸',
    region: '北美 North America',
    timeZone: 'America/New_York',
    callingCode: '+1',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'us-chi',
    name: '美国 (芝加哥/中部) USA (Chicago)',
    flag: '🇺🇸',
    region: '北美 North America',
    timeZone: 'America/Chicago',
    callingCode: '+1',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'us-den',
    name: '美国 (丹佛/山地) USA (Denver)',
    flag: '🇺🇸',
    region: '北美 North America',
    timeZone: 'America/Denver',
    callingCode: '+1',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'us-la',
    name: '美国 (洛杉矶/西部) USA (Los Angeles)',
    flag: '🇺🇸',
    region: '北美 North America',
    timeZone: 'America/Los_Angeles',
    callingCode: '+1',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ca-tor',
    name: '加拿大 (多伦多) Canada (Toronto)',
    flag: '🇨🇦',
    region: '北美 North America',
    timeZone: 'America/Toronto',
    callingCode: '+1',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ca-van',
    name: '加拿大 (温哥华) Canada (Vancouver)',
    flag: '🇨🇦',
    region: '北美 North America',
    timeZone: 'America/Vancouver',
    callingCode: '+1',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'mx',
    name: '墨西哥 Mexico',
    flag: '🇲🇽',
    region: '北美 North America',
    timeZone: 'America/Mexico_City',
    callingCode: '+52',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'pr',
    name: '波多黎各 Puerto Rico',
    flag: '🇵🇷',
    region: '北美 North America',
    timeZone: 'America/Puerto_Rico',
    callingCode: '+1-787',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'jm',
    name: '牙买加 Jamaica',
    flag: '🇯🇲',
    region: '北美 North America',
    timeZone: 'America/Jamaica',
    callingCode: '+1-876',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'tt',
    name: '特立尼达和多巴哥 Trinidad & Tobago',
    flag: '🇹🇹',
    region: '北美 North America',
    timeZone: 'America/Port_of_Spain',
    callingCode: '+1-868',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'cu',
    name: '古巴 Cuba',
    flag: '🇨🇺',
    region: '北美 North America',
    timeZone: 'America/Havana',
    callingCode: '+53',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'do',
    name: '多米尼加 Dominican Republic',
    flag: '🇩🇴',
    region: '北美 North America',
    timeZone: 'America/Santo_Domingo',
    callingCode: '+1-809',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'gt',
    name: '危地马拉 Guatemala',
    flag: '🇬🇹',
    region: '北美 North America',
    timeZone: 'America/Guatemala',
    callingCode: '+502',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'cr',
    name: '哥斯达黎加 Costa Rica',
    flag: '🇨🇷',
    region: '北美 North America',
    timeZone: 'America/Costa_Rica',
    callingCode: '+506',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'pa',
    name: '巴拿马 Panama',
    flag: '🇵🇦',
    region: '北美 North America',
    timeZone: 'America/Panama',
    callingCode: '+507',
    bestSlots: DEFAULT_SLOTS
  },

  // --- South America ---
  {
    id: 'br',
    name: '巴西 (圣保罗) Brazil (Sao Paulo)',
    flag: '🇧🇷',
    region: '南美 South America',
    timeZone: 'America/Sao_Paulo',
    callingCode: '+55',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ar',
    name: '阿根廷 Argentina',
    flag: '🇦🇷',
    region: '南美 South America',
    timeZone: 'America/Argentina/Buenos_Aires',
    callingCode: '+54',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'cl',
    name: '智利 Chile',
    flag: '🇨🇱',
    region: '南美 South America',
    timeZone: 'America/Santiago',
    callingCode: '+56',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'co',
    name: '哥伦比亚 Colombia',
    flag: '🇨🇴',
    region: '南美 South America',
    timeZone: 'America/Bogota',
    callingCode: '+57',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'pe',
    name: '秘鲁 Peru',
    flag: '🇵🇪',
    region: '南美 South America',
    timeZone: 'America/Lima',
    callingCode: '+51',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 've',
    name: '委内瑞拉 Venezuela',
    flag: '🇻🇪',
    region: '南美 South America',
    timeZone: 'America/Caracas',
    callingCode: '+58',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ec',
    name: '厄瓜多尔 Ecuador',
    flag: '🇪🇨',
    region: '南美 South America',
    timeZone: 'America/Guayaquil',
    callingCode: '+593',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'uy',
    name: '乌拉圭 Uruguay',
    flag: '🇺🇾',
    region: '南美 South America',
    timeZone: 'America/Montevideo',
    callingCode: '+598',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'py',
    name: '巴拉圭 Paraguay',
    flag: '🇵🇾',
    region: '南美 South America',
    timeZone: 'America/Asuncion',
    callingCode: '+595',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'bo',
    name: '玻利维亚 Bolivia',
    flag: '🇧🇴',
    region: '南美 South America',
    timeZone: 'America/La_Paz',
    callingCode: '+591',
    bestSlots: DEFAULT_SLOTS
  },

  // --- Europe ---
  {
    id: 'uk',
    name: '英国 UK',
    flag: '🇬🇧',
    region: '欧洲 Europe',
    timeZone: 'Europe/London',
    callingCode: '+44',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'de',
    name: '德国 Germany',
    flag: '🇩🇪',
    region: '欧洲 Europe',
    timeZone: 'Europe/Berlin',
    callingCode: '+49',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'fr',
    name: '法国 France',
    flag: '🇫🇷',
    region: '欧洲 Europe',
    timeZone: 'Europe/Paris',
    callingCode: '+33',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'it',
    name: '意大利 Italy',
    flag: '🇮🇹',
    region: '欧洲 Europe',
    timeZone: 'Europe/Rome',
    callingCode: '+39',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'es',
    name: '西班牙 Spain',
    flag: '🇪🇸',
    region: '欧洲 Europe',
    timeZone: 'Europe/Madrid',
    callingCode: '+34',
    bestSlots: LATE_START_SLOTS
  },
  {
    id: 'nl',
    name: '荷兰 Netherlands',
    flag: '🇳🇱',
    region: '欧洲 Europe',
    timeZone: 'Europe/Amsterdam',
    callingCode: '+31',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ch',
    name: '瑞士 Switzerland',
    flag: '🇨🇭',
    region: '欧洲 Europe',
    timeZone: 'Europe/Zurich',
    callingCode: '+41',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'lu',
    name: '卢森堡 Luxembourg',
    flag: '🇱🇺',
    region: '欧洲 Europe',
    timeZone: 'Europe/Luxembourg',
    callingCode: '+352',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'se',
    name: '瑞典 Sweden',
    flag: '🇸🇪',
    region: '欧洲 Europe',
    timeZone: 'Europe/Stockholm',
    callingCode: '+46',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'no',
    name: '挪威 Norway',
    flag: '🇳🇴',
    region: '欧洲 Europe',
    timeZone: 'Europe/Oslo',
    callingCode: '+47',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'dk',
    name: '丹麦 Denmark',
    flag: '🇩🇰',
    region: '欧洲 Europe',
    timeZone: 'Europe/Copenhagen',
    callingCode: '+45',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'fi',
    name: '芬兰 Finland',
    flag: '🇫🇮',
    region: '欧洲 Europe',
    timeZone: 'Europe/Helsinki',
    callingCode: '+358',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ie',
    name: '爱尔兰 Ireland',
    flag: '🇮🇪',
    region: '欧洲 Europe',
    timeZone: 'Europe/Dublin',
    callingCode: '+353',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'pl',
    name: '波兰 Poland',
    flag: '🇵🇱',
    region: '欧洲 Europe',
    timeZone: 'Europe/Warsaw',
    callingCode: '+48',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'at',
    name: '奥地利 Austria',
    flag: '🇦🇹',
    region: '欧洲 Europe',
    timeZone: 'Europe/Vienna',
    callingCode: '+43',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'be',
    name: '比利时 Belgium',
    flag: '🇧🇪',
    region: '欧洲 Europe',
    timeZone: 'Europe/Brussels',
    callingCode: '+32',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'pt',
    name: '葡萄牙 Portugal',
    flag: '🇵🇹',
    region: '欧洲 Europe',
    timeZone: 'Europe/Lisbon',
    callingCode: '+351',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'gr',
    name: '希腊 Greece',
    flag: '🇬🇷',
    region: '欧洲 Europe',
    timeZone: 'Europe/Athens',
    callingCode: '+30',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'cz',
    name: '捷克 Czech Republic',
    flag: '🇨🇿',
    region: '欧洲 Europe',
    timeZone: 'Europe/Prague',
    callingCode: '+420',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'hu',
    name: '匈牙利 Hungary',
    flag: '🇭🇺',
    region: '欧洲 Europe',
    timeZone: 'Europe/Budapest',
    callingCode: '+36',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ro',
    name: '罗马尼亚 Romania',
    flag: '🇷🇴',
    region: '欧洲 Europe',
    timeZone: 'Europe/Bucharest',
    callingCode: '+40',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'bg',
    name: '保加利亚 Bulgaria',
    flag: '🇧🇬',
    region: '欧洲 Europe',
    timeZone: 'Europe/Sofia',
    callingCode: '+359',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'rs',
    name: '塞尔维亚 Serbia',
    flag: '🇷🇸',
    region: '欧洲 Europe',
    timeZone: 'Europe/Belgrade',
    callingCode: '+381',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'hr',
    name: '克罗地亚 Croatia',
    flag: '🇭🇷',
    region: '欧洲 Europe',
    timeZone: 'Europe/Zagreb',
    callingCode: '+385',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'sk',
    name: '斯洛伐克 Slovakia',
    flag: '🇸🇰',
    region: '欧洲 Europe',
    timeZone: 'Europe/Bratislava',
    callingCode: '+421',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'by',
    name: '白俄罗斯 Belarus',
    flag: '🇧🇾',
    region: '欧洲 Europe',
    timeZone: 'Europe/Minsk',
    callingCode: '+375',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'lt',
    name: '立陶宛 Lithuania',
    flag: '🇱🇹',
    region: '欧洲 Europe',
    timeZone: 'Europe/Vilnius',
    callingCode: '+370',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'lv',
    name: '拉脱维亚 Latvia',
    flag: '🇱🇻',
    region: '欧洲 Europe',
    timeZone: 'Europe/Riga',
    callingCode: '+371',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ee',
    name: '爱沙尼亚 Estonia',
    flag: '🇪🇪',
    region: '欧洲 Europe',
    timeZone: 'Europe/Tallinn',
    callingCode: '+372',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'is',
    name: '冰岛 Iceland',
    flag: '🇮🇸',
    region: '欧洲 Europe',
    timeZone: 'Atlantic/Reykjavik',
    callingCode: '+354',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'mt',
    name: '马耳他 Malta',
    flag: '🇲🇹',
    region: '欧洲 Europe',
    timeZone: 'Europe/Malta',
    callingCode: '+356',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'cy',
    name: '塞浦路斯 Cyprus',
    flag: '🇨🇾',
    region: '欧洲 Europe',
    timeZone: 'Asia/Nicosia',
    callingCode: '+357',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ru',
    name: '俄罗斯 (莫斯科) Russia (Moscow)',
    flag: '🇷🇺',
    region: '欧洲 Europe',
    timeZone: 'Europe/Moscow',
    callingCode: '+7',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ua',
    name: '乌克兰 Ukraine',
    flag: '🇺🇦',
    region: '欧洲 Europe',
    timeZone: 'Europe/Kiev',
    callingCode: '+380',
    bestSlots: DEFAULT_SLOTS
  },

  // --- Asia Pacific ---
  {
    id: 'jp',
    name: '日本 Japan',
    flag: '🇯🇵',
    region: '亚洲 Asia',
    timeZone: 'Asia/Tokyo',
    callingCode: '+81',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'kr',
    name: '韩国 South Korea',
    flag: '🇰🇷',
    region: '亚洲 Asia',
    timeZone: 'Asia/Seoul',
    callingCode: '+82',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'sg',
    name: '新加坡 Singapore',
    flag: '🇸🇬',
    region: '亚洲 Asia',
    timeZone: 'Asia/Singapore',
    callingCode: '+65',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'in',
    name: '印度 India',
    flag: '🇮🇳',
    region: '亚洲 Asia',
    timeZone: 'Asia/Kolkata',
    callingCode: '+91',
    bestSlots: [
        { startHour: 10, endHour: 13, label: "Morning" },
        { startHour: 14, endHour: 18, label: "Afternoon" }
    ]
  },
  {
    id: 'pk',
    name: '巴基斯坦 Pakistan',
    flag: '🇵🇰',
    region: '亚洲 Asia',
    timeZone: 'Asia/Karachi',
    callingCode: '+92',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'bd',
    name: '孟加拉国 Bangladesh',
    flag: '🇧🇩',
    region: '亚洲 Asia',
    timeZone: 'Asia/Dhaka',
    callingCode: '+880',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'lk',
    name: '斯里兰卡 Sri Lanka',
    flag: '🇱🇰',
    region: '亚洲 Asia',
    timeZone: 'Asia/Colombo',
    callingCode: '+94',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'mv',
    name: '马尔代夫 Maldives',
    flag: '🇲🇻',
    region: '亚洲 Asia',
    timeZone: 'Indian/Maldives',
    callingCode: '+960',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'np',
    name: '尼泊尔 Nepal',
    flag: '🇳🇵',
    region: '亚洲 Asia',
    timeZone: 'Asia/Kathmandu',
    callingCode: '+977',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'kz',
    name: '哈萨克斯坦 Kazakhstan',
    flag: '🇰🇿',
    region: '亚洲 Asia',
    timeZone: 'Asia/Almaty',
    callingCode: '+7',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'uz',
    name: '乌兹别克斯坦 Uzbekistan',
    flag: '🇺🇿',
    region: '亚洲 Asia',
    timeZone: 'Asia/Tashkent',
    callingCode: '+998',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'az',
    name: '阿塞拜疆 Azerbaijan',
    flag: '🇦🇿',
    region: '亚洲 Asia',
    timeZone: 'Asia/Baku',
    callingCode: '+994',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'vn',
    name: '越南 Vietnam',
    flag: '🇻🇳',
    region: '亚洲 Asia',
    timeZone: 'Asia/Ho_Chi_Minh',
    callingCode: '+84',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'th',
    name: '泰国 Thailand',
    flag: '🇹🇭',
    region: '亚洲 Asia',
    timeZone: 'Asia/Bangkok',
    callingCode: '+66',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'id',
    name: '印尼 (雅加达) Indonesia (Jakarta)',
    flag: '🇮🇩',
    region: '亚洲 Asia',
    timeZone: 'Asia/Jakarta',
    callingCode: '+62',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'my',
    name: '马来西亚 Malaysia',
    flag: '🇲🇾',
    region: '亚洲 Asia',
    timeZone: 'Asia/Kuala_Lumpur',
    callingCode: '+60',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ph',
    name: '菲律宾 Philippines',
    flag: '🇵🇭',
    region: '亚洲 Asia',
    timeZone: 'Asia/Manila',
    callingCode: '+63',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'mm',
    name: '缅甸 Myanmar',
    flag: '🇲🇲',
    region: '亚洲 Asia',
    timeZone: 'Asia/Yangon',
    callingCode: '+95',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'kh',
    name: '柬埔寨 Cambodia',
    flag: '🇰🇭',
    region: '亚洲 Asia',
    timeZone: 'Asia/Phnom_Penh',
    callingCode: '+855',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'mn',
    name: '蒙古 Mongolia',
    flag: '🇲🇳',
    region: '亚洲 Asia',
    timeZone: 'Asia/Ulaanbaatar',
    callingCode: '+976',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'au-syd',
    name: '澳大利亚 (悉尼) Australia (Sydney)',
    flag: '🇦🇺',
    region: '大洋洲 Oceania',
    timeZone: 'Australia/Sydney',
    callingCode: '+61',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'au-per',
    name: '澳大利亚 (珀斯) Australia (Perth)',
    flag: '🇦🇺',
    region: '大洋洲 Oceania',
    timeZone: 'Australia/Perth',
    callingCode: '+61',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'nz',
    name: '新西兰 New Zealand',
    flag: '🇳🇿',
    region: '大洋洲 Oceania',
    timeZone: 'Pacific/Auckland',
    callingCode: '+64',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'pg',
    name: '巴布亚新几内亚 Papua New Guinea',
    flag: '🇵🇬',
    region: '大洋洲 Oceania',
    timeZone: 'Pacific/Port_Moresby',
    callingCode: '+675',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'fj',
    name: '斐济 Fiji',
    flag: '🇫🇯',
    region: '大洋洲 Oceania',
    timeZone: 'Pacific/Fiji',
    callingCode: '+679',
    bestSlots: DEFAULT_SLOTS
  },

  // --- Middle East ---
  {
    id: 'ae',
    name: '阿联酋 (迪拜) UAE (Dubai)',
    flag: '🇦🇪',
    region: '中东 Middle East',
    timeZone: 'Asia/Dubai',
    callingCode: '+971',
    bestSlots: [
       { startHour: 9, endHour: 13, label: "Morning" },
       { startHour: 15, endHour: 17, label: "Afternoon" }
    ]
  },
  {
    id: 'sa',
    name: '沙特阿拉伯 Saudi Arabia',
    flag: '🇸🇦',
    region: '中东 Middle East',
    timeZone: 'Asia/Riyadh',
    callingCode: '+966',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'qa',
    name: '卡塔尔 Qatar',
    flag: '🇶🇦',
    region: '中东 Middle East',
    timeZone: 'Asia/Qatar',
    callingCode: '+974',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'kw',
    name: '科威特 Kuwait',
    flag: '🇰🇼',
    region: '中东 Middle East',
    timeZone: 'Asia/Kuwait',
    callingCode: '+965',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'om',
    name: '阿曼 Oman',
    flag: '🇴🇲',
    region: '中东 Middle East',
    timeZone: 'Asia/Muscat',
    callingCode: '+968',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'bh',
    name: '巴林 Bahrain',
    flag: '🇧🇭',
    region: '中东 Middle East',
    timeZone: 'Asia/Bahrain',
    callingCode: '+973',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'iq',
    name: '伊拉克 Iraq',
    flag: '🇮🇶',
    region: '中东 Middle East',
    timeZone: 'Asia/Baghdad',
    callingCode: '+964',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'jo',
    name: '约旦 Jordan',
    flag: '🇯🇴',
    region: '中东 Middle East',
    timeZone: 'Asia/Amman',
    callingCode: '+962',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'lb',
    name: '黎巴嫩 Lebanon',
    flag: '🇱🇧',
    region: '中东 Middle East',
    timeZone: 'Asia/Beirut',
    callingCode: '+961',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'tr',
    name: '土耳其 Turkey',
    flag: '🇹🇷',
    region: '中东 Middle East',
    timeZone: 'Europe/Istanbul',
    callingCode: '+90',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'il',
    name: '以色列 Israel',
    flag: '🇮🇱',
    region: '中东 Middle East',
    timeZone: 'Asia/Jerusalem',
    callingCode: '+972',
    bestSlots: DEFAULT_SLOTS 
  },
  {
    id: 'ir',
    name: '伊朗 Iran',
    flag: '🇮🇷',
    region: '中东 Middle East',
    timeZone: 'Asia/Tehran',
    callingCode: '+98',
    bestSlots: DEFAULT_SLOTS
  },

  // --- Africa ---
  {
    id: 'za',
    name: '南非 South Africa',
    flag: '🇿🇦',
    region: '非洲 Africa',
    timeZone: 'Africa/Johannesburg',
    callingCode: '+27',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'eg',
    name: '埃及 Egypt',
    flag: '🇪🇬',
    region: '非洲 Africa',
    timeZone: 'Africa/Cairo',
    callingCode: '+20',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ma',
    name: '摩洛哥 Morocco',
    flag: '🇲🇦',
    region: '非洲 Africa',
    timeZone: 'Africa/Casablanca',
    callingCode: '+212',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'tn',
    name: '突尼斯 Tunisia',
    flag: '🇹🇳',
    region: '非洲 Africa',
    timeZone: 'Africa/Tunis',
    callingCode: '+216',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ng',
    name: '尼日利亚 Nigeria',
    flag: '🇳🇬',
    region: '非洲 Africa',
    timeZone: 'Africa/Lagos',
    callingCode: '+234',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ke',
    name: '肯尼亚 Kenya',
    flag: '🇰🇪',
    region: '非洲 Africa',
    timeZone: 'Africa/Nairobi',
    callingCode: '+254',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'et',
    name: '埃塞俄比亚 Ethiopia',
    flag: '🇪🇹',
    region: '非洲 Africa',
    timeZone: 'Africa/Addis_Ababa',
    callingCode: '+251',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'gh',
    name: '加纳 Ghana',
    flag: '🇬🇭',
    region: '非洲 Africa',
    timeZone: 'Africa/Accra',
    callingCode: '+233',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'dz',
    name: '阿尔及利亚 Algeria',
    flag: '🇩🇿',
    region: '非洲 Africa',
    timeZone: 'Africa/Algiers',
    callingCode: '+213',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'tz',
    name: '坦桑尼亚 Tanzania',
    flag: '🇹🇿',
    region: '非洲 Africa',
    timeZone: 'Africa/Dar_es_Salaam',
    callingCode: '+255',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ug',
    name: '乌干达 Uganda',
    flag: '🇺🇬',
    region: '非洲 Africa',
    timeZone: 'Africa/Kampala',
    callingCode: '+256',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'sd',
    name: '苏丹 Sudan',
    flag: '🇸🇩',
    region: '非洲 Africa',
    timeZone: 'Africa/Khartoum',
    callingCode: '+249',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ao',
    name: '安哥拉 Angola',
    flag: '🇦🇴',
    region: '非洲 Africa',
    timeZone: 'Africa/Luanda',
    callingCode: '+244',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'mz',
    name: '莫桑比克 Mozambique',
    flag: '🇲🇿',
    region: '非洲 Africa',
    timeZone: 'Africa/Maputo',
    callingCode: '+258',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'cm',
    name: '喀麦隆 Cameroon',
    flag: '🇨🇲',
    region: '非洲 Africa',
    timeZone: 'Africa/Douala',
    callingCode: '+237',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'ci',
    name: '科特迪瓦 Cote d\'Ivoire',
    flag: '🇨🇮',
    region: '非洲 Africa',
    timeZone: 'Africa/Abidjan',
    callingCode: '+225',
    bestSlots: DEFAULT_SLOTS
  },
  {
    id: 'sn',
    name: '塞内加尔 Senegal',
    flag: '🇸🇳',
    region: '非洲 Africa',
    timeZone: 'Africa/Dakar',
    callingCode: '+221',
    bestSlots: DEFAULT_SLOTS
  },
];
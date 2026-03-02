#!/usr/bin/env node

// Script to calculate best contact times for countries
// Calculates Beijing time equivalents for morning and afternoon best contact hours

const BEIJING_TZ = 'Asia/Shanghai';
const DEFAULT_SLOTS = [
  { startHour: 9, endHour: 11, label: "Morning" },
  { startHour: 14, endHour: 16, label: "Afternoon" }
];

// Country mapping: Chinese name -> country IDs in constants.ts
const COUNTRY_MAP = {
  '美国': ['us-ny'], // Use New York as default
  '德国': ['de'],
  '日本': ['jp'],
  '法国': ['fr'],
  '英国': ['uk'],
  '荷兰': ['nl'],
  '新加坡': ['sg'],
  '意大利': ['it'],
  '瑞士': ['ch'],
  '韩国': ['kr'],
  '阿联酋': ['ae'],
  '加拿大': ['ca-tor'], // Use Toronto as default
  '巴西': ['br'],
  '印度': ['in'],
  '丹麦': ['dk'],
  '挪威': ['no'],
  '西班牙': ['es'],
  '沙特阿拉伯': ['sa'],
  '瑞典': ['se'],
  '马来西亚': ['my'],
  '比利时': ['be'],
  '阿根廷': ['ar'],
  '墨西哥': ['mx'],
  '澳大利亚': ['au-syd'], // Use Sydney as default
  '波多黎各': ['pr'],
  '菲律宾': ['ph'],
  '科威特': ['kw'],
  '罗马尼亚': ['ro'],
  '孟加拉国': ['bd'],
  '秘鲁': ['pe'],
  '尼泊尔': ['np'],
  '尼日利亚': ['ng'],
  '斯里兰卡': ['lk'],
  '苏丹': ['sd'],
  '土耳其': ['tr'],
  '危地马拉': ['gt'],
  '乌克兰': ['ua'],
  '希腊': ['gr'],
  '以色列': ['il'],
  '印度尼西亚': ['id'],
  '越南': ['vn'],
  '阿尔及利亚': ['dz'],
  '南非': ['za'],
  '土库曼斯坦': ['tm'],
  '乌兹别克斯坦': ['uz'],
  '塔吉克斯坦': ['tj'],
  '哈萨克斯坦': ['kz'],
  '吉尔吉斯斯坦': ['kg'],
  '俄罗斯': ['ru'],
  '波兰': ['pl'],
  '巴基斯坦': ['pk'],
  '哥伦比亚': ['co'],
  '爱尔兰': ['ie']
};

// Country data from constants.ts (simplified)
const COUNTRIES = {
  'us-ny': { name: '美国 (纽约/东部)', timeZone: 'America/New_York', bestSlots: DEFAULT_SLOTS },
  'de': { name: '德国', timeZone: 'Europe/Berlin', bestSlots: DEFAULT_SLOTS },
  'jp': { name: '日本', timeZone: 'Asia/Tokyo', bestSlots: DEFAULT_SLOTS },
  'fr': { name: '法国', timeZone: 'Europe/Paris', bestSlots: DEFAULT_SLOTS },
  'uk': { name: '英国', timeZone: 'Europe/London', bestSlots: DEFAULT_SLOTS },
  'nl': { name: '荷兰', timeZone: 'Europe/Amsterdam', bestSlots: DEFAULT_SLOTS },
  'sg': { name: '新加坡', timeZone: 'Asia/Singapore', bestSlots: DEFAULT_SLOTS },
  'it': { name: '意大利', timeZone: 'Europe/Rome', bestSlots: DEFAULT_SLOTS },
  'ch': { name: '瑞士', timeZone: 'Europe/Zurich', bestSlots: DEFAULT_SLOTS },
  'kr': { name: '韩国', timeZone: 'Asia/Seoul', bestSlots: DEFAULT_SLOTS },
  'ae': { name: '阿联酋', timeZone: 'Asia/Dubai', bestSlots: [{ startHour: 9, endHour: 13, label: "Morning" }, { startHour: 15, endHour: 17, label: "Afternoon" }] },
  'ca-tor': { name: '加拿大 (多伦多)', timeZone: 'America/Toronto', bestSlots: DEFAULT_SLOTS },
  'br': { name: '巴西', timeZone: 'America/Sao_Paulo', bestSlots: DEFAULT_SLOTS },
  'in': { name: '印度', timeZone: 'Asia/Kolkata', bestSlots: [{ startHour: 10, endHour: 13, label: "Morning" }, { startHour: 14, endHour: 18, label: "Afternoon" }] },
  'dk': { name: '丹麦', timeZone: 'Europe/Copenhagen', bestSlots: DEFAULT_SLOTS },
  'no': { name: '挪威', timeZone: 'Europe/Oslo', bestSlots: DEFAULT_SLOTS },
  'es': { name: '西班牙', timeZone: 'Europe/Madrid', bestSlots: [{ startHour: 10, endHour: 13, label: "Late Morning" }, { startHour: 15, endHour: 17, label: "Late Afternoon" }] },
  'sa': { name: '沙特阿拉伯', timeZone: 'Asia/Riyadh', bestSlots: DEFAULT_SLOTS },
  'se': { name: '瑞典', timeZone: 'Europe/Stockholm', bestSlots: DEFAULT_SLOTS },
  'my': { name: '马来西亚', timeZone: 'Asia/Kuala_Lumpur', bestSlots: DEFAULT_SLOTS },
  'be': { name: '比利时', timeZone: 'Europe/Brussels', bestSlots: DEFAULT_SLOTS },
  'ar': { name: '阿根廷', timeZone: 'America/Argentina/Buenos_Aires', bestSlots: DEFAULT_SLOTS },
  'mx': { name: '墨西哥', timeZone: 'America/Mexico_City', bestSlots: DEFAULT_SLOTS },
  'au-syd': { name: '澳大利亚 (悉尼)', timeZone: 'Australia/Sydney', bestSlots: DEFAULT_SLOTS },
  'pr': { name: '波多黎各', timeZone: 'America/Puerto_Rico', bestSlots: DEFAULT_SLOTS },
  'ph': { name: '菲律宾', timeZone: 'Asia/Manila', bestSlots: DEFAULT_SLOTS },
  'kw': { name: '科威特', timeZone: 'Asia/Kuwait', bestSlots: DEFAULT_SLOTS },
  'ro': { name: '罗马尼亚', timeZone: 'Europe/Bucharest', bestSlots: DEFAULT_SLOTS },
  'bd': { name: '孟加拉国', timeZone: 'Asia/Dhaka', bestSlots: DEFAULT_SLOTS },
  'pe': { name: '秘鲁', timeZone: 'America/Lima', bestSlots: DEFAULT_SLOTS },
  'np': { name: '尼泊尔', timeZone: 'Asia/Kathmandu', bestSlots: DEFAULT_SLOTS },
  'ng': { name: '尼日利亚', timeZone: 'Africa/Lagos', bestSlots: DEFAULT_SLOTS },
  'lk': { name: '斯里兰卡', timeZone: 'Asia/Colombo', bestSlots: DEFAULT_SLOTS },
  'sd': { name: '苏丹', timeZone: 'Africa/Khartoum', bestSlots: DEFAULT_SLOTS },
  'tr': { name: '土耳其', timeZone: 'Europe/Istanbul', bestSlots: DEFAULT_SLOTS },
  'gt': { name: '危地马拉', timeZone: 'America/Guatemala', bestSlots: DEFAULT_SLOTS },
  'ua': { name: '乌克兰', timeZone: 'Europe/Kiev', bestSlots: DEFAULT_SLOTS },
  'gr': { name: '希腊', timeZone: 'Europe/Athens', bestSlots: DEFAULT_SLOTS },
  'il': { name: '以色列', timeZone: 'Asia/Jerusalem', bestSlots: DEFAULT_SLOTS },
  'id': { name: '印度尼西亚', timeZone: 'Asia/Jakarta', bestSlots: DEFAULT_SLOTS },
  'vn': { name: '越南', timeZone: 'Asia/Ho_Chi_Minh', bestSlots: DEFAULT_SLOTS },
  'dz': { name: '阿尔及利亚', timeZone: 'Africa/Algiers', bestSlots: DEFAULT_SLOTS },
  'za': { name: '南非', timeZone: 'Africa/Johannesburg', bestSlots: DEFAULT_SLOTS },
  'tm': { name: '土库曼斯坦', timeZone: 'Asia/Ashgabat', bestSlots: DEFAULT_SLOTS },
  'uz': { name: '乌兹别克斯坦', timeZone: 'Asia/Tashkent', bestSlots: DEFAULT_SLOTS },
  'tj': { name: '塔吉克斯坦', timeZone: 'Asia/Dushanbe', bestSlots: DEFAULT_SLOTS },
  'kz': { name: '哈萨克斯坦', timeZone: 'Asia/Almaty', bestSlots: DEFAULT_SLOTS },
  'kg': { name: '吉尔吉斯斯坦', timeZone: 'Asia/Bishkek', bestSlots: DEFAULT_SLOTS },
  'ru': { name: '俄罗斯', timeZone: 'Europe/Moscow', bestSlots: DEFAULT_SLOTS },
  'pl': { name: '波兰', timeZone: 'Europe/Warsaw', bestSlots: DEFAULT_SLOTS },
  'pk': { name: '巴基斯坦', timeZone: 'Asia/Karachi', bestSlots: DEFAULT_SLOTS },
  'co': { name: '哥伦比亚', timeZone: 'America/Bogota', bestSlots: DEFAULT_SLOTS },
  'ie': { name: '爱尔兰', timeZone: 'Europe/Dublin', bestSlots: DEFAULT_SLOTS }
};

// Calculate Beijing time for a local hour
function getBjTime(localHour, countryTimeZone) {
  // Use a fixed date for calculation (e.g., today)
  const now = new Date();
  
  // Create a date representing the local hour
  const localDateStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: countryTimeZone,
    hour12: false
  }).format(now);
  
  // Parse to get actual UTC timestamp
  const [datePart, timePart] = localDateStr.split(', ');
  const [month, day, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');
  
  // Create date object for the local timezone
  const localDateTime = new Date(year, month - 1, day, parseInt(hour), parseInt(minute));
  
  // Adjust to target local hour
  const targetLocalDate = new Date(localDateTime);
  targetLocalDate.setHours(localHour, 0, 0, 0);
  
  // Calculate the offset
  const utcTime = new Date(targetLocalDate.toLocaleString('en-US', { timeZone: 'UTC' }));
  const localTime = new Date(targetLocalDate.toLocaleString('en-US', { timeZone: countryTimeZone }));
  const offsetMs = localTime.getTime() - utcTime.getTime();
  
  // Convert to Beijing time
  const beijingTime = new Date(targetLocalDate.getTime() + offsetMs);
  const beijingHour = beijingTime.getHours();
  
  return beijingHour;
}

// Simplified calculation using UTC offset
function calculateBestTimes(countryId) {
  const country = COUNTRIES[countryId];
  if (!country) return null;
  
  // Get UTC offset for the country
  const now = new Date();
  const beijingTimeStr = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    hour12: false,
    timeZone: BEIJING_TZ
  }).format(now);
  const bjHour = parseInt(beijingTimeStr.split(':')[0]);
  
  const localTimeStr = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    hour12: false,
    timeZone: country.timeZone
  }).format(now);
  const localHour = parseInt(localTimeStr.split(':')[0]);
  
  // Calculate hour difference (Beijing - Local)
  let hourDiff = bjHour - localHour;
  if (hourDiff < -14) hourDiff += 24;
  if (hourDiff > 14) hourDiff -= 24;
  
  // Find morning and afternoon slots
  const morningSlot = country.bestSlots.find(s => s.label.toLowerCase().includes('morning')) || country.bestSlots[0];
  const afternoonSlot = country.bestSlots.find(s => s.label.toLowerCase().includes('afternoon')) || country.bestSlots[1];
  
  // Calculate best times (startHour + 1)
  const primeMorningLocal = morningSlot.startHour + 1;
  const primeAfternoonLocal = afternoonSlot.startHour + 1;
  
  // Convert to Beijing time
  const primeMorningBj = ((primeMorningLocal + hourDiff) % 24 + 24) % 24;
  const primeAfternoonBj = ((primeAfternoonLocal + hourDiff) % 24 + 24) % 24;
  
  return {
    name: country.name,
    morning: `${primeMorningBj.toString().padStart(2, '0')}:00`,
    afternoon: `${primeAfternoonBj.toString().padStart(2, '0')}:00`
  };
}

// Generate table
const countries = [
  '美国', '德国', '日本', '法国', '英国', '荷兰', '新加坡', '意大利', '瑞士', '韩国',
  '阿联酋', '加拿大', '巴西', '印度', '丹麦', '挪威', '西班牙', '沙特阿拉伯', '瑞典', '马来西亚',
  '比利时', '阿根廷', '墨西哥', '澳大利亚', '波多黎各', '菲律宾', '科威特', '罗马尼亚', '孟加拉国', '秘鲁',
  '尼泊尔', '尼日利亚', '斯里兰卡', '苏丹', '土耳其', '危地马拉', '乌克兰', '希腊', '以色列', '印度尼西亚',
  '越南', '阿尔及利亚', '南非', '土库曼斯坦', '乌兹别克斯坦', '塔吉克斯坦', '哈萨克斯坦', '吉尔吉斯斯坦',
  '俄罗斯', '波兰', '巴基斯坦', '哥伦比亚', '爱尔兰'
];

console.log('国家/地区\t最佳早安时间(北京时间)\t最佳午安时间(北京时间)');
console.log('─'.repeat(60));

const results = [];
for (const chineseName of countries) {
  const countryIds = COUNTRY_MAP[chineseName];
  if (!countryIds || countryIds.length === 0) {
    console.error(`未找到国家: ${chineseName}`);
    continue;
  }
  
  const countryId = countryIds[0];
  const result = calculateBestTimes(countryId);
  if (result) {
    const displayName = chineseName === '美国' ? '美国 (纽约)' : 
                       chineseName === '加拿大' ? '加拿大 (多伦多)' :
                       chineseName === '澳大利亚' ? '澳大利亚 (悉尼)' : chineseName;
    console.log(`${displayName}\t${result.morning}\t${result.afternoon}`);
    results.push({ name: displayName, morning: result.morning, afternoon: result.afternoon });
  }
}

// Also output as markdown table
console.log('\n\n## Markdown 表格格式:\n');
console.log('| 国家/地区 | 最佳早安时间(北京时间) | 最佳午安时间(北京时间) |');
console.log('|----------|---------------------|---------------------|');
results.forEach(r => {
  console.log(`| ${r.name} | ${r.morning} | ${r.afternoon} |`);
});

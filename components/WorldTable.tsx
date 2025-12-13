import React, { useMemo, useState } from 'react';
import { COUNTRIES, BEIJING_TZ } from '../constants';
import { ComputedCountryData, CountryData } from '../types';
import { AlertCircle, Clock, Search, Filter, Sun, Sunset, Palmtree, Coffee } from 'lucide-react';

interface WorldTableProps {
  currentTime: Date;
  onAssistantRequest: (country: CountryData, localTime: string) => void;
}

// Helper: Define Weekend Definitions by Country ID
// Standard (Sat/Sun) is default.
// Fri/Sat: Saudi, Qatar, Kuwait, Oman, Bahrain, Iraq, Jordan, Egypt, Algeria, Bangladesh, Maldives, Israel
const FRI_SAT_WEEKEND = new Set(['sa', 'qa', 'kw', 'om', 'bh', 'iq', 'jo', 'eg', 'dz', 'bd', 'mv', 'il']);
// Thu/Fri: Iran
const THU_FRI_WEEKEND = new Set(['ir']);

// Helper: Expanded Fixed Holiday Checker
// Note: This only covers fixed Gregorian calendar holidays. 
// Variable holidays (Easter, CNY, Thanksgiving, Ramadan) require complex calculation libraries not included here.
const checkHoliday = (date: Date, countryId: string): string | null => {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();        // 1-31
  const key = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  // --- Global / Western Major ---
  if (key === '01-01') return 'New Year';
  if (key === '12-25') return 'Christmas Day';
  
  // --- Regional Specifics ---

  // US & Americas
  if (countryId.startsWith('us')) {
      if (key === '06-19') return 'Juneteenth';
      if (key === '07-04') return 'Independence Day';
      if (key === '11-11') return 'Veterans Day';
  }
  if (countryId.startsWith('ca')) {
      if (key === '07-01') return 'Canada Day';
      if (key === '11-11') return 'Remembrance Day';
  }
  if (countryId === 'mx' && key === '09-16') return 'Independence Day';
  if (countryId === 'br') {
      if (key === '09-07') return 'Independence Day';
      if (key === '11-02') return 'Finados';
      if (key === '11-15') return 'Republic Day';
  }

  // Europe
  if (key === '05-01') {
      // Labor day is widely observed in EU/CN/Latin America, but NOT US/CA (which is in Sept)
      if (!countryId.startsWith('us') && !countryId.startsWith('ca')) return 'Labor Day';
  }
  
  if (countryId === 'fr') {
      if (key === '07-14') return 'Bastille Day';
      if (key === '05-08') return 'Victory Day';
      if (key === '11-11') return 'Armistice Day';
  }
  if (countryId === 'de' && key === '10-03') return 'German Unity Day';
  if (countryId === 'it') {
      if (key === '04-25') return 'Liberation Day';
      if (key === '06-02') return 'Republic Day';
  }
  if (countryId === 'es' && key === '10-12') return 'Fiesta Nacional';
  if (countryId === 'uk' || countryId.startsWith('au') || countryId === 'nz' || countryId.startsWith('ca')) {
      if (key === '12-26') return 'Boxing Day';
  }
  if (countryId === 'ie' && key === '03-17') return 'St Patrick\'s Day';
  if (countryId === 'no' && key === '05-17') return 'Constitution Day';

  // Asia
  if (countryId === 'jp') {
      if (key === '01-01') return 'New Year'; // Already covered
      if (key === '02-11') return 'Foundation Day';
      if (key === '02-23') return 'Emperor Birthday';
      if (key === '04-29') return 'Showa Day';
      if (key === '05-03') return 'Constitution Day';
      if (key === '05-04') return 'Greenery Day';
      if (key === '05-05') return 'Children\'s Day';
      if (key === '11-03') return 'Culture Day';
      if (key === '11-23') return 'Labor Thanksgiving';
  }
  if (countryId === 'kr') {
      if (key === '03-01') return 'Independence Day';
      if (key === '05-05') return 'Children\'s Day';
      if (key === '06-06') return 'Memorial Day';
      if (key === '08-15') return 'Liberation Day';
      if (key === '10-03') return 'Foundation Day';
      if (key === '10-09') return 'Hangeul Day';
  }
  if (countryId === 'cn') {
      if (key === '10-01') return 'National Day';
      if (key === '10-02') return 'National Day Hol.';
      if (key === '10-03') return 'National Day Hol.';
  }
  if (countryId === 'in' && key === '01-26') return 'Republic Day';
  if (countryId === 'in' && key === '08-15') return 'Independence Day';
  if (countryId === 'in' && key === '10-02') return 'Gandhi Jayanti';

  // Oceania
  if (countryId.startsWith('au')) {
      if (key === '01-26') return 'Australia Day';
      if (key === '04-25') return 'Anzac Day';
  }
  if (countryId === 'nz') {
      if (key === '02-06') return 'Waitangi Day';
      if (key === '04-25') return 'Anzac Day';
  }

  return null;
};

const WorldTable: React.FC<WorldTableProps> = ({ currentTime, onAssistantRequest }) => {
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const computedData: ComputedCountryData[] = useMemo(() => {
    // Helper to get Beijing Hour for offset calculation
    const beijingTimeStr = currentTime.toLocaleString('en-US', { timeZone: BEIJING_TZ });
    const bJDate = new Date(beijingTimeStr);
    const bjHour = bJDate.getHours();

    return COUNTRIES.map((country) => {
      // 1. Calculate Current Local Time & Object
      const localTimeStrFull = new Date(currentTime).toLocaleString('en-US', { timeZone: country.timeZone });
      const localDateObj = new Date(localTimeStrFull); // Create a Date object representing the LOCAL time components
      
      const currentLocalHour = localDateObj.getHours();
      const currentLocalMinute = localDateObj.getMinutes();
      const currentLocalDay = localDateObj.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
      const currentTotalMinutes = currentLocalHour * 60 + currentLocalMinute;
      
      const displayLocalTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: country.timeZone,
        hour12: false
      }).format(currentTime);

      // 2. Calculate offsets
      let hourDiff = bjHour - currentLocalHour;
      if (hourDiff < -14) hourDiff += 24;
      if (hourDiff > 14) hourDiff -= 24;
      const offsetLabel = hourDiff >= 0 ? `+${hourDiff}` : `${hourDiff}`;

      // 3. Holiday & Weekend Detection
      const holidayName = checkHoliday(localDateObj, country.id);
      const isHoliday = !!holidayName;

      let isWeekend = false;
      if (THU_FRI_WEEKEND.has(country.id)) {
        if (currentLocalDay === 4 || currentLocalDay === 5) isWeekend = true; // Thu, Fri
      } else if (FRI_SAT_WEEKEND.has(country.id)) {
        if (currentLocalDay === 5 || currentLocalDay === 6) isWeekend = true; // Fri, Sat
      } else {
        // Default Sat/Sun
        if (currentLocalDay === 0 || currentLocalDay === 6) isWeekend = true; // Sun, Sat
      }

      // 4. Determine Status and Nearest Prime Point for Sorting
      let minSortScore = Infinity;
      let selectedPrimeBjTime = "";
      let isCurrentlyGood = false;

      // Calculate specific Morning/Afternoon BJ times
      const morningSlot = country.bestSlots.find(s => s.label.toLowerCase().includes('morning')) || country.bestSlots[0];
      const afternoonSlot = country.bestSlots.find(s => s.label.toLowerCase().includes('afternoon')) || country.bestSlots[1];

      const getBjTime = (localH: number) => {
         const val = ((localH + hourDiff) % 24 + 24) % 24;
         return `${val.toString().padStart(2, '0')}:00`;
      };

      const primeMorningBj = morningSlot ? getBjTime(morningSlot.startHour + 1) : '-';
      const primeAfternoonBj = (afternoonSlot && afternoonSlot !== morningSlot) ? getBjTime(afternoonSlot.startHour + 1) : '-';


      // Sorting Logic
      country.bestSlots.forEach(slot => {
         const primeLocalHour = slot.startHour + 1; 
         const primeTotalMinutes = primeLocalHour * 60;
         
         const isActive = currentLocalHour >= slot.startHour && currentLocalHour < slot.endHour;
         
         // STRICT RULE: If it is Weekend or Holiday, it is NOT currently good, even if the hour is right.
         if (isActive && !isWeekend && !isHoliday) {
            isCurrentlyGood = true;
         }

         // Calculate raw difference in minutes
         let diff = primeTotalMinutes - currentTotalMinutes;
         let distToFuturePrime = diff;
         if (distToFuturePrime < -(slot.endHour - slot.startHour) * 60) { 
             distToFuturePrime += 24 * 60;
         }
         
         let score = 0;
         if (isActive && !isWeekend && !isHoliday) {
             score = -20000 + Math.abs(diff); 
         } else {
             if (distToFuturePrime < 0) distToFuturePrime += 24 * 60; 
             score = distToFuturePrime;
             
             // Penalty for weekend/holiday in sorting so they drop to bottom if needed? 
             // Or keep time based. Let's keep time based but status will show red.
         }

         if (score < minSortScore) {
             minSortScore = score;
             selectedPrimeBjTime = getBjTime(primeLocalHour);
         }
      });

      // 5. Formulate strings
      const nextGoodSlotBeijing = country.bestSlots.map(s => {
          let startBj = ((s.startHour + hourDiff) % 24 + 24) % 24;
          let endBj = ((s.endHour + hourDiff) % 24 + 24) % 24;
          const f = (n: number) => n.toString().padStart(2, '0');
          return `${f(startBj)}:00-${f(endBj)}:00`;
      }).join(' / ');

      const nextGoodSlotLocal = country.bestSlots.map(s => {
        const f = (n: number) => n.toString().padStart(2, '0');
        return `${f(s.startHour)}:00-${f(s.endHour)}:00`;
      }).join(' / ');

      return {
        ...country,
        currentLocalTimeStr: displayLocalTime,
        isCurrentlyGood,
        minutesUntilNextSlot: minSortScore, 
        nextGoodSlotLocal,
        nextGoodSlotBeijing,
        timeDifferenceLabel: `BJ ${offsetLabel}h`,
        primeBeijingTime: selectedPrimeBjTime,
        primeMorningBj,
        primeAfternoonBj,
        isWeekend,
        isHoliday,
        holidayName
      };
    });
  }, [currentTime]);

  // Filtering
  const filteredData = computedData.filter(c => {
    // Region Filter
    const regionMatch = filterRegion === 'All' || c.region === filterRegion || c.region.includes(filterRegion);
    
    // Search Filter
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return regionMatch;

    const nameMatch = c.name.toLowerCase().includes(searchLower);
    const regionTextMatch = c.region.toLowerCase().includes(searchLower);
    const codeMatch = c.callingCode.includes(searchLower);
    
    return regionMatch && (nameMatch || regionTextMatch || codeMatch);
  });

  // Sorting
  const sortedData = filteredData.sort((a, b) => a.minutesUntilNextSlot - b.minutesUntilNextSlot);

  // Extract unique regions
  const regions = ['All', ...Array.from(new Set(COUNTRIES.map(c => c.region)))];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Controls Header - Stacked Layout */}
      <div className="flex flex-col p-5 border-b border-slate-100 bg-slate-50 gap-4">
        
        {/* Row 1: Search Box */}
        <div className="w-full">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-900"
                    placeholder="搜索国家、地区或区号 (Search Country, Region or Code)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* Row 2: Region Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide w-full">
          <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-wider shrink-0 gap-1 bg-white px-2 py-1 rounded border border-slate-100">
             <Filter className="w-3 h-3" />
             Region
          </div>
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setFilterRegion(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                filterRegion === r 
                  ? 'bg-blue-600 text-white shadow-md border-blue-600' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 font-semibold min-w-[220px]">
                国家 / 地区
                <div className="text-[10px] text-slate-400 font-normal normal-case">Country / Region</div>
              </th>
              <th className="p-4 font-semibold">
                当地时间
                <div className="text-[10px] text-slate-400 font-normal normal-case">Local Time</div>
              </th>
              <th className="p-4 font-semibold hidden md:table-cell text-slate-500">
                 当地习惯窗口
                <div className="text-[10px] text-slate-400 font-normal normal-case">Local Habit</div>
              </th>
              
              <th className="p-4 font-semibold bg-indigo-50/50 border-b-2 border-indigo-500 text-indigo-800 text-center hidden md:table-cell">
                最佳时段 (北京)
                <div className="text-[10px] text-indigo-600 font-normal normal-case">Best Windows (BJ)</div>
              </th>

              <th className="p-4 font-semibold">
                状态
                <div className="text-[10px] text-slate-400 font-normal normal-case">Status</div>
              </th>
              <th className="p-4 font-semibold bg-amber-50/50 border-b-2 border-amber-500 text-amber-800 text-center">
                 早安发信点 (BJ)
                <div className="text-[10px] text-amber-600 font-normal normal-case">Morning Prime</div>
              </th>
              <th className="p-4 font-semibold bg-blue-50/50 border-b-2 border-blue-500 text-blue-800 text-center">
                 午安发信点 (BJ)
                <div className="text-[10px] text-blue-600 font-normal normal-case">Afternoon Prime</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((item) => (
              <tr 
                key={item.id} 
                className={`group transition-colors hover:bg-slate-50 ${
                  item.isHoliday ? 'bg-red-50/40' : 
                  item.isWeekend ? 'bg-slate-100/50' : 
                  item.isCurrentlyGood ? 'bg-green-50/30' : ''
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={item.name}>{item.flag}</span>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{item.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                         <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                           {item.callingCode}
                         </span>
                         <span className="text-xs text-slate-400 font-mono">
                           {item.timeDifferenceLabel}
                         </span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="p-4 font-mono text-slate-700 font-medium text-base">
                  {item.currentLocalTimeStr}
                </td>

                <td className="p-4 hidden md:table-cell text-sm text-slate-500">
                  {item.nextGoodSlotLocal}
                </td>

                <td className="p-4 bg-indigo-50/30 group-hover:bg-indigo-100/30 transition-colors text-center border-l border-indigo-100/50 text-indigo-900 font-medium text-sm hidden md:table-cell">
                   {item.nextGoodSlotBeijing}
                </td>

                <td className="p-4">
                  {item.isHoliday ? (
                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 whitespace-nowrap" title={`Public Holiday: ${item.holidayName}`}>
                       <Palmtree className="w-3 h-3" />
                       Holiday
                     </span>
                  ) : item.isWeekend ? (
                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-600 border border-slate-300 whitespace-nowrap">
                       <Coffee className="w-3 h-3" />
                       Weekend
                     </span>
                  ) : item.isCurrentlyGood ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 whitespace-nowrap shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      Wait
                    </span>
                  )}
                  {item.isHoliday && <div className="text-[10px] text-red-500 mt-1 font-medium truncate max-w-[80px]">{item.holidayName}</div>}
                </td>

                {/* Morning Prime - Changed from button to div */}
                <td className="p-4 bg-amber-50/30 group-hover:bg-amber-100/30 transition-colors text-center border-l border-amber-100/50">
                  <div 
                    className="flex items-center justify-center gap-2 mx-auto font-bold text-lg text-amber-700"
                  >
                    <Sun className="w-4 h-4" />
                    {item.primeMorningBj}
                  </div>
                </td>

                {/* Afternoon Prime - Changed from button to div */}
                <td className="p-4 bg-blue-50/30 group-hover:bg-blue-100/30 transition-colors text-center border-l border-blue-100/50">
                  <div 
                    className="flex items-center justify-center gap-2 mx-auto font-bold text-lg text-blue-700"
                  >
                    <Sunset className="w-4 h-4" />
                    {item.primeAfternoonBj}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
         <div className="p-12 text-center text-slate-400 flex flex-col items-center">
            <AlertCircle className="w-12 h-12 mb-2 opacity-50" />
            <p>未找到匹配的国家 (No countries found).</p>
         </div>
      )}
    </div>
  );
};

export default WorldTable;
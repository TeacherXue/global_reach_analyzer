export interface TimeSlot {
  startHour: number; // 0-23
  endHour: number;   // 0-23
  label: string;     // e.g., "Morning Slot"
}

export interface CountryData {
  id: string;
  name: string;
  flag: string; // Emoji
  region: string;
  timeZone: string; // IANA Timezone string (e.g., 'America/New_York')
  callingCode: string; // e.g., "+86"
  bestSlots: TimeSlot[];
}

export interface ComputedCountryData extends CountryData {
  currentLocalTimeStr: string;
  isCurrentlyGood: boolean;
  nextGoodSlotLocal: string;
  nextGoodSlotBeijing: string;
  minutesUntilNextSlot: number;
  timeDifferenceLabel: string; // e.g. "UTC+8" or "UTC-5"
  primeBeijingTime: string;    // e.g. "22:00" (The single best point in BJ time - kept for sorting reference)
  primeMorningBj: string;      // Beijing time for local morning slot
  primeAfternoonBj: string;    // Beijing time for local afternoon slot
  workHoursBeijing: string;    // Beijing time for local 9:00-18:00 work hours
  isWeekend: boolean;          // Is it currently weekend in that country?
  isHoliday: boolean;          // Is it currently a public holiday?
  holidayName: string | null;  // Name of the holiday if applicable
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
import { fmtDayLabel, startOfDay } from './date.js';

const veg = (label) => ({ label, kind: 'veg' });
const nonveg = (label) => ({ label, kind: 'nonveg' });
const drink = (label) => ({ label, kind: 'drink' });
const sweet = (label) => ({ label, kind: 'sweet' });
const other = (label) => ({ label, kind: 'other' });

function meal(key, title, time, items) {
  return { key, title, time, items };
}

function splitList(s) {
  return String(s)
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

function mkItems(list, defaultKind) {
  return splitList(list).map((label) => ({ label, kind: defaultKind }));
}

// Menu extracted from the photo: "ANNAPURNA - WEEKLY MENU MARCH - 2026"
// Note: Some cell text is partially unclear in the photo; unclear bits are kept as "Kinnu" etc exactly as visible.
const WEEKLY = {
  // 0 Sunday .. 6 Saturday
  1: {
    // Monday
    breakfast:
      'Poori, Aaloo Tomato Sabji, Veg. Semiya, Cornflakes, Kala Chana Chaat, Bread, Butter, Jam, Milk, Tea.',
    lunch:
      'Matar Paneer, Dal Masoor Sabut, Boondi Raita, Rice, Plain Chapati, Salad, Kinnu.',
    dinner:
      'Aaloo Shimla Mirch, Dal Panchranga, Matar Pulao, Plain Chapati, Salad, Green Chutney, Sweet Dish - Semiya Kheer, Hot Milk.',
  },
  2: {
    // Tuesday
    breakfast:
      'Stuffed Paratha, Plain Curd, Maggi, Bread, Butter, Jam, Sprouts, Tea.',
    lunch:
      'Mix Veg, Dal Rajmah, Plain Curd, Rice, Plain Chapati, Salad, Amul Ice-Cream.',
    dinner:
      'Baingan Bharta, Dal Moong Malka, Veg Pulao, Plain Chapati, Salad, Sweet Dish - Besan Ladoo, Hot Milk.',
  },
  3: {
    // Wednesday
    breakfast:
      'Bonda / Bread Roll, Poha, Boiled Egg, Bread, Butter, Jam, Kala Chana Chaat, Hot Coffee, Banana.',
    lunch:
      'Jeera Aaloo, Kadhi (Boondi), Rice, Plain Chapati, Salad, Papad.',
    dinner:
      'Chilli Paneer, Dal Moong Sabut, Rice, Plain Chapati, Salad, Sweet Dish - Fruit Custard, Hot Milk.',
  },
  4: {
    // Thursday
    breakfast:
      'Idli, Sambhar, Vada, Coconut Chutney, Upma, Bread, Butter, Jam, Tea.',
    lunch:
      'Choley Bhature, Veg Biryani, Dahi Pakodi with Sounth Chutney, Onion Salad, Lemon, Apple.',
    dinner:
      'Aaloo Beans, Dal Makhani, Rice, Plain Chapati, Salad, Green Chutney, Sweet Dish - Gulab Jamun, Hot Milk.',
  },
  5: {
    // Friday
    breakfast:
      'Kachori Dal / Matar, Aaloo Tomato Sabji, Veg Semiya, Boiled Egg, Cornflakes, Bread, Butter, Jam, Sprouts, Milk, Coffee, Banana.',
    lunch:
      'Gajar Aaloo Matar, Dal Arhar, Boondi Raita, Rice, Plain Chapati, Salad.',
    dinner:
      'Palak Paneer, Dal Chana Urad, Veg. Pulao, Plain Chapati, Salad, Sweet Dish - Rice Kheer, Hot Milk.',
  },
  6: {
    // Saturday
    breakfast:
      'Aaloo Sandwich / Veg Sandwich, Poha, Kala Chana Chaat, Bread, Butter, Jam, Tea.',
    lunch:
      'Lauki Chana, Dal Rajmah, Veg Raita, Rice, Plain Chapati, Salad, Fruit Chat.',
    dinner:
      'Matar Mushroom, Mix Dal, Rice, Missi Chapati Plain, Salad, Green Chutney, Sweet Dish - Sooji Halwa, Hot Milk.',
  },
  0: {
    // Sunday
    breakfast:
      'Macaroni, Pav Bhaji / Pasta, Samosa, Cornflakes, Boiled Egg, Bread, Butter, Jam, Milk, Tea.',
    lunch:
      'Aallo Tomato Sabji, Kachori Dal / Matar, Veg Biryani, Salad, Amul kulfi - Rajasthani.',
    dinner:
      'Mix Vegetable, Dal Maharani, Rice, Plain Chapati, Salad, Sweet Dish - Fruit Cream, Hot Milk.',
  },
};

function dayMenuForDate(d) {
  const dow = d.getDay();
  const x = WEEKLY[dow] ?? WEEKLY[0];

  // crude kind tagging so chips look nice
  const breakfastItems = mkItems(x.breakfast, 'other').map((it) => {
    const l = it.label.toLowerCase();
    if (l.includes('milk') || l.includes('tea') || l.includes('coffee')) return { ...it, kind: 'drink' };
    if (l.includes('egg')) return { ...it, kind: 'nonveg' };
    return it;
  });

  const lunchItems = mkItems(x.lunch, 'veg').map((it) => {
    const l = it.label.toLowerCase();
    if (l.includes('ice') || l.includes('kulfi')) return { ...it, kind: 'sweet' };
    return it;
  });

  const dinnerItems = mkItems(x.dinner, 'veg').map((it) => {
    const l = it.label.toLowerCase();
    if (l.startsWith('sweet dish') || l.includes('kheer') || l.includes('jamun') || l.includes('halwa') || l.includes('custard') || l.includes('cream')) {
      return { ...it, kind: 'sweet' };
    }
    if (l.includes('hot milk')) return { ...it, kind: 'drink' };
    return it;
  });

  return {
    breakfast: meal('breakfast', 'Breakfast', '07:30–09:00', breakfastItems),
    lunch: meal('lunch', 'Lunch', '12:00–14:00', lunchItems),
    dinner: meal('dinner', 'Dinner', '19:30–21:00', dinnerItems),
  };
} 

export function buildDemoMonth() {
  // Build March 2026 so the sheet matches the UI.
  const year = 2026;
  const monthIndex = 2; // March
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Default to "today" when it's within this demo month.
  const today = startOfDay(new Date());
  const isInDemoMonth = today.getFullYear() === year && today.getMonth() === monthIndex;
  const initialSelected = isInDemoMonth ? today : new Date(year, monthIndex, 1);

  const days = Array.from({ length: daysInMonth }).map((_, i) => {
    const d = new Date(year, monthIndex, i + 1);
    const dateKey = fmtDayLabel(d);
    const m = dayMenuForDate(d);
    const meals = [m.breakfast, m.lunch, m.dinner];
    return { dateKey, meals };
  });

  const byKey = new Map();
  for (const d of days) byKey.set(d.dateKey, d);

  return { initialSelected, start: new Date(year, monthIndex, 1), days, byKey };
}


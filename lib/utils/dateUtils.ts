import { DateTime, Interval } from "luxon";

export const generateWeekDays = () => {
  const start = DateTime.now().startOf("week").plus({ days: 1 });
  return Array.from({ length: 7 }, (_, i) => start.plus({ days: i }));
};

export const generateHours = () => {
  return Array.from({ length: 10 }, (_, i) => i + 8); // 8 to 17
};

export const getSlotInterval = (day: DateTime, hour: number) => {
  const start = day.set({ hour, minute: 0 });
  const end = start.plus({ hours: 1 });
  return Interval.fromDateTimes(start, end);
};

export const formatTime = (iso: string) => {
  return DateTime.fromISO(iso).toFormat("hh:mm a");
};

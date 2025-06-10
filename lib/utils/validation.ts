import { Appointment } from "@/types/Appointment";
import { Interval } from "luxon";

export const hasOverlap = (newAppointment: Appointment, all: Appointment[]) => {
  const newStart = Interval.fromDateTimes(
    new Date(newAppointment.start),
    new Date(newAppointment.end)
  );
  return all.some((appt) => {
    if (appt.id === newAppointment.id) return false;
    const existing = Interval.fromDateTimes(
      new Date(appt.start),
      new Date(appt.end)
    );
    return newStart.overlaps(existing);
  });
};

import { Appointment } from "@/types/Appointment";
import { DateTime } from "luxon";
import { getSlotInterval } from "@/lib/utils/dateUtils";
import AppointmentBlock from "./AppointmentBlock";

interface Props {
  day: DateTime;
  hour: number;
  appointments: Appointment[];
  onSelect: (appt: Appointment) => void;
  onDelete?: (id: string) => void;
  setShowForm?: (open: boolean) => void;
}

const TimeSlot = ({
  day,
  hour,
  appointments,
  onSelect,
  onDelete,
  setShowForm,
}: Props) => {
  const interval = getSlotInterval(day, hour);
  const match = appointments.find((appt) => {
    const start = DateTime.fromISO(appt.start);
    return interval.contains(start);
  });

  return (
    <div
      className="border-t border-l h-20 relative cursor-pointer"
      onClick={() => {
        if (!match) {
          if (interval.start && interval.end) {
            const start = interval.start.toISO();
            const end = interval.end.toISO();
            onSelect({
              id: crypto.randomUUID(),
              patient: "",
              doctor: "",
              treatment: "",
              purpose: "",
              start,
              end,
            });
          }
        }
      }}
    >
      {match && (
        <AppointmentBlock
          appt={match}
          onClick={() => onSelect(match)}
          onDelete={onDelete}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default TimeSlot;

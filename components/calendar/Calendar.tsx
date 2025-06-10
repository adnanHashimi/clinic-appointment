"use client";
import React from "react";
import { generateWeekDays, generateHours } from "@/lib/utils/dateUtils";
import { DateTime } from "luxon";
import TimeSlot from "./TimeSlot";
import { Appointment } from "@/types/Appointment";

interface Props {
  appointments: Appointment[];
  onSelect: (appt: Appointment) => void;
  onDelete?: (id: string) => void;
  setShowForm?: (open: boolean) => void;
}

const Calendar = ({ appointments, onSelect, onDelete, setShowForm }: Props) => {
  const days = generateWeekDays();
  const hours = generateHours();
  const today = DateTime.now().toISODate();

  return (
    <div className="grid grid-cols-[80px_100px_repeat(7,1fr)] max-xl:min-w-[1200px] overflow-auto border">
      <div className="bg-Background"></div>
      <div className="text-center p-2 font-semibold border-l bg-blue-50 text-Primary">
        Today
      </div>
      {days.map((day) => (
        <div
          key={`header-${day.toISODate()}`}
          className="text-center p-2 font-medium border-l"
        >
          {day.toFormat("ccc dd")}
        </div>
      ))}

      {hours.map((hour, rowIdx) => (
        <React.Fragment key={`row-${rowIdx}`}>
          <div className="text-sm text-gray-500 text-right pr-2 py-4 border-t">{`${hour}:00`}</div>

          <div className="border-t border-l h-20 relative bg-blue-50">
            {appointments
              .filter(
                (appt) => DateTime.fromISO(appt.start).toISODate() === today
              )
              .filter((appt) => DateTime.fromISO(appt.start).hour === hour)
              .map((appt) => (
                <div
                  key={`appt-${appt.id}`}
                  className="absolute inset-1 bg-Primary text-white text-xs p-1 rounded cursor-pointer hover:scale-[1.02] transition"
                  onClick={() => onSelect(appt)}
                >
                  <div>{appt.patient}</div>
                  <div className="text-sm">
                    {DateTime.fromISO(appt.start).toFormat("HH:mm")} -{" "}
                    {DateTime.fromISO(appt.end).toFormat("HH:mm")}
                  </div>
                </div>
              ))}
          </div>

          {days.map((day) => (
            <TimeSlot
              key={`slot-${day.toISODate()}-${hour}`}
              day={day}
              hour={hour}
              appointments={appointments}
              onSelect={onSelect}
              onDelete={onDelete}
              setShowForm={setShowForm}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Calendar;

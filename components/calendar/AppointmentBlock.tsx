"use client";
import { Appointment } from "@/types/Appointment";
import { formatTime } from "@/lib/utils/dateUtils";
import { FaEdit, FaTrash } from "react-icons/fa";

type AppointmentBlockProps = {
  appt: Appointment;
  onClick: () => void;
  onDelete?: (id: string) => void;
  setShowForm?: (open: boolean) => void;
};

const AppointmentBlock = ({
  appt,
  onClick,
  setShowForm,
  onDelete,
}: AppointmentBlockProps) => {
  // const { handleDeleteAppointment } = useCalendar();
  return (
    <div
      className="absolute inset-0 bg-Primary text-white text-sm p-3 rounded-xl cursor-pointer shadow-lg group transition-all duration-300 hover:scale-[1.02] overflow-visible"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-0" />

      <div className="absolute top-1 right-2 hidden group-hover:flex space-x-2 z-20">
        <button
          onClick={() => setShowForm && setShowForm(true)}
          className=" backdrop-blur-sm bg-Primary text-white p-1.5 rounded-full transition hover:cursor-pointer"
        >
          <FaEdit size={12} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) {
              onDelete(appt.id);
            }
          }}
          className=" backdrop-blur-sm bg-Error text-white p-1.5 rounded-full transition hover:cursor-pointer"
        >
          <FaTrash size={12} />
        </button>
      </div>

      <div className="relative  z-10 space-y-1">
        <div className="font-semibold text-sm tracking-wide">
          Patient: <span className="font-normal text-xs">{appt.patient}</span>
        </div>
        <div className="text-sm">
          Doctor: <span className="font-light text-xs">{appt.doctor}</span>
        </div>
        <div className="text-xs italic">
          {formatTime(appt.start)} - {formatTime(appt.end)}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBlock;

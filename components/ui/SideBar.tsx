import { CalendarRange } from "lucide-react";
import { FaUserMd, FaCalendarPlus } from "react-icons/fa";

interface SidebarProps {
  setShowForm?: (open: boolean) => void;

  activeSideBar?: boolean;
  handleDisplayChange?: (display: string) => void;
}

const Sidebar = ({
  setShowForm,
  activeSideBar,
  handleDisplayChange,
}: SidebarProps) => {
  return (
    <aside
      className={` xl:w-[220px]  z-50 h-full border-r bg-white p-4 flex flex-col gap-5 text-gray-800 ${
        activeSideBar ? "block min-w-[180px]" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold ">Overview</h2>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-Primary transition text-sm font-semibold"
        onClick={() => handleDisplayChange?.("calendar")}
      >
        <CalendarRange className="text-Secondary text-xs" />
        <span>Calendar</span>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer hover:text-Primary transition text-sm font-semibold"
        onClick={() => handleDisplayChange?.("doctors")}
      >
        <FaUserMd className="text-Primary text-base" />
        <span>Doctors</span>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer font-semibold text-Accent hover:text-Primary transition text-sm"
        onClick={() => setShowForm?.(true)}
      >
        <FaCalendarPlus className="text-Accent" />
        <span>Add Appoitment</span>
      </div>
    </aside>
  );
};

export default Sidebar;

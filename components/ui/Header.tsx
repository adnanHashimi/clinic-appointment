"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AppWindow, CircleChevronLeft } from "lucide-react";

interface Props {
  treatments: string[];
  selected: string;
  onSelect: (value: string) => void;
  handleSideBar: (state: boolean) => void;
  activeSideBar?: boolean;
}

const Header = ({
  treatments,
  selected,
  onSelect,
  handleSideBar,
  activeSideBar,
}: Props) => {
  return (
    <div className="flex items-center justify-between bg-Background p-4 max-w-screen border-b overflow-hidden">
      <div
        className="xl:hidden max-xl:block cursor-pointer text-Primary hover:text-Accent transition"
        onClick={() => handleSideBar(!activeSideBar)}
      >
        {activeSideBar === true ? <CircleChevronLeft /> : <AppWindow />}
      </div>

      <h1 className="xl:text-2xl max-xl:text-xl max-lg:text-lg max-sm:text-base font-bold text-Text">
        Clinic Scheduling
      </h1>
      <div className="flex items-center gap-4">
        <Select value={selected} onValueChange={onSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by treatment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Treatments</SelectItem>
            {treatments.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;

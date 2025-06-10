"use client";
import Calendar from "@/components/calendar/Calendar";
import AppointmentForm from "@/components/form/AppointmentForm";
import Sidebar from "@/components/ui/SideBar";
import Header from "@/components/ui/Header";
import { dummyTreatments } from "@/lib/constant";
import { useCalendar } from "@/hooks/useCalendar"; // adjust path if needed
import { useSideBar } from "@/hooks/useSideBar";
import Doctors from "@/components/doctors/Doctors";
import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState<string>("calendar");
  const {
    filteredAppointments,
    appointments,
    selectedAppt,
    showForm,
    filter,
    setFilter,
    setSelectedAppt,
    setShowForm,
    handleSave,
    handleDelete,
    handleDeleteAppointment,
  } = useCalendar();

  const { handleSideBar, activeSideBar } = useSideBar();
  const handleDisplayChange = (newDisplay: string) => {
    setDisplay(newDisplay);
  };

  return (
    <div className="flex h-screen overflow-auto bg-Background">
      <Sidebar
        setShowForm={setShowForm}
        activeSideBar={activeSideBar}
        handleDisplayChange={handleDisplayChange}
      />

      <main className="flex-1 flex flex-col">
        <Header
          treatments={dummyTreatments}
          selected={filter}
          onSelect={setFilter}
          handleSideBar={handleSideBar}
          activeSideBar={activeSideBar}
        />

        <div className="flex-1 overflow-scroll bg-Background p-4">
          {display === "calendar" ? (
            <Calendar
              appointments={filteredAppointments}
              onDelete={handleDeleteAppointment}
              setShowForm={setShowForm}
              onSelect={(appt) => {
                setSelectedAppt(appt);
              }}
            />
          ) : (
            <Doctors />
          )}
        </div>

        <AppointmentForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setSelectedAppt(null);
          }}
          onSave={handleSave}
          onDelete={handleDelete}
          existingAppointments={appointments}
          initialData={selectedAppt}
        />
      </main>
    </div>
  );
}

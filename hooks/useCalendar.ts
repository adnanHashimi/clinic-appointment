"use client";
import { useState, useEffect } from "react";
import { Appointment } from "@/types/Appointment";

export function useCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("appointments");
    if (data) setAppointments(JSON.parse(data));
    console.log("Appointments loaded from localStorage:", data);
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleSave = (appt: Appointment) => {
    setAppointments((prev) => {
      const exists = prev.find((a) => a.id === appt.id);
      return exists
        ? prev.map((a) => (a.id === appt.id ? appt : a))
        : [...prev, appt];
    });
  };

  const handleDelete = () => {
    if (selectedAppt) {
      setAppointments((prev) => prev.filter((a) => a.id !== selectedAppt.id));
      setSelectedAppt(null);
    }
    setShowForm(false);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    // setSelectedAppt(null);
    console.log(`Appointment with ID ${id} deleted`);
    console.log("Updated appointments:", appointments);
  };

  const filteredAppointments = filter
    ? appointments.filter((appt) =>
        Object.values(appt)
          .join(" ")
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : appointments;

  return {
    appointments,

    filteredAppointments,
    selectedAppt,
    showForm,
    filter,
    setFilter,
    setSelectedAppt,
    setShowForm,
    handleSave,
    handleDelete,
    handleDeleteAppointment,
  };
}

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Appointment } from "@/types/Appointment";
import { dummyDoctors, dummyTreatments } from "@/lib/constant";
import { hasOverlap } from "@/lib/utils/validation";
import { DateTime } from "luxon";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (appt: Appointment) => void;
  existingAppointments: Appointment[];
  initialData?: Appointment | null;
  onDelete?: () => void;
}

const AppointmentForm = ({
  open,
  onClose,
  onSave,
  existingAppointments,
  initialData,
  onDelete,
}: Props) => {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState<Appointment>({
    id: initialData?.id || crypto.randomUUID(),
    patient: initialData?.patient || "",
    doctor: initialData?.doctor || "",
    treatment: initialData?.treatment || "",
    purpose: initialData?.purpose || "",
    start: initialData?.start || "",
    end: initialData?.end || "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      id: initialData?.id || crypto.randomUUID(),
      patient: initialData?.patient || "",
      doctor: initialData?.doctor || "",
      treatment: initialData?.treatment || "",
      purpose: initialData?.purpose || "",
      start: initialData?.start || "",
      end: initialData?.end || "",
    });
  }, [initialData]);

  const handleChange = (field: keyof Appointment, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (Object.values(form).some((val) => val === "")) {
      setError("All fields are required.");
      return;
    }

    if (DateTime.fromISO(form.end) <= DateTime.fromISO(form.start)) {
      setError("End time must be after start time.");
      return;
    }

    if (hasOverlap(form, existingAppointments)) {
      setError("This appointment overlaps with another.");
      return;
    }

    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Appointment" : "New Appointment"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Patient Name</label>
            <Input
              placeholder="Enter patient name"
              value={form.patient}
              onChange={(e) => handleChange("patient", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Treatment</label>
            <input
              list="treatments"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Select or type a treatment"
              value={form.treatment}
              onChange={(e) => handleChange("treatment", e.target.value)}
            />
            <datalist id="treatments">
              {dummyTreatments.map((t, i) => (
                <option key={`treatment-${i}`} value={t} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Purpose</label>
            <Input
              placeholder="Enter purpose"
              value={form.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Doctor</label>
            <Select
              value={form.doctor}
              onValueChange={(val) => handleChange("doctor", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {dummyDoctors.map((d, i) => (
                  <SelectItem key={`doctor-${i}`} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Start Time</label>
              <Input
                type="datetime-local"
                value={form.start}
                onChange={(e) => handleChange("start", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">End Time</label>
              <Input
                type="datetime-local"
                value={form.end}
                onChange={(e) => handleChange("end", e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={handleSubmit} className="bg-indigo-600">
            {isEdit ? "Update" : "Create"}
          </Button>
          {isEdit && (
            <Button variant="ghost" onClick={onDelete} className="text-red-500">
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentForm;

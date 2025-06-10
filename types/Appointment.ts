export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  treatment: string;
  purpose: string;
  start: string; // ISO string
  end: string;
};

export const dummyPatients = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Lee",
  "Sara Park",
];
export const dummyDoctors = ["Dr. House", "Dr. Grey", "Dr. Strange"];
export const dummyTreatments = [
  "Cleaning",
  "Extraction",
  "Filling",
  "Root Canal",
  "Checkup",
];

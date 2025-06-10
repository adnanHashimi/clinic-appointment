import React from "react";
import { dummyDoctors } from "@/lib/constant";
import Image from "next/image";

const Doctors = () => {
  return (
    <div className="bg-Background min-h-screen p-6">
      <h1 className="text-3xl font-bold text-Primary mb-8">
        Our Specialist Doctors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-Primary/10 flex items-center justify-center">
              <Image
                width={200}
                height={400}
                src={doctor.image}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-Text">{doctor.name}</h2>
                <span className="bg-Accent/10 text-Accent text-xs px-2 py-1 rounded-full">
                  {doctor.experience}+ years
                </span>
              </div>

              <p className="text-Primary font-medium mb-4">
                {doctor.specialization}
              </p>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-Text mb-2">
                  Availability:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays.map((day: string) => (
                    <span
                      key={day}
                      className="bg-Secondary/10 text-Secondary text-xs px-2 py-1 rounded-full"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-Text mb-2">
                  Consultation Hours:
                </h3>
                <ul className="space-y-1">
                  {doctor.timeSlots.map((slot: string) => (
                    <li key={slot} className="text-sm ">
                      • {slot}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-6 w-full bg-Primary text-white py-2 px-4 rounded-lg hover:bg-Primary/90 transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;

"use client";

import { useState } from "react";
import ClientMap from "./components/ClientMap";

// --- NEW TYPE DEFINITIONS ---
// 1. Define the exact valid bus names as a Union Type
type BusName = "Bus 1" | "Bus 2" | "Bus 3" | "Bus 4";

// 2. Define the type for a single schedule entry
type ScheduleEntry = {
  stop: string;
  time: string;
  highlighted: boolean;
};

// 3. Define the type for the ALL_SCHEDULES object
type AllSchedules = Record<BusName, ScheduleEntry[]>;
// ------------------------------------

// --- Placeholder Data for all Buses ---
const ALL_BUSES: BusName[] = ["Bus 1", "Bus 2", "Bus 3", "Bus 4"];

const ALL_SCHEDULES: AllSchedules = { // <--- Use the new type
  "Bus 1": [
    { stop: "Amphi Stop", time: "14:42", highlighted: true },
    { stop: "Palsa Stop", time: "15:21", highlighted: false },
    { stop: "Tutu Stop", time: "16:20", highlighted: false },
    { stop: "Acari Stop", time: "17:10", highlighted: false },
  ],
  "Bus 2": [
    { stop: "Market Stop", time: "10:00", highlighted: true },
    { stop: "University", time: "10:30", highlighted: false },
    { stop: "Old City", time: "11:00", highlighted: false },
    { stop: "Industrial", time: "11:30", highlighted: false },
  ],
  "Bus 3": [], // Placeholder
  "Bus 4": [], // Placeholder
};
// ------------------------------------

// A simple component for the bus selection buttons
function BusButton({
  busName,
  isActive = false,
  onClick,
}: {
  busName: BusName; // <--- Use the new type
  isActive?: boolean;
  onClick: () => void;
}) {
  const activeClass = "bg-green-600 text-white shadow-lg";
  const inactiveClass = "bg-gray-300 text-gray-700 hover:bg-gray-400";

  return (
    <button
      onClick={onClick}
      className={`py-2 px-6 rounded-md font-semibold transition-colors ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {busName}
    </button>
  );
}

export default function Home() {
  // <--- STATE MANAGEMENT: Use the specific BusName type for state --->
  const [selectedBus, setSelectedBus] = useState<BusName>("Bus 1");

  // Fix implicit 'any' type issue by checking if the key exists (though typed)
  // We can use a type assertion here for simplicity since we know ALL_SCHEDULES covers all BusNames
  const filteredSchedule: ScheduleEntry[] = ALL_SCHEDULES[selectedBus];
  // <--- STATE MANAGEMENT --->

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* ... (Header and Hero sections remain the same) ... */}

      {/* === Active Bus Map Section === */}
      <section className="w-full max-w-5xl mx-auto my-8 p-6 bg-yellow-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Active Bus Map
        </h2>

        {/* Bus Selection Buttons - Map Filter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {ALL_BUSES.map((bus) => (
            <BusButton
              key={bus}
              busName={bus}
              isActive={selectedBus === bus}
              onClick={() => setSelectedBus(bus)}
            />
          ))}
        </div>

        {/* Map Container - PASS selectedBus as a prop (now type-safe) */}
        <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-gray-300">
          {/* Note: ClientMap component prop type will be fixed in next step */}
          <ClientMap selectedBus={selectedBus} />
        </div>
      </section>

      {/* === Bus Schedule Section === */}
      <section className="w-full max-w-5xl mx-auto my-8 p-6 bg-yellow-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bus Schedule - {selectedBus}
        </h2>

        {/* Bus Selection Buttons - Schedule Filter (optional, using the same state) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {ALL_BUSES.map((bus) => (
            <BusButton
              key={bus}
              busName={bus}
              isActive={selectedBus === bus}
              onClick={() => setSelectedBus(bus)}
            />
          ))}
        </div>

        {/* Schedule Table - Use FILTERED data */}
        <div className="w-full overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                  Bus Stop
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                  Next Time of Arrival
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {/* Fix implicit 'any' type on 'item' */}
              {filteredSchedule.map((item: ScheduleEntry) => (
                <tr
                  key={item.stop}
                  className={`border-b border-gray-200 ${
                    item.highlighted
                      ? "bg-yellow-400 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <td className="py-3 px-4">{item.stop}</td>
                  <td className="py-3 px-4">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useState } from "react";
import ClientMap from "./components/ClientMap";

// --- TYPE DEFINITIONS (Centralized for page and schedule) ---
type BusName = "Bus 1" | "Bus 2" | "Bus 3" | "Bus 4";

type ScheduleEntry = {
  stop: string;
  time: string;
  highlighted: boolean;
};

type AllSchedules = Record<BusName, ScheduleEntry[]>;
// ------------------------------------

// --- Placeholder Data for all Buses ---
const ALL_BUSES: BusName[] = ["Bus 1", "Bus 2", "Bus 3", "Bus 4"];

const ALL_SCHEDULES: AllSchedules = {
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
  "Bus 3": [],
  "Bus 4": [],
};
// ------------------------------------

// A simple component for the bus selection buttons
function BusButton({
  busName,
  isActive = false,
  onClick,
}: {
  busName: BusName;
  isActive?: boolean;
  onClick: () => void;
}) {
  const activeClass = "bg-green-600 text-white shadow-lg ring-2 ring-green-400"; // Enhanced active style
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <button
      onClick={onClick}
      className={`py-2 px-6 rounded-lg font-semibold transition-colors w-full ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {busName}
    </button>
  );
}

export default function Home() {
  const [selectedBus, setSelectedBus] = useState<BusName>("Bus 1");
  const filteredSchedule: ScheduleEntry[] = ALL_SCHEDULES[selectedBus];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      {/* === Header Section === */}
      <header className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-xl sticky top-0 z-10">
        <div className="text-xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zM9 9H5v2h4v4h2v-4h4V9h-4V5H9v4z" clipRule="evenodd" fillRule="evenodd"></path></svg> {/* Simple icon */}
          Amana Logo
        </div>
        <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md transition-colors">
          Menu
        </button>
      </header>

      {/* === Hero Section (No Change) === */}
      <section className="w-full bg-green-600 text-white p-12 text-center shadow-lg">
        <h1 className="text-5xl font-bold">Amana Transportation</h1>
        <p className="text-xl mt-2">
          Proudly servicing Palestinians since 2019
        </p>
      </section>

      {/* === Bus Selector Bar (Centralized) === */}
      <section className="w-full max-w-5xl mx-auto -mt-4 mb-8 z-0">
        <div className="bg-white p-4 shadow-2xl rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Select Active Bus</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ALL_BUSES.map((bus) => (
                <BusButton
                key={bus}
                busName={bus}
                isActive={selectedBus === bus}
                onClick={() => setSelectedBus(bus)}
                />
            ))}
            </div>
        </div>
      </section>

      {/* === Active Bus Map Section === */}
      <section className="w-full max-w-5xl mx-auto my-8 p-6 bg-yellow-100 rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 border-b-2 border-yellow-200 pb-3">
          Active Bus Map: <span className="text-green-600">{selectedBus}</span>
        </h2>

        {/* Map Container */}
        <div className="w-full h-[550px] rounded-xl overflow-hidden shadow-inner border-4 border-yellow-200">
          <ClientMap selectedBus={selectedBus} />
        </div>
      </section>

      {/* === Bus Schedule Section === */}
      <section className="w-full max-w-5xl mx-auto mb-12 p-6 bg-yellow-100 rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 border-b-2 border-yellow-200 pb-3">
          Bus Schedule - <span className="text-green-600">{selectedBus}</span>
        </h2>

        {/* Schedule Table */}
        <div className="w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase tracking-wider">
                  Bus Stop
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase tracking-wider">
                  Next Time of Arrival
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredSchedule.map((item: ScheduleEntry) => (
                <tr
                  key={item.stop}
                  className={`border-b border-gray-100 ${
                    item.highlighted
                      ? "bg-yellow-400 font-bold text-gray-900 shadow-inner" // Highlight improvement
                      : "hover:bg-gray-50 transition-colors"
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
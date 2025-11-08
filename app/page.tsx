// REMOVE these imports
// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// ADD this import
import ClientMap from "./components/ClientMap";

// This component was dynamically importing the map.
// REMOVE this entire block:
// const Map = dynamic(() => import("./components/Map"), {
//   ssr: false,
// });

// A simple component for the bus selection buttons
function BusButton({
  busName,
  isActive = false,
}: {
  busName: string;
  isActive?: boolean;
}) {
  const activeClass = "bg-green-600 text-white";
  const inactiveClass = "bg-gray-300 text-gray-700 hover:bg-gray-400";

  return (
    <button
      className={`py-2 px-6 rounded-md font-semibold ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {busName}
    </button>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* === Header Section === */}
      <header className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">
        <div className="text-xl font-bold">Amana Logo</div>
        <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md">
          Menu
        </button>
      </header>

      {/* === Hero Section === */}
      <section className="w-full bg-green-500 text-white p-12 text-center shadow-lg">
        <h1 className="text-5xl font-bold">Amana Transportation</h1>
        <p className="text-xl mt-2">
          Proudly servicing Palestinians since 2019
        </p>
      </section>

      {/* === Active Bus Map Section === */}
      <section className="w-full max-w-5xl mx-auto my-8 p-6 bg-yellow-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Active Bus Map
        </h2>

        {/* Bus Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <BusButton busName="Bus 1" isActive={true} />
          <BusButton busName="Bus 2" />
          <BusButton busName="Bus 3" />
          <BusButton busName="Bus 4" />
          <BusButton busName="Bus 1" />
          <BusButton busName="Bus 2" />
          <BusButton busName="Bus 3" />
          <BusButton busName="Bus 4" />
        </div>

        {/* Map Container */}
        <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-gray-300">
          {/* REPLACE <Map /> with <ClientMap /> */}
          <ClientMap />
        </div>
      </section>
    </main>
  );
}
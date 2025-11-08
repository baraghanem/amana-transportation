"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

// Define the BusName type
type BusName = "Bus 1" | "Bus 2" | "Bus 3" | "Bus 4";

// Use the BusName type for the prop
export default function ClientMap({ selectedBus }: { selectedBus: BusName }) {
  // We wrap the dynamic import in useMemo to ensure it only runs once.
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        // IMPROVEMENT: Replaced text with a cleaner loading spinner
        loading: () => (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 mt-3 font-semibold">Loading Map Data...</p>
            </div>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return <Map selectedBus={selectedBus} />;
}
"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

// Define the BusName type (needs to match the one in app/page.tsx)
type BusName = "Bus 1" | "Bus 2" | "Bus 3" | "Bus 4";

// Use the BusName type for the prop
export default function ClientMap({ selectedBus }: { selectedBus: BusName }) {
  // We wrap the dynamic import in useMemo to ensure it only runs once.
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Loading map...</p>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  // PASS the prop to the dynamically loaded Map component
  return <Map selectedBus={selectedBus} />;
}
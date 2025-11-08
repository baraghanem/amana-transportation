"use client"; // This directive marks it as a Client Component

import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function ClientMap() {
  // We wrap the dynamic import in useMemo to ensure it only runs once.
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        // The path is relative to this file
        loading: () => (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Loading map...</p>
          </div>
        ),
        ssr: false, // This is allowed here, in a Client Component
      }),
    []
  );

  return <Map />;
}
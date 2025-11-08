"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import Image from "next/image";

// --- Placeholder Data ---
// We center the map on Ramallah, Palestine, based on your description.
const mapCenter: LatLngExpression = [31.9038, 35.2034];

// Placeholder bus stops
const busStops: LatLngExpression[] = [
  [31.906, 35.200], // Stop 1
  [31.907, 35.205], // Stop 2
  [31.902, 35.208], // Stop 3
  [31.899, 35.204], // Stop 4
  [31.900, 35.200], // Stop 5
];

// Placeholder bus location
const busLocation: LatLngExpression = [31.904, 35.204];
// --- End Placeholder Data ---

// Custom icon for the bus stops
const stopIcon = new Icon({
  iconUrl: "/window.svg", // Using one of your existing icons as a placeholder
  iconSize: [25, 25],
});

// Custom icon for the bus
const busIcon = new Icon({
  iconUrl: "/bus-icon.svg", // Assumes you added 'bus-icon.svg' to your /public folder
  iconSize: [35, 35],
});

export default function Map() {
  return (
    <MapContainer
      center={mapCenter}
      zoom={15}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      {/* This is a black and white map tile layer from CartoDB.
        It's free and looks professional.
      */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Map Bus Stops */}
      {busStops.map((position, idx) => (
        <Marker key={idx} position={position} icon={stopIcon}>
          <Popup>Bus Stop {idx + 1}</Popup>
        </Marker>
      ))}

      {/* Draw the route line */}
      <Polyline positions={busStops} color="gray" dashArray="5, 10" />

      {/* Map the Bus Location */}
      <Marker position={busLocation} icon={busIcon}>
        <Popup>Bus 1 - Next Stop: Stop 3</Popup>
      </Marker>
    </MapContainer>
  );
}
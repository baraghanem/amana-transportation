"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
// Note: Removed unused 'Image' import

// --- Updated Placeholder Data ---
const mapCenter: LatLngExpression = [31.9038, 35.2034]; // Centered on Ramallah, Palestine

// Placeholder Bus Stops data (includes name and next arrival time)
const busStopsData = [
  { position: [31.906, 35.200] as LatLngExpression, name: "Amphi Stop", nextArrival: "14:42" },
  { position: [31.907, 35.205] as LatLngExpression, name: "Harbo Station", nextArrival: "10:30" },
  { position: [31.902, 35.208] as LatLngExpression, name: "Palsa Stop", nextArrival: "15:21" },
  { position: [31.899, 35.204] as LatLngExpression, name: "Tutu Stop", nextArrival: "16:20" },
  { position: [31.900, 35.200] as LatLngExpression, name: "Acari Stop", nextArrival: "17:10" },
];

// Placeholder Bus Location data (includes bus details)
const busData = {
    position: [31.904, 35.204] as LatLngExpression,
    name: "Bus 1",
    capacity: "45%",
    nextStop: "Harbo Station",
};
// --- End Placeholder Data ---

// Extract just the positions for the Polyline
const routePositions: LatLngExpression[] = busStopsData.map(stop => stop.position);

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
      {/* Black and white map tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Map Bus Stops and Popups */}
      {busStopsData.map((stop, idx) => (
        <Marker key={idx} position={stop.position} icon={stopIcon}>
          <Popup className="bus-stop-popup">
            <div className="p-2 font-sans">
                <h3 className="text-lg font-bold mb-1">{stop.name}</h3>
                <p className="text-sm">
                    Next Bus Arrival Time: <span className="font-semibold">{stop.nextArrival}</span>
                </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Draw the route line */}
      <Polyline positions={routePositions} color="gray" dashArray="5, 10" />

      {/* Map the Bus Location and Popups */}
      <Marker position={busData.position} icon={busIcon}>
        <Popup className="bus-location-popup">
            <div className="p-2 font-sans">
                <h3 className="text-lg font-bold mb-1">{busData.name}</h3>
                <p className="text-sm">Capacity Level: <span className="font-semibold">{busData.capacity}</span></p>
                <p className="text-sm">Next Stop: <span className="font-semibold text-green-600">{busData.nextStop}</span></p>
            </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
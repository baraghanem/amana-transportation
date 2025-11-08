"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";

// Define the BusName type (needs to match the one in app/page.tsx)
type BusName = "Bus 1" | "Bus 2" | "Bus 3" | "Bus 4";

// Define types for the nested data structures
type StopData = {
    position: LatLngExpression;
    name: string;
    nextArrival: string;
};

type BusLocationData = {
    position: LatLngExpression;
    name: string;
    capacity: string;
    nextStop: string;
};

type BusRoute = {
    center: LatLngExpression;
    stops: StopData[];
    location: BusLocationData;
};

// --- Global Map Data (Typed object) ---
const BUS_ROUTES_DATA: Record<BusName, BusRoute> = {
    "Bus 1": {
        center: [31.9038, 35.2034], // Ramallah
        stops: [
          { position: [31.906, 35.200], name: "Amphi Stop", nextArrival: "14:42" },
          { position: [31.907, 35.205], name: "Harbo Station", nextArrival: "10:30" },
          { position: [31.902, 35.208], name: "Palsa Stop", nextArrival: "15:21" },
          { position: [31.899, 35.204], name: "Tutu Stop", nextArrival: "16:20" },
        ],
        location: {
            position: [31.904, 35.204],
            name: "Bus 1",
            capacity: "45%",
            nextStop: "Harbo Station",
        },
    },
    "Bus 2": {
        center: [32.2241, 35.2478], // Nablus
        stops: [
          { position: [32.220, 35.240], name: "Market Stop", nextArrival: "10:00" },
          { position: [32.225, 35.250], name: "University Gate", nextArrival: "10:30" },
          { position: [32.228, 35.245], name: "Old City Entrance", nextArrival: "11:00" },
        ],
        location: {
            position: [32.222, 35.245],
            name: "Bus 2",
            capacity: "90%",
            nextStop: "University Gate",
        },
    },
    // Add placeholder data for the remaining keys to satisfy the type 'BusName'
    "Bus 3": {
        center: [31.7683, 35.2137], // Jerusalem placeholder
        stops: [],
        location: { position: [31.770, 35.215], name: "Bus 3", capacity: "0%", nextStop: "Terminal" },
    },
    "Bus 4": {
        center: [31.5000, 34.4667], // Gaza placeholder
        stops: [],
        location: { position: [31.505, 34.470], name: "Bus 4", capacity: "0%", nextStop: "Terminal" },
    },
};

// Custom icons remain the same
const stopIcon = new Icon({
  iconUrl: "/window.svg",
  iconSize: [25, 25],
});

const busIcon = new Icon({
  iconUrl: "/bus-icon.svg",
  iconSize: [35, 35],
});

export default function Map({ selectedBus }: { selectedBus: BusName }) { // <--- Use typed prop
  // Fix indexing: selectedBus is now guaranteed to be one of the keys
  const currentBusData = BUS_ROUTES_DATA[selectedBus];

  // Extract necessary variables from the current data
  const mapCenter = currentBusData.center;
  const busStopsData = currentBusData.stops;
  const busData = currentBusData.location;
  // Fix implicit 'any' on 'stop' parameter
  const routePositions: LatLngExpression[] = busStopsData.map((stop: StopData) => stop.position);

  return (
    <MapContainer
      key={selectedBus}
      center={mapCenter}
      zoom={15}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      {/* Black and white map tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Map Bus Stops and Popups (Filtered) */}
      {busStopsData.map((stop) => (
        // Fix implicit 'any' on 'stop' parameter (implicitly handled by .map on a typed array)
        <Marker key={stop.name} position={stop.position} icon={stopIcon}>
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

      {/* Draw the route line (Filtered) */}
      <Polyline positions={routePositions} color="gray" dashArray="5, 10" />

      {/* Map the Bus Location and Popups (Filtered) */}
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
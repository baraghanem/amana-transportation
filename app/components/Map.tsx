"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";

// --- TYPE DEFINITIONS (Repeated for file self-containment) ---
type BusName = "Bus 1" | "Bus 2" | "Bus 3" | "Bus 4";

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

// --- Global Map Data (No functional change, only type casting) ---
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
  iconSize: [30, 30], // Slightly larger pin
});

const busIcon = new Icon({
  iconUrl: "/bus-icon.svg",
  iconSize: [40, 40], // Slightly larger bus icon
});

export default function Map({ selectedBus }: { selectedBus: BusName }) {
  const currentBusData = BUS_ROUTES_DATA[selectedBus];

  const mapCenter = currentBusData.center;
  const busStopsData = currentBusData.stops;
  const busData = currentBusData.location;
  const routePositions: LatLngExpression[] = busStopsData.map((stop: StopData) => stop.position);

  return (
    <MapContainer
      key={selectedBus}
      center={mapCenter}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Black and white map tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Map Bus Stops and Popups (IMPROVEMENT: Styled Popups) */}
      {busStopsData.map((stop) => (
        <Marker key={stop.name} position={stop.position} icon={stopIcon}>
          <Popup>
            <div className="p-2 bg-white rounded-lg shadow-md border-t-4 border-yellow-500">
                <h3 className="text-base font-bold text-gray-800 mb-1">{stop.name}</h3>
                <p className="text-sm text-gray-600">
                    Next Bus: <span className="font-semibold text-green-600">{stop.nextArrival}</span>
                </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Draw the route line */}
      <Polyline positions={routePositions} color="#888" weight={4} dashArray="8, 12" />

      {/* Map the Bus Location and Popups (IMPROVEMENT: Styled Popups) */}
      <Marker position={busData.position} icon={busIcon}>
        <Popup>
            <div className="p-2 bg-white rounded-lg shadow-md border-t-4 border-green-600">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{busData.name}</h3>
                <p className="text-sm text-gray-600">Capacity: <span className={`font-semibold ${busData.capacity === '90%' ? 'text-red-500' : 'text-green-600'}`}>{busData.capacity}</span></p>
                <p className="text-sm text-gray-600">Next Stop: <span className="font-semibold">{busData.nextStop}</span></p>
            </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
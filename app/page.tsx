import ClientMap from "./components/ClientMap";

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
  // --- Placeholder Data for Schedule ---
  const scheduleData = [
    { stop: "Amphi Stop", time: "14:42", highlighted: true },
    { stop: "Palsa Stop", time: "15:21", highlighted: false },
    { stop: "Tutu Stop", time: "16:20", highlighted: false },
    { stop: "Acari Stop", time: "17:10", highlighted: false },
  ];
  // ------------------------------------

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
          <ClientMap />
        </div>
      </section>

      {/* === (NEW) Bus Schedule Section === */}
      <section className="w-full max-w-5xl mx-auto my-8 p-6 bg-yellow-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bus Schedule
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

        {/* Schedule Table */}
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
              {scheduleData.map((item) => (
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
      {/* === End of New Section === */}
    </main>
  );
}
export default function EventsTable({ events }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h3 className="mb-4 font-bold">Live Events</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 text-sm">
            <th>Time</th>
            <th>Driver</th>
            <th>Speed</th>
            <th>Event</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t border-slate-700">
              <td>{event.time}</td>
              <td>{event.driverId}</td>
              <td>{event.speed} km/h</td>
              <td>{event.eventType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
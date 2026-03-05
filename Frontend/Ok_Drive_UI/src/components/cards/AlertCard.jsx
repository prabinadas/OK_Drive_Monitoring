export default function AlertCard({ event }) {
  return (
    <div className="bg-red-600 p-4 rounded-lg shadow-lg">
      <h4 className="font-bold">🚨 RED ALERT</h4>
      <p>Driver: {event.driverId}</p>
      <p>Speed: {event.speed} kmph</p>
      <p>Time: {event.time}</p>

      {/* <EventsTable events={events} /> */}
    </div>
  );
}
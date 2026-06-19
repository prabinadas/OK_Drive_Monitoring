const eventTypes = ["Speeding", "Harsh Braking", "Drowsiness"];

export function generateRandomEvent() {
  const driverId = "D" + Math.floor(Math.random() * 105);
  const speed = Math.floor(Math.random() * 120);
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  return {
    id: Date.now(),
    time: new Date().toLocaleTimeString(),
    driverId,
    speed,
    eventType,
  };
}
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MetricCard from "../components/cards/MetricCard";
import AlertCard from "../components/cards/AlertCard";
import EventsTable from "../components/table/EventsTable";
import ViolationBarChart from "../components/charts/ViolationBarChart";
import RiskLineChart from "../components/charts/RiskLineChart";
import EventPieChart from "../components/charts/EventPieChart";
import LiveDashcam from "../components/video/LiveDashcam";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalTrips: 128,
    liveDrivers: 24,
    violations: 0,
    riskScore: 0
  });

  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Connect to backend on port 5001
    const socket = io("http://localhost:5001", {
      transports: ["websocket"], // force websocket
      reconnectionAttempts: 5,
      withCredentials: true
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setSocketConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
      setSocketConnected(false);
    });

    socket.on("driver_event", (newEvent) => {
      console.log("🔥 RECEIVED EVENT:", newEvent);

      setEvents(prev => [newEvent, ...prev.slice(0, 9)]);

      setMetrics(prev => ({
        ...prev,
        violations: prev.violations + 1,
        riskScore: Math.min(prev.riskScore + 2, 100)
      }));

      if (newEvent.speed > 80) {
        setAlerts(prev => [newEvent, ...prev.slice(0, 4)]);
        setTimeout(() => {
          setAlerts(prev => prev.filter(alert => alert.id !== newEvent.id));
        }, 5000);
      }
    });

    return () => {
      socket.disconnect();
      console.log("🔌 Socket disconnected");
    };
  }, []);

  const getRiskColor = () => {
    if (metrics.riskScore > 70) return "text-red-400";
    if (metrics.riskScore > 40) return "text-yellow-400";
    return "text-green-400";
  };

  const violationChartData = [
    { driver: "D101", count: 5 },
    { driver: "D102", count: 3 },
    { driver: "D103", count: 8 },
    { driver: "D104", count: 2 },
  ];

  const riskTrendData = [
    { time: "10:00", risk: 30 },
    { time: "10:05", risk: 45 },
    { time: "10:10", risk: metrics.riskScore },
  ];

  const eventPieData = [
    { type: "Speeding", value: 45 },
    { type: "Harsh Braking", value: 30 },
    { type: "Drowsiness", value: 25 },
  ];

  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <div className="flex w-full bg-slate-900 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Fleet Dashboard</h2>
          {!socketConnected && (
            <div className="text-red-400 font-semibold">
              ⚠️ Socket disconnected. Check backend server on port 5001!
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <MetricCard title="Total Trips" value={metrics.totalTrips} subtitle="+12 today" color="text-blue-400" />
            <MetricCard title="Live Drivers" value={metrics.liveDrivers} subtitle="Active" color="text-green-400" />
            <MetricCard title="Violations" value={metrics.violations} subtitle="Live" color="text-red-400" />
            <MetricCard title="Risk Score" value={`${metrics.riskScore}%`} subtitle="Dynamic" color={getRiskColor()} />
          </div>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {alerts.map(alert => (
                <AlertCard key={alert.id} event={alert} />
              ))}
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-3 gap-6">
            <ViolationBarChart data={violationChartData} />
            <RiskLineChart data={riskTrendData} />
            <EventPieChart data={eventPieData} />
          </div>

          {/* Video */}
          <LiveDashcam latestEvent={latestEvent} />

          {/* Table */}
          <EventsTable events={events} />
        </div>
      </div>
    </div>
  );
}
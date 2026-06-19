
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // your frontend
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK Drive Backend is running successfully 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket"], // force websocket
});

function generateRandomEvent() {
  const eventTypes = ["Speeding", "Harsh Braking", "Drowsiness"];
  return {
    id: Date.now(),
    time: new Date().toLocaleTimeString(),
    driverId: "D" + Math.floor(Math.random() * 105),
    speed: Math.floor(Math.random() * 120),
    eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
  };
}


// SOCKET CONNECTION

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // Optional: confirm connection
  socket.emit("connection_ack", { message: "Connected to backend" });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// EMIT RANDOM DRIVER EVENTS EVERY 3 SECONDS

setInterval(() => {
  const event = generateRandomEvent();
  console.log("🔥 Emitting event:", event);
  io.emit("driver_event", event);
}, 3000);


// START SERVER

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

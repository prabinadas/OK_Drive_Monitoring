import React from 'react';

import dashcamVideo from "../../assets/dascham.mp4";


export default function LiveDashcam({ latestEvent }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h3 className="mb-4 font-bold">Live Dashcam Feed</h3>

      <div className="relative">

        {/* YouTube Road Camera Sample */}
        <video
          src={dashcamVideo}
          autoPlay
          loop
          muted
          className="w-full h-100 object-cover rounded-lg"
        />

        {/* Overlay */}
        {latestEvent && (
          <div className="absolute top-3 left-3 bg-black bg-opacity-70 p-3 rounded-lg text-sm">
            <p>Driver: {latestEvent.driverId}</p>
            <p>Speed: {latestEvent.speed} kmph</p>

            {latestEvent.speed > 80 && (
              <p className="text-red-400 font-bold">🚨 Overspeeding</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-800 p-5">
      <h1 className="text-xl font-bold mb-8">okDriver Fleet AI</h1>

      <ul className="space-y-4">
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-400 cursor-pointer">Live Drivers</li>
        <li className="hover:text-blue-400 cursor-pointer">Trips</li>
        <li className="hover:text-blue-400 cursor-pointer">Analytics</li>
      </ul>
    </div>
  );
}
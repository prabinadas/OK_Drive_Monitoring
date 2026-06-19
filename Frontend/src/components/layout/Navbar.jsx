export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <span>LIVE</span>
      </div>

      <div>Admin</div>
    </div>
  );
}
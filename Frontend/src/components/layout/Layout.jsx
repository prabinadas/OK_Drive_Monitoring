export default function Layout({ children }) {
  return (
    <div className="flex bg-slate-900 text-white min-h-screen">
      {children}
    </div>
  );
}
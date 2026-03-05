import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function ViolationBarChart({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h3 className="mb-4 font-bold">Violations per Driver</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="driver" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
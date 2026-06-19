import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#8b5cf6"];

export default function EventPieChart({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h3 className="mb-4 font-bold">Event Distribution</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="type"
            outerRadius={80}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
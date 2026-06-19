import React from 'react';

export default function MetricCard({ title, value, subtitle, color }) {
    return (
        <div className="bg-slate-800 p-5 rounded-xl shadow-lg flex flex-col gap-2 border border-slate-700">
            <h3 className="text-sm text-slate-400">{title}</h3>

            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{value}</span>
                <span className={`text-sm font-medium ${color}`}>
                    {subtitle}
                </span>
            </div>
        </div>
    );
}
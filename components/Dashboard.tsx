
import React, { useMemo } from 'react';
import {
    Server, ShieldCheck, Zap, History, MoreHorizontal
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Device, Alert, NetworkStats } from '../types';
import { StatCard } from './StatCard';
import { StatusBadge } from './StatusBadge';

interface DashboardProps {
    devices: Device[];
    alerts: Alert[];
}

export const Dashboard: React.FC<DashboardProps> = ({ devices, alerts }) => {
    const stats: NetworkStats = useMemo(() => {
        return {
            totalDevices: devices.length,
            online: devices.filter(d => d.status === 'online').length,
            offline: devices.filter(d => d.status === 'offline').length,
            slow: devices.filter(d => d.status === 'slow').length,
            activeAlerts: alerts.filter(a => a.status === 'active').length,
        };
    }, [devices, alerts]);

    const chartData = useMemo(() => {
        return devices.filter(d => d.isMonitored).map(d => ({
            name: d.name,
            latency: d.status === 'offline' ? 0 : d.latency,
        })).slice(0, 10);
    }, [devices]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Network Overview</h2>
                    <p className="text-zinc-400 mt-1">Real-time infrastructure performance metrics</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-sm font-medium text-emerald-400 shadow-lg shadow-emerald-900/20">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Live Connection
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Monitored" value={stats.totalDevices} icon={Server} color="blue" trend="All systems operational" />
                <StatCard label="Online Devices" value={stats.online} icon={ShieldCheck} color="emerald" trend={`${stats.totalDevices > 0 ? ((stats.online / stats.totalDevices) * 100).toFixed(0) : 0}% Availability`} />
                <StatCard label="Critical Errors" value={stats.offline} icon={Zap} color="rose" trend="Immediate action required" />
                <StatCard label="Active Alerts" value={stats.activeAlerts} icon={History} color="amber" trend="Last 24 hours" />
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Device Intelligence Table */}
                <div className="w-full bg-gradient-to-b from-zinc-900/60 to-zinc-900/40 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div>
                            <h3 className="text-lg font-bold text-white">Device Intelligence</h3>
                            <p className="text-xs text-zinc-500 mt-0.5">Live status verification</p>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-black/20 text-zinc-400 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="px-8 py-5">Device Name</th>
                                    <th className="px-8 py-5">IP Address</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Latency</th>
                                    <th className="px-8 py-5">Uptime</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {devices.map((device) => (
                                    <tr key={device.id} className="group hover:bg-white/[0.02] transition-colors duration-200">
                                        <td className="px-8 py-5 font-medium text-zinc-200 group-hover:text-white transition-colors">
                                            {device.name}
                                        </td>
                                        <td className="px-8 py-5 font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                            {device.ip}
                                        </td>
                                        <td className="px-8 py-5">
                                            <StatusBadge status={device.status} />
                                        </td>
                                        <td className="px-8 py-5 font-mono text-zinc-400">
                                            {device.status === 'offline' ? (
                                                <span className="text-zinc-700">-</span>
                                            ) : (
                                                <span className={`${device.latency > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                    {device.latency}ms
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full shadow-lg ${device.uptime > 99 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                                                            device.uptime > 95 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                                                                'bg-gradient-to-r from-rose-500 to-rose-400'
                                                            }`}
                                                        style={{ width: `${device.uptime}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-zinc-500">{device.uptime}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Latency Chart */}
                <div className="bg-gradient-to-b from-zinc-900/60 to-zinc-900/40 rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl flex flex-col relative overflow-hidden">
                    {/* Decorative bg glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="mb-8 relative z-10">
                        <h3 className="text-xl font-bold text-white">Latency Metrics</h3>
                        <p className="text-base text-zinc-500 mt-1">Real-time pulse across all monitored nodes (ms)</p>
                    </div>

                    <div className="flex-1 min-h-[450px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#52525b"
                                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    interval={0}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(9, 9, 11, 0.9)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                                    }}
                                    itemStyle={{ color: '#818cf8' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="latency"
                                    stroke="#818cf8"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorLatency)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

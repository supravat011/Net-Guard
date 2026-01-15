import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Activity, ShieldCheck, Zap, History, Plus, Trash2,
  Search, RefreshCw, Server, ArrowRight, PauseCircle, PlayCircle,
  Cpu, Network, Lock, Globe, Terminal
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

import { Device, Alert, NetworkStats } from './types';
import { api } from './services/api';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StatusBadge } from './components/StatusBadge';
import { LandingPage } from './components/LandingPage';
import { FeaturesPage } from './components/FeaturesPage';
import { SecurityPage } from './components/SecurityPage';
import { HowItWorksPage } from './components/HowItWorksPage';



// --- Device Management Page ---

interface DeviceManagementProps {
  devices: Device[];
  onAddDevice: (d: Device) => void;
  onRemoveDevice: (id: string) => void;
  onToggleMonitor: (id: string) => void;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({ devices, onAddDevice, onRemoveDevice, onToggleMonitor }) => {
  const [newDevice, setNewDevice] = useState({ name: '', ip: '', type: 'server' as const });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice.name || !newDevice.ip) return;

    onAddDevice({
      id: Math.random().toString(36).substr(2, 9),
      name: newDevice.name,
      ip: newDevice.ip,
      type: newDevice.type,
      status: 'online',
      latency: 1,
      lastChecked: Date.now(),
      isMonitored: true,
      uptime: 100
    });
    setNewDevice({ name: '', ip: '', type: 'server' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Device Management</h2>
          <p className="text-zinc-500 text-sm mt-1">Configure monitoring targets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Device Form */}
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 h-fit sticky top-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6 text-white">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Plus className="w-5 h-5" /></div>
            <h3 className="font-bold">Add New Device</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Device Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-zinc-700 transition-all"
                placeholder="e.g., File Server 02"
                value={newDevice.name}
                onChange={e => setNewDevice({ ...newDevice, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">IP Address</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-zinc-700 transition-all font-mono"
                placeholder="e.g., 192.168.1.50"
                value={newDevice.ip}
                onChange={e => setNewDevice({ ...newDevice, ip: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Type</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white appearance-none cursor-pointer transition-all"
                  value={newDevice.type}
                  onChange={e => setNewDevice({ ...newDevice, type: e.target.value as any })}
                >
                  <option value="server">Server</option>
                  <option value="router">Router</option>
                  <option value="switch">Switch</option>
                  <option value="workstation">Workstation</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors mt-2"
            >
              Add Device
            </button>
          </form>
        </div>

        {/* Device List */}
        <div className="lg:col-span-2 space-y-4">
          {devices.map(device => (
            <div key={device.id} className="group bg-zinc-900/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className={`p-3 rounded-xl border border-white/5 ${device.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' :
                  device.status === 'slow' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-100">{device.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-zinc-500">
                    <span className="font-mono text-xs px-1.5 py-0.5 bg-white/5 rounded">{device.ip}</span>
                    <span className="capitalize">{device.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <StatusBadge status={device.isMonitored ? device.status : 'offline'} />
                <div className="h-8 w-px bg-white/5 mx-1"></div>
                <button
                  onClick={() => onToggleMonitor(device.id)}
                  className={`p-2 rounded-lg transition-colors border border-transparent ${device.isMonitored
                    ? 'text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                    }`}
                  title={device.isMonitored ? "Pause Monitoring" : "Resume Monitoring"}
                >
                  {device.isMonitored ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => onRemoveDevice(device.id)}
                  className="p-2 text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent rounded-lg transition-all"
                  title="Remove Device"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {devices.length === 0 && (
            <div className="text-center py-16 text-zinc-500 bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-800">
              <Server className="w-10 h-10 mx-auto mb-4 opacity-20" />
              <p>No devices configured.</p>
              <p className="text-sm">Add one to start monitoring.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Alerts Page ---

const AlertsPage: React.FC<{ alerts: Alert[] }> = ({ alerts }) => {
  const [filter, setFilter] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return alert.status === 'active';
    if (filter === 'resolved') return alert.status === 'resolved';
    return true;
  }).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Logs</h2>
          <p className="text-zinc-500 text-sm mt-1">Audit trail and active incidents</p>
        </div>
        <div className="flex bg-zinc-900 border border-white/5 rounded-lg p-1">
          {['all', 'active', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${filter === f ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/40 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-zinc-400 font-medium">
              <tr>
                <th className="px-6 py-4 font-medium">Time Detected</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Device</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAlerts.map(alert => (
                <tr key={alert.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">
                    <span className="text-zinc-200">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    <span className="text-xs text-zinc-600 ml-2">{new Date(alert.timestamp).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    {alert.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                        Resolved
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-200">{alert.deviceName}</div>
                    <div className="text-xs text-zinc-500 font-mono">{alert.deviceIp}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 max-w-md truncate">
                    {alert.message}
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-xs font-medium px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/5">
                      {alert.type}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-zinc-500">
                    No alerts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- About Page ---
const AboutPage = () => (
  <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in duration-500">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white tracking-tight">About NetGuard</h2>
      <p className="text-lg text-zinc-400">Next-generation infrastructure monitoring</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
        <p className="text-zinc-400 leading-relaxed">
          This application serves as a final-year Computer Networks domain project. It demonstrates the implementation of real-time state management, data visualization, and alert systems required for modern network administration.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Architecture</h3>
        <ul className="space-y-3 text-zinc-400">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Frontend-only simulation of ICMP protocol
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Synthetic latency generation algorithms
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Responsive React 19 fiber-optic UI
          </li>
        </ul>
      </div>
    </div>

    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-black border border-white/5 text-center">
      <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-6">Tech Stack</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide React', 'Vite'].map(tag => (
          <span key={tag} className="px-4 py-2 bg-black/50 text-zinc-300 border border-white/10 rounded-full text-sm font-medium hover:border-indigo-500/50 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Fetch Data Loop
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devicesData, alertsData] = await Promise.all([
          api.getDevices(),
          api.getAlerts()
        ]);
        setDevices(devicesData);
        setAlerts(alertsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, []);

  const addDevice = async (device: Device) => {
    await api.addDevice(device);
    // data will refresh on next poll or we can optimistically update
    const updated = await api.getDevices();
    setDevices(updated);
  };

  const removeDevice = async (id: string) => {
    await api.removeDevice(id);
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  const toggleMonitor = async (id: string) => {
    await api.toggleMonitor(id);
    // data will refresh on next poll
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard devices={devices} alerts={alerts} />} />
              <Route path="/devices" element={
                <DeviceManagement
                  devices={devices}
                  onAddDevice={addDevice}
                  onRemoveDevice={removeDevice}
                  onToggleMonitor={toggleMonitor}
                />
              } />
              <Route path="/alerts" element={<AlertsPage alerts={alerts} />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
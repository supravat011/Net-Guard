import { Device, Alert, DeviceStatus } from '../types';

// Helper to generate a random ID
export const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial Mock Data
export const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'Core Router', ip: '192.168.1.1', type: 'router', status: 'online', latency: 2, lastChecked: Date.now(), isMonitored: true, uptime: 99.9 },
  { id: '2', name: 'Primary DNS', ip: '8.8.8.8', type: 'server', status: 'online', latency: 12, lastChecked: Date.now(), isMonitored: true, uptime: 99.5 },
  { id: '3', name: 'Web Server 01', ip: '192.168.1.101', type: 'server', status: 'online', latency: 45, lastChecked: Date.now(), isMonitored: true, uptime: 98.2 },
  { id: '4', name: 'Database Cluster', ip: '192.168.1.105', type: 'server', status: 'slow', latency: 180, lastChecked: Date.now(), isMonitored: true, uptime: 97.1 },
  { id: '5', name: 'Switch Floor 2', ip: '192.168.2.1', type: 'switch', status: 'offline', latency: 0, lastChecked: Date.now(), isMonitored: true, uptime: 85.0 },
  { id: '6', name: 'HR Workstation', ip: '192.168.3.22', type: 'workstation', status: 'online', latency: 5, lastChecked: Date.now(), isMonitored: false, uptime: 45.0 },
];

export const INITIAL_ALERTS: Alert[] = [
  { 
    id: 'a1', 
    deviceId: '5', 
    deviceName: 'Switch Floor 2', 
    deviceIp: '192.168.2.1', 
    type: 'connectivity', 
    message: 'Device unresponsive (Request Timeout)', 
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    status: 'active' 
  }
];

// Simulation Logic
export const simulateNetworkScan = (devices: Device[]): { updatedDevices: Device[], newAlerts: Alert[] } => {
  const newAlerts: Alert[] = [];
  const updatedDevices = devices.map(device => {
    if (!device.isMonitored) return device;

    // Simulate random network fluctuations
    const rand = Math.random();
    let newStatus: DeviceStatus = 'online';
    let newLatency = Math.floor(Math.random() * 50) + 1; // Base latency 1-50ms

    // 5% chance of being offline
    if (rand > 0.95) {
      newStatus = 'offline';
      newLatency = 0;
    } 
    // 10% chance of being slow
    else if (rand > 0.85) {
      newStatus = 'slow';
      newLatency = Math.floor(Math.random() * 300) + 150; // 150-450ms
    }

    // Stickiness: If it was offline, give it a higher chance (70%) to stay offline to simulate real outage
    if (device.status === 'offline' && Math.random() < 0.7) {
      newStatus = 'offline';
      newLatency = 0;
    }

    // Check for status change to trigger alert
    if (newStatus === 'offline' && device.status !== 'offline') {
      newAlerts.push({
        id: generateId(),
        deviceId: device.id,
        deviceName: device.name,
        deviceIp: device.ip,
        type: 'connectivity',
        message: 'Connection lost: Request timed out',
        timestamp: Date.now(),
        status: 'active'
      });
    } else if (newStatus === 'slow' && device.status !== 'slow') {
      newAlerts.push({
        id: generateId(),
        deviceId: device.id,
        deviceName: device.name,
        deviceIp: device.ip,
        type: 'latency',
        message: `High latency detected: ${newLatency}ms`,
        timestamp: Date.now(),
        status: 'active'
      });
    }

    return {
      ...device,
      status: newStatus,
      latency: newLatency,
      lastChecked: Date.now()
    };
  });

  return { updatedDevices, newAlerts };
};
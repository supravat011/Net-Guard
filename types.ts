export type DeviceStatus = 'online' | 'slow' | 'offline';

export interface Device {
  id: string;
  name: string;
  ip: string;
  type: 'server' | 'router' | 'switch' | 'workstation';
  status: DeviceStatus;
  latency: number; // in ms
  lastChecked: number; // timestamp
  isMonitored: boolean;
  uptime: number; // percentage
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  deviceIp: string;
  type: 'timeout' | 'latency' | 'connectivity';
  message: string;
  timestamp: number;
  status: 'active' | 'resolved';
  resolvedAt?: number;
}

export interface NetworkStats {
  totalDevices: number;
  online: number;
  offline: number;
  slow: number;
  activeAlerts: number;
}
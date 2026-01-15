
import { Device, Alert } from '../types';

export const api = {
    getDevices: async (): Promise<Device[]> => {
        const res = await fetch('/api/devices');
        return res.json();
    },

    addDevice: async (device: Device): Promise<void> => {
        await fetch('/api/devices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(device)
        });
    },

    removeDevice: async (id: string): Promise<void> => {
        await fetch(`/api/devices/${id}`, { method: 'DELETE' });
    },

    toggleMonitor: async (id: string): Promise<void> => {
        await fetch(`/api/devices/${id}/toggle`, { method: 'PATCH' });
    },

    getAlerts: async (): Promise<Alert[]> => {
        const res = await fetch('/api/alerts');
        return res.json();
    }
};


import { getDb } from './database.js';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const simulateNetwork = async () => {
    const db = getDb();
    if (!db) return;

    const devices = await db.all('SELECT * FROM devices');

    for (const device of devices) {
        if (!device.isMonitored) continue;

        const rand = Math.random();
        let newStatus = 'online';
        let newLatency = Math.floor(Math.random() * 50) + 1;

        if (rand > 0.95) {
            newStatus = 'offline';
            newLatency = 0;
        } else if (rand > 0.85) {
            newStatus = 'slow';
            newLatency = Math.floor(Math.random() * 300) + 150;
        }

        // Stickiness
        if (device.status === 'offline' && Math.random() < 0.7) {
            newStatus = 'offline';
            newLatency = 0;
        }

        // Update Device
        await db.run(
            'UPDATE devices SET status = ?, latency = ?, lastChecked = ? WHERE id = ?',
            newStatus, newLatency, Date.now(), device.id
        );

        // Generate Alerts
        if (newStatus === 'offline' && device.status !== 'offline') {
            await db.run(
                'INSERT INTO alerts VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                generateId(), device.id, device.name, device.ip, 'connectivity',
                'Connection lost: Request timed out', Date.now(), 'active'
            );
        } else if (newStatus === 'slow' && device.status !== 'slow') {
            await db.run(
                'INSERT INTO alerts VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                generateId(), device.id, device.name, device.ip, 'latency',
                `High latency detected: ${newLatency}ms`, Date.now(), 'active'
            );
        }
    }
};

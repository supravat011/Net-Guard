
import express from 'express';
import { getDb } from './database.js';

export const router = express.Router();

// Get all devices
router.get('/devices', async (req, res) => {
    const db = getDb();
    const devices = await db.all('SELECT * FROM devices');
    res.json(devices.map(d => ({ ...d, isMonitored: !!d.isMonitored })));
});

// Add a device
router.post('/devices', async (req, res) => {
    const db = getDb();
    const { id, name, ip, type, status, latency, lastChecked, isMonitored, uptime } = req.body;
    await db.run(
        'INSERT INTO devices VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        id, name, ip, type, status, latency, lastChecked, isMonitored ? 1 : 0, uptime
    );
    res.status(201).json({ message: 'Device added' });
});

// Remove a device
router.delete('/devices/:id', async (req, res) => {
    const db = getDb();
    await db.run('DELETE FROM devices WHERE id = ?', req.params.id);
    res.json({ message: 'Device removed' });
});

// Toggle monitor
router.patch('/devices/:id/toggle', async (req, res) => {
    const db = getDb();
    const device = await db.get('SELECT isMonitored FROM devices WHERE id = ?', req.params.id);
    await db.run('UPDATE devices SET isMonitored = ? WHERE id = ?', device.isMonitored ? 0 : 1, req.params.id);
    res.json({ message: 'Toggled monitoring' });
});

// Get alerts
router.get('/alerts', async (req, res) => {
    const db = getDb();
    const alerts = await db.all('SELECT * FROM alerts ORDER BY timestamp DESC');
    res.json(alerts);
});

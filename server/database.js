
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export const setupDatabase = async () => {
    db = await open({
        filename: './netguard.db',
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS devices (
      id TEXT PRIMARY KEY,
      name TEXT,
      ip TEXT,
      type TEXT,
      status TEXT,
      latency INTEGER,
      lastChecked INTEGER,
      isMonitored INTEGER,
      uptime REAL
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY,
      deviceId TEXT,
      deviceName TEXT,
      deviceIp TEXT,
      type TEXT,
      message TEXT,
      timestamp INTEGER,
      status TEXT
    );
  `);

    // Seed data if empty
    const devices = await db.all('SELECT * FROM devices');
    if (devices.length === 0) {
        const stmt = await db.prepare('INSERT INTO devices VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        await stmt.run('1', 'Core Router', '192.168.1.1', 'router', 'online', 2, Date.now(), 1, 99.9);
        await stmt.run('2', 'Primary DNS', '8.8.8.8', 'server', 'online', 12, Date.now(), 1, 99.5);
        await stmt.run('3', 'Web Server 01', '192.168.1.101', 'server', 'online', 45, Date.now(), 1, 98.2);
        await stmt.run('4', 'Database Cluster', '192.168.1.105', 'server', 'slow', 180, Date.now(), 1, 97.1);
        await stmt.run('5', 'Switch Floor 2', '192.168.2.1', 'switch', 'offline', 0, Date.now(), 1, 85.0);
        await stmt.run('6', 'HR Workstation', '192.168.3.22', 'workstation', 'online', 5, Date.now(), 0, 45.0);
        await stmt.finalize();

        const alertStmt = await db.prepare('INSERT INTO alerts VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        await alertStmt.run('a1', '5', 'Switch Floor 2', '192.168.2.1', 'connectivity', 'Device unresponsive (Request Timeout)', Date.now() - 1800000, 'active');
        await alertStmt.finalize();
    }
};

export const getDb = () => db;

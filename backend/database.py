import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Optional

DB_PATH = 'netguard.db'

def init_db():
    """Initialize SQLite database with required tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Devices table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS devices (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            ip TEXT NOT NULL,
            type TEXT NOT NULL,
            status TEXT DEFAULT 'offline',
            latency INTEGER DEFAULT 0,
            last_checked INTEGER,
            is_monitored INTEGER DEFAULT 1,
            uptime REAL DEFAULT 0.0
        )
    ''')
    
    # Alerts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id TEXT PRIMARY KEY,
            device_id TEXT,
            device_name TEXT,
            device_ip TEXT,
            type TEXT,
            message TEXT,
            timestamp INTEGER,
            status TEXT DEFAULT 'active',
            FOREIGN KEY (device_id) REFERENCES devices (id)
        )
    ''')
    
    # Fault logs table (for historical tracking)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fault_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT,
            device_name TEXT,
            device_ip TEXT,
            fault_type TEXT,
            description TEXT,
            timestamp INTEGER,
            FOREIGN KEY (device_id) REFERENCES devices (id)
        )
    ''')
    
    # Seed initial devices if table is empty
    cursor.execute('SELECT COUNT(*) FROM devices')
    count = cursor.fetchone()[0]
    
    if count == 0:
        print("[DB] Seeding initial devices...")
        timestamp = int(datetime.now().timestamp() * 1000)
        
        initial_devices = [
            ('1', 'Google DNS', '8.8.8.8', 'server', 'offline', 0, timestamp, 1, 0.0),
            ('2', 'Cloudflare DNS', '1.1.1.1', 'server', 'offline', 0, timestamp, 1, 0.0),
            ('3', 'Local Router', '192.168.1.1', 'router', 'offline', 0, timestamp, 1, 0.0),
        ]
        
        cursor.executemany('''
            INSERT INTO devices (id, name, ip, type, status, latency, last_checked, is_monitored, uptime)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', initial_devices)
        print(f"[DB] Seeded {len(initial_devices)} devices")
    
    conn.commit()
    conn.close()

def get_all_devices() -> List[Dict]:
    """Get all devices from database"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM devices')
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]

def add_device(device: Dict) -> bool:
    """Add a new device to database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO devices (id, name, ip, type, status, latency, last_checked, is_monitored, uptime)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            device['id'],
            device['name'],
            device['ip'],
            device['type'],
            device.get('status', 'offline'),
            device.get('latency', 0),
            device.get('lastChecked', int(datetime.now().timestamp() * 1000)),
            1 if device.get('isMonitored', True) else 0,
            device.get('uptime', 0.0)
        ))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error adding device: {e}")
        return False

def update_device_status(device_id: str, status: str, latency: int):
    """Update device status and latency"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    timestamp = int(datetime.now().timestamp() * 1000)
    
    cursor.execute('''
        UPDATE devices 
        SET status = ?, latency = ?, last_checked = ?
        WHERE id = ?
    ''', (status, latency, timestamp, device_id))
    
    conn.commit()
    conn.close()

def delete_device(device_id: str) -> bool:
    """Delete a device from database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM devices WHERE id = ?', (device_id,))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error deleting device: {e}")
        return False

def toggle_monitoring(device_id: str) -> bool:
    """Toggle monitoring status for a device"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT is_monitored FROM devices WHERE id = ?', (device_id,))
        row = cursor.fetchone()
        
        if row:
            new_status = 0 if row[0] else 1
            cursor.execute('UPDATE devices SET is_monitored = ? WHERE id = ?', (new_status, device_id))
            conn.commit()
        
        conn.close()
        return True
    except Exception as e:
        print(f"Error toggling monitoring: {e}")
        return False

def add_alert(alert: Dict) -> bool:
    """Add a new alert to database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO alerts (id, device_id, device_name, device_ip, type, message, timestamp, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            alert['id'],
            alert['deviceId'],
            alert['deviceName'],
            alert['deviceIp'],
            alert['type'],
            alert['message'],
            alert['timestamp'],
            alert.get('status', 'active')
        ))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error adding alert: {e}")
        return False

def get_all_alerts() -> List[Dict]:
    """Get all alerts from database"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM alerts ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]

def add_fault_log(device_id: str, device_name: str, device_ip: str, fault_type: str, description: str):
    """Add a fault log entry"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    timestamp = int(datetime.now().timestamp() * 1000)
    
    cursor.execute('''
        INSERT INTO fault_logs (device_id, device_name, device_ip, fault_type, description, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (device_id, device_name, device_ip, fault_type, description, timestamp))
    
    conn.commit()
    conn.close()

def get_fault_logs(limit: int = 100) -> List[Dict]:
    """Get recent fault logs"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM fault_logs ORDER BY timestamp DESC LIMIT ?', (limit,))
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]

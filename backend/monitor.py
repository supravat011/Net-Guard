import subprocess
import platform
import re
import time
from datetime import datetime
from typing import Dict, Optional
import uuid

from database import (
    get_all_devices, update_device_status, add_alert, add_fault_log
)

def generate_id() -> str:
    """Generate a random ID"""
    return str(uuid.uuid4())[:9]

def ping_device(ip: str) -> Dict[str, any]:
    """
    Ping a device and return status and latency
    Uses ICMP ping via subprocess
    
    Returns:
        {
            'status': 'online' | 'offline' | 'slow',
            'latency': int (ms)
        }
    """
    # Determine ping command based on OS
    param = '-n' if platform.system().lower() == 'windows' else '-c'
    
    try:
        # Execute ping command (1 packet, 2 second timeout)
        command = ['ping', param, '1', '-w', '2000', ip] if platform.system().lower() == 'windows' else ['ping', param, '1', '-W', '2', ip]
        
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=3,
            text=True
        )
        
        if result.returncode == 0:
            # Parse latency from ping output
            output = result.stdout
            
            # Windows: "Average = Xms" or "time=Xms"
            # Linux: "time=X.X ms"
            if platform.system().lower() == 'windows':
                match = re.search(r'Average = (\d+)ms', output) or re.search(r'time[=<](\d+)ms', output)
            else:
                match = re.search(r'time=([\d.]+)\s*ms', output)
            
            if match:
                latency = int(float(match.group(1)))
                
                # Determine status based on latency
                if latency > 150:
                    return {'status': 'slow', 'latency': latency}
                else:
                    return {'status': 'online', 'latency': latency}
            else:
                # Ping successful but couldn't parse latency
                return {'status': 'online', 'latency': 1}
        else:
            # Ping failed
            return {'status': 'offline', 'latency': 0}
            
    except subprocess.TimeoutExpired:
        return {'status': 'offline', 'latency': 0}
    except Exception as e:
        print(f"Error pinging {ip}: {e}")
        return {'status': 'offline', 'latency': 0}

def monitor_all_devices():
    """
    Monitor all devices that have monitoring enabled
    This function is called periodically by the scheduler
    """
    try:
        devices = get_all_devices()
        
        # Debug: print first device structure
        if devices and len(devices) > 0:
            print(f"[DEBUG] First device keys: {devices[0].keys()}")
        
        for device in devices:
            # Skip if monitoring is disabled (database returns is_monitored as int)
            if not device.get('is_monitored', 0):
                continue
            
            device_id = device['id']
            device_name = device['name']
            device_ip = device['ip']
            previous_status = device['status']
            
            # Ping the device
            result = ping_device(device_ip)
            new_status = result['status']
            new_latency = result['latency']
            
            # Update device status in database
            update_device_status(device_id, new_status, new_latency)
            
            # Generate alerts if status changed
            if new_status != previous_status:
                alert_id = generate_id()
                timestamp = int(datetime.now().timestamp() * 1000)
                
                if new_status == 'offline':
                    # Device went offline
                    alert = {
                        'id': alert_id,
                        'deviceId': device_id,
                        'deviceName': device_name,
                        'deviceIp': device_ip,
                        'type': 'connectivity',
                        'message': 'Connection lost: Device is unreachable',
                        'timestamp': timestamp,
                        'status': 'active'
                    }
                    add_alert(alert)
                    add_fault_log(device_id, device_name, device_ip, 'connectivity', 'Device went offline')
                    
                    print(f"[ALERT] {device_name} ({device_ip}) is OFFLINE")
                    
                elif new_status == 'slow' and previous_status != 'slow':
                    # High latency detected
                    alert = {
                        'id': alert_id,
                        'deviceId': device_id,
                        'deviceName': device_name,
                        'deviceIp': device_ip,
                        'type': 'latency',
                        'message': f'High latency detected: {new_latency}ms',
                        'timestamp': timestamp,
                        'status': 'active'
                    }
                    add_alert(alert)
                    add_fault_log(device_id, device_name, device_ip, 'latency', f'High latency: {new_latency}ms')
                    
                    print(f"[ALERT] {device_name} ({device_ip}) has HIGH LATENCY: {new_latency}ms")
                    
                elif new_status == 'online' and previous_status == 'offline':
                    # Device recovered
                    print(f"[RECOVERY] {device_name} ({device_ip}) is back ONLINE")
            
            # Small delay between pings to avoid network flooding
            time.sleep(0.1)
        
        print(f"[MONITOR] Scan completed at {datetime.now().strftime('%H:%M:%S')}")
    except Exception as e:
        print(f"[ERROR] Monitor failed: {e}")
        import traceback
        traceback.print_exc()

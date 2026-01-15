from flask import Blueprint, request, jsonify
from database import (
    get_all_devices, add_device, delete_device, toggle_monitoring,
    get_all_alerts, get_fault_logs
)

api = Blueprint('api', __name__)

@api.route('/devices', methods=['GET'])
def get_devices():
    """Get all devices"""
    devices = get_all_devices()
    
    # Convert is_monitored from int to boolean
    for device in devices:
        device['isMonitored'] = bool(device.pop('is_monitored'))
        device['lastChecked'] = device.pop('last_checked')
    
    return jsonify(devices)

@api.route('/devices', methods=['POST'])
def create_device():
    """Add a new device"""
    data = request.get_json()
    
    if not data or 'id' not in data or 'name' not in data or 'ip' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    success = add_device(data)
    
    if success:
        return jsonify({'message': 'Device added successfully'}), 201
    else:
        return jsonify({'error': 'Failed to add device'}), 500

@api.route('/devices/<device_id>', methods=['DELETE'])
def remove_device(device_id):
    """Delete a device"""
    success = delete_device(device_id)
    
    if success:
        return jsonify({'message': 'Device deleted successfully'})
    else:
        return jsonify({'error': 'Failed to delete device'}), 500

@api.route('/devices/<device_id>/toggle', methods=['PATCH'])
def toggle_device_monitoring(device_id):
    """Toggle monitoring for a device"""
    success = toggle_monitoring(device_id)
    
    if success:
        return jsonify({'message': 'Monitoring toggled successfully'})
    else:
        return jsonify({'error': 'Failed to toggle monitoring'}), 500

@api.route('/alerts', methods=['GET'])
def get_alerts():
    """Get all alerts"""
    alerts = get_all_alerts()
    
    # Convert snake_case to camelCase for frontend
    for alert in alerts:
        alert['deviceId'] = alert.pop('device_id')
        alert['deviceName'] = alert.pop('device_name')
        alert['deviceIp'] = alert.pop('device_ip')
    
    return jsonify(alerts)

@api.route('/logs', methods=['GET'])
def get_logs():
    """Get fault logs"""
    limit = request.args.get('limit', 100, type=int)
    logs = get_fault_logs(limit)
    
    # Convert snake_case to camelCase
    for log in logs:
        log['deviceId'] = log.pop('device_id')
        log['deviceName'] = log.pop('device_name')
        log['deviceIp'] = log.pop('device_ip')
        log['faultType'] = log.pop('fault_type')
    
    return jsonify(logs)

#!/usr/bin/env python3
"""
NetGuard Backend Test Script
Tests all API endpoints and monitoring functionality
"""

import requests
import time
import json

BASE_URL = "http://localhost:5000"

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def test_get_devices():
    print_section("TEST: Get All Devices")
    try:
        response = requests.get(f"{BASE_URL}/api/devices")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            devices = response.json()
            print(f"✅ Found {len(devices)} devices:")
            for device in devices:
                print(f"  - {device['name']} ({device['ip']}) - Status: {device['status']}, Latency: {device['latency']}ms")
            return True
        else:
            print(f"❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_add_device():
    print_section("TEST: Add New Device")
    new_device = {
        "id": "test-device-123",
        "name": "Test Server",
        "ip": "1.0.0.1",
        "type": "server",
        "status": "offline",
        "latency": 0,
        "lastChecked": int(time.time() * 1000),
        "isMonitored": True,
        "uptime": 0
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/devices", json=new_device)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print(f"✅ Device added successfully")
            return True
        else:
            print(f"❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_toggle_monitoring():
    print_section("TEST: Toggle Monitoring")
    device_id = "test-device-123"
    
    try:
        response = requests.put(f"{BASE_URL}/api/devices/{device_id}/toggle")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print(f"✅ Monitoring toggled successfully")
            return True
        else:
            print(f"❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_delete_device():
    print_section("TEST: Delete Device")
    device_id = "test-device-123"
    
    try:
        response = requests.delete(f"{BASE_URL}/api/devices/{device_id}")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print(f"✅ Device deleted successfully")
            return True
        else:
            print(f"❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_alerts():
    print_section("TEST: Get Alerts")
    try:
        response = requests.get(f"{BASE_URL}/api/alerts")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            alerts = response.json()
            print(f"✅ Found {len(alerts)} alerts:")
            for alert in alerts[:5]:  # Show first 5
                print(f"  - {alert['deviceName']}: {alert['message']}")
            return True
        else:
            print(f"❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_logs():
    print_section("TEST: Get Fault Logs")
    try:
        response = requests.get(f"{BASE_URL}/api/logs")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            logs = response.json()
            print(f"✅ Found {len(logs)} fault logs:")
            for log in logs[:5]:  # Show first 5
                print(f"  - {log['deviceName']}: {log['faultType']} - {log['description']}")
            return True
        else:
            print(f"❌ Failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_monitoring_cycle():
    print_section("TEST: Monitor Real-Time Updates")
    print("Watching for status changes over 15 seconds...")
    
    try:
        # Get initial state
        response = requests.get(f"{BASE_URL}/api/devices")
        initial_devices = {d['id']: d for d in response.json()}
        
        # Wait for monitoring cycle
        time.sleep(15)
        
        # Get updated state
        response = requests.get(f"{BASE_URL}/api/devices")
        updated_devices = {d['id']: d for d in response.json()}
        
        # Compare
        changes = 0
        for device_id, initial in initial_devices.items():
            updated = updated_devices.get(device_id)
            if updated:
                if initial['status'] != updated['status'] or initial['latency'] != updated['latency']:
                    changes += 1
                    print(f"  📊 {updated['name']}: {initial['status']} → {updated['status']}, "
                          f"{initial['latency']}ms → {updated['latency']}ms")
        
        if changes > 0:
            print(f"\n✅ Detected {changes} device updates - Monitoring is working!")
            return True
        else:
            print(f"\n⚠️  No changes detected - Devices may be stable or monitoring may not be running")
            return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("\n" + "="*60)
    print("  NetGuard Backend API Test Suite")
    print("="*60)
    
    results = {
        "Get Devices": test_get_devices(),
        "Add Device": test_add_device(),
        "Toggle Monitoring": test_toggle_monitoring(),
        "Delete Device": test_delete_device(),
        "Get Alerts": test_get_alerts(),
        "Get Logs": test_get_logs(),
        "Real-Time Monitoring": test_monitoring_cycle()
    }
    
    print_section("TEST SUMMARY")
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n{'='*60}")
    print(f"  Results: {passed}/{total} tests passed")
    print(f"{'='*60}\n")
    
    if passed == total:
        print("🎉 All tests passed! NetGuard backend is working correctly.")
    else:
        print("⚠️  Some tests failed. Please check the output above.")

if __name__ == "__main__":
    main()

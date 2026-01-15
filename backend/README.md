# NetGuard - Python/Flask Backend

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js (for frontend)

### Installation

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Install frontend dependencies (if not already done)
npm install
```

### Running the Application

```bash
# Run both frontend and backend together
npm run dev:fullstack
```

Or run separately:

```bash
# Terminal 1: Backend
python backend/app.py

# Terminal 2: Frontend
npm run dev
```

## Backend Architecture

### Technology Stack
- **Python 3** - Main language
- **Flask** - Web framework
- **SQLite** - Database
- **APScheduler** - Background monitoring
- **subprocess** - ICMP ping execution

### File Structure
```
backend/
├── app.py          # Flask application entry point
├── database.py     # SQLite database layer
├── monitor.py      # Network monitoring (ICMP ping)
├── routes.py       # REST API endpoints
└── requirements.txt
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Get all devices |
| POST | `/api/devices` | Add new device |
| DELETE | `/api/devices/<id>` | Remove device |
| PATCH | `/api/devices/<id>/toggle` | Toggle monitoring |
| GET | `/api/alerts` | Get all alerts |
| GET | `/api/logs` | Get fault logs |

### Monitoring Features

- **Real ICMP Ping**: Uses system `ping` command via subprocess
- **5-Second Interval**: Continuous monitoring every 5 seconds
- **Automatic Alerts**: Generates alerts when devices go offline or have high latency
- **Fault Logging**: Tracks all network faults in database
- **Status Classification**:
  - `online` - Latency < 150ms
  - `slow` - Latency ≥ 150ms
  - `offline` - Ping failed

### Database Schema

**devices**
- id, name, ip, type, status, latency, last_checked, is_monitored, uptime

**alerts**
- id, device_id, device_name, device_ip, type, message, timestamp, status

**fault_logs**
- id, device_id, device_name, device_ip, fault_type, description, timestamp

## Testing

### Add Test Devices

```bash
# Via frontend UI or API:
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test1",
    "name": "Google DNS",
    "ip": "8.8.8.8",
    "type": "server",
    "isMonitored": true
  }'
```

### Monitor Logs

Watch the backend console for real-time monitoring logs:
```
[MONITOR] Scan completed at 11:34:52
[ALERT] Switch Floor 2 (192.168.2.1) is OFFLINE
[RECOVERY] Google DNS (8.8.8.8) is back ONLINE
```

## Notes

- The database file `netguard.db` is created automatically in the project root
- Initial devices are seeded on first run (Google DNS, Cloudflare DNS, Local Router)
- Monitoring runs in a background thread, separate from Flask request handling
- CORS is enabled for frontend development

# NetGuard - Network Monitoring Application

A modern, real-time network monitoring application built with Python/Flask backend and React/TypeScript frontend.

![NetGuard Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-18+-61dafb)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

- **Real-Time Network Monitoring** - ICMP ping-based monitoring every 5 seconds
- **Fault Detection** - Automatic detection of connectivity issues and high latency
- **Alert System** - Real-time alerts for network faults
- **Device Management** - Add, remove, and toggle monitoring for network devices
- **Data Persistence** - SQLite database for historical tracking
- **Beautiful Dashboard** - Premium glassmorphic UI with live updates
- **Cross-Platform** - Works on Windows and Linux

## 📸 Screenshots

### Dashboard
Real-time monitoring dashboard with device status, alerts, and latency charts.

### Device Management
Easy-to-use interface for managing monitored devices.

## 🛠️ Tech Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **SQLite** - Database
- **APScheduler** - Background task scheduling
- **ICMP Ping** - Network monitoring

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the project directory:
```bash
cd "d:\Freelance\Net Guard"
```

2. Install Python dependencies:
```bash
pip install -r backend/requirements.txt
```

3. Start the backend server:
```bash
python backend/app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Run Full Stack

To run both backend and frontend simultaneously:
```bash
npm run dev:fullstack
```

## 📖 Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173`

2. **View Dashboard**: See real-time status of all monitored devices

3. **Add Devices**: 
   - Go to Device Management
   - Click "Add Device"
   - Enter device name, IP address, and type
   - Device will be automatically monitored

4. **Monitor Alerts**: Check the Alerts & Logs page for any network issues

5. **Toggle Monitoring**: Enable/disable monitoring for specific devices

## 🏗️ Project Structure

```
Net Guard/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── database.py         # SQLite database layer
│   ├── monitor.py          # Network monitoring logic
│   ├── routes.py           # API routes
│   └── requirements.txt    # Python dependencies
├── components/
│   ├── Dashboard.tsx       # Main dashboard component
│   ├── LandingPage.tsx     # Landing page
│   ├── Navbar.tsx          # Navigation bar
│   ├── FeaturesPage.tsx    # Features page
│   ├── SecurityPage.tsx    # Security page
│   └── HowItWorksPage.tsx  # How it works page
├── services/
│   └── api.ts              # API service layer
├── App.tsx                 # Main React application
├── vite.config.ts          # Vite configuration
└── package.json            # Node.js dependencies
```

## 🔧 Configuration

### Monitoring Interval
Default: 5 seconds

To change, edit `backend/app.py`:
```python
scheduler.add_job(
    monitor_all_devices,
    'interval',
    seconds=5  # Change this value
)
```

### Latency Threshold
Default: 150ms (considered "slow")

To change, edit `backend/monitor.py`:
```python
if latency > 150:  # Change this value
    status = 'slow'
```

## 🌐 API Endpoints

- `GET /api/devices` - Get all devices
- `POST /api/devices` - Add new device
- `DELETE /api/devices/:id` - Remove device
- `PUT /api/devices/:id/toggle` - Toggle monitoring
- `GET /api/alerts` - Get all alerts
- `GET /api/logs` - Get fault logs

## 🧪 Testing

Run the backend API tests:
```bash
python test_backend.py
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Supravat**
- GitHub: [@supravat011](https://github.com/supravat011)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

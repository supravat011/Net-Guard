from flask import Flask
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import time

from database import init_db
from routes import api
from monitor import monitor_all_devices

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Register API routes
app.register_blueprint(api, url_prefix='/api')

# Initialize database FIRST
print("[INIT] Initializing database...")
init_db()
print("[INIT] Database initialized successfully")

# Wait a moment for database to be ready
time.sleep(0.5)

# Setup background monitoring scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(
    func=monitor_all_devices,
    trigger="interval",
    seconds=5,  # Monitor every 5 seconds
    id='network_monitor',
    name='Network Monitoring Job',
    replace_existing=True
)

print("[INIT] Starting background monitoring scheduler...")
scheduler.start()
print("[INIT] Scheduler started - monitoring every 5 seconds")

# Shutdown scheduler when app exits
atexit.register(lambda: scheduler.shutdown())

@app.route('/')
def index():
    return {
        'status': 'online',
        'message': 'NetGuard API Server',
        'version': '1.0.0'
    }

if __name__ == '__main__':
    print("=" * 60)
    print("NetGuard - Real-Time Network Fault Detection System")
    print("=" * 60)
    print("Backend: Python/Flask")
    print("Database: SQLite")
    print("Monitoring: ICMP Ping (5s interval)")
    print("=" * 60)
    print("Server starting on http://localhost:5000")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)

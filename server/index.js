
import express from 'express';
import cors from 'cors';
import { setupDatabase } from './database.js';
import { router } from './routes.js';
import { simulateNetwork } from './simulation.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize Database
setupDatabase();

// API Routes
app.use('/api', router);

// Start Network Simulation Loop
setInterval(simulateNetwork, 3000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

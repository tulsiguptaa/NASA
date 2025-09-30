// backend/main.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const publicationRoutes = require('./api/routes/publication');
const graphRoutes = require('./api/routes/graph');
const dashboardRoutes = require('./api/dashboard');
const homeRoutes = require('./api/home');
const resourcesRoutes = require('./api/resources');
const searchRoutes = require('./api/search');
const visualizationsRoutes = require('./api/visualizations');
const studiesRoutes = require('./api/studies');
const insightsRoutes = require('./api/insights');
const { PORT, CLIENT_URL } = require('./config/server'); // Assuming you define these

const app = express();

// Middleware
app.use(cors({ origin: CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json()); // for parsing application/json

// API Routes
app.use('/api/v1/publications', publicationRoutes);
app.use('/api/v1/graph', graphRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/home', homeRoutes);
app.use('/api/v1/resources', resourcesRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/visualizations', visualizationsRoutes);
app.use('/api/v1/studies', studiesRoutes);
app.use('/api/v1/insights', insightsRoutes);

// Root Health Check
app.get('/', (req, res) => {
    res.status(200).json({ message: 'BioAstra Node API running! Ready for launch.' });
});

// Start Server
app.listen(PORT || 8000, () => {
    console.log(`🚀 BioAstra API running on port ${PORT || 8000}`);
    // You would call database connection functions here (e.g., initNeo4j, initPostgres)
});
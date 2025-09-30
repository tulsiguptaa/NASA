const express = require('express');
const router = express.Router();
const nasaService = require('../services/nasaService');

// GET /api/dashboard - Get all dashboard data
router.get('/', async (req, res) => {
  try {
    const dashboardData = await nasaService.getDashboardData();
    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET /api/dashboard/metrics - Get key metrics only
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await nasaService.getKeyMetrics();
    res.json(metrics);
  } catch (error) {
    console.error('Metrics API error:', error);
    res.status(500).json({ error: 'Failed to fetch metrics data' });
  }
});

// GET /api/dashboard/topics - Get topic distribution only
router.get('/topics', async (req, res) => {
  try {
    const topics = await nasaService.getTopicDistribution();
    res.json(topics);
  } catch (error) {
    console.error('Topics API error:', error);
    res.status(500).json({ error: 'Failed to fetch topic distribution data' });
  }
});

module.exports = router;
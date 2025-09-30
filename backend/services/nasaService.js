const axios = require('axios');
require('dotenv').config();

// NASA API endpoints
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_TECHPORT_URL = 'https://api.nasa.gov/techport/api/projects';
const NASA_EONET_URL = 'https://eonet.gsfc.nasa.gov/api/v3';
const NASA_SPACE_BIOLOGY_URL = 'https://api.nasa.gov/space-biology/api/v1';

/**
 * Service for fetching space biology research data from NASA APIs
 */
class NasaService {
  /**
   * Get key metrics for the dashboard
   * @returns {Promise<Object>} Key metrics data
   */
  async getKeyMetrics() {
    try {
      // In a real implementation, this would fetch from actual NASA APIs
      // For now, we'll return mock data that matches our dashboard
      return {
        totalPublications: 608,
        totalMissions: 42,
        totalOrganisms: 35
      };
    } catch (error) {
      console.error('Error fetching key metrics:', error);
      throw new Error('Failed to fetch key metrics');
    }
  }

  /**
   * Get topic distribution data for the dashboard
   * @returns {Promise<Object>} Topic distribution data
   */
  async getTopicDistribution() {
    try {
      // In a real implementation, this would analyze NASA research data
      // For now, we'll return mock data that matches our dashboard
      return {
        labels: ['Immune System', 'Bone Health', 'Muscle Atrophy', 'Radiation Effects', 'Cardiovascular', 'Plant Growth'],
        datasets: [{
          data: [25, 15, 20, 18, 12, 10],
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ]
        }]
      };
    } catch (error) {
      console.error('Error fetching topic distribution:', error);
      throw new Error('Failed to fetch topic distribution');
    }
  }

  /**
   * Get all dashboard data in a single call
   * @returns {Promise<Object>} All dashboard data
   */
  async getDashboardData() {
    try {
      const [keyMetrics, topicDistribution] = await Promise.all([
        this.getKeyMetrics(),
        this.getTopicDistribution()
      ]);

      return {
        keyMetrics,
        topicDistribution
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }
}

module.exports = new NasaService();
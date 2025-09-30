const express = require('express');
const router = express.Router();
const nasaService = require('../services/nasaService');

// GET /api/v1/home - Get home page data
router.get('/', async (req, res) => {
  try {
    // Get dashboard summary data
    const dashboardSummary = await nasaService.getKeyMetrics();
    
    // Get trending insights
    const trendingInsights = [
      {
        id: 1,
        title: "Radiation Shielding Effects",
        summary: "DNA repair mechanisms were upregulated in yeast cells exposed to cosmic radiation.",
        date: "2023-11-15",
        category: "Radiation Biology"
      },
      {
        id: 2,
        title: "Transcriptomic Analysis of Yeast in Space",
        summary: "Genes related to glycolysis, alcohol metabolism, and cell wall integrity were differentially expressed.",
        date: "2023-10-22",
        category: "Microbiology"
      },
      {
        id: 3,
        title: "Plant Growth in Microgravity",
        summary: "Arabidopsis seedlings showed altered auxin transport in space environment.",
        date: "2023-09-18",
        category: "Botany"
      }
    ];
    
    // About Space Biology content
    const aboutSpaceBiology = {
      title: "Space Biology Research",
      content: "Space biology is the study of how spaceflight affects living organisms. Research in this field helps us understand how life adapts to the space environment, including microgravity and radiation. NASA's space biology program studies microbes, plants, animals, and humans to design effective countermeasures and create sustainable life support systems for long-duration missions.",
      imageUrl: "/space-biology.jpg"
    };
    
    res.json({
      dashboardSummary,
      trendingInsights,
      aboutSpaceBiology
    });
  } catch (error) {
    console.error('Home API error:', error);
    res.status(500).json({ error: 'Failed to fetch home page data' });
  }
});

module.exports = router;
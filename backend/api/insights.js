/**
 * API endpoints for research insights
 */

const express = require('express');
const router = express.Router();
const summaryService = require('../services/summaryService');

/**
 * @route GET /api/v1/insights/trends
 * @desc Get trending research topics
 * @access Public
 */
router.get('/trends', async (req, res) => {
  try {
    const trendingTopics = await summaryService.getTrendingTopics();
    res.json({
      success: true,
      data: trendingTopics
    });
  } catch (error) {
    console.error('Error getting trending topics:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/insights/gaps
 * @desc Get identified research gaps
 * @access Public
 */
router.get('/gaps', async (req, res) => {
  try {
    const { area } = req.query;
    const researchGaps = await summaryService.identifyResearchGaps(area);
    res.json({
      success: true,
      data: researchGaps
    });
  } catch (error) {
    console.error('Error identifying research gaps:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/insights/summary
 * @desc Get AI-generated summary based on parameters
 * @access Public
 */
router.get('/summary', async (req, res) => {
  try {
    const { studyId, topic } = req.query;
    let keywords = req.query.keywords;
    
    // Convert comma-separated keywords to array
    if (keywords && typeof keywords === 'string') {
      keywords = keywords.split(',').map(k => k.trim());
    }
    
    const summary = await summaryService.generateSummary({
      studyId,
      topic,
      keywords
    });
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
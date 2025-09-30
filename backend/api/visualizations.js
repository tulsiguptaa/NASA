/**
 * API endpoints for visualization data
 */

const express = require('express');
const router = express.Router();
const studies = require('../data/mockStudies');

/**
 * @route GET /api/v1/visualizations/publication-trends
 * @desc Get publication trends over time
 * @access Public
 */
router.get('/publication-trends', (req, res) => {
  try {
    // Group studies by year and count
    const yearCounts = studies.reduce((acc, study) => {
      const year = new Date(study.publishedDate).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
    
    // Convert to array format for charting
    const data = Object.entries(yearCounts).map(([year, count]) => ({
      year: parseInt(year),
      count
    })).sort((a, b) => a.year - b.year);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting publication trends:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/visualizations/category-distribution
 * @desc Get distribution of studies by category
 * @access Public
 */
router.get('/category-distribution', (req, res) => {
  try {
    // Count studies by category
    const categoryCounts = studies.reduce((acc, study) => {
      acc[study.category] = (acc[study.category] || 0) + 1;
      return acc;
    }, {});
    
    // Convert to array format for charting
    const data = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    })).sort((a, b) => b.count - a.count);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting category distribution:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/visualizations/citation-impact
 * @desc Get citation impact by category
 * @access Public
 */
router.get('/citation-impact', (req, res) => {
  try {
    // Calculate average citations by category
    const categoryData = {};
    
    studies.forEach(study => {
      if (!categoryData[study.category]) {
        categoryData[study.category] = {
          totalCitations: 0,
          count: 0
        };
      }
      
      categoryData[study.category].totalCitations += study.citations;
      categoryData[study.category].count += 1;
    });
    
    // Calculate averages and format for charting
    const data = Object.entries(categoryData).map(([category, stats]) => ({
      category,
      averageCitations: Math.round((stats.totalCitations / stats.count) * 10) / 10,
      totalCitations: stats.totalCitations,
      studyCount: stats.count
    })).sort((a, b) => b.averageCitations - a.averageCitations);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting citation impact:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/visualizations/collaboration-network
 * @desc Get collaboration network data
 * @access Public
 */
router.get('/collaboration-network', (req, res) => {
  try {
    // Create nodes for institutions and authors
    const nodes = [];
    const links = [];
    const institutionMap = new Map();
    const authorMap = new Map();
    
    // Create institution nodes
    studies.forEach(study => {
      if (!institutionMap.has(study.institution)) {
        const nodeId = `inst-${nodes.length}`;
        institutionMap.set(study.institution, nodeId);
        nodes.push({
          id: nodeId,
          name: study.institution,
          type: 'institution',
          value: 1
        });
      }
    });
    
    // Create author nodes and links
    studies.forEach(study => {
      const institutionId = institutionMap.get(study.institution);
      
      study.authors.forEach(author => {
        // Add author node if not exists
        if (!authorMap.has(author)) {
          const nodeId = `auth-${nodes.length}`;
          authorMap.set(author, nodeId);
          nodes.push({
            id: nodeId,
            name: author,
            type: 'author',
            value: 1
          });
        }
        
        // Add link between author and institution
        const authorId = authorMap.get(author);
        links.push({
          source: authorId,
          target: institutionId,
          value: 1
        });
        
        // Increment node values
        const authorNode = nodes.find(node => node.id === authorId);
        authorNode.value += 1;
        
        const institutionNode = nodes.find(node => node.id === institutionId);
        institutionNode.value += 1;
      });
    });
    
    // Create co-authorship links
    studies.forEach(study => {
      for (let i = 0; i < study.authors.length; i++) {
        for (let j = i + 1; j < study.authors.length; j++) {
          const author1 = authorMap.get(study.authors[i]);
          const author2 = authorMap.get(study.authors[j]);
          
          // Check if link already exists
          const existingLink = links.find(link => 
            (link.source === author1 && link.target === author2) || 
            (link.source === author2 && link.target === author1)
          );
          
          if (existingLink) {
            existingLink.value += 1;
          } else {
            links.push({
              source: author1,
              target: author2,
              value: 1
            });
          }
        }
      }
    });
    
    res.json({
      success: true,
      data: {
        nodes,
        links
      }
    });
  } catch (error) {
    console.error('Error getting collaboration network:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/visualizations/keyword-cloud
 * @desc Get keyword frequency data for word cloud
 * @access Public
 */
router.get('/keyword-cloud', (req, res) => {
  try {
    // Count keyword frequencies
    const keywordCounts = {};
    
    studies.forEach(study => {
      study.keywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });
    
    // Format for word cloud visualization
    const data = Object.entries(keywordCounts).map(([text, value]) => ({
      text,
      value
    })).sort((a, b) => b.value - a.value);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting keyword cloud data:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
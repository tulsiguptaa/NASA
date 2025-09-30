/**
 * API endpoints for Study Explorer
 */

const express = require('express');
const router = express.Router();
const studies = require('../data/mockStudies');

/**
 * @route GET /api/v1/studies
 * @desc Get all studies with pagination and filtering
 * @access Public
 */
router.get('/', (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'publishedDate', 
      sortOrder = 'desc',
      category,
      year,
      author
    } = req.query;
    
    // Apply filters
    let filteredStudies = [...studies];
    
    if (category) {
      filteredStudies = filteredStudies.filter(study => 
        study.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (year) {
      const targetYear = parseInt(year);
      filteredStudies = filteredStudies.filter(study => 
        new Date(study.publishedDate).getFullYear() === targetYear
      );
    }
    
    if (author) {
      filteredStudies = filteredStudies.filter(study => 
        study.authors.some(a => a.toLowerCase().includes(author.toLowerCase()))
      );
    }
    
    // Apply sorting
    filteredStudies.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'publishedDate') {
        comparison = new Date(a.publishedDate) - new Date(b.publishedDate);
      } else if (sortBy === 'citations') {
        comparison = a.citations - b.citations;
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else {
        // Default to date
        comparison = new Date(a.publishedDate) - new Date(b.publishedDate);
      }
      
      return sortOrder.toLowerCase() === 'desc' ? -comparison : comparison;
    });
    
    // Apply pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedStudies = filteredStudies.slice(startIndex, endIndex);
    
    // Return with metadata
    res.json({
      success: true,
      totalStudies: filteredStudies.length,
      totalPages: Math.ceil(filteredStudies.length / parseInt(limit)),
      currentPage: parseInt(page),
      studies: paginatedStudies
    });
  } catch (error) {
    console.error('Error fetching studies:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/studies/:id
 * @desc Get a single study by ID
 * @access Public
 */
router.get('/:id', (req, res) => {
  try {
    const study = studies.find(s => s.id === req.params.id);
    
    if (!study) {
      return res.status(404).json({ 
        success: false, 
        error: 'Study not found' 
      });
    }
    
    // Get related studies (same category or shared keywords)
    const relatedStudies = studies
      .filter(s => 
        s.id !== study.id && (
          s.category === study.category ||
          s.keywords.some(keyword => study.keywords.includes(keyword))
        )
      )
      .sort((a, b) => {
        // Count shared keywords for better relevance sorting
        const aSharedKeywords = a.keywords.filter(k => study.keywords.includes(k)).length;
        const bSharedKeywords = b.keywords.filter(k => study.keywords.includes(k)).length;
        
        return bSharedKeywords - aSharedKeywords || b.citations - a.citations;
      })
      .slice(0, 5);
    
    res.json({
      success: true,
      study,
      relatedStudies
    });
  } catch (error) {
    console.error('Error fetching study:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @route GET /api/v1/studies/stats/overview
 * @desc Get study statistics overview
 * @access Public
 */
router.get('/stats/overview', (req, res) => {
  try {
    // Calculate various statistics
    const totalStudies = studies.length;
    
    // Publications by year
    const publicationsByYear = studies.reduce((acc, study) => {
      const year = new Date(study.publishedDate).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
    
    // Most cited studies
    const topCitedStudies = [...studies]
      .sort((a, b) => b.citations - a.citations)
      .slice(0, 5)
      .map(({ id, title, authors, citations }) => ({ id, title, authors, citations }));
    
    // Category distribution
    const categoryDistribution = studies.reduce((acc, study) => {
      acc[study.category] = (acc[study.category] || 0) + 1;
      return acc;
    }, {});
    
    // Top institutions
    const institutionCounts = studies.reduce((acc, study) => {
      acc[study.institution] = (acc[study.institution] || 0) + 1;
      return acc;
    }, {});
    
    const topInstitutions = Object.entries(institutionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Top keywords
    const keywordCounts = {};
    studies.forEach(study => {
      study.keywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });
    
    const topKeywords = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    res.json({
      success: true,
      stats: {
        totalStudies,
        publicationsByYear,
        topCitedStudies,
        categoryDistribution,
        topInstitutions,
        topKeywords
      }
    });
  } catch (error) {
    console.error('Error fetching study statistics:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
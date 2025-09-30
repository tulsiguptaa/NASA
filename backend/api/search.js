/**
 * API endpoints for search and filtering functionality
 */

const express = require('express');
const router = express.Router();

// Mock data for studies
const studies = require('../data/mockStudies');

/**
 * @route GET /api/v1/search
 * @desc Search across all space biology studies
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const { 
      query, 
      category, 
      startDate, 
      endDate, 
      author, 
      institution,
      limit = 20,
      page = 1
    } = req.query;

    // Filter studies based on query parameters
    let results = [...studies];
    
    // Text search
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(study => {
        return searchTerms.some(term => 
          study.title.toLowerCase().includes(term) || 
          study.abstract.toLowerCase().includes(term) || 
          study.keywords.some(keyword => keyword.toLowerCase().includes(term))
        );
      });
    }
    
    // Category filter
    if (category) {
      results = results.filter(study => 
        study.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Date range filter
    if (startDate) {
      const start = new Date(startDate);
      results = results.filter(study => new Date(study.publishedDate) >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate);
      results = results.filter(study => new Date(study.publishedDate) <= end);
    }
    
    // Author filter
    if (author) {
      results = results.filter(study => 
        study.authors.some(a => a.toLowerCase().includes(author.toLowerCase()))
      );
    }
    
    // Institution filter
    if (institution) {
      results = results.filter(study => 
        study.institution.toLowerCase().includes(institution.toLowerCase())
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    // Return results with metadata
    res.json({
      success: true,
      count: results.length,
      page: parseInt(page),
      totalPages: Math.ceil(results.length / limit),
      data: paginatedResults
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during search' 
    });
  }
});

/**
 * @route GET /api/v1/search/filters
 * @desc Get available filter options
 * @access Public
 */
router.get('/filters', async (req, res) => {
  try {
    // Extract unique filter options from studies
    const categories = [...new Set(studies.map(study => study.category))];
    const institutions = [...new Set(studies.map(study => study.institution))];
    
    // Get all authors (flattened and unique)
    const allAuthors = studies.reduce((acc, study) => [...acc, ...study.authors], []);
    const authors = [...new Set(allAuthors)];
    
    // Get date range
    const dates = studies.map(study => new Date(study.publishedDate));
    const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
    const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];
    
    // Get all keywords (flattened and unique)
    const allKeywords = studies.reduce((acc, study) => [...acc, ...study.keywords], []);
    const keywords = [...new Set(allKeywords)];
    
    res.json({
      success: true,
      filters: {
        categories,
        institutions,
        authors,
        dateRange: {
          min: minDate,
          max: maxDate
        },
        keywords
      }
    });
  } catch (error) {
    console.error('Filter options error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error retrieving filter options' 
    });
  }
});

/**
 * @route GET /api/v1/search/autocomplete
 * @desc Autocomplete suggestions for search
 * @access Public
 */
router.get('/autocomplete', async (req, res) => {
  try {
    const { term, type = 'all' } = req.query;
    
    if (!term) {
      return res.json({ success: true, suggestions: [] });
    }
    
    const normalizedTerm = term.toLowerCase();
    let suggestions = [];
    
    // Get suggestions based on type
    switch (type) {
      case 'title':
        suggestions = studies
          .map(study => study.title)
          .filter(title => title.toLowerCase().includes(normalizedTerm))
          .slice(0, 10);
        break;
        
      case 'author':
        const allAuthors = studies.reduce((acc, study) => [...acc, ...study.authors], []);
        suggestions = [...new Set(allAuthors)]
          .filter(author => author.toLowerCase().includes(normalizedTerm))
          .slice(0, 10);
        break;
        
      case 'keyword':
        const allKeywords = studies.reduce((acc, study) => [...acc, ...study.keywords], []);
        suggestions = [...new Set(allKeywords)]
          .filter(keyword => keyword.toLowerCase().includes(normalizedTerm))
          .slice(0, 10);
        break;
        
      case 'all':
      default:
        // Combine titles, authors, and keywords
        const titles = studies
          .map(study => study.title)
          .filter(title => title.toLowerCase().includes(normalizedTerm));
          
        const authors = [...new Set(studies.reduce((acc, study) => [...acc, ...study.authors], []))]
          .filter(author => author.toLowerCase().includes(normalizedTerm));
          
        const keywords = [...new Set(studies.reduce((acc, study) => [...acc, ...study.keywords], []))]
          .filter(keyword => keyword.toLowerCase().includes(normalizedTerm));
          
        suggestions = [...titles, ...authors, ...keywords].slice(0, 10);
    }
    
    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during autocomplete' 
    });
  }
});

module.exports = router;
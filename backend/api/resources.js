/**
 * Resources API endpoints
 */

const express = require('express');
const router = express.Router();
const resourcesService = require('../services/resourcesService');

/**
 * @route   GET /api/v1/resources
 * @desc    Get all resources
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const resources = resourcesService.getResources();
    res.json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/resources/category/:category
 * @desc    Get resources by category
 * @access  Public
 */
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const resources = resourcesService.getResourcesByCategory(category);
    
    res.json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    console.error(`Error fetching resources by category ${req.params.category}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/resources/:id
 * @desc    Get resource by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const resource = resourcesService.getResourceById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }
    
    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error(`Error fetching resource by id ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;
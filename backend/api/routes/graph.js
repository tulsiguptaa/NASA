const express = require('express');
const router = express.Router();

// Mock graph routes
router.get('/', (req, res) => {
  res.json({ message: 'Graph API endpoint' });
});

module.exports = router;
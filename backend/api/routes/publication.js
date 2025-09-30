const express = require('express');
const router = express.Router();

// Mock publication routes
router.get('/', (req, res) => {
  res.json({ message: 'Publications API endpoint' });
});

module.exports = router;
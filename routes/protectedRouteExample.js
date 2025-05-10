const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/admin-only', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.status(200).json({ message: 'Access granted to admin user' });
});

module.exports = router;

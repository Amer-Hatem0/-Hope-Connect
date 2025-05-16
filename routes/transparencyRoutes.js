// routes/transparency.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/transparencyController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware('admin'), controller.getDonorTransparency);

module.exports = router;

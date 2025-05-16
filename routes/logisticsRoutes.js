const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');


// routes/logisticsRoutes.js
router.put('/track/:donationId', authMiddleware, roleMiddleware('admin'), logisticsController.updateTrackingStatus);
router.get('/track/:donationId', authMiddleware, logisticsController.getTrackingStatus);

module.exports = router;
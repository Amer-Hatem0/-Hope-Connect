const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');


 
router.get('/track/:donationId',   logisticsController.getTrackingStatus);
router.get('/admin-donations', authMiddleware, roleMiddleware('admin'), logisticsController.getAdminPickupDonations);

 
router.put('/track/:donationId',   logisticsController.updateTrackingStatus);
module.exports = router;



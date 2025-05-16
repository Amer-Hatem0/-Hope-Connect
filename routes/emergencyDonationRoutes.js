const express = require('express');
const router = express.Router();
const controller = require('../controllers/emergencyDonationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, controller.createEmergencyDonation);
router.get('/', authMiddleware, controller.getEmergencyDonations);

module.exports = router;

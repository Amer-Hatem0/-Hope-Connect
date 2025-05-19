const express = require('express');
const router = express.Router();
const controller = require('../controllers/emergencyDonationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, controller.createEmergencyDonation);
router.get('/', authMiddleware, controller.getEmergencyDonations);
router.get('/by-donor/:donorId',  controller.getEmergencyDonationsByDonor);


module.exports = router;

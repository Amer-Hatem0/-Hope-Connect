const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware');
const { multiRoleMiddleware } = require('../middleware/roleMiddleware');

router.get('/', donationController.getAllDonations);

router.post(
  '/',
  authMiddleware,
  multiRoleMiddleware(['admin', 'donor']),
  donationController.createDonation
);

module.exports = router;

const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');
const authMiddleware = require('../middleware/authMiddleware');
const { multiRoleMiddleware } = require('../middleware/roleMiddleware');

 
router.get('/', authMiddleware, sponsorshipController.getSponsorships);
router.post('/', authMiddleware, multiRoleMiddleware(['admin', 'user']), sponsorshipController.createSponsorship);

module.exports = router;

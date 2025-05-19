const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');
const authMiddleware = require('../middleware/authMiddleware');
const { multiRoleMiddleware } = require('../middleware/roleMiddleware');

 
router.get('/', authMiddleware, sponsorshipController.getSponsorships);
router.post('/', authMiddleware, multiRoleMiddleware(['admin', 'user', 'donor']), sponsorshipController.createSponsorship);
router.get('/by-orphan/:orphanId', sponsorshipController.getSponsorshipsByOrphan);  

router.get('/by-donor/:donorId', sponsorshipController.getByDonor);
module.exports = router;

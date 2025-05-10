 

const express = require('express');
const router = express.Router();
const impactController = require('../controllers/impactReportController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
 
router.get('/top-donors', authMiddleware, roleMiddleware('admin'), impactController.getTopDonors);
router.get('/successful-campaigns', authMiddleware, roleMiddleware('admin'), impactController.getSuccessfulCampaigns);
router.get('/most-supported-orphans', authMiddleware, roleMiddleware('admin'), impactController.getMostSupportedOrphans);
router.get('/top-volunteers', authMiddleware, roleMiddleware('admin'), impactController.getTopVolunteers);

module.exports = router;

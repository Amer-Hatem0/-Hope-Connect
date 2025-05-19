const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.get('/', campaignController.getAllCampaigns);
router.post('/', campaignController.createCampaign);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);
router.get('/volunteer/:volunteerId', campaignController.getCampaignsByVolunteer);
router.post('/join', campaignController.volunteerJoinCampaign);
router.post('/leave', campaignController.volunteerLeaveCampaign);
router.put('/:id/donate', campaignController.donateToCampaign);

module.exports = router;

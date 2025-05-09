const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');

router.get('/', serviceRequestController.getAllRequests);
router.post('/', serviceRequestController.createRequest);
router.put('/:id', serviceRequestController.updateRequest);
router.delete('/:id', serviceRequestController.deleteRequest);

module.exports = router;

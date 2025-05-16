
const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');
const authMiddleware = require('../middleware/authMiddleware');
 

router.post('/pickup', authMiddleware, pickupController.schedulePickup);
module.exports = router;
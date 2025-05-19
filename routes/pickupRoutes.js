
const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');
const authMiddleware = require('../middleware/authMiddleware');
 const { roleMiddleware } = require('../middleware/roleMiddleware');



router.post('/pickup',   pickupController.schedulePickup);
router.get('/all',   pickupController.getAllScheduledPickups);

module.exports = router;
 
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, controller.createRating);
router.get('/', authMiddleware, controller.getAllRatings);
router.get('/donor/:donorId', controller.getDonorRatings);
module.exports = router;

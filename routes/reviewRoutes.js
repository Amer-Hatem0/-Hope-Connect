const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const { multiRoleMiddleware } = require('../middleware/roleMiddleware');

 
router.get('/', reviewController.getAllReviews);

 
router.post('/', authMiddleware, multiRoleMiddleware(['donor']), reviewController.createReview);

module.exports = router;

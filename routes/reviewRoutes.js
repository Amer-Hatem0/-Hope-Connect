const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const { multiRoleMiddleware } = require('../middleware/roleMiddleware');

 
router.get('/', reviewController.getAllReviews);

 
// router.post('/', authMiddleware, multiRoleMiddleware(['admin']), reviewController.createReview);
router.post('/',  reviewController.createReview);

module.exports = router;

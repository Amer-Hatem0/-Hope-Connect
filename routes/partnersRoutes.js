const express = require('express');
const router = express.Router();
const controller = require('../controllers/partnersController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), controller.createPartner);
router.get('/', controller.getPartners);

module.exports = router;

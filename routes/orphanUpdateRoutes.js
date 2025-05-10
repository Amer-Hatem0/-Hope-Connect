const express = require('express');
const router = express.Router();
const orphanUpdateController = require('../controllers/orphanUpdateController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

// عرض التحديثات
router.get('/:orphanId', orphanUpdateController.getUpdatesByOrphan);

// إضافة تحديث (admin فقط)
router.post('/', authMiddleware, roleMiddleware('admin'), orphanUpdateController.createUpdate);

module.exports = router;

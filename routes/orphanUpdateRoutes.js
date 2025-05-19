const express = require('express');
const router = express.Router();
const orphanUpdateController = require('../controllers/orphanUpdateController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
 
router.get('/:orphanId', orphanUpdateController.getUpdatesByOrphan);

 
router.post('/', authMiddleware, roleMiddleware('admin'), orphanUpdateController.createUpdate);

module.exports = router;

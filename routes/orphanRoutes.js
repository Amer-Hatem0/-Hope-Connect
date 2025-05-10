const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');




router.post('/', authMiddleware, roleMiddleware('admin'), orphanController.createOrphan);
router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanById);
 
router.put('/:id', orphanController.updateOrphan);
router.delete('/:id', orphanController.deleteOrphan);

module.exports = router;

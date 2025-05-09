const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');
/**
 * @swagger
 * /api/orphans:
 *   get:
 *     summary: Get all orphans
 *     tags: [Orphans]
 *     responses:
 *       200:
 *         description: List of all orphans
 */

router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanById);
router.post('/', orphanController.createOrphan);
router.put('/:id', orphanController.updateOrphan);
router.delete('/:id', orphanController.deleteOrphan);

module.exports = router;

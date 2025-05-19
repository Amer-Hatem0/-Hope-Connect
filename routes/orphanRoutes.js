 


 const express = require('express');
const router = express.Router();
const multer = require('multer');
const orphanController = require('../controllers/orphanController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const upload = multer({ dest: 'uploads/' });
router.get('/reports/:orphanId',   orphanController.getReportsByOrphan);

router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanById);

router.post('/', authMiddleware, roleMiddleware('admin'), upload.single('image'), orphanController.createOrphan);
router.put('/:id',   upload.fields([
  { name: 'image', maxCount: 1 }
]), orphanController.updateOrphan);

router.post('/upload-report', authMiddleware, roleMiddleware('admin'), upload.fields([
  { name: 'report', maxCount: 1 }
]), orphanController.uploadOrphanReport);

router.delete('/:id',   orphanController.deleteOrphan);
router.put('/:id/support', authMiddleware, roleMiddleware('donor'), orphanController.sendSupportMessage);
router.get('/by-user/:userId', orphanController.getorphansByUserId);

module.exports = router;

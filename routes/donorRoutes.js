const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const authMiddleware = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
 
router.get('/', donorController.getAllDonors);
router.get('/:id', donorController.getDonorById);
router.post('/', donorController.createDonor);
router.patch('/:id', donorController.updateDonor);
router.delete('/:id', donorController.deleteDonor);
router.put('/:id/verify', authMiddleware, roleMiddleware('admin'), donorController.verifyDonor);
 router.get('/by-user/:userId', donorController.getDonorByUserId);

 

module.exports = router;

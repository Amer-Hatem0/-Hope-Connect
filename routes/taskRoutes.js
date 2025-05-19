const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get available tasks (not assigned)
router.get('/available', taskController.getAvailableTasks);

// Get tasks assigned to a specific volunteer
router.get('/assigned/:volunteerId', taskController.getAssignedTasks);

router.put('/assign/:taskId', taskController.assignVolunteerToTask);
router.put('/assign/:taskId', taskController.assignVolunteerToTask);
router.put('/unassign/:taskId', taskController.unassign );
router.put('/complete/:taskId', taskController.complete );
router.put('/:id/complete', taskController.complete);

 
module.exports = router;

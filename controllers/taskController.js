const db = require('../config/db.config');

//  Get all available (unassigned) tasks
exports.getAvailableTasks = (req, res) => {
  const sql = `SELECT * FROM tasks WHERE status = 'available'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};


//  Get tasks assigned to a specific volunteer
exports.getAssignedTasks = (req, res) => {
  const { volunteerId } = req.params;
  const sql = `SELECT * FROM tasks WHERE assigned_to = ?`;
  db.query(sql, [volunteerId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};


// Assign a volunteer to a task
exports.assignVolunteerToTask = (req, res) => {
  const { taskId } = req.params;
  const { volunteerId } = req.body;

  const sql = `UPDATE tasks SET assigned_to = ?, status = 'pending' WHERE id = ?`;

  db.query(sql, [volunteerId, taskId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json({ message: "Task assigned successfully" });
  });
};


exports.unassign = (req, res) => {
  const { taskId } = req.params;
  const sql = `
    UPDATE tasks
    SET assigned_to = NULL, status = 'available'
    WHERE id = ?
  `;
  db.query(sql, [taskId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json({ message: "Task unassigned successfully" });
  });
};

exports.complete = (req, res) => {
 const { id } = req.params;
  const sql = `
    UPDATE tasks
    SET status = 'completed', completed_at = NOW()
    WHERE id = ?
  `;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json({ message: "Task marked as completed" });
  });
};






 
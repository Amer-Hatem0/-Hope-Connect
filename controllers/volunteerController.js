 
const db = require('../config/db.config');
const logger = require('../utils/logger');

// Get all volunteers
exports.getAllVolunteers = (req, res) => {
  db.query('SELECT * FROM volunteers', (err, results) => {
    if (err) {
      logger.error('Error fetching volunteers:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Get volunteer by ID
exports.getVolunteerById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM volunteers WHERE id = ?', [id], (err, results) => {
    if (err) {
      logger.error(`Error fetching volunteer ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      logger.warn(`Volunteer not found - ID: ${id}`);
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Create volunteer
exports.createVolunteer = (req, res) => {
  const volunteer = req.body;

  db.query('INSERT INTO volunteers SET ?', volunteer, (err, result) => {
    if (err) {
      logger.error('Error creating volunteer:', err);
      return res.status(500).json({ error: err });
    }
    logger.info(`Volunteer created: ${volunteer.name}`);
    res.status(201).json({ message: 'Volunteer created successfully', id: result.insertId });
  });
};

// Update volunteer
exports.updateVolunteer = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  db.query('UPDATE volunteers SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) {
      logger.error(`Error updating volunteer ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to update non-existent volunteer ID: ${id}`);
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    logger.info(`Volunteer updated - ID: ${id}`);
    res.status(200).json({ message: 'Volunteer updated successfully' });
  });
};
// controller
exports.getvolunteersByUserId = (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT * FROM volunteers WHERE user_id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(results[0]);
  });
};

// Delete volunteer
exports.deleteVolunteer = (req, res) => {
  const { id } = req.params;

   db.query('SELECT COUNT(*) AS count FROM orphan_volunteers WHERE volunteer_id = ?', [id], (err, results) => {
    if (err) {
      console.error(`Error checking related orphan_volunteers for volunteer ID ${id}:`, err);
      return res.status(500).json({ error: "Failed to check volunteer associations." });
    }

    if (results[0].count > 0) {
      return res.status(400).json({ message: "Cannot delete volunteer assigned to orphans." });
    }

  
    db.query('DELETE FROM volunteers WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(`Error deleting volunteer ID ${id}:`, err);
        return res.status(500).json({ error: "Delete operation failed." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Volunteer not found.' });
      }

      res.status(200).json({ message: 'Volunteer deleted successfully.' });
    });
  });
};

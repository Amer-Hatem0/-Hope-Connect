const db = require('../config/db.config');

// Get all volunteers
exports.getAllVolunteers = (req, res) => {
  db.query('SELECT * FROM volunteers', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Get volunteer by ID
exports.getVolunteerById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM volunteers WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Volunteer not found' });
    res.status(200).json(results[0]);
  });
};

// Create volunteer
exports.createVolunteer = (req, res) => {
  const volunteer = req.body;
  db.query('INSERT INTO volunteers SET ?', volunteer, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Volunteer created successfully', id: result.insertId });
  });
};

// Update volunteer
exports.updateVolunteer = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  db.query('UPDATE volunteers SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Volunteer not found' });
    res.status(200).json({ message: 'Volunteer updated successfully' });
  });
};

// Delete volunteer
exports.deleteVolunteer = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM volunteers WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Volunteer not found' });
    res.status(200).json({ message: 'Volunteer deleted successfully' });
  });
};

const db = require('../config/db.config');

// Get all donors
exports.getAllDonors = (req, res) => {
  db.query('SELECT * FROM donors', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Get donor by ID
exports.getDonorById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM donors WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Donor not found' });
    res.status(200).json(results[0]);
  });
};

// Create donor
exports.createDonor = (req, res) => {
  const donor = req.body;
  db.query('INSERT INTO donors SET ?', donor, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Donor created successfully', id: result.insertId });
  });
};

// Update donor
exports.updateDonor = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  db.query('UPDATE donors SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Donor not found' });
    res.status(200).json({ message: 'Donor updated successfully' });
  });
};

// Delete donor
exports.deleteDonor = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM donors WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Donor not found' });
    res.status(200).json({ message: 'Donor deleted successfully' });
  });
};

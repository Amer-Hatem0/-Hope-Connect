const db = require('../config/db.config');

// Get all service requests
exports.getAllRequests = (req, res) => {
  db.query('SELECT * FROM service_requests', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Create service request
exports.createRequest = (req, res) => {
  const request = req.body;
  db.query('INSERT INTO service_requests SET ?', request, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Service request created successfully', id: result.insertId });
  });
};

// Update request
exports.updateRequest = (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  db.query('UPDATE service_requests SET ? WHERE id = ?', [updated, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Request updated successfully' });
  });
};

// Delete request
exports.deleteRequest = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM service_requests WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Request deleted successfully' });
  });
};

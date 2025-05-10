 

const db = require('../config/db.config');
const logger = require('../utils/logger');

// Get all service requests
exports.getAllRequests = (req, res) => {
  db.query('SELECT * FROM service_requests', (err, results) => {
    if (err) {
      logger.error('Error fetching service requests:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Create service request
exports.createRequest = (req, res) => {
  const request = req.body;

  db.query('INSERT INTO service_requests SET ?', request, (err, result) => {
    if (err) {
      logger.error('Error creating service request:', err);
      return res.status(500).json({ error: err });
    }
    logger.info(`Service request created for orphan ID ${request.orphan_id}`);
    res.status(201).json({ message: 'Service request created successfully', id: result.insertId });
  });
};

// Update request
exports.updateRequest = (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  db.query('UPDATE service_requests SET ? WHERE id = ?', [updated, id], (err, result) => {
    if (err) {
      logger.error(`Error updating service request ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to update non-existent service request ID: ${id}`);
      return res.status(404).json({ message: 'Request not found' });
    }
    logger.info(`Service request updated - ID: ${id}`);
    res.status(200).json({ message: 'Request updated successfully' });
  });
};

// Delete request
exports.deleteRequest = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM service_requests WHERE id = ?', [id], (err, result) => {
    if (err) {
      logger.error(`Error deleting service request ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to delete non-existent service request ID: ${id}`);
      return res.status(404).json({ message: 'Request not found' });
    }
    logger.info(`Service request deleted - ID: ${id}`);
    res.status(200).json({ message: 'Request deleted successfully' });
  });
};

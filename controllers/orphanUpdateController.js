const db = require('../config/db.config');
const logger = require('../utils/logger');

// Get all updates for a specific orphan
exports.getUpdatesByOrphan = (req, res) => {
  const { orphanId } = req.params;

  db.query('SELECT * FROM orphan_updates WHERE orphan_id = ?', [orphanId], (err, results) => {
    if (err) {
      logger.error('Error fetching updates:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Create a new update
exports.createUpdate = (req, res) => {
  const { orphan_id, update_type, description } = req.body;

  db.query('INSERT INTO orphan_updates SET ?', { orphan_id, update_type, description }, (err, result) => {
    if (err) {
      logger.error('Error creating update:', err);
      return res.status(500).json({ error: err });
    }
    logger.info(`Update added for orphan ${orphan_id}`);
    res.status(201).json({ message: 'Update added successfully', id: result.insertId });
  });
};

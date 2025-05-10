// ✅ controllers/campaignController.js (مع logging باستخدام winston)

const db = require('../config/db.config');
const logger = require('../utils/logger');

// Get all campaigns
exports.getAllCampaigns = (req, res) => {
  db.query('SELECT * FROM campaigns', (err, results) => {
    if (err) {
      logger.error('Error fetching campaigns:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Create campaign
exports.createCampaign = (req, res) => {
  const campaign = req.body;

  db.query('INSERT INTO campaigns SET ?', campaign, (err, result) => {
    if (err) {
      logger.error('Error creating campaign:', err);
      return res.status(500).json({ error: err });
    }

    logger.info(`Campaign created: ${campaign.name}`);
    res.status(201).json({ message: 'Campaign created successfully', id: result.insertId });
  });
};

// Update campaign
exports.updateCampaign = (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  db.query('UPDATE campaigns SET ? WHERE id = ?', [updated, id], (err, result) => {
    if (err) {
      logger.error(`Error updating campaign ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to update non-existent campaign ID: ${id}`);
      return res.status(404).json({ message: 'Campaign not found' });
    }

    logger.info(`Campaign updated successfully - ID: ${id}`);
    res.status(200).json({ message: 'Campaign updated successfully' });
  });
};

// Delete campaign
exports.deleteCampaign = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM campaigns WHERE id = ?', [id], (err, result) => {
    if (err) {
      logger.error(`Error deleting campaign ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to delete non-existent campaign ID: ${id}`);
      return res.status(404).json({ message: 'Campaign not found' });
    }

    logger.info(`Campaign deleted successfully - ID: ${id}`);
    res.status(200).json({ message: 'Campaign deleted successfully' });
  });
};
